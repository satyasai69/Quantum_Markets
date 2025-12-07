#!/bin/bash

# Export contract ABIs for frontend use
# Run this after compiling contracts: forge build

echo "Exporting contract ABIs..."

# Create abis directory in frontend if it doesn't exist
mkdir -p ../frontend/src/abis

# Copy ABIs from out directory
cp out/Market.sol/Market.json ../frontend/src/abis/Market.json
cp out/FlareHybridResolver.sol/FlareHybridResolver.json ../frontend/src/abis/FlareHybridResolver.json
cp out/BasicMarketResolver.sol/BasicMarketResolver.json ../frontend/src/abis/BasicMarketResolver.json

echo "ABIs exported to frontend/src/abis/"

