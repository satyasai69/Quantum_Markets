// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "forge-std/console2.sol";
import "./DeployUniswapV4.s.sol";
import "./DeployUniversalRouter.s.sol";
import "./DeployFlareResolver.s.sol";
import "./DeployQuantumMarkets.s.sol";
import "../src/Market.sol";
import "../src/MarketUtilsSwapHook.sol";
import "../src/USDC.sol";
import {IPoolManager} from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";
import {IPositionManager} from "@uniswap/v4-periphery/src/interfaces/IPositionManager.sol";
import {UniversalRouter} from "@uniswap/universal-router/contracts/UniversalRouter.sol";
import {IPermit2} from "@uniswap/permit2/src/interfaces/IPermit2.sol";

/**
 * @title DeployAll
 * @notice Complete deployment script for Quantum Markets on Flare
 * @dev Deploys everything in correct order: Uniswap V4 -> Resolvers -> USDC -> Market
 */
contract DeployAll is Script {
    struct DeploymentAddresses {
        address wflr;
        address poolManager;
        address positionManager;
        address permit2;
        address universalRouter;
        address usdc;
        address market;
        address hook;
        address basicResolver;
        address flareResolver;
    }

    function run() public returns (DeploymentAddresses memory addresses) {
        vm.startBroadcast();

        console2.log("=== Full Quantum Markets Deployment to Flare ===");
        console2.log("Deployer:", msg.sender);
        console2.log("Chain ID:", block.chainid);
        console2.log("Block Number:", block.number);

        // Step 1: Deploy Uniswap V4
        console2.log("\n==================================================");
        console2.log("STEP 1: Deploying Uniswap V4");
        console2.log("==================================================");

        DeployUniswapV4 deployV4 = new DeployUniswapV4();
        (IPoolManager poolManager, IPositionManager positionManager, address permit2, address wflr) = deployV4.run();

        addresses.wflr = wflr;
        addresses.poolManager = address(poolManager);
        addresses.positionManager = address(positionManager);
        addresses.permit2 = permit2;

        // Step 2: Deploy Universal Router
        console2.log("\n==================================================");
        console2.log("STEP 2: Deploying Universal Router");
        console2.log("==================================================");

        DeployUniversalRouter deployRouter = new DeployUniversalRouter();
        UniversalRouter universalRouter = deployRouter.run();
        addresses.universalRouter = address(universalRouter);

        // Step 3: Deploy Resolvers
        console2.log("\n==================================================");
        console2.log("STEP 3: Deploying Resolvers");
        console2.log("==================================================");

        DeployFlareResolver deployResolvers = new DeployFlareResolver();
        (FlareHybridResolver flareResolver, BasicMarketResolver basicResolver) = deployResolvers.run();

        addresses.basicResolver = address(basicResolver);
        addresses.flareResolver = address(flareResolver);

        // Step 4: Deploy USDC Token
        console2.log("\n==================================================");
        console2.log("STEP 4: Deploying USDC Token");
        console2.log("==================================================");

        // Get additional addresses
        address owner = vm.envAddress("OWNER_ADDRESS");

        // Deploy USDC
        console2.log("\n4.1. Deploying USDC Token...");
        USDC usdc = new USDC(owner);
        console2.log("USDC deployed at:", address(usdc));
        addresses.usdc = address(usdc);

        // Step 5: Deploy Market and Hook
        console2.log("\n==================================================");
        console2.log("STEP 5: Deploying Market Contract");
        console2.log("==================================================");

        // Deploy Hook
        console2.log("\n5.1. Deploying MarketUtilsSwapHook...");
        MarketUtilsSwapHook hook = new MarketUtilsSwapHook(poolManager);
        console2.log("MarketUtilsSwapHook deployed at:", address(hook));
        addresses.hook = address(hook);

        // Deploy Market
        console2.log("\n5.2. Deploying Market Contract...");
        Market market =
            new Market(owner, address(poolManager), address(positionManager), permit2, address(hook), address(usdc));
        console2.log("Market deployed at:", address(market));
        addresses.market = address(market);

        // Final Summary
        console2.log("\n==================================================");
        console2.log("=== DEPLOYMENT SUMMARY ===");
        console2.log("==================================================");
        console2.log("Uniswap V4:");
        console2.log("  WFLR:", addresses.wflr);
        console2.log("  PoolManager:", addresses.poolManager);
        console2.log("  PositionManager:", addresses.positionManager);
        console2.log("  Permit2:", addresses.permit2);
        console2.log("  Universal Router:", addresses.universalRouter);
        console2.log("\nResolvers:");
        console2.log("  BasicMarketResolver:", addresses.basicResolver);
        console2.log("  FlareHybridResolver:", addresses.flareResolver);
        console2.log("\nQuantum Markets:");
        console2.log("  USDC:", addresses.usdc);
        console2.log("  Market:", addresses.market);
        console2.log("  MarketUtilsSwapHook:", addresses.hook);
        console2.log("==================================================");

        // Save addresses to JSON file
        string memory json = string.concat(
            "{\n",
            '  "wflr": "',
            vm.toString(addresses.wflr),
            '",\n',
            '  "poolManager": "',
            vm.toString(addresses.poolManager),
            '",\n',
            '  "positionManager": "',
            vm.toString(addresses.positionManager),
            '",\n',
            '  "permit2": "',
            vm.toString(addresses.permit2),
            '",\n',
            '  "universalRouter": "',
            vm.toString(addresses.universalRouter),
            '",\n',
            '  "usdc": "',
            vm.toString(addresses.usdc),
            '",\n',
            '  "market": "',
            vm.toString(addresses.market),
            '",\n',
            '  "hook": "',
            vm.toString(addresses.hook),
            '",\n',
            '  "basicResolver": "',
            vm.toString(addresses.basicResolver),
            '",\n',
            '  "flareResolver": "',
            vm.toString(addresses.flareResolver),
            '"\n',
            "}"
        );

        vm.writeFile("deployment-addresses.json", json);
        console2.log("\nDeployment addresses saved to: deployment-addresses.json");

        vm.stopBroadcast();
    }
}

