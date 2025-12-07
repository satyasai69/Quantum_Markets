// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "forge-std/console2.sol";
import {PoolManager} from "@uniswap/v4-core/src/PoolManager.sol";
import {IPoolManager} from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";
import {IPositionManager} from "@uniswap/v4-periphery/src/interfaces/IPositionManager.sol";
import {IAllowanceTransfer} from "@uniswap/permit2/src/interfaces/IAllowanceTransfer.sol";
import {Permit2} from "@uniswap/permit2/src/Permit2.sol";
import {PositionDescriptor} from "@uniswap/v4-periphery/src/PositionDescriptor.sol";
import {PositionManager} from "@uniswap/v4-periphery/src/PositionManager.sol";
import {IPositionDescriptor} from "@uniswap/v4-periphery/src/interfaces/IPositionDescriptor.sol";
import {IWETH9} from "@uniswap/v4-periphery/src/interfaces/external/IWETH9.sol";
import {WFLR} from "../src/WFLR.sol";

/**
 * @title DeployUniswapV4
 * @notice Deployment script for Uniswap V4 Core and Periphery contracts
 * @dev Deploys PoolManager (singleton) and PositionManager for Flare network
 */
contract DeployUniswapV4 is Script {
    function run()
        public
        returns (IPoolManager poolManager, IPositionManager positionManager, address permit2, address wflr)
    {
        vm.startBroadcast();

        console2.log("=== Deploying Uniswap V4 to Flare ===");
        console2.log("Deployer:", msg.sender);
        console2.log("Chain ID:", block.chainid);

        // Step 1: Deploy Permit2 (required for PositionManager)
        console2.log("\n1. Deploying Permit2...");
        Permit2 permit2Contract = new Permit2();
        permit2 = address(permit2Contract);
        console2.log("Permit2 deployed at:", permit2);

        // Step 2: Deploy WFLR (Wrapped FLR)
        console2.log("\n2. Deploying WFLR (Wrapped Flare)...");
        WFLR wflrContract = new WFLR();
        address wrappedNative = address(wflrContract);
        wflr = wrappedNative;
        console2.log("WFLR deployed at:", wrappedNative);

        // Step 3: Deploy PoolManager (singleton)
        console2.log("\n3. Deploying PoolManager...");
        poolManager = new PoolManager(msg.sender); // Owner address
        console2.log("PoolManager deployed at:", address(poolManager));

        // Step 4: Deploy PositionManager
        console2.log("\n4. Deploying PositionManager...");
        // Note: PositionManager requires PositionDescriptor and WFLR
        bytes32 nativeCurrencyLabel = bytes32("FLR");

        // Deploy PositionDescriptor directly
        console2.log("4.1. Deploying PositionDescriptor...");
        PositionDescriptor positionDescriptorContract =
            new PositionDescriptor(poolManager, wrappedNative, nativeCurrencyLabel);
        address positionDescriptor = address(positionDescriptorContract);
        console2.log("PositionDescriptor deployed at:", positionDescriptor);

        // Deploy PositionManager directly
        console2.log("4.2. Deploying PositionManager...");
        positionManager = new PositionManager(
            poolManager,
            IAllowanceTransfer(permit2),
            500000, // unsubscribeGasLimit
            IPositionDescriptor(positionDescriptor),
            IWETH9(wrappedNative)
        );
        console2.log("PositionManager deployed at:", address(positionManager));

        console2.log("\n=== Uniswap V4 Deployment Complete ===");
        console2.log("WFLR:", wrappedNative);
        console2.log("PoolManager:", address(poolManager));
        console2.log("PositionManager:", address(positionManager));
        console2.log("Permit2:", permit2);

        vm.stopBroadcast();
    }
}

