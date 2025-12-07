// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "forge-std/console2.sol";
import "../src/Market.sol";
import "../src/MarketUtilsSwapHook.sol";
import "../src/USDC.sol";
import {IPoolManager} from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";
import {Hooks} from "@uniswap/v4-core/src/libraries/Hooks.sol";
import {HookMiner} from "@uniswap/v4-periphery/src/utils/HookMiner.sol";

/**
 * @title DeployQuantumMarkets
 * @notice Full deployment script for Quantum Markets on Flare
 * @dev Deploys Market contract and Hook (USDC and Resolvers must be deployed separately)
 */
contract DeployQuantumMarkets is Script {
    function run() public returns (Market market, MarketUtilsSwapHook hook) {
        vm.startBroadcast();

        console2.log("=== Deploying Quantum Markets to Flare ===");
        console2.log("Deployer:", msg.sender);
        console2.log("Chain ID:", block.chainid);

        // Get addresses from environment or previous deployments
        address poolManager = vm.envAddress("POOL_MANAGER_ADDRESS");
        address positionManager = vm.envAddress("POSITION_MANAGER_ADDRESS");
        address permit2 = vm.envAddress("PERMIT2_ADDRESS");
        address owner = vm.envAddress("OWNER_ADDRESS");
        address usdcAddress = vm.envAddress("USDC_ADDRESS"); // USDC deployed separately
        address basicResolverAddress = vm.envAddress("BASIC_RESOLVER_ADDRESS"); // Resolvers deployed separately
        address flareResolverAddress = vm.envAddress("FLARE_RESOLVER_ADDRESS"); // Resolvers deployed separately

        console2.log("\nDependencies:");
        console2.log("PoolManager:", poolManager);
        console2.log("PositionManager:", positionManager);
        console2.log("Permit2:", permit2);
        console2.log("USDC:", usdcAddress);
        console2.log("BasicMarketResolver:", basicResolverAddress);
        console2.log("FlareHybridResolver:", flareResolverAddress);

        // Verify required addresses are set
        require(usdcAddress != address(0), "USDC_ADDRESS not set in environment");
        require(basicResolverAddress != address(0), "BASIC_RESOLVER_ADDRESS not set in environment");
        require(flareResolverAddress != address(0), "FLARE_RESOLVER_ADDRESS not set in environment");

        USDC usdc = USDC(usdcAddress);
        console2.log("USDC decimals:", usdc.decimals());

        // Step 1: Deploy MarketUtilsSwapHook with address mining
        console2.log("\n1. Mining hook address with correct flags...");

        // Hook needs BEFORE_SWAP_FLAG and AFTER_SWAP_FLAG
        uint160 flags = uint160(Hooks.BEFORE_SWAP_FLAG | Hooks.AFTER_SWAP_FLAG);

        // In scripts, use msg.sender (the broadcast account) as deployer
        // For CREATE2 deployment via proxy, use: 0x4e59b44847b379578588920cA78FbF26c0B4956C
        address deployer = msg.sender;

        bytes memory creationCode = type(MarketUtilsSwapHook).creationCode;
        bytes memory constructorArgs = abi.encode(IPoolManager(poolManager));

        // Find salt that produces address with correct flags
        console2.log("Searching for valid hook address (this may take a moment)...");
        (address hookAddress, bytes32 salt) = HookMiner.find(deployer, flags, creationCode, constructorArgs);

        console2.log("Hook address (mined):", hookAddress);
        console2.log("Salt found:", vm.toString(salt));

        // Deploy hook using CREATE2 with mined salt
        console2.log("Deploying MarketUtilsSwapHook with CREATE2...");
        hook = new MarketUtilsSwapHook{salt: salt}(IPoolManager(poolManager));
        require(address(hook) == hookAddress, "Hook address mismatch");
        console2.log("MarketUtilsSwapHook deployed at:", address(hook));
        console2.log("Hook address validation: PASSED");

        // Step 2: Deploy Market Contract
        console2.log("\n2. Deploying Market Contract...");
        market = new Market(owner, poolManager, positionManager, permit2, address(hook), usdcAddress);
        console2.log("Market deployed at:", address(market));

        // Hook is automatically initialized in Market constructor
        console2.log("\n=== Quantum Markets Deployment Complete ===");
        console2.log("Market:", address(market));
        console2.log("Hook:", address(hook));
        console2.log("\nPre-deployed Contracts (from env):");
        console2.log("  USDC:", usdcAddress);
        console2.log("  BasicMarketResolver:", basicResolverAddress);
        console2.log("  FlareHybridResolver:", flareResolverAddress);
        console2.log("\nNext Steps:");
        console2.log("1. Grant CONFIGURER_ROLE to Market address on FlareHybridResolver");
        console2.log("   FlareHybridResolver:", flareResolverAddress);
        console2.log("   Market:", address(market));
        console2.log("   Command: cast send <FLARE_RESOLVER> grantRole <ROLE_HASH> <MARKET_ADDRESS>");
        console2.log("\nNote: USDC and Resolvers must be deployed separately using:");
        console2.log("  - DeployUSDC.s.sol");
        console2.log("  - DeployFlareResolver.s.sol");

        vm.stopBroadcast();
    }
}

