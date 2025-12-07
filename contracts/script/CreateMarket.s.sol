// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "forge-std/console2.sol";
import "../src/Market.sol";
import "../src/FlareHybridResolver.sol";
import "../src/BasicMarketResolver.sol";

/**
 * @title CreateMarket
 * @notice Script to create a new Quantum Market after deployment
 * @dev Use this script to create markets with either resolver type
 */
contract CreateMarket is Script {
    function run() public {
        vm.startBroadcast();

        // Get addresses from environment
        address marketAddress = vm.envAddress("MARKET_ADDRESS");
        address resolverAddress = vm.envAddress("FLARE_RESOLVER_ADDRESS"); // or BASIC_RESOLVER_ADDRESS
        
        Market market = Market(marketAddress);
        
        // Market parameters - customize these
        address creator = msg.sender;
        uint256 minDeposit = 1500e6; // Minimum deposit to create proposals (in USDC, 6 decimals: 1500 USDC)
        uint256 deadline = block.timestamp + 7 days; // Market deadline (7 days from now)
        string memory title = "Which token reaches $50M market cap first?";
        
        console2.log("=== Creating Quantum Market ===");
        console2.log("Market Contract:", marketAddress);
        console2.log("Resolver:", resolverAddress);
        console2.log("Market Token: USDC (fixed for all markets)");
        console2.log("Creator:", creator);
        console2.log("Min Deposit:", minDeposit, "(USDC, 6 decimals)");
        console2.log("Deadline:", deadline);
        console2.log("Title:", title);
        
        // Create market (all markets use USDC automatically)
        uint256 marketId = market.createMarket(
            creator,
            resolverAddress,
            minDeposit,
            deadline,
            title
        );
        
        console2.log("\n=== Market Created Successfully ===");
        console2.log("Market ID:", marketId);
        console2.log("Market Address:", marketAddress);
        console2.log("\nNext Steps:");
        console2.log("1. Deposit tokens: market.depositToMarket(user, marketId, amount)");
        console2.log("2. Create proposals: market.createProposal(marketId, data)");
        console2.log("3. Claim VUSD: market.claimVirtualTokenForProposal(user, proposalId)");
        console2.log("4. Trade on proposals");
        console2.log("5. After deadline: market.graduateMarket(marketId)");
        console2.log("6. Resolve: market.resolveMarket(marketId, yesOrNo, proof)");
        console2.log("7. Redeem: market.redeemRewards(marketId, user)");

        vm.stopBroadcast();
    }
}

