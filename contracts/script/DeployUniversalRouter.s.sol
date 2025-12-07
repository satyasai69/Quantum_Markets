// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "forge-std/console2.sol";
import {UniversalRouter} from "@uniswap/universal-router/contracts/UniversalRouter.sol";
import {RouterParameters} from "@uniswap/universal-router/contracts/types/RouterParameters.sol";
import {IPoolManager} from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";
import {IPositionManager} from "@uniswap/v4-periphery/src/interfaces/IPositionManager.sol";
import {IPermit2} from "@uniswap/permit2/src/interfaces/IPermit2.sol";

/**
 * @title DeployUniversalRouter
 * @notice Deploy Universal Router for Quantum Markets
 * @dev Must be deployed after Uniswap V4 (PoolManager, PositionManager, Permit2)
 */
contract DeployUniversalRouter is Script {
    function run() public returns (UniversalRouter router) {
        vm.startBroadcast();

        console2.log("=== Deploying Universal Router to Flare ===");
        console2.log("Deployer:", msg.sender);
        console2.log("Chain ID:", block.chainid);

        // Get addresses from environment (must be deployed first)
        address poolManager = vm.envAddress("POOL_MANAGER_ADDRESS");
        address positionManager = vm.envAddress("POSITION_MANAGER_ADDRESS");
        address permit2 = vm.envAddress("PERMIT2_ADDRESS");

        // For Flare, we don't have V2/V3, so use zero addresses
        address v2Factory = address(0);
        address v3Factory = address(0);
        address v3NFTPositionManager = address(0);

        // Try to get WFLR address from environment, otherwise use zero
        address weth9 = address(0);
        try vm.envAddress("WFLR_ADDRESS") returns (address wflr) {
            weth9 = wflr;
            console2.log("Using WFLR address:", wflr);
        } catch {
            console2.log("WFLR_ADDRESS not set, using address(0)");
        }

        // Init code hashes (not needed for V4-only, but required by RouterParameters)
        bytes32 pairInitCodeHash = bytes32(0);
        bytes32 poolInitCodeHash = bytes32(0);

        console2.log("\nDependencies:");
        console2.log("PoolManager:", poolManager);
        console2.log("PositionManager:", positionManager);
        console2.log("Permit2:", permit2);

        // Create RouterParameters
        RouterParameters memory params = RouterParameters({
            permit2: permit2,
            weth9: weth9,
            v2Factory: v2Factory,
            v3Factory: v3Factory,
            pairInitCodeHash: pairInitCodeHash,
            poolInitCodeHash: poolInitCodeHash,
            v4PoolManager: poolManager,
            v3NFTPositionManager: v3NFTPositionManager,
            v4PositionManager: positionManager
        });

        // Deploy Universal Router
        console2.log("\nDeploying Universal Router...");
        router = new UniversalRouter(params);
        console2.log("Universal Router deployed at:", address(router));

        console2.log("\n=== Universal Router Deployment Complete ===");
        console2.log("Universal Router:", address(router));
        console2.log("\nAdd to .env.flare:");
        console2.log("UNIVERSAL_ROUTER_ADDRESS=", address(router));

        vm.stopBroadcast();
    }
}

