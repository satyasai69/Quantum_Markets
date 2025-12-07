// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.26;

import "./interfaces/IMarketResolver.sol";
import "./interfaces/IFlareFTSO.sol";
import "./interfaces/IFlareFDC.sol";
import {ResolutionType, ResolutionConfig} from "./interfaces/IFlareHybridResolver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title FlareHybridResolver
 * @notice Resolver that uses Flare's FTSO and FDC for automatic market resolution
 * @dev Supports multiple resolution types: FTSO price feeds, FTSO market cap, FDC API calls, and FDC blockchain events
 * @dev Supports multiple proposals and markets - each proposal can have its own independent resolution configuration
 * @dev Each proposalId maps to a unique ResolutionConfig, allowing the same resolver instance to handle multiple markets and proposals
 */

contract FlareHybridResolver is IMarketResolver, Ownable, AccessControl {
    bytes32 public constant CONFIGURER_ROLE = keccak256("CONFIGURER_ROLE");

    IFtsoRegistry public immutable ftsoRegistry;
    IFlareDataConnector public immutable fdc;

    // Mapping: proposalId => resolution configuration
    mapping(uint256 => ResolutionConfig) public resolutionConfigs;

    // Mapping: proposalId => FDC request ID (for FDC-based resolutions)
    mapping(uint256 => bytes32) public fdcRequestIds;

    // Mapping: proposalId => FDC request timestamp
    mapping(uint256 => uint256) public fdcRequestTimestamps;

    // Events
    event ResolutionConfigSet(uint256 indexed proposalId, ResolutionType resolutionType, address tokenAddress);

    event FDCRequestSubmitted(uint256 indexed proposalId, bytes32 indexed requestId, string dataSource);

    event ResolutionVerified(uint256 indexed proposalId, bool outcome, ResolutionType resolutionType);

    error InvalidResolutionType();
    error FTSONotAvailable(address token);
    error FDCRequestNotFound(uint256 proposalId);
    error AttestationNotAvailable(bytes32 requestId);
    error OutcomeMismatch(bool expected, bool actual);
    error ConfigNotSet(uint256 proposalId);

    constructor(address _ftsoRegistry, address _fdc, address _owner) Ownable(_owner) {
        ftsoRegistry = IFtsoRegistry(_ftsoRegistry);
        fdc = IFlareDataConnector(_fdc);
        _grantRole(DEFAULT_ADMIN_ROLE, _owner);
    }

    /**
     * @notice Set resolution configuration for a proposal
     * @param proposalId The proposal ID (unique across all markets using this resolver)
     * @param config The resolution configuration
     * @dev Each proposalId maps to an independent ResolutionConfig, allowing this resolver to support multiple proposals and markets
     * @dev ProposalIds are unique per Market contract, so multiple markets can safely share the same resolver instance
     */
    function setResolutionConfig(uint256 proposalId, ResolutionConfig calldata config)
        external
        onlyRole(CONFIGURER_ROLE)
    {
        require(config.resolutionType != ResolutionType.MANUAL, "Cannot set MANUAL type");

        resolutionConfigs[proposalId] = ResolutionConfig({
            resolutionType: config.resolutionType,
            tokenAddress: config.tokenAddress,
            ftsoAddress: config.ftsoAddress,
            targetPrice: config.targetPrice,
            targetMarketCap: config.targetMarketCap,
            dataSource: config.dataSource,
            query: config.query,
            expectedData: config.expectedData,
            timestamp: block.timestamp
        });

        // If using FDC, submit attestation request
        if (
            config.resolutionType == ResolutionType.FDC_API
                || config.resolutionType == ResolutionType.FDC_BLOCKCHAIN_EVENT
        ) {
            _submitFDCRequest(proposalId, config);
        }

        emit ResolutionConfigSet(proposalId, config.resolutionType, config.tokenAddress);
    }

    /**
     * @notice Submit FDC attestation request
     * @param proposalId The proposal ID
     * @param config The resolution configuration
     */
    function _submitFDCRequest(uint256 proposalId, ResolutionConfig memory config) internal {
        bytes32 requestId = fdc.requestAttestation(
            config.dataSource,
            config.query,
            block.timestamp + 24 hours // 24 hour timeout
        );

        fdcRequestIds[proposalId] = requestId;
        fdcRequestTimestamps[proposalId] = block.timestamp;

        emit FDCRequestSubmitted(proposalId, requestId, config.dataSource);
    }

    /**
     * @notice Manually submit FDC request (if config was set without auto-submit)
     */
    function submitFDCRequest(uint256 proposalId) external onlyRole(CONFIGURER_ROLE) {
        ResolutionConfig memory config = resolutionConfigs[proposalId];
        require(
            config.resolutionType == ResolutionType.FDC_API
                || config.resolutionType == ResolutionType.FDC_BLOCKCHAIN_EVENT,
            "Not an FDC resolution type"
        );
        require(fdcRequestIds[proposalId] == bytes32(0), "Request already submitted");

        _submitFDCRequest(proposalId, config);
    }

    /**
     * @notice Verify market resolution using Flare infrastructure
     * @param proposalId The proposal ID to verify
     * @param yesOrNo The claimed outcome (true = YES, false = NO)
     * @param proof Not used for automatic resolution, kept for interface compatibility
     */
    function verifyResolution(uint256 proposalId, bool yesOrNo, bytes memory proof)
        external
        view
        override
        returns (bool)
    {
        ResolutionConfig memory config = resolutionConfigs[proposalId];

        if (config.resolutionType == ResolutionType.MANUAL || config.timestamp == 0) {
            revert ConfigNotSet(proposalId);
        }

        bool outcome;

        if (
            config.resolutionType == ResolutionType.FTSO_PRICE
                || config.resolutionType == ResolutionType.FTSO_MARKET_CAP
        ) {
            outcome = _verifyFTSO(proposalId, config);
        } else if (
            config.resolutionType == ResolutionType.FDC_API
                || config.resolutionType == ResolutionType.FDC_BLOCKCHAIN_EVENT
        ) {
            outcome = _verifyFDC(proposalId, config);
        } else {
            revert InvalidResolutionType();
        }

        if (outcome != yesOrNo) {
            revert OutcomeMismatch(yesOrNo, outcome);
        }

        return true;
    }

    /**
     * @notice Verify resolution using FTSO price feeds
     */
    function _verifyFTSO(uint256 proposalId, ResolutionConfig memory config) internal view returns (bool) {
        IFtso ftso;

        // Try to get FTSO from registry or use provided address
        if (config.ftsoAddress != address(0)) {
            ftso = IFtso(config.ftsoAddress);
        } else {
            address ftsoAddr = ftsoRegistry.getFtso(config.tokenAddress);
            if (ftsoAddr == address(0)) {
                revert FTSONotAvailable(config.tokenAddress);
            }
            ftso = IFtso(ftsoAddr);
        }

        (uint256 price, uint256 timestamp) = ftso.getCurrentPrice();
        require(timestamp > 0, "Invalid FTSO price");

        // FTSO prices are scaled by 1e5, convert to 1e18 for comparison
        uint256 priceScaled = price * 1e13; // 1e5 * 1e13 = 1e18

        if (config.resolutionType == ResolutionType.FTSO_MARKET_CAP) {
            // For market cap, you may need to get token supply
            // This is a simplified version - you might want to add token supply fetching
            // For now, we'll use price as a proxy or require targetMarketCap to be set
            if (config.targetMarketCap > 0) {
                // Simplified: assume price correlates with market cap
                // In production, fetch token supply: IERC20(config.tokenAddress).totalSupply()
                // Then: marketCap = (priceScaled * supply) / 1e18
                // For now, using price comparison
                return priceScaled >= config.targetPrice;
            } else {
                return priceScaled >= config.targetPrice;
            }
        } else {
            // FTSO_PRICE: Check if current price >= target price
            return priceScaled >= config.targetPrice;
        }
    }

    /**
     * @notice Verify resolution using Flare Data Connector
     */
    function _verifyFDC(uint256 proposalId, ResolutionConfig memory config) internal view returns (bool) {
        bytes32 requestId = fdcRequestIds[proposalId];
        if (requestId == bytes32(0)) {
            revert FDCRequestNotFound(proposalId);
        }

        (bool success, bytes memory data) = fdc.getAttestation(requestId);
        if (!success) {
            revert AttestationNotAvailable(requestId);
        }

        // Compare attestation data with expected data
        return _compareFDCData(data, config.expectedData);
    }

    /**
     * @notice Compare FDC attestation data with expected data
     * @param attestationData The data from FDC attestation
     * @param expectedData The expected data format
     */
    function _compareFDCData(bytes memory attestationData, bytes memory expectedData) internal pure returns (bool) {
        // Option 1: Exact match
        if (expectedData.length > 0) {
            return keccak256(attestationData) == keccak256(expectedData);
        }

        // Option 2: Parse JSON/structured data
        // You can add custom parsing logic here based on your data format
        // For example, if data is JSON: {"result": true}
        // You would parse and compare

        // For now, if expectedData is empty, check if attestationData is non-empty
        return attestationData.length > 0;
    }

    /**
     * @notice Get FTSO price for a token (helper function)
     */
    function getFTSOPrice(address tokenAddress) external view returns (uint256 price, uint256 timestamp) {
        address ftsoAddr = ftsoRegistry.getFtso(tokenAddress);
        require(ftsoAddr != address(0), "FTSO not available");
        IFtso ftso = IFtso(ftsoAddr);
        (uint256 rawPrice, uint256 ts) = ftso.getCurrentPrice();
        // Scale from 1e5 to 1e18
        return (rawPrice * 1e13, ts);
    }

    /**
     * @notice Get FDC attestation status (helper function)
     */
    function getFDCAttestationStatus(uint256 proposalId)
        external
        view
        returns (bytes32 requestId, bool available, bytes memory data)
    {
        requestId = fdcRequestIds[proposalId];
        if (requestId == bytes32(0)) {
            return (bytes32(0), false, "");
        }

        (bool success, bytes memory attestationData) = fdc.getAttestation(requestId);
        return (requestId, success, attestationData);
    }

    /**
     * @notice Grant configurer role (for setting resolution configs)
     */
    function grantConfigurerRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(CONFIGURER_ROLE, account);
    }

    /**
     * @notice Revoke configurer role
     */
    function revokeConfigurerRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _revokeRole(CONFIGURER_ROLE, account);
    }
}

