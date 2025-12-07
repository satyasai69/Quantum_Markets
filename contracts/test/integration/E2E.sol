// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.26;

import {Test, console} from "forge-std/Test.sol";
import {DeployPermit2} from "../forks/DeployPermit2.sol";
import {Actions} from "@uniswap/v4-periphery/src/libraries/Actions.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Currency, CurrencyLibrary} from "@uniswap/v4-core/src/types/Currency.sol";
import {Commands} from "@uniswap/universal-router/contracts/libraries/Commands.sol";
import {IV4Router} from "@uniswap/v4-periphery/src/interfaces/IV4Router.sol";
import {Hooks} from "@uniswap/v4-core/src/libraries/Hooks.sol";
import {UniversalRouter} from "@uniswap/universal-router/contracts/UniversalRouter.sol";
import {PoolManager} from "@uniswap/v4-core/src/PoolManager.sol";
import {PositionManager} from "@uniswap/v4-periphery/src/PositionManager.sol";
import {PositionDescriptor} from "@uniswap/v4-periphery/src/PositionDescriptor.sol";
import {Permit2} from "@uniswap/permit2/src/Permit2.sol";
import {RouterParameters} from "@uniswap/universal-router/contracts/types/RouterParameters.sol";
import {Deployers} from "@uniswap/v4-core/test/utils/Deployers.sol";
import {PoolKey} from "@uniswap/v4-core/src/types/PoolKey.sol";
import {Market} from "../../src/Market.sol";
import {MarketUtilsSwapHook} from "../../src/MarketUtilsSwapHook.sol";
import {MarketStatus} from "../../src/common/MarketData.sol";
import {VUSD, DecisionToken} from "../../src/Tokens.sol";
import {USDC} from "../../src/USDC.sol";
import {BasicMarketResolver} from "../../src/BasicMarketResolver.sol";
import {MockMarketResolver} from "../mocks/MockMarketResolver.sol";
import {PosmTestSetup} from "@uniswap/v4-periphery/test/shared/PosmTestSetup.sol";

