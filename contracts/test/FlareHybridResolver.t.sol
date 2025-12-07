// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "../src/FlareHybridResolver.sol";
import "../src/interfaces/IFlareFTSO.sol";
import "../src/interfaces/IFlareFDC.sol";

// Import ResolutionConfig type
import {ResolutionConfig, ResolutionType} from "../src/interfaces/IFlareHybridResolver.sol";

// Mock contracts for testing
contract MockFtsoRegistry is IFtsoRegistry {
    mapping(address => address) public ftsoAddresses;
    
    function setFtso(address token, address ftso) external {
        ftsoAddresses[token] = ftso;
    }
    
    function getFtso(address _ftsoAsset) external view override returns (address) {
        return ftsoAddresses[_ftsoAsset];
    }
    
    function getFtsoBySymbol(string memory) external pure override returns (address) {
        return address(0);
    }
}

contract MockFtso is IFtso {
    uint256 public price;
    uint256 public timestamp;
    
    function setPrice(uint256 _price, uint256 _timestamp) external {
        price = _price;
        timestamp = _timestamp;
    }
    
    function getCurrentPrice() external view override returns (uint256 _price, uint256 _timestamp) {
        return (price, timestamp);
    }
    
    function getPrice(uint256) external pure override returns (uint256, uint256) {
        return (0, 0);
    }
    
    function getCurrentEpochId() external pure override returns (uint256) {
        return 0;
    }
}

contract MockFDC is IFlareDataConnector {
    mapping(bytes32 => bytes) public attestations;
    mapping(bytes32 => bool) public pending;
    
    function requestAttestation(
        string memory,
        bytes memory,
        uint256
    ) external override returns (bytes32 requestId) {
        requestId = keccak256(abi.encodePacked(block.timestamp, msg.sender));
        pending[requestId] = true;
        return requestId;
    }
    
    function setAttestation(bytes32 requestId, bytes memory data) external {
        attestations[requestId] = data;
        pending[requestId] = false;
    }
    
    function getAttestation(bytes32 requestId) external view override returns (bool success, bytes memory data) {
        if (attestations[requestId].length > 0) {
            return (true, attestations[requestId]);
        }
        return (false, "");
    }
    
    function isPending(bytes32 requestId) external view override returns (bool) {
        return pending[requestId];
    }
    
    function getAttestationTimestamp(bytes32) external pure override returns (uint256) {
        return 0;
    }
}

contract FlareHybridResolverTest is Test {
    FlareHybridResolver resolver;
    MockFtsoRegistry ftsoRegistry;
    MockFDC fdc;
    address owner = address(0x1);
    address configurer = address(0x2);
    address token = address(0x3);
    
    function setUp() public {
        ftsoRegistry = new MockFtsoRegistry();
        fdc = new MockFDC();
        
        resolver = new FlareHybridResolver(
            address(ftsoRegistry),
            address(fdc),
            owner
        );
        
        resolver.grantConfigurerRole(configurer);
    }
    
    function testSetFTSOPriceConfig() public {
        vm.prank(configurer);
        ResolutionConfig memory config = ResolutionConfig({
            resolutionType: ResolutionType.FTSO_PRICE,
            tokenAddress: token,
            ftsoAddress: address(0),
            targetPrice: 50e18, // 50 USD
            targetMarketCap: 0,
            dataSource: "",
            query: "",
            expectedData: "",
            timestamp: 0
        });
        
        resolver.setResolutionConfig(1, config);
        
        // Access mapping return values (public mapping returns tuple)
        (ResolutionType resolutionType, address tokenAddress, , uint256 targetPrice, , , , , ) = resolver.resolutionConfigs(1);
        assertEq(uint256(resolutionType), uint256(ResolutionType.FTSO_PRICE));
        assertEq(tokenAddress, token);
        assertEq(targetPrice, 50e18);
    }
    
    function testSetFDCConfig() public {
        vm.prank(configurer);
        ResolutionConfig memory config = ResolutionConfig({
            resolutionType: ResolutionType.FDC_API,
            tokenAddress: address(0),
            ftsoAddress: address(0),
            targetPrice: 0,
            targetMarketCap: 0,
            dataSource: "https://api.example.com",
            query: "",
            expectedData: abi.encode(true),
            timestamp: 0
        });
        
        resolver.setResolutionConfig(1, config);
        
        bytes32 requestId = resolver.fdcRequestIds(1);
        assertTrue(requestId != bytes32(0));
    }
    
    function testVerifyFTSOPrice() public {
        // Setup
        MockFtso ftso = new MockFtso();
        ftso.setPrice(60e5, block.timestamp); // 60 USD (scaled by 1e5)
        ftsoRegistry.setFtso(token, address(ftso));
        
        vm.prank(configurer);
        ResolutionConfig memory config = ResolutionConfig({
            resolutionType: ResolutionType.FTSO_PRICE,
            tokenAddress: token,
            ftsoAddress: address(0),
            targetPrice: 50e18, // 50 USD target
            targetMarketCap: 0,
            dataSource: "",
            query: "",
            expectedData: "",
            timestamp: 0
        });
        resolver.setResolutionConfig(1, config);
        
        // Verify resolution (60 >= 50, so YES should pass)
        bool result = resolver.verifyResolution(1, true, "");
        assertTrue(result);
    }
    
    function testVerifyFDC() public {
        // Setup FDC config
        vm.prank(configurer);
        ResolutionConfig memory config = ResolutionConfig({
            resolutionType: ResolutionType.FDC_API,
            tokenAddress: address(0),
            ftsoAddress: address(0),
            targetPrice: 0,
            targetMarketCap: 0,
            dataSource: "https://api.example.com",
            query: "",
            expectedData: abi.encode(true),
            timestamp: 0
        });
        resolver.setResolutionConfig(1, config);
        
        // Set attestation
        bytes32 requestId = resolver.fdcRequestIds(1);
        fdc.setAttestation(requestId, abi.encode(true));
        
        // Verify resolution
        bool result = resolver.verifyResolution(1, true, "");
        assertTrue(result);
    }
    
    function testGetFTSOPrice() public {
        MockFtso ftso = new MockFtso();
        ftso.setPrice(100e5, block.timestamp);
        ftsoRegistry.setFtso(token, address(ftso));
        
        (uint256 price, uint256 timestamp) = resolver.getFTSOPrice(token);
        assertEq(price, 100e18); // Scaled from 1e5 to 1e18
        assertEq(timestamp, block.timestamp);
    }
}

