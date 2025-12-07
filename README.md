# 🚀 Quantum Markets - Build Capital-Efficient Decision Markets on Flare!

Welcome to **Quantum Markets**! This is a complete, production-ready implementation of capital-efficient decision markets built on Solidity and deployed on the Flare blockchain.

Think of this as your one-stop shop for building prediction markets where users can deposit once and trade on unlimited proposals - no more spreading your capital thin across hundreds of markets! 🎯

## 📚 What You'll Learn

By the end of this README, you'll understand:

- ✅ How Quantum Markets solve the capital efficiency problem in decision markets
- ✅ The complete architecture and technology stack we're using
- ✅ How to deploy and interact with markets on Flare blockchain
- ✅ How Uniswap V4 hooks enable price tracking and validation
- ✅ How to use Flare's FTSO and FDC for automatic market resolution
- ✅ The complete lifecycle of a market from creation to settlement

## 🎯 The Problem We're Solving

Let me paint you a picture. Imagine you want to create a market asking: **"Which EIP should Ethereum implement next?"**

In traditional prediction markets, you'd need to:

- Create a separate market for EACH of the 700+ EIPs
- Provide liquidity for EACH market
- Spread your capital across all 700+ markets
- End up with tiny positions in each market

**That's a lot of capital tied up, right?** 😅

## ✨ The Quantum Markets Solution

Quantum Markets solve this with a brilliant concept: **virtual tokens**! Here's how it works:

1. **Deposit Once** - Users deposit real tokens (like USDC) into a market
2. **Claim Virtual Tokens** - For every proposal, users can claim VUSD (Virtual USDC) equal to their deposit
3. **Trade on Everything** - Users can now trade on ALL proposals without additional capital
4. **Only Lose What You Trade** - If you don't trade on a losing proposal, you don't lose money on it!

It's like having your capital in a "quantum superposition" - it exists across all proposals simultaneously, and only "collapses" to reality when the market settles. Pretty cool, right? 🧪

## 🛠️ Technology Stack - What We're Building With

Let me break down exactly what technologies we're using and why they're awesome:

### Smart Contracts Layer

**Solidity 0.8.26** - We're using the latest and greatest Solidity version with:

- Built-in overflow protection (no more SafeMath needed!)
- Latest EVM features from the Cancun upgrade
- Modern syntax and best practices

**Foundry** - Our development framework of choice because:

- Lightning-fast compilation
- Amazing testing framework with fuzzing
- Built-in gas reporting
- Easy deployment scripts

**EVM Version: Cancun** - We're targeting the latest EVM with EIP-4844 support for future-proofing.

### DeFi Infrastructure - The Heavy Lifters

**Uniswap V4 Core** - The next-generation AMM protocol:

- **PoolManager**: The heart of our AMM - handles all swap logic
- **Hooks System**: This is the magic! We can inject custom logic before/after swaps
- **Types & Libraries**: All the data structures we need (PoolKey, PoolId, etc.)

**Uniswap V4 Periphery** - Makes our life easier:

- **BaseHook**: Base class we extend for our swap hook
- **PositionManager**: Handles liquidity positions
- **StateLibrary**: Easy ways to query pool state

**Universal Router** - One interface to rule them all:

- Unified way to execute swaps
- Supports batch operations
- Works seamlessly with Permit2

**Permit2** - Gas optimization hero:

- Users sign once, approve forever (until revoked)
- Saves tons of gas on approvals
- Industry standard from Uniswap

### Security & Standards - Keeping Things Safe

**OpenZeppelin Contracts** - Battle-tested security:

- **Ownable**: Simple ownership pattern for admin functions
- **ERC20**: Standard token interface (we use this for VUSD, YES, NO tokens)
- **AccessControl**: Role-based access (for resolvers)

### Blockchain Infrastructure - Where We Deploy

**Flare Network** - Why Flare? Because it's EVM-compatible AND has native oracle infrastructure!

