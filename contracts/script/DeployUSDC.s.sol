// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "forge-std/console2.sol";
import "../src/USDC.sol";

/**
 * @title DeployUSDC
 * @notice Deployment script for USDC token contract
 * @dev Deploys USDC token that will be used by all Quantum Markets
 */
contract DeployUSDC is Script {
    function run() public returns (USDC usdc) {
        vm.startBroadcast();

        console2.log("=== Deploying USDC Token ===");
        console2.log("Deployer:", msg.sender);
        console2.log("Chain ID:", block.chainid);

        // Get owner address from environment (or use deployer)
        address owner = vm.envOr("OWNER_ADDRESS", msg.sender);

        console2.log("\nConfiguration:");
        console2.log("Owner:", owner);

        // Deploy USDC
        console2.log("\nDeploying USDC...");
        usdc = new USDC(owner);
        console2.log("USDC deployed at:", address(usdc));
        console2.log("USDC name:", usdc.name());
        console2.log("USDC symbol:", usdc.symbol());
        console2.log("USDC decimals:", usdc.decimals());

        // Mint 1 million USDC to owner (1,000,000 * 10^6 = 1_000_000e6)
        uint256 mintAmount = 1_000_000e6; // 1M USDC (6 decimals)
        console2.log("\nMinting USDC...");
        console2.log("Amount:", mintAmount / 1e6, "USDC");
        console2.log("Recipient:", owner);
        usdc.mint(owner, mintAmount);
        console2.log("Mint successful!");
        console2.log("Owner balance:", usdc.balanceOf(owner) / 1e6, "USDC");

        console2.log("\n=== USDC Deployment Complete ===");
        console2.log("USDC Address:", address(usdc));
        console2.log("Total Supply:", usdc.totalSupply() / 1e6, "USDC");
        console2.log("\nNext Steps:");
        console2.log("1. Add USDC_ADDRESS to .env.flare");
        console2.log("2. Deploy Market contract with USDC address");

        vm.stopBroadcast();
    }
}