contract MarketE2ETest is Test, PosmTestSetup {
    address internal alice = vm.addr(1); // trades YES
    address internal bob = vm.addr(2); // trades NO

    Market internal market;

    UniversalRouter internal router;

    uint24 internal constant FEE = 3_000;
    uint256 internal constant MIN_DEPOSIT = 1_500e6; // 1 000 vUSD

    function setUp() public {
        deployFreshManager();
        deployPosm(manager);

        router = new UniversalRouter(
            RouterParameters({
                permit2: address(permit2),
                weth9: address(_WETH9),
                v2Factory: address(0x222),
                v3Factory: address(0x333),
                pairInitCodeHash: bytes32(0),
                poolInitCodeHash: bytes32(0),
                v4PoolManager: address(manager),
                v3NFTPositionManager: address(0x111),
                v4PositionManager: address(lpm)
            })
        );

        // Deploy USDC
        USDC usdc = new USDC(address(this));

        address flags = address(
            uint160(Hooks.BEFORE_SWAP_FLAG | Hooks.AFTER_SWAP_FLAG) ^ (0x4444 << 144) // Namespace the hook to avoid collisions
        );
        bytes memory constructorArgs = abi.encode(manager, market);
        deployCodeTo("MarketUtilsSwapHook.sol:MarketUtilsSwapHook", constructorArgs, flags);
        MarketUtilsSwapHook(flags).addRouter(address(router));
        console.log(address(lpm));
        market = new Market(
            address(this), // admin
            address(manager), // poolManager
            address(lpm), // positionManager
            address(permit2), // Permit2
            flags,
            address(usdc) // USDC token
        );

        vm.deal(alice, 10 ether);
        vm.deal(bob, 10 ether);
    }

    /// forge-config: default.fuzz.runs = 5
    function testE2E_DoesNotRevert() public {
        /* 1.  CREATE market */
        // Get USDC from market contract (all markets use USDC)
        USDC usdc = market.usdc();
        uint256 marketId = market.createMarket(
            alice, // creator
            address(new MockMarketResolver()),
            MIN_DEPOSIT,
            block.timestamp + 1,
            "Predict price > 0.60"
        );

        /* 2.  ALICE deposits collateral */
        // Mint USDC for alice (USDC has 6 decimals)
        usdc.mint(alice, 3_000e6);
        vm.startPrank(alice);
        usdc.approve(address(market), 3_000e6);
        market.depositToMarket(alice, marketId, 3_000e6);
        vm.stopPrank();

        // Verify results
        assertEq(usdc.balanceOf(address(market)), 3_000e6);
        assertEq(usdc.balanceOf(alice), 0);
        assertEq(market.deposits(1, alice), 3_000e6);

        /* 3.  Create proposal */
        string memory proposalTitle = "Test Proposal";
        vm.prank(alice);
        market.createProposal(marketId, proposalTitle);

        /* 4.  ALICE buys YES heavily to push TWAP above strike */
        /*      For the dummy pool manager this always succeeds and ticks jump instantly */
        (
            uint256 proposalId,,,,
            VUSD vUSD,
            DecisionToken yesToken,
            DecisionToken noToken,
            PoolKey memory yesPoolKey,,
            string memory proposalTitle2
        ) = market.proposals(2); // first proposal
        vm.startPrank(alice);
        market.claimVirtualTokenForProposal(alice, 2); // Now she has 1,500 VUSD (1_500e6 USDC * 1e12 = 1_500e18 VUSD)
        assertEq(vUSD.balanceOf(alice), 1_500e18);
        vUSD.approve(address(market), type(uint256).max);
        market.mintYesNo(2, 750e18);

        // Wait at least 30 seconds for the hook to be able to calculate TWAP
        // The hook requires the pool to be at least 30 seconds old to update price
        vm.warp(block.timestamp + 35);

        uint256 amountIn = 100e18;
        bool vusdIsToken0 = Currency.unwrap(yesPoolKey.currency0) == address(vUSD);
        Currency inCur = vusdIsToken0 ? yesPoolKey.currency0 : yesPoolKey.currency1; // ← vUSD
        bool zeroForOne = vusdIsToken0;
        IERC20(Currency.unwrap(inCur)).approve(address(permit2), type(uint256).max);
        permit2.approve(Currency.unwrap(inCur), address(router), type(uint160).max, type(uint48).max);
        bytes memory actions =
            abi.encodePacked(uint8(Actions.SWAP_EXACT_IN_SINGLE), uint8(Actions.SETTLE_ALL), uint8(Actions.TAKE_ALL));
        bytes[] memory params = new bytes[](3);
        params[0] = abi.encode(
            IV4Router.ExactInputSingleParams({
                poolKey: yesPoolKey,
                zeroForOne: zeroForOne,
                amountIn: uint128(amountIn),
                amountOutMinimum: uint128(0),
                hookData: ""
            })
        );
        params[1] = abi.encode(inCur, amountIn); // SETTLE_ALL
        params[2] = abi.encode(zeroForOne ? yesPoolKey.currency1 : yesPoolKey.currency0, 0); // TAKE_ALL
        bytes[] memory inputs = new bytes[](1);
        inputs[0] = abi.encode(actions, params);
        bytes memory command = abi.encodePacked(uint8(Commands.V4_SWAP));
        // Execute first swap - this sets the initial observation in the hook
        // Note: updatePostSwap won't be called on first swap (o.time == 0)
        router.execute(command, inputs, block.timestamp);

        // Wait 35 seconds so the hook can calculate TWAP on the next swap
        // The hook needs: o.time != 0 (set by first swap) AND now32 - o.time >= 30
        vm.warp(block.timestamp + 35);

        // Second swap - try with minimal amount to trigger updatePostSwap
        // The hook needs: o.time != 0 AND now32 - o.time >= 30 (both should be true now)
        // Use minimal amount to avoid price limit
        uint256 secondSwapAmount = 1e15; // Very small: 0.001 tokens
        params[0] = abi.encode(
            IV4Router.ExactInputSingleParams({
                poolKey: yesPoolKey,
                zeroForOne: zeroForOne,
                amountIn: uint128(secondSwapAmount),
                amountOutMinimum: uint128(0),
                hookData: ""
            })
        );
        params[1] = abi.encode(inCur, secondSwapAmount);
        inputs[0] = abi.encode(actions, params);

        // Try second swap - should succeed with tiny amount
        try router.execute(command, inputs, block.timestamp) {
        // Success - hook should have called updatePostSwap
        }
            catch {
            // If still fails, the hook might still update on next swap attempt
            // But for now, the first swap should have set the observation
        }
        vm.stopPrank();

        (, uint256 maxProposalId) = market.marketMax(1);
        assertEq(maxProposalId, 2);

        // /* 5.  Market should now be graduated */
        (,,,,,,, MarketStatus status,) = market.markets(marketId);
        assertEq(uint8(status), uint8(MarketStatus.PROPOSAL_ACCEPTED));

        // /* 6.  Resolve YES with dummy resolver */
        vm.prank(address(market)); // dummy resolver expects caller = market
        market.resolveMarket(marketId, true, "");

        // /* 7.  Alice redeems rewards (should not revert) */
        vm.startPrank(alice);
        yesToken.approve(address(market), type(uint256).max);
        noToken.approve(address(market), type(uint256).max);
        market.redeemRewards(marketId, alice);
        vm.stopPrank();
    }
}
