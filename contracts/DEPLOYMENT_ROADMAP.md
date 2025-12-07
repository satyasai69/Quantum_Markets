# Quantum Markets Deployment Roadmap

This document provides a step-by-step guide for deploying Quantum Markets contracts one by one and creating your first market.

## ⚠️ Important: USDC Integration

**All Quantum Markets now use USDC for deposits and rewards.**

- USDC is deployed as a separate contract (Step 4)
- All markets automatically use this USDC token - no need to specify a token when creating markets
- USDC uses **6 decimals** (matching real USDC standard)
  - `1000000` = 1 USDC
  - `1500000000` = 1,500 USDC
- The `marketToken` parameter has been removed from `createMarket()` function

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Deployment Roadmap](#deployment-roadmap)
   - [Step 1: Deploy Uniswap V4 Core](#step-1-deploy-uniswap-v4-core)
   - [Step 2: Deploy Universal Router](#step-2-deploy-universal-router)
   - [Step 3: Deploy Resolvers](#step-3-deploy-resolvers)
   - [Step 4: Deploy USDC Token](#step-4-deploy-usdc-token)
   - [Step 5: Deploy Market Contract](#step-5-deploy-market-contract)
4. [Creating Your First Market](#creating-your-first-market)
5. [Post-Deployment Checklist](#post-deployment-checklist)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting deployment, ensure you have:

- ✅ **Foundry** installed ([installation guide](https://book.getfoundry.sh/getting-started/installation))
- ✅ **Flare network access** (mainnet or testnet)
- ✅ **Foundry account** set up with FLR tokens for gas fees
- ✅ **Flare infrastructure addresses**:
  - FTSO Registry address
  - FDC (Flare Data Connector) address
  - Universal Router address (if deploying separately)

### Setting Up Foundry Account

Create a new Foundry account for deployment:

```bash
# Create a new account
forge account new myaccount

# Or import an existing private key
forge account import myaccount

# List all accounts
forge account list
```

The account will be stored securely in Foundry's keystore.

### Required FLR Balance

For testnet deployment, you'll need approximately:

- **~0.5-1 FLR** for all contract deployments
- Additional FLR for market creation and transactions

---

## Environment Setup

### 1. Create Environment File

```bash
cd contracts
cp env.flare.example .env.flare
```

### 2. Configure Environment Variables

Edit `.env.flare` with your configuration:

```bash
# Flare Network Configuration
FLARE_RPC_URL=https://flare-api.flare.network/ext/bc/C/rpc  # Mainnet
# FLARE_RPC_URL=https://coston-api.flare.network/ext/bc/C/rpc  # Testnet

# Flare Infrastructure (get from Flare documentation)
FTSO_REGISTRY_ADDRESS=0x...  # FTSO Registry contract address
FDC_ADDRESS=0x...            # Flare Data Connector address

# Deployment Configuration
OWNER_ADDRESS=0x...          # Owner address (for contract ownership)
ACCOUNT_HOLDER_ADDRESS=0x... # Account holder for BasicMarketResolver

# USDC Token (deployed in Step 4)
USDC_ADDRESS=0x...           # USDC token address (all markets use this)

# Note: Use Foundry account system for deployment
# Set up with: forge account new myaccount
# Then use: --account myaccount in deployment commands

# Uniswap V4 Dependencies (if deploying separately)
UNIVERSAL_ROUTER_ADDRESS=0x...  # Universal Router address (optional)
```

### 3. Load Environment Variables

```bash
source .env.flare
```

---

## Deployment Roadmap

Contracts **must** be deployed in this specific order due to dependencies:

```
1. Uniswap V4 Core (PoolManager, Permit2)
   ↓
2. Uniswap V4 Periphery (PositionManager)
   ↓
3. Universal Router
   ↓
4. Resolvers (BasicMarketResolver, FlareHybridResolver)
   ↓
5. USDC Token (used by all markets)
   ↓
6. MarketUtilsSwapHook
   ↓
7. Market Contract
```

---

### Step 1: Deploy Uniswap V4 Core

Uniswap V4 provides the AMM infrastructure for proposal trading pools.

#### 1.1 Deploy Uniswap V4 Contracts

```bash
forge script script/DeployUniswapV4.s.sol:DeployUniswapV4 \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount \
  --broadcast \
  --verify \
  -vvvv
```

**What this deploys:**

- `Permit2` - Token approval management
- `PoolManager` - Uniswap V4 core pool manager (singleton)
- `PositionManager` - Position management for liquidity

#### 1.2 Save Deployed Addresses

After deployment, save the addresses:

```bash
# Example output:
# Permit2 deployed at: 0x1234...
# PoolManager deployed at: 0x5678...
# PositionManager deployed at: 0x9abc...
```

**Update your `.env.flare`:**

```bash
POOL_MANAGER_ADDRESS=0x5678...
POSITION_MANAGER_ADDRESS=0x9abc...
PERMIT2_ADDRESS=0x1234...
```

#### 1.3 Verify Deployment

Check contracts on Flare explorer:

- [Flare Mainnet Explorer](https://flare-explorer.flare.network)
- [Coston Testnet Explorer](https://coston-explorer.flare.network)

---

### Step 2: Deploy Universal Router

The Universal Router is required for executing swaps in the Market contract.

#### 2.1 Deploy Universal Router

```bash
forge script script/DeployUniversalRouter.s.sol:DeployUniversalRouter \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount \
  --broadcast \
  --verify \
  -vvvv
```

**What this deploys:**

- `UniversalRouter` - Unified router for executing swaps across Uniswap V4

**Prerequisites:**

Make sure you have these addresses in `.env.flare` from Step 1:

- `POOL_MANAGER_ADDRESS`
- `POSITION_MANAGER_ADDRESS`
- `PERMIT2_ADDRESS`

#### 2.2 Save Deployed Address

After deployment, save the address:

```bash
# Example output:
# Universal Router deployed at: 0xabcd...
```

**Update your `.env.flare`:**

```bash
UNIVERSAL_ROUTER_ADDRESS=0xabcd...
```

---

### Step 3: Deploy Resolvers

Resolvers verify market outcomes. Deploy both types for flexibility.

#### 2.1 Deploy Resolvers

```bash
forge script script/DeployFlareResolver.s.sol:DeployFlareResolver \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount \
  --broadcast \
  --verify \
  -vvvv
```

**What this deploys:**

- `BasicMarketResolver` - Manual resolution with signature verification
- `FlareHybridResolver` - Automatic resolution using FTSO/FDC

#### 2.2 Save Deployed Addresses

```bash
# Example output:
# BasicMarketResolver deployed at: 0xdef0...
# FlareHybridResolver deployed at: 0x1111...
```

**Update your `.env.flare`:**

```bash
BASIC_RESOLVER_ADDRESS=0xdef0...
FLARE_RESOLVER_ADDRESS=0x1111...
```

#### 2.3 Configure FlareHybridResolver (Required for Auto-Configuration)

**IMPORTANT:** Grant `CONFIGURER_ROLE` to the Market contract address to enable automatic resolution configuration when proposals are created.

**After deploying the Market contract (Step 5), run:**

```bash
# Grant CONFIGURER_ROLE to Market address for automatic resolution configuration
cast send $FLARE_RESOLVER_ADDRESS \
  "grantConfigurerRole(address)" \
  $MARKET_CONTRACT_ADDRESS \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount
```

**What this enables:**

- When `createProposalWithResolution()` is called with resolution config data, the Market contract will automatically call `setResolutionConfig()` on the FlareHybridResolver
- This eliminates the need for manual resolution configuration after each proposal is created

**Architecture Options:**

1. **One Resolver Per Market** (Recommended for isolation):

   - Deploy a new FlareHybridResolver for each market
   - Grant CONFIGURER_ROLE to each Market contract on its corresponding resolver
   - Each resolver only handles proposals from one market

2. **Shared Resolver Across Markets** (More gas efficient):
   - Deploy one FlareHybridResolver and use it for multiple markets
   - Grant CONFIGURER_ROLE to all Market contracts on the shared resolver
   - Each proposalId is unique per Market contract, so no conflicts occur
   - The resolver can handle unlimited proposals and markets simultaneously

**Note:** FlareHybridResolver supports multiple proposals and markets. Each proposalId maps to its own independent ResolutionConfig, allowing the same resolver instance to handle proposals from different markets without conflicts.

---

### Step 4: Deploy USDC Token

**IMPORTANT:** All Quantum Markets use USDC for deposits. You must deploy USDC before deploying the Market contract.

#### 4.1 Deploy USDC Token

```bash
forge script script/DeployUSDC.s.sol:DeployUSDC \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount \
  --broadcast \
  --verify \
  -vvvv
```

**What this deploys:**

- `USDC` - ERC20 token with 6 decimals (matching real USDC standard)
- All markets will use this USDC token for deposits and rewards

#### 4.2 Save Deployed Address

```bash
# Example output:
# USDC deployed at: 0xusdc...
```

**Update your `.env.flare`:**

```bash
USDC_ADDRESS=0xusdc...
```

#### 4.3 Mint USDC (Optional for Testing)

For testing purposes, you can mint USDC tokens:

```bash
# Mint USDC to your address (owner only)
cast send $USDC_ADDRESS \
  "mint(address,uint256)" \
  $YOUR_ADDRESS \
  1000000000000 \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount
```

**Note:** USDC uses 6 decimals, so `1000000000000` = 1,000,000 USDC

---

### Step 5: Deploy Market Contract

The Market contract is the core of Quantum Markets. **All markets use USDC automatically.**

#### 5.1 Verify Prerequisites

Ensure all previous addresses are in `.env.flare`:

```bash
# Required addresses:
POOL_MANAGER_ADDRESS=0x...
POSITION_MANAGER_ADDRESS=0x...
PERMIT2_ADDRESS=0x...
UNIVERSAL_ROUTER_ADDRESS=0x...  # Deployed in Step 2
USDC_ADDRESS=0x...              # Deployed in Step 4
```

#### 5.2 Deploy Market Contract

```bash
forge script script/DeployQuantumMarkets.s.sol:DeployQuantumMarkets \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount \
  --broadcast \
  --verify \
  -vvvv
```

**What this deploys:**

- `MarketUtilsSwapHook` - Uniswap V4 hook for price tracking
- `Market` - Main Quantum Markets contract (uses USDC from Step 4)

**Note:** The Market contract constructor now requires the USDC address. All markets created will automatically use this USDC token.

#### 5.3 Save Deployed Addresses

```bash
# Example output:
# MarketUtilsSwapHook deployed at: 0x2222...
# Market deployed at: 0x3333...
```

**Update your `.env.flare`:**

```bash
MARKET_CONTRACT_ADDRESS=0x3333...
MARKET_UTILS_SWAP_HOOK_ADDRESS=0x2222...
```

#### 5.4 Grant CONFIGURER_ROLE to Market Contract

**IMPORTANT:** After deploying the Market contract, grant `CONFIGURER_ROLE` on the FlareHybridResolver to the Market contract address:

```bash
cast send $FLARE_RESOLVER_ADDRESS \
  "grantConfigurerRole(address)" \
  $MARKET_CONTRACT_ADDRESS \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount
```

This enables the Market contract to automatically configure resolution settings when proposals are created using `createProposalWithResolution()`.

**Update your `.env.flare`:**

```bash
MARKET_ADDRESS=0x3333...
HOOK_ADDRESS=0x2222...
```

#### 5.5 Update Frontend Configuration

Update `frontend/src/config/contracts.ts`:

```typescript
export const CONTRACTS = {
  MARKET: "0x3333...", // Your Market address
  USDC: "0xusdc...", // USDC token address
  BASIC_RESOLVER: "0xdef0...",
  FLARE_RESOLVER: "0x1111...",
  // ... other addresses
};
```

**Note:** The frontend should use USDC for all market deposits. USDC uses 6 decimals.

---

## Creating Your First Market

After all contracts are deployed, you can create your first market.

### Option A: Using Foundry Script

Create a script `script/CreateMarket.s.sol`:

```solidity
// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "forge-std/console2.sol";
import "../src/Market.sol";
import "../src/FlareHybridResolver.sol";

contract CreateMarket is Script {
    function run() public {
        vm.startBroadcast();

        // Get addresses
        address marketAddress = vm.envAddress("MARKET_ADDRESS");
        address resolverAddress = vm.envAddress("FLARE_RESOLVER_ADDRESS");

        Market market = Market(marketAddress);

        // Market parameters
        address creator = msg.sender;
        uint256 minDeposit = 1500e6; // 1500 USDC (6 decimals)
        uint256 deadline = block.timestamp + 7 days; // 7 days from now
        string memory title = "Which token reaches $50M market cap first?";

        // Create market (all markets automatically use USDC)
        uint256 marketId = market.createMarket(
            creator,
            resolverAddress,
            minDeposit,
            deadline,
            title
        );

        console2.log("Market created!");
        console2.log("Market ID:", marketId);
        console2.log("Market Address:", marketAddress);
        console2.log("Market Token: USDC (automatic)");

        vm.stopBroadcast();
    }
}
```

Run the script:

```bash
forge script script/CreateMarket.s.sol:CreateMarket \
  --rpc-url $FLARE_RPC_URL \
  --broadcast \
  -vvvv
```

### Option B: Using Frontend

1. Start the frontend:

```bash
cd frontend
bun install
bun run dev
```

2. Navigate to the market creation page
3. Fill in market details:

   - **Title**: Market question (e.g., "Which token reaches $50M first?")
   - **Market Token**: USDC (automatically used - no need to specify)
   - **Resolver**: Choose `FlareHybridResolver` or `BasicMarketResolver`
   - **Minimum Deposit**: Minimum USDC needed to create proposals (in 6 decimals, e.g., 1500000000 = 1500 USDC)
   - **Deadline**: When the market settles (timestamp)

4. Click "Create Market"
5. Confirm the transaction in your wallet

### Option C: Using cast (Command Line)

```bash
# Create market (all markets use USDC automatically)
# Note: createMarket signature changed - removed marketToken parameter
cast send $MARKET_ADDRESS \
  "createMarket(address,address,uint256,uint256,string)" \
  $YOUR_ADDRESS \
  $FLARE_RESOLVER_ADDRESS \
  1500000000 \
  $(($(date +%s) + 604800)) \
  "Which token reaches $50M first?" \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount
```

**Note:**

- USDC uses 6 decimals, so `1500000000` = 1,500 USDC
- The `marketToken` parameter has been removed - all markets automatically use USDC

---

## Using Your Market

After creating a market, follow these steps:

### 1. Deposit USDC

Users need to deposit USDC to participate. **All markets use USDC (6 decimals).**

```bash
# Get USDC address from Market contract
USDC_ADDRESS=$(cast call $MARKET_ADDRESS "usdc()" --rpc-url $FLARE_RPC_URL)

# Approve USDC (6 decimals: 1000000000 = 1,000 USDC)
cast send $USDC_ADDRESS \
  "approve(address,uint256)" \
  $MARKET_ADDRESS \
  1000000000 \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount

# Deposit to market (6 decimals: 1000000000 = 1,000 USDC)
cast send $MARKET_ADDRESS \
  "depositToMarket(address,uint256,uint256)" \
  $YOUR_ADDRESS \
  $MARKET_ID \
  1000000000 \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount
```

**Note:** USDC uses 6 decimals:

- `1000000` = 1 USDC
- `1000000000` = 1,000 USDC
- `1500000000` = 1,500 USDC

### 2. Create a Proposal

Anyone with sufficient deposit can create a proposal:

```bash
cast send $MARKET_ADDRESS \
  "createProposal(uint256,bytes)" \
  $MARKET_ID \
  0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a546f6b656e2d4120202000000000000000000000000000000000000000000000 \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount
```

### 3. Claim Virtual Tokens (VUSD)

Users claim VUSD for each proposal they want to trade on:

```bash
cast send $MARKET_ADDRESS \
  "claimVirtualTokenForProposal(address,uint256)" \
  $YOUR_ADDRESS \
  $PROPOSAL_ID \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount
```

### 4. Trade on Proposals

Users can now:

- Convert VUSD to YES/NO tokens
- Swap on Uniswap V4 pools
- Redeem tokens back to VUSD

### 5. Settle Market

After the deadline:

```bash
# Graduate market (selects winning proposal)
cast send $MARKET_ADDRESS \
  "graduateMarket(uint256)" \
  $MARKET_ID \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount

# Resolve market (with FlareHybridResolver, proof can be empty)
cast send $MARKET_ADDRESS \
  "resolveMarket(uint256,bool,bytes)" \
  $MARKET_ID \
  true \
  0x \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount
```

### 6. Redeem Rewards

Users redeem their winning tokens:

```bash
cast send $MARKET_ADDRESS \
  "redeemRewards(uint256,address)" \
  $MARKET_ID \
  $YOUR_ADDRESS \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount
```

---

## Post-Deployment Checklist

After deployment, verify everything works:

- [ ] All contracts verified on Flare explorer
- [ ] Contract addresses saved in `.env.flare`
- [ ] Frontend configuration updated
- [ ] Test market creation on testnet
- [ ] Test proposal creation
- [ ] Test trading functionality
- [ ] Test market settlement
- [ ] Test resolution (both resolver types)
- [ ] Test reward redemption
- [ ] Monitor contract events
- [ ] Set up monitoring/alerts

### Verification Commands

```bash
# Check Market contract owner
cast call $MARKET_ADDRESS "owner()" --rpc-url $FLARE_RPC_URL

# Check market count
cast call $MARKET_ADDRESS "id()" --rpc-url $FLARE_RPC_URL

# Check resolver configuration
cast call $FLARE_RESOLVER_ADDRESS "owner()" --rpc-url $FLARE_RPC_URL
```

---

## Alternative: Deploy All at Once

If you prefer to deploy everything in one go:

```bash
forge script script/DeployAll.s.sol:DeployAll \
  --rpc-url $FLARE_RPC_URL \
  --broadcast \
  --verify \
  -vvvv
```

This will:

1. Deploy Uniswap V4
2. Deploy Resolvers
3. Deploy Market Contract
4. Save all addresses to `deployment-addresses.json`

**Note:** You still need to configure `.env.flare` with:

- `UNIVERSAL_ROUTER_ADDRESS`
- `OWNER_ADDRESS`
- `ACCOUNT_HOLDER_ADDRESS`
- Flare infrastructure addresses

---

## Troubleshooting

### "Insufficient funds"

- Ensure deployer wallet has FLR tokens
- Check gas price: `cast gas-price --rpc-url $FLARE_RPC_URL`

### "Contract verification failed"

- Ensure source code matches deployed bytecode
- Check compiler version matches: `forge --version`
- Verify constructor arguments match

### "FTSO not available"

- Verify FTSO Registry address is correct
- Check if token has FTSO feed: [Flare FTSO Docs](https://flare.network/ftso/)
- For testnet, use testnet FTSO addresses

### "Hook initialization failed"

- Ensure Market contract is deployed after Hook
- Check Hook address passed to Market constructor
- Verify Hook has correct PoolManager address

### "Market creation failed"

- Verify USDC address is set correctly in Market constructor
- Check resolver address is correct
- Ensure deadline is in the future
- Verify minDeposit is reasonable (remember USDC uses 6 decimals: 1500000000 = 1,500 USDC)

### "Proposal creation failed"

- User must have sufficient deposit: `deposits[marketId][user] >= minDeposit`
- Market must be open (not resolved or timed out)
- Check market deadline hasn't passed

---

## Next Steps

After successful deployment:

1. **Read the User Guide**: See [USER_GUIDE.md](../USER_GUIDE.md) for detailed usage
2. **Explore Architecture**: See [ARCHITECTURE.md](../ARCHITECTURE.md) for system design
3. **Frontend Integration**: See [frontend/README.md](../frontend/README.md) for UI setup
4. **Monitor Markets**: Set up event monitoring for market activity
5. **Security Audit**: Consider professional audit before mainnet

---

## Quick Reference

### Deployment Order Summary

```
1. DeployUniswapV4.s.sol
   → Permit2
   → PoolManager
   → PositionManager

2. DeployFlareResolver.s.sol
   → BasicMarketResolver
   → FlareHybridResolver

3. DeployQuantumMarkets.s.sol
   → MarketUtilsSwapHook
   → Market
```

### Key Contract Addresses

Save these after deployment:

- `POOL_MANAGER_ADDRESS` - Uniswap V4 core
- `POSITION_MANAGER_ADDRESS` - Position management
- `PERMIT2_ADDRESS` - Token approvals
- `MARKET_ADDRESS` - Main market contract
- `HOOK_ADDRESS` - Swap hook
- `BASIC_RESOLVER_ADDRESS` - Manual resolution
- `FLARE_RESOLVER_ADDRESS` - Automatic resolution

### Common Commands

```bash
# Deploy all
forge script script/DeployAll.s.sol:DeployAll --rpc-url $FLARE_RPC_URL --broadcast --verify

# Create market
forge script script/CreateMarket.s.sol:CreateMarket --rpc-url $FLARE_RPC_URL --broadcast

# Check deployment
cast call $MARKET_ADDRESS "id()" --rpc-url $FLARE_RPC_URL
```

---

## Support

For issues or questions:

1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment info
2. Review [README.md](../README.md) for overview
3. See [QUICK_REFERENCE.md](../QUICK_REFERENCE.md) for quick tips
4. Check Flare documentation: [docs.flare.network](https://docs.flare.network/)

---

**Last Updated**: 2025-01-XX
**Version**: 1.0.0
