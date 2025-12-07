// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.26;

/**
 * @title IFlareHybridResolver
 * @notice Interface for FlareHybridResolver to enable automatic resolution configuration
 */

enum ResolutionType {
    FTSO_PRICE, // Check if token price >= target
    FTSO_MARKET_CAP, // Check if token market cap >= target
    FDC_API, // Fetch data from API via FDC
    FDC_BLOCKCHAIN_EVENT, // Check blockchain event via FDC
    MANUAL // Manual resolution (fallback)
}

struct ResolutionConfig {
    ResolutionType resolutionType;
    address tokenAddress; // Token address for FTSO (address(0) if not used)
    address ftsoAddress; // FTSO contract address (if known, otherwise fetched from registry)
    uint256 targetPrice; // Target price in USD (scaled by 1e18)
    uint256 targetMarketCap; // Target market cap in USD (scaled by 1e18)
    string dataSource; // API URL or data source for FDC
    bytes query; // Query parameters for FDC
    bytes expectedData; // Expected data format for comparison
    uint256 timestamp; // When config was set (ignored, will be set by resolver)
}

interface IFlareHybridResolver {
    function setResolutionConfig(uint256 proposalId, ResolutionConfig calldata config) external;
}