- **FTSO (Flare Time Series Oracle)**: Decentralized price feeds built into the chain
- **FDC (Flare Data Connector)**: Bridge to off-chain data (APIs, blockchain events)
- **Chain IDs**: 14 (Mainnet), 16 (Testnet)
- **Low fees, fast blocks**: Perfect for DeFi applications

### Architecture Patterns - How We Structure Things

We use several design patterns to keep our code clean and maintainable:

1. **Hook Pattern** - Uniswap V4 hooks let us track prices and validate swaps
2. **Factory Pattern** - Markets and proposals are created through factory functions
3. **Observer Pattern** - Our hook observes swaps and calculates TWAP
4. **Strategy Pattern** - Pluggable resolvers (Basic vs FlareHybrid) for different resolution methods

## 🏗️ Architecture Deep Dive

Let me walk you through how everything fits together:

### The Big Picture

```
┌─────────────────────────────────────────────────────────┐
│              YOU (The User)                             │
│  - Create markets                                       │
│  - Deposit funds                                        │
│  - Create proposals                                     │
│  - Trade tokens                                         │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              Market.sol (The Brain)                     │
│  - Orchestrates everything                              │
│  - Manages markets and proposals                        │
│  - Handles deposits and redemptions                    │
│  - Mints/burns tokens                                   │
└─────────────────────────────────────────────────────────┘
        │              │              │
        ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Swap Hook    │ │   Tokens     │ │   Resolvers  │
│              │ │              │ │              │
│ - Validates  │ │ - VUSD       │ │ - Basic      │
│ - Tracks     │ │ - YES        │ │ - Flare      │
│   TWAP       │ │ - NO         │ │   Hybrid    │
└──────────────┘ └──────────────┘ └──────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────┐
│         Uniswap V4 Infrastructure                      │
│  - PoolManager: Core AMM                                │
│  - PositionManager: Liquidity                           │
│  - Universal Router: Swaps                               │
│  - Permit2: Approvals                                    │
└─────────────────────────────────────────────────────────┘
```

### Core Contracts Explained

#### 1. Market.sol - The Orchestrator

This is the main contract that does everything. Think of it as the conductor of an orchestra - it coordinates all the other contracts.

**Key Features:**

- **State Management**: Uses mappings to track markets, proposals, and deposits efficiently
- **Access Control**: Uses OpenZeppelin's Ownable for admin functions
- **Gas Optimization**: Minimal storage writes, efficient struct packing
- **Security**: Checks-effects-interactions pattern to prevent reentrancy

**What it does:**

- Creates markets
- Accepts deposits
- Creates proposals (which creates tokens and pools)
- Handles settlement and redemption

#### 2. MarketUtilsSwapHook.sol - The Price Tracker

This is where the magic happens! This hook gets called before and after every swap on Uniswap V4 pools.

**How it works:**

