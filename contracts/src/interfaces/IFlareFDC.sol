// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.26;

/**
 * @title IFlareFDC
 * @notice Interface for Flare Data Connector (FDC)
 * @dev This interface matches Flare's Data Connector smart contract
 */

interface IFlareDataConnector {
    /**
     * @notice Request an attestation for off-chain data
     * @param dataSource The data source identifier (e.g., API URL, blockchain event)
     * @param query The query parameters for the data source
     * @param timeout The timeout timestamp for the request
     * @return requestId The unique request ID for this attestation
     */
    function requestAttestation(
        string memory dataSource,
        bytes memory query,
        uint256 timeout
    ) external returns (bytes32 requestId);
    
    /**
     * @notice Get the attestation result for a request
     * @param requestId The request ID returned from requestAttestation
     * @return success Whether the attestation is available
     * @return data The attestation data (if available)
     */
    function getAttestation(bytes32 requestId) external view returns (bool success, bytes memory data);
    
    /**
     * @notice Check if a request is pending
     * @param requestId The request ID to check
     * @return Whether the request is still pending
     */
    function isPending(bytes32 requestId) external view returns (bool);
    
    /**
     * @notice Get the timestamp when attestation was completed
     * @param requestId The request ID
     * @return The completion timestamp, or 0 if not completed
     */
    function getAttestationTimestamp(bytes32 requestId) external view returns (uint256);
}

