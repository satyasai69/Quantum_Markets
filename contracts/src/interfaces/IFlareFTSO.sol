// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.26;

/**
 * @title IFlareFTSO
 * @notice Interfaces for Flare Time Series Oracle (FTSO)
 * @dev These interfaces match Flare's FTSO smart contracts
 */

interface IFtsoRegistry {
    /**
     * @notice Get FTSO contract address for a given asset
     * @param _ftsoAsset The asset address (token address)
     * @return The FTSO contract address, or address(0) if not found
     */
    function getFtso(address _ftsoAsset) external view returns (address);
    
    /**
     * @notice Get FTSO contract address by symbol
     * @param _symbol The asset symbol (e.g., "FLR", "USDC")
     * @return The FTSO contract address
     */
    function getFtsoBySymbol(string memory _symbol) external view returns (address);
}

interface IFtso {
    /**
     * @notice Get the current price from FTSO
     * @return _price The current price (scaled by 1e5)
     * @return _timestamp The timestamp when price was last updated
     */
    function getCurrentPrice() external view returns (uint256 _price, uint256 _timestamp);
    
    /**
     * @notice Get price for a specific epoch
     * @param _epochId The epoch ID
     * @return _price The price for that epoch (scaled by 1e5)
     * @return _timestamp The timestamp of that epoch
     */
    function getPrice(uint256 _epochId) external view returns (uint256 _price, uint256 _timestamp);
    
    /**
     * @notice Get the current epoch ID
     * @return The current epoch ID
     */
    function getCurrentEpochId() external view returns (uint256);
}

