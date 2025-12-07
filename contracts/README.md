# Quantum Markets - Smart Contracts

This directory contains the Solidity smart contracts for the Quantum Markets protocol.

## Documentation

- **[Token Flow and Pricing](./TOKEN_FLOW_AND_PRICING.md)**: Complete documentation of USDC, VUSD, YES, and NO token flows, conversions, and pricing mechanisms
- **[Deployment Roadmap](./DEPLOYMENT_ROADMAP.md)**: Step-by-step deployment guide
- **[Lifecycle Documentation](../LIFECYCLE.md)**: Complete market and proposal lifecycle

## Project Structure

```
contracts/
├── src/
│   ├── Market.sol                    # Main market contract
│   ├── MarketUtilsSwapHook.sol       # Uniswap V4 hook for price tracking
│   ├── BasicMarketResolver.sol       # Basic market resolution logic
│   ├── Tokens.sol                    # VUSD and DecisionToken implementations
│   ├── Id.sol                        # ID generator utility
│   ├── common/
│   │   └── MarketData.sol            # Data structures and enums
│   └── interfaces/
│       ├── IMarket.sol               # Market interface
│       └── IMarketResolver.sol       # Resolver interface
├── test/
│   ├── integration/
│   │   └── E2E.sol                   # End-to-end integration tests
│   ├── mocks/
│   │   └── MockMarketResolver.sol    # Mock resolver for testing
│   └── forks/
│       ├── DeployPermit2.sol         # Permit2 deployment helper
│       └── Permit2Bytecode.sol       # Permit2 bytecode
└── lib/                              # External dependencies
    ├── forge-std/                    # Foundry standard library
    ├── openzeppelin-contracts/       # OpenZeppelin contracts
    ├── uniswap-v4-core/              # Uniswap V4 core
    ├── uniswap-v4-periphery/         # Uniswap V4 periphery
    ├── permit2/                       # Permit2
    └── universal-router/             # Universal Router
```

## Development

### Prerequisites

- [Foundry](https://book.getfoundry.sh/) >= 0.2.0
- Solidity ^0.8.26

### Build

```bash
forge build
```

### Test

```bash
# Run all tests
forge test

# Run with verbosity
forge test -vvv

# Run specific test
forge test --match-test testE2E_DoesNotRevert

# Run with gas reporting
forge test --gas-report
```

### Format

```bash
forge fmt
```

### Gas Snapshots

```bash
forge snapshot
```

### Coverage

```bash
forge coverage
```

## Contract Details

### Market.sol

The core contract managing markets, proposals, and settlements.

**Key State Variables:**

- `markets`: Mapping of marketId to MarketConfig
- `proposals`: Mapping of proposalId to ProposalConfig
- `deposits`: Tracks user deposits per market
- `marketMax`: Tracks highest-priced proposal per market

**Key Functions:**

- `createMarket()`: Creates a new decision market
- `depositToMarket()`: Accepts user deposits
- `createProposal()`: Creates a proposal with YES/NO markets
- `claimVirtualTokenForProposal()`: Mints VUSD for trading
- `graduateMarket()`: Selects winning proposal
- `redeemRewards()`: Redeems winning tokens

### MarketUtilsSwapHook.sol

Uniswap V4 hook implementing price tracking and validation.

**Key Features:**

- Validates swaps (ensures market is open)
- Tracks cumulative tick for TWAP calculation
- Updates market state after swaps
- Calculates 30-second TWAP for price updates

**Hook Permissions:**

- `beforeSwap`: true (validates swaps)
- `afterSwap`: true (updates prices)

### Tokens.sol

Token implementations:

- `VUSD`: Virtual USDC (ERC20 with minting/burning)
- `DecisionToken`: YES/NO tokens (ERC20 with minting/burning)

### BasicMarketResolver.sol

Basic resolver using cryptographic signatures. Can be extended for:

- Oracle-based resolution
- Governance-based resolution
- Time-based resolution
- Custom verification logic

## Testing

### Running Tests

```bash
# All tests
forge test

# Specific test file
forge test --match-path test/integration/E2E.sol

# With traces
forge test -vvvv
```

### Test Structure

- **Integration Tests**: Full end-to-end flows in `test/integration/`
- **Unit Tests**: Individual function tests (to be added)
- **Fuzz Tests**: Property-based tests (to be added)

### Example Test Flow

The `E2E.sol` test demonstrates:

1. Market creation
2. User deposit
3. Proposal creation
4. VUSD claiming
5. Trading
6. Market graduation
7. Resolution
8. Reward redemption

## Deployment

### Prerequisites

1. Deploy Uniswap V4 PoolManager
2. Deploy Uniswap V4 PositionManager
3. Deploy Permit2
4. Deploy UniversalRouter
5. Deploy MarketUtilsSwapHook (with proper hook flags)
6. Deploy Market contract

### Deployment Script

Create a deployment script:

```solidity
// script/Deploy.s.sol
pragma solidity ^0.8.26;

import {Script} from "forge-std/Script.sol";
import {Market} from "../src/Market.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();

        // Deploy Market
        Market market = new Market(
            msg.sender,              // admin
            positionManager,         // PositionManager address
            universalRouter,         // UniversalRouter address
            permit2,                 // Permit2 address
            swapHook                 // MarketUtilsSwapHook address
        );

        vm.stopBroadcast();
    }
}
```

### Deploy Command

```bash
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $RPC_URL \
  --account myaccount \
  --broadcast \
  --verify
```

## Configuration

### foundry.toml

Key settings:

- Solidity version: ^0.8.26
- Optimizer: enabled
- Remappings for dependencies

### Remappings

See `remappings.txt` for import path mappings.

## Security

⚠️ **WARNING**: This is a reference implementation. Do not deploy to mainnet without:

- Comprehensive security audit
- Economic analysis
- Stress testing
- Bug bounty program

### Known Considerations

1. **Access Control**: Market contract uses Ownable for admin functions
2. **Reentrancy**: Uses checks-effects-interactions pattern
3. **Overflow**: Uses Solidity 0.8+ built-in overflow protection
4. **Price Manipulation**: TWAP helps but not perfect protection

## Gas Optimization

- Uses Uniswap V4 hooks for efficient price tracking
- Minimal storage writes
- Batch operations where possible

## Dependencies

- **forge-std**: Foundry standard library
- **openzeppelin-contracts**: Access control and token standards
- **uniswap-v4-core**: Uniswap V4 core contracts
- **uniswap-v4-periphery**: Uniswap V4 periphery contracts
- **permit2**: Token approval system
- **universal-router**: Swap execution

## License

All Rights Reserved
