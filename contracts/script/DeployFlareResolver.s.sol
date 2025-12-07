// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "forge-std/console2.sol";
import "../src/FlareHybridResolver.sol";
import "../src/BasicMarketResolver.sol";

/**
 * @title DeployFlareResolver
 * @notice Deployment script for FlareHybridResolver and BasicMarketResolver
 * @dev Deploys both resolver types for use in Quantum Markets
 */
contract DeployFlareResolver is Script {
    function run() public returns (
        FlareHybridResolver flareResolver,
        BasicMarketResolver basicResolver
    ) {
        vm.startBroadcast();

        console2.log("=== Deploying Resolvers to Flare ===");
        console2.log("Deployer:", msg.sender);
        console2.log("Chain ID:", block.chainid);

        // Get Flare addresses from environment
        address ftsoRegistry = vm.envAddress("FTSO_REGISTRY_ADDRESS");
        address fdc = vm.envAddress("FDC_ADDRESS");
        address owner = vm.envAddress("OWNER_ADDRESS");
        address accountHolder = vm.envAddress("ACCOUNT_HOLDER_ADDRESS");

        console2.log("\nFlare Configuration:");
        console2.log("FTSO Registry:", ftsoRegistry);
        console2.log("FDC:", fdc);
        console2.log("Owner:", owner);

        // Step 1: Deploy BasicMarketResolver
        console2.log("\n1. Deploying BasicMarketResolver...");
        basicResolver = new BasicMarketResolver(owner, accountHolder);
        console2.log("BasicMarketResolver deployed at:", address(basicResolver));

        // Step 2: Deploy FlareHybridResolver
        console2.log("\n2. Deploying FlareHybridResolver...");
        flareResolver = new FlareHybridResolver(ftsoRegistry, fdc, owner);
        console2.log("FlareHybridResolver deployed at:", address(flareResolver));

        console2.log("\n=== Resolver Deployment Complete ===");
        console2.log("BasicMarketResolver:", address(basicResolver));
        console2.log("FlareHybridResolver:", address(flareResolver));

        vm.stopBroadcast();
    }
}