1. **Before Swap**: Validates that the market is still open (can't trade on closed markets!)
2. **After Swap**:
   - Updates cumulative tick (for TWAP calculation)
   - Calculates 30-second TWAP
   - Updates the market's highest proposal price
   - Triggers market graduation if deadline passed

**TWAP Algorithm - The Secret Sauce:**

```solidity
// We track cumulative tick over time
tickCumulative += lastTick * timeDelta

// Then calculate average over a window
avgTick = (tickCumulativeNow - tickCumulativeAgo) / secondsAgo

// Convert tick to price
price = tickToPrice(avgTick)
```

**Why 30 seconds?** It's a sweet spot - long enough to resist manipulation, short enough to be responsive to real price changes.

#### 3. Tokens.sol - The Token Factory

We have three types of tokens:

- **VUSD (Virtual USDC)**: Synthetic token used for trading. It's "virtual" because it doesn't require additional real capital!
- **YES Token**: Represents belief a proposal will succeed
- **NO Token**: Represents belief a proposal will fail

All are standard ERC-20 tokens, but only the Market contract can mint/burn them.

#### 4. Resolvers - The Truth Tellers

Resolvers determine if a market resolved YES or NO. We have two types:

**BasicMarketResolver**: Manual resolution with cryptographic signatures. Good for:

- Governance decisions
- Subjective outcomes
- When you need human verification

**FlareHybridResolver**: Automatic resolution using Flare's native infrastructure! Supports:

- **FTSO_PRICE**: Check if token price reached a target
- **FTSO_MARKET_CAP**: Check if market cap reached a target
- **FDC_API**: Fetch data from any API
- **FDC_BLOCKCHAIN_EVENT**: Check for on-chain events

This is super powerful - you can create markets that resolve automatically based on real-world data!

### Data Structures - How We Store Things

Let me show you the key data structures we use:

```solidity
// A market configuration
struct MarketConfig {
    address creator;           // Who created it
    address marketToken;       // USDC, ETH, etc.
    address resolver;          // How we verify outcomes
    uint256 minDeposit;        // Minimum to create proposals
    uint256 deadline;          // When market settles
    MarketStatus status;        // OPEN, PROPOSAL_ACCEPTED, etc.
    uint256 winningProposalId; // Which proposal won
    string title;              // "Which token reaches $50M first?"
}

// A proposal configuration
struct ProposalConfig {
    uint256 marketId;          // Which market it belongs to
    address vUSD;              // Virtual token address
    address yesToken;          // YES token address
    address noToken;           // NO token address
    PoolKey yesPoolKey;        // Uniswap pool for YES/VUSD
    PoolKey noPoolKey;         // Uniswap pool for NO/VUSD
    bytes data;                // Arbitrary proposal data
}

// Price observation for TWAP
struct Obs {
    uint32 time;               // Last observation timestamp
    int56 tickCumulative;      // Cumulative tick (for TWAP)
    int24 lastTick;            // Last recorded tick
}
```

Notice how we pack everything efficiently? That's gas optimization in action! 💰

## 🔄 How It Works - Step by Step

Let me walk you through a complete example. Imagine we're creating a market: **"Which token will reach $50M market cap first?"**

### Step 1: Create the Market

```solidity
// Using deployed addresses on Flare Testnet
address usdc = 0xb34e3Dfd595cD28aD15D76dCA86eF7D54b772Db5;
address flareResolver = 0x23294167cDB8041d6b15FA9eb7E1bB3A962ea015;
address marketContract = 0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38;

Market market = Market(marketContract);

uint256 marketId = market.createMarket(
    msg.sender,                    // You're the creator
    usdc,                          // USDC for deposits
    flareResolver,                 // Automatic resolution
    1500e6,                        // Min deposit: 1500 USDC
    block.timestamp + 7 days,       // Deadline: 7 days from now
    "Which token reaches $50M first?"
);
```

**What happens:**

- Market contract creates a new `MarketConfig`
- Emits a `MarketCreated` event
- Returns a unique `marketId`

### Step 2: Users Deposit

```solidity
// User approves the market contract
usdcToken.approve(address(market), 3000e6);

// User deposits
market.depositToMarket(msg.sender, marketId, 3000e6);
```

**What happens:**

- USDC is transferred from user to Market contract
- Market tracks: `deposits[marketId][user] = 3000e6`
- User can now create proposals or claim VUSD!

### Step 3: Create a Proposal

Anyone can create a proposal! Let's say Alice creates a proposal for "Token-A":

```solidity
market.createProposal(marketId, "Token-A");
```

**What happens behind the scenes:**

1. Checks Alice has at least `minDeposit` (1500 USDC) available
2. Deploys a new VUSD contract for this proposal
3. Deploys YES and NO token contracts
4. Creates two Uniswap V4 pools:
   - YES/VUSD pool
   - NO/VUSD pool
5. Seeds initial liquidity:
   - ⅔ of deposit → Decision tokens (YES + NO)
   - ⅓ of deposit → VUSD (split between pools)
6. Mints tokens to Alice (she gets some YES and NO to start trading)

**The allocation:**

- If deposit = 1500 USDC:
  - 500 USDC → YES tokens (250 to pool, 250 to Alice)
  - 500 USDC → NO tokens (250 to pool, 250 to Alice)
  - 500 USDC → VUSD (250 per pool)

### Step 4: Claim Virtual Tokens

Now Bob (who deposited 3000 USDC) wants to trade on this proposal:

```solidity
market.claimVirtualTokenForProposal(bob, proposalId);
```

**What happens:**

- Market mints 3000 VUSD to Bob
- **No additional USDC required!** This is the magic of virtual tokens
- Bob can now trade with this VUSD

### Step 5: Trading

Bob can now:

**Option A: Convert VUSD to YES/NO directly**

```solidity
market.mintYesNo(proposalId, 1000e18); // Gets 1000 YES + 1000 NO
```

**Option B: Swap on Uniswap pools**

```solidity
// Swap 500 VUSD for YES tokens
universalRouter.execute(swapParams);
```

**What happens during a swap:**

1. Hook's `beforeSwap` validates market is open ✅
2. Swap executes on Uniswap V4 pool
3. Hook's `afterSwap`:
   - Updates cumulative tick
   - Calculates 30-second TWAP
   - Updates market's highest proposal price
   - If deadline passed, triggers graduation

### Step 6: Market Settlement

When the deadline passes, anyone can call:

```solidity
market.graduateMarket(marketId);
```

**What happens:**

- Market finds proposal with highest YES price (in VUSD)
- Sets market status to `PROPOSAL_ACCEPTED`
- Records winning proposal ID
- Other proposals become untradable

### Step 7: Resolution

Now we need to verify the actual outcome. With FlareHybridResolver:

```solidity
// First, configure the resolver
ResolutionConfig memory config = ResolutionConfig({
    resolutionType: ResolutionType.FTSO_MARKET_CAP,
    tokenAddress: tokenAAddress,
    targetPrice: 50_000_000e18, // $50M
    // ... other config
});
flareResolver.setResolutionConfig(proposalId, config);

// Then resolve (resolver verifies automatically!)
market.resolveMarket(marketId, true, ""); // true = YES won
```

**What happens:**

- Resolver checks FTSO for Token-A's market cap
- If >= $50M, resolution is YES ✅
- If < $50M, resolution is NO ❌
- Market status changes to `RESOLVED_YES` or `RESOLVED_NO`

### Step 8: Redemption

Users can now redeem their winning tokens:

```solidity
market.redeemRewards(marketId, bob);
```

**What happens:**

- Burns VUSD, YES (if resolved YES), or NO (if resolved NO)
- Transfers equivalent USDC to Bob
- Bob gets back his capital plus/minus trading P&L

## 💡 Real-World Example

Let me show you a complete example with real numbers:

**Scenario:** Alice deposits $1,000 USDC into a market with 3 proposals.

```
1. Alice deposits $1,000 USDC
   └─> Market holds $1,000 USDC

2. Three proposals created:
   - Proposal 1: "EIP-1"
   - Proposal 2: "EIP-2"
   - Proposal 3: "EIP-3"

3. Alice claims VUSD for each:
   └─> Gets 1,000 VUSD for Proposal 1
   └─> Gets 1,000 VUSD for Proposal 2
   └─> Gets 1,000 VUSD for Proposal 3
   (Total: 3,000 VUSD, but only $1,000 real capital at risk!)

4. Alice trades:
   └─> Uses 500 VUSD on Proposal 2 (buys YES)
   └─> Uses 200 VUSD on Proposal 3 (buys NO)
   └─> Doesn't trade on Proposal 1

5. Market settles: Proposal 2 wins (highest YES price)

6. Alice redeems:
   └─> Proposal 2 tokens → USDC (profit/loss from trading)
   └─> Proposal 3 tokens → worthless (lost proposal)
   └─> Proposal 1: No trading, so no loss (principal preserved!)
```

**Key Insight:** Alice only lost money on proposals she actually traded on! If she didn't trade on Proposal 1, she doesn't lose anything on it. That's the power of virtual tokens! 🎯

## 🚀 Getting Started

### 📍 Deployed Contracts on Flare Testnet (Coston)

**Great news!** The contracts are already deployed on Flare Testnet! You can interact with them right away. Here are the addresses:

#### Core Contracts

| Contract                | Address                                      | Explorer                                                                                                     |
| ----------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Market**              | `0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38` | [View on Explorer](https://coston-explorer.flare.network/address/0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38) |
| **MarketUtilsSwapHook** | `0x955b741592FAF9388BEC58D25A6aC8B0Cd9c00c0` | [View on Explorer](https://coston-explorer.flare.network/address/0x955b741592FAF9388BEC58D25A6aC8B0Cd9c00c0) |
| **BasicMarketResolver** | `0x3fEa484D7E954D13811ED91721112239F7435898` | [View on Explorer](https://coston-explorer.flare.network/address/0x3fEa484D7E954D13811ED91721112239F7435898) |
| **FlareHybridResolver** | `0x23294167cDB8041d6b15FA9eb7E1bB3A962ea015` | [View on Explorer](https://coston-explorer.flare.network/address/0x23294167cDB8041d6b15FA9eb7E1bB3A962ea015) |
| **USDC**                | `0xb34e3Dfd595cD28aD15D76dCA86eF7D54b772Db5` | [View on Explorer](https://coston-explorer.flare.network/address/0xb34e3Dfd595cD28aD15D76dCA86eF7D54b772Db5) |

#### Uniswap V4 Infrastructure

| Contract             | Address                                      | Explorer                                                                                                     |
| -------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **PoolManager**      | `0x9A9bc340103C462365Db54E423f95784C664d3Df` | [View on Explorer](https://coston-explorer.flare.network/address/0x9A9bc340103C462365Db54E423f95784C664d3Df) |
| **PositionManager**  | `0xf25592fbe1597E58E5235a6A309a83ce3d8b5bfe` | [View on Explorer](https://coston-explorer.flare.network/address/0xf25592fbe1597E58E5235a6A309a83ce3d8b5bfe) |
| **Universal Router** | `0x2b45002683704d4d14CB5D979a4C93d02844884a` | [View on Explorer](https://coston-explorer.flare.network/address/0x2b45002683704d4d14CB5D979a4C93d02844884a) |
| **Permit2**          | `0xC5052054DBDC35f84D279CB321bE98480d807f6F` | [View on Explorer](https://coston-explorer.flare.network/address/0xC5052054DBDC35f84D279CB321bE98480d807f6F) |
| **WFLR**             | `0xF6398711b650CD1C0601f0c03d4E3f8C461c9AA0` | [View on Explorer](https://coston-explorer.flare.network/address/0xF6398711b650CD1C0601f0c03d4E3f8C461c9AA0) |

#### Flare Infrastructure

| Service                        | Address                                      | Explorer                                                                                                     |
| ------------------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **FTSO Registry**              | `0x48Da21ce34966A64E267CeFb78012C0282D0Ac87` | [View on Explorer](https://coston-explorer.flare.network/address/0x48Da21ce34966A64E267CeFb78012C0282D0Ac87) |
| **FDC (Flare Data Connector)** | `0x48aC463d7975828989331F4De43341627b9c5f1D` | [View on Explorer](https://coston-explorer.flare.network/address/0x48aC463d7975828989331F4De43341627b9c5f1D) |

**Network Details:**

- **Chain ID**: 16 (Flare Testnet - Coston)
- **RPC URL**: `https://coston-api.flare.network/ext/bc/C/rpc`
- **Explorer**: [Coston Explorer](https://coston-explorer.flare.network)

**💡 Pro Tip:** You can use these addresses directly in your frontend or scripts! Just make sure you're connected to Flare Testnet (Chain ID 16).

### Prerequisites

Before we dive in, make sure you have:

- **Foundry** installed ([Installation Guide](https://book.getfoundry.sh/getting-started/installation))
- **Bun** or **Node.js** (for frontend)
- Basic understanding of Solidity and DeFi
- **Flare Testnet FLR** for gas (get some from [Flare Faucet](https://faucet.flare.network/))

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd Quantum_Markets

# 2. Set up contracts
cd contracts
forge install
forge build
forge test

# 3. Set up frontend (if available)
cd ../frontend
bun install
bun run dev
```

### Quick Test

Let's make sure everything works:

```bash
cd contracts
forge test -vvv
```

You should see all tests passing! ✅

## 📖 Key Concepts Explained

### Markets

A **Market** is like a question with a deadline. For example:

- "Which EIP maximizes ETH price?"
- "Which token will reach $50M market cap first?"
- "Which tweet will get the most likes?"

Each market has:

- A **market token** (USDC, ETH, etc.) for deposits
- A **deadline** when it settles
- A **minimum deposit** to create proposals
- A **resolver** that verifies the outcome

### Proposals

A **Proposal** is a specific answer to the market question. Anyone can create proposals!

Each proposal gets:

- **YES tokens**: "I think this will happen"
- **NO tokens**: "I think this won't happen"
- **Two Uniswap pools**: For trading YES and NO

### Virtual Tokens (VUSD)

**VUSD** stands for "Virtual USDC". It's the magic ingredient!

- Minted when you claim your deposit for a proposal
- Used for trading within that proposal
- **Doesn't require additional real capital!**
- Only "real" when you redeem winning tokens

Think of it like play money that becomes real money if you win! 🎰

### Market Settlement

When the deadline hits:

1. The proposal with the **highest YES price** wins
2. All other proposals become worthless
3. Only the winning proposal's tokens can be redeemed

## 🔧 API Reference

### Market Contract Functions

#### `createMarket()`

Creates a new decision market.

```solidity
function createMarket(
    address creator,
    address marketToken,
    address resolver,
    uint256 minDeposit,
    uint256 deadline,
    string memory title
) external returns (uint256 marketId)
```

**Example:**

```solidity
// Deployed addresses on Flare Testnet
address usdc = 0xb34e3Dfd595cD28aD15D76dCA86eF7D54b772Db5;
address flareResolver = 0x23294167cDB8041d6b15FA9eb7E1bB3A962ea015;
address marketContract = 0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38;

Market market = Market(marketContract);

uint256 marketId = market.createMarket(
    msg.sender,
    usdc,
    flareResolver,
    1500e6,  // 1500 USDC minimum
    block.timestamp + 7 days,
    "Which token reaches $50M first?"
);
```

#### `depositToMarket()`

Deposit real tokens into a market.

```solidity
function depositToMarket(
    address depositor,
    uint256 marketId,
    uint256 amount
) external
```

**Example:**

```solidity
// Using deployed addresses
address usdc = 0xb34e3Dfd595cD28aD15D76dCA86eF7D54b772Db5;
address marketContract = 0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38;

IERC20(usdc).approve(marketContract, 3000e6);
Market(marketContract).depositToMarket(msg.sender, marketId, 3000e6);
```

#### `createProposal()`

Create a new proposal in a market.

```solidity
function createProposal(
    uint256 marketId,
    bytes memory data
) external returns (uint256 proposalId)
```

**Example:**

```solidity
uint256 proposalId = market.createProposal(marketId, "Token-A");
```

#### `claimVirtualTokenForProposal()`

Mint VUSD for a specific proposal.

```solidity
function claimVirtualTokenForProposal(
    address depositor,
    uint256 proposalId
) external
```

**Example:**

```solidity
market.claimVirtualTokenForProposal(msg.sender, proposalId);
// Now you have VUSD equal to your deposit!
```

#### `mintYesNo()`

Convert VUSD to YES and NO tokens (1:1 ratio).

```solidity
function mintYesNo(
    uint256 proposalId,
    uint256 amount
) public
```

**Example:**

```solidity
market.mintYesNo(proposalId, 1000e18);
// Gets 1000 YES + 1000 NO tokens
```

#### `graduateMarket()`

Select the winning proposal when deadline passes.

```solidity
function graduateMarket(uint256 marketId) public
```

**Example:**

```solidity
// After deadline
market.graduateMarket(marketId);
// Market now knows which proposal won!
```

#### `resolveMarket()`

Resolve the market with verified outcome.

```solidity
function resolveMarket(
    uint256 marketId,
    bool yesOrNo,
    bytes memory proof
) external
```

**Example:**

```solidity
// With FlareHybridResolver (automatic)
market.resolveMarket(marketId, true, "");

// With BasicMarketResolver (manual with proof)
market.resolveMarket(marketId, true, proof);
```

#### `redeemRewards()`

Redeem winning tokens for market tokens.

```solidity
function redeemRewards(
    uint256 marketId,
    address user
) external
```

**Example:**

```solidity
market.redeemRewards(marketId, msg.sender);
// Gets USDC back based on winning tokens
```

## 🔒 Security Considerations

### ⚠️ Important Warnings

**This is a reference implementation!** Before using in production:

- ✅ Get comprehensive security audits
- ✅ Run economic modeling and stress tests
- ✅ Implement proper access controls
- ✅ Add upgrade mechanisms if needed
- ✅ Review oracle/resolver security

### Known Risks

1. **Resolver Trust** - The resolver determines outcomes. A compromised resolver = bad news
2. **Price Manipulation** - TWAP helps, but large trades near deadline could still manipulate
3. **Liquidity Risks** - Low liquidity = high slippage
4. **Smart Contract Risks** - Standard DeFi risks (reentrancy, overflow, etc.)
5. **Front-running** - MEV bots could front-run settlement
6. **FTSO/FDC Risks** - Must trust Flare infrastructure for automatic resolution

### Best Practices

- Use time-weighted oracles (like we do with TWAP!)
- Implement circuit breakers for extreme movements
- Consider commit-reveal schemes for settlement
- Audit all resolver implementations
- Use multi-sig for critical operations
- Verify FTSO/FDC addresses before deployment

## 🤝 Contributing

We love contributions! Here's how to help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Add tests for your changes
4. Make sure all tests pass: `forge test`
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow Solidity style guide
- Write comprehensive tests (we love fuzz tests!)
- Document all public functions
- Update this README for significant changes
- Keep gas optimization in mind

## 📚 Additional Resources

### Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Deep dive into system design
- **[USER_GUIDE.md](./USER_GUIDE.md)** - Step-by-step user guide
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick reference for developers
- **[contracts/README.md](./contracts/README.md)** - Smart contract docs
- **[contracts/DEPLOYMENT.md](./contracts/DEPLOYMENT.md)** - Deployment guide

### External Resources

- [Paradigm: Quantum Markets Research](https://www.paradigm.xyz/2025/06/quantum-markets) - The original research paper
- [Uniswap V4 Documentation](https://docs.uniswap.org/) - Learn about V4
- [Foundry Book](https://book.getfoundry.sh/) - Foundry documentation
- [Flare Network Docs](https://docs.flare.network/) - Flare blockchain info
- [Flare FTSO](https://flare.network/ftso/) - Learn about FTSO
- [Flare Data Connector](https://dev.flare.network/pdf/whitepapers/20240224-FlareDataConnector.pdf) - FDC whitepaper

## 🙏 Acknowledgments

This project wouldn't exist without:

- **Paradigm** for the groundbreaking Quantum Markets research
- **Uniswap** for building the amazing V4 protocol
- **OpenZeppelin** for battle-tested security libraries
- **Flare Network** for EVM-compatibility and native oracle infrastructure

## 📄 License

All Rights Reserved

---

**Ready to build?** Start with `forge test` and explore the codebase! Happy building! 🚀

If you have questions, feel free to open an issue or check out our documentation. We're here to help!
