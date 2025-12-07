# Quantum Markets Deployment Guide - Flare Network

This guide covers deploying Quantum Markets contracts to Flare blockchain.

> **📋 For a detailed step-by-step deployment roadmap with market creation instructions, see [DEPLOYMENT_ROADMAP.md](./DEPLOYMENT_ROADMAP.md)**

## Prerequisites

1. **Foundry** installed
2. **Flare network access** (mainnet or testnet)
3. **Foundry account** set up with FLR for gas
4. **Flare infrastructure addresses** (FTSO Registry, FDC)

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

## Environment Setup

1. Copy the example environment file:
```bash
cp env.flare.example .env.flare
```

2. Fill in `.env.flare` with:
   - Flare RPC URL
   - FTSO Registry address
   - FDC address
   - Owner and account holder addresses

**Note:** Use Foundry's account system for deployment (see setup above)

## Deployment Order

Contracts must be deployed in this order:

1. **Uniswap V4 Core** (PoolManager)
2. **Uniswap V4 Periphery** (PositionManager, etc.)
3. **MarketUtilsSwapHook**
4. **Resolvers** (BasicMarketResolver, FlareHybridResolver)
5. **Market Contract**

## Step-by-Step Deployment

### Option 1: Deploy Everything (Recommended)

```bash
# Set environment variables
source .env.flare

# Deploy all contracts
forge script script/DeployAll.s.sol:DeployAll \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount \
  --broadcast \
  --verify \
  -vvvv
```

This will:
- Deploy Uniswap V4 contracts
- Deploy both resolvers
- Deploy Market contract
- Save addresses to `deployment-addresses.json`

### Option 2: Deploy Step by Step

#### Step 1: Deploy Uniswap V4

```bash
forge script script/DeployUniswapV4.s.sol:DeployUniswapV4 \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount \
  --broadcast \
  --verify
```

Save the addresses:
- PoolManager
- PositionManager
- Permit2

#### Step 2: Deploy Resolvers

```bash
forge script script/DeployFlareResolver.s.sol:DeployFlareResolver \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount \
  --broadcast \
  --verify
```

Save the addresses:
- BasicMarketResolver
- FlareHybridResolver

#### Step 3: Deploy Market Contract

Update `.env.flare` with addresses from previous steps, then:

```bash
forge script script/DeployQuantumMarkets.s.sol:DeployQuantumMarkets \
  --rpc-url $FLARE_RPC_URL \
  --account myaccount \
  --broadcast \
  --verify
```

## Verification

After deployment, verify contracts on Flare explorer:

```bash
forge verify-contract <CONTRACT_ADDRESS> <CONTRACT_NAME> \
  --chain-id 14 \
  --etherscan-api-key <FLARE_EXPLORER_API_KEY>
```

## Flare Network Addresses

### Mainnet
- Chain ID: 14
- RPC: https://flare-api.flare.network/ext/bc/C/rpc
- Explorer: https://flare-explorer.flare.network

### Testnet (Coston)
- Chain ID: 16
- RPC: https://coston-api.flare.network/ext/bc/C/rpc
- Explorer: https://coston-explorer.flare.network

## Flare Infrastructure

Update these addresses in `.env.flare`:

- **FTSO Registry**: Get from Flare documentation
- **FDC**: Get from Flare documentation

## Post-Deployment

1. **Update frontend** `.env.local` with contract addresses
2. **Grant roles** on FlareHybridResolver:
   ```solidity
   resolver.grantConfigurerRole(configurerAddress);
   ```
3. **Test resolution** with a test proposal
4. **Monitor** contract events

## Troubleshooting

### "Insufficient funds"
- Ensure deployer has FLR for gas

### "FTSO not available"
- Verify FTSO Registry address
- Check if token has FTSO feed

### "Contract verification failed"
- Ensure source code matches
- Check compiler settings match deployment

## Security Notes

- Use Foundry's account system (never store private keys in files)
- Use testnet first
- Audit contracts before mainnet
- Use multi-sig for owner addresses

