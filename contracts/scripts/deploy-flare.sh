#!/bin/bash

# Deploy Quantum Markets contracts to Flare
# Usage: ./scripts/deploy-flare.sh [mainnet|testnet]

set -e

NETWORK=${1:-testnet}

if [ "$NETWORK" = "mainnet" ]; then
    RPC_URL="${FLARE_RPC_URL:-https://flare-api.flare.network/ext/bc/C/rpc}"
    CHAIN_ID=14
    EXPLORER="https://flare-explorer.flare.network"
else
    RPC_URL="${FLARE_TESTNET_RPC_URL:-https://coston-api.flare.network/ext/bc/C/rpc}"
    CHAIN_ID=16
    EXPLORER="https://coston-explorer.flare.network"
fi

echo "Deploying to Flare $NETWORK..."
echo "RPC: $RPC_URL"
echo "Chain ID: $CHAIN_ID"

# Load environment variables
if [ -f .env.flare ]; then
    source .env.flare
fi

# Deploy all contracts
forge script script/DeployAll.s.sol:DeployAll \
    --rpc-url "$RPC_URL" \
    --broadcast \
    --verify \
    --chain-id $CHAIN_ID \
    -vvvv

echo "Deployment complete!"
echo "Check addresses in deployment-addresses.json"
echo "View on explorer: $EXPLORER"

