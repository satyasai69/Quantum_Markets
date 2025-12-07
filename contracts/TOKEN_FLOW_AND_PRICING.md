# Token Flow and Pricing Documentation

## Overview

This document explains the complete flow of USDC, VUSD, YES, and NO tokens in Quantum Markets, including their creation, conversion, trading, and pricing mechanisms.

## Token Specifications

| Token    | Decimals | Purpose                                    | Backing                        |
| -------- | -------- | ------------------------------------------ | ------------------------------ |
| **USDC** | 6        | Real currency for deposits and redemptions | Real USDC tokens               |
| **VUSD** | 18       | Virtual trading currency (per proposal)    | Virtual (minted 1:1 with USDC) |
| **YES**  | 18       | Represents belief proposal will win        | Virtual (minted per proposal)  |
| **NO**   | 18       | Represents belief proposal will lose       | Virtual (minted per proposal)  |

### Decimal Conversion Rule

**Key Principle**: `1 USDC (6 decimals) = 1 VUSD (18 decimals) = 1 YES token (18 decimals) = 1 NO token (18 decimals) = $1`

**Conversion Factor**: `1e12` (multiply USDC by 1e12 to get VUSD/YES/NO, divide by 1e12 to convert back)

---

## Complete Token Flow

### Phase 1: Deposit (USDC)

**Function**: `depositToMarket(marketId, amount)`

**Flow**:

```
User Wallet
  └─ 100 USDC (6 decimals)
      │
      ├─ transferFrom(user, Market contract)
      │
      └─ Market Contract
          └─ deposits[marketId][user] += 100e6
```

**Code** (lines 97-108):

```solidity
usdc.transferFrom(depositor, address(this), amount);
deposits[marketId][depositor] += amount;
```

**Result**:

- User's USDC is locked in Market contract
- User can use this deposit for:
  - Creating proposals (uses `minDeposit`)
  - Claiming VUSD for trading

---

### Phase 2: Proposal Creation

**Function**: `createProposal(marketId, data)`

**What Happens** (lines 178-210):

#### Step 1: Deposit Split (if `minDeposit = D = 1500 USDC`)

```
Total Deposit: 1500 USDC (6 decimals)
│
├─ 2/3 → Decision Tokens: 1000 USDC worth
│   ├─ 500 USDC → YES tokens (D/3)
│   └─ 500 USDC → NO tokens (D/3)
│
└─ 1/3 → VUSD: 500 USDC worth
    ├─ 250 USDC → YES/VUSD pool
    └─ 250 USDC → NO/VUSD pool
```

#### Step 2: Token Creation

**New Contracts Deployed** (lines 186, 191-192):

- `VUSD` contract (unique per proposal)
- `YES Token` contract (unique per proposal)
- `NO Token` contract (unique per proposal)

#### Step 3: Token Minting

**VUSD Minting** (line 189):

```solidity
// Convert: 500 USDC (6 decimals) → 500 VUSD (18 decimals)
vUSD.mint(address(this), 500e6 * 1e12); // = 500e18 VUSD
// Market contract holds: 500 VUSD
```

**YES/NO Token Minting** (lines 199-203):

```solidity
// Convert: 500 USDC (6 decimals) → 500 tokens (18 decimals)
tokenPerPool18 = 500e6 * 1e12; // = 500e18

// Market contract (for pools):
yesToken.mint(address(this), 500e18); // 500 YES
noToken.mint(address(this), 500e18);  // 500 NO

// Creator (trading inventory):
yesToken.mint(msg.sender, 500e18);    // 500 YES
noToken.mint(msg.sender, 500e18);     // 500 NO
```

#### Step 4: Pool Initialization (lines 207-210)

**YES/VUSD Pool**:

```solidity
_initializePoolWithLiquidity(
    address(yesToken),  // 500e18 YES tokens
    address(vUSD),      // 250e18 VUSD
    ...
);
```

**NO/VUSD Pool**:

```solidity
_initializePoolWithLiquidity(
    address(noToken),   // 500e18 NO tokens
    address(vUSD),      // 250e18 VUSD
    ...
);
```

**Pool Initialization Details** (lines 258-330):

1. **Sort tokens** by address → determine token0/token1
2. **Set tick range**:
   - If YES is token0: `tickLower = MIN_TICK`, `tickUpper = 0`
   - If VUSD is token0: `tickLower = MIN_TICK`, `tickUpper = 0` (after fix)
3. **Calculate starting price**: 0.5 VUSD per YES/NO token
4. **Initialize pool** with starting price
5. **Add liquidity** using `MINT_POSITION` action
6. **Liquidity owned by**: Market contract (`address(this)`)

**Result After Proposal Creation**:

```
Creator Receives:
├─ 500 YES tokens (18 decimals)
└─ 500 NO tokens (18 decimals)

Market Contract Holds:
├─ 500 YES tokens (for YES/VUSD pool)
├─ 500 NO tokens (for NO/VUSD pool)
└─ 500 VUSD (250 for each pool)

Pools Created:
├─ YES/VUSD Pool (with 500 YES + 250 VUSD liquidity)
└─ NO/VUSD Pool (with 500 NO + 250 VUSD liquidity)
```

---

### Phase 3: VUSD Claiming

**Function**: `claimVirtualTokenForProposal(proposalId)`

**Flow** (lines 110-123):

```
User Deposit: 3000 USDC (6 decimals)
│
├─ Already used for Proposal 1: 1500 USDC
│
└─ Available: 1500 USDC
    │
    ├─ claimVirtualTokenForProposal(proposal2Id)
    │
    └─ Conversion:
        claimable = 1500e6 USDC (6 decimals)
        │
        └─ Mint VUSD: 1500e6 * 1e12 = 1500e18 VUSD (18 decimals)
            │
            └─ User receives: 1500 VUSD
```

**Code**:

```solidity
uint256 claimable = totalDeposited - alreadyClaimed; // 1500e6 USDC
proposalConfig.vUSD.mint(depositor, claimable * 1e12); // 1500e18 VUSD
proposalDepositClaims[proposalId][depositor] += claimable;
```

**Key Points**:

- VUSD is **virtual** - no real tokens moved
- Each proposal has its own VUSD contract
- VUSD from Proposal 1 cannot be used on Proposal 2
- 1:1 conversion: 1 USDC = 1 VUSD (accounting for decimals)

---

### Phase 4: Trading Operations

#### 4.1 Convert VUSD to YES/NO Tokens

**Function**: `mintYesNo(proposalId, amount)`

**Flow** (lines 125-130):

```
User: 1000 VUSD (18 decimals)
│
├─ transferFrom(user, Market contract)
│
└─ Market Contract:
    ├─ mint(user, 1000e18 YES tokens)
    └─ mint(user, 1000e18 NO tokens)
```

**Code**:

```solidity
config.vUSD.transferFrom(msg.sender, address(this), amount); // 1000e18 VUSD
config.yesToken.mint(msg.sender, amount); // 1000e18 YES
config.noToken.mint(msg.sender, amount);  // 1000e18 NO
```

**Result**: User gets 1:1:1 ratio (1 VUSD = 1 YES + 1 NO)

#### 4.2 Swap on Uniswap Pools

**Direct Swap (Recommended)**:

```
User: 100 VUSD
│
├─ Swap on YES/VUSD Pool
│   └─ 100 VUSD → ~50 YES tokens (price dependent)
│
└─ User: 50 YES tokens
```

**Or Swap on NO/VUSD Pool**:

```
User: 100 VUSD
│
├─ Swap on NO/VUSD Pool
│   └─ 100 VUSD → ~50 NO tokens (price dependent)
│
└─ User: 50 NO tokens
```

**Price Discovery**:

- Prices determined by AMM (Automated Market Maker)
- Supply and demand drive price changes
- Hook tracks YES pool prices via TWAP

#### 4.3 Convert YES/NO Back to VUSD

**Function**: `redeemYesNo(proposalId, amount)`

**Flow** (lines 132-137):

```
User: 500 YES + 500 NO tokens
│
├─ burnFrom(user, 500e18 YES)
├─ burnFrom(user, 500e18 NO)
│
└─ transferFrom(Market, user, 500e18 VUSD)
```

**Code**:

```solidity
config.yesToken.burnFrom(msg.sender, amount);
config.noToken.burnFrom(msg.sender, amount);
config.vUSD.transferFrom(address(this), msg.sender, amount);
```

**Result**: 1 YES + 1 NO = 1 VUSD (1:1:1 ratio)

---

### Phase 5: Price Tracking

**Function**: `updatePostSwap(poolKey, avgTick)` (called by hook)

**Flow** (lines 350-371):

#### Step 1: Calculate Raw Price from Tick

```solidity
uint256 raw = _priceFromTick(avgTick); // token1 / token0 (18 decimals)
```

**Price Calculation** (lines 373-379):

```solidity
uint160 sqrtP = TickMath.getSqrtPriceAtTick(tick); // Q64.96
uint256 p192 = uint256(sqrtP) * uint256(sqrtP);    // Q128.192
pX18 = (p192 * 1e18) >> 192;                       // Convert to 18 decimals
```

#### Step 2: Convert to YES Price

```solidity
uint256 yesPrice = _yesPrice(poolKey, proposal, raw); // vUSD / YES (18 decimals)
```

**YES Price Conversion** (lines 381-392):

```solidity
bool yesIsToken0 = Currency.unwrap(key.currency0) == address(p.yesToken);
if (yesIsToken0) {
    yesPrice = raw; // Direct: VUSD/YES = raw
} else {
    yesPrice = 1e36 / raw; // Inverse: VUSD/YES = 1 / (YES/VUSD)
}
```

#### Step 3: Track Highest Price

```solidity
if (yesPrice > current.yesPrice) {
    current.yesPrice = yesPrice;
    current.proposalId = proposalId;
}
```

**Price Range**:

- **Minimum**: ~0 VUSD per YES token (at MIN_TICK)
- **Maximum**: 1.0 VUSD per YES token (at tick 0) - **CAPPED**
- **Starting Price**: 0.5 VUSD per YES token

**TWAP (Time-Weighted Average Price)**:

- Hook calculates 30-second TWAP on each swap
- Reduces manipulation from single large trades
- Only YES pool prices are tracked (NO pools ignored)

---

### Phase 6: Market Settlement

#### 6.1 Market Graduation

**Function**: `graduateMarket(marketId)` (lines 394-400)

**Trigger**: Automatically called by hook when deadline passes

**Flow**:

```
Deadline Passed
│
├─ Hook detects deadline
│
└─ graduateMarket(marketId)
    │
    ├─ Get highest YES price: marketMax[marketId]
    │
    └─ Set winning proposal:
        acceptedProposals[marketId] = winningProposalId
        market.status = PROPOSAL_ACCEPTED
```

**Result**:

- Only winning proposal ID stored
- All other proposals become worthless
- Trading stops (market no longer OPEN)

#### 6.2 Market Resolution

**Function**: `resolveMarket(marketId, yesOrNo, proof)` (lines 402-414)

**Flow**:

```
Market Status: PROPOSAL_ACCEPTED
│
├─ Get winning proposal: acceptedProposals[marketId]
│
├─ Call resolver: verifyResolution(proposalId, yesOrNo, proof)
│
└─ Update status:
    ├─ If verified YES: market.status = RESOLVED_YES
    └─ If verified NO: market.status = RESOLVED_NO
```

#### 6.3 Reward Redemption

**Function**: `redeemRewards(marketId, user)` (lines 416-442)

**Flow**:

```
User Position (Winning Proposal):
├─ 500 YES tokens (18 decimals)
├─ 200 NO tokens (18 decimals)
└─ 300 VUSD (18 decimals)
│
├─ Market Status: RESOLVED_YES
│
└─ Redemption Calculation:
    │
    ├─ VUSD: 300e18 / 1e12 = 300e6 USDC
    ├─ YES tokens: 500e18 / 1e12 = 500e6 USDC
    └─ NO tokens: 0 (not redeemable if RESOLVED_YES)
    │
    └─ Total: 800 USDC (6 decimals)
        │
        └─ usdc.transfer(user, 800e6)
```

**Code**:

```solidity
// VUSD redemption
uint256 vusdBalance = proposal.vUSD.balanceOf(user); // 300e18
uint256 tradingRewards = vusdBalance / 1e12; // 300e6 USDC
proposal.vUSD.burnFrom(user, vusdBalance);

// Token redemption (if RESOLVED_YES)
if (market.status == MarketStatus.RESOLVED_YES) {
    uint256 tokenBalance = proposal.yesToken.balanceOf(user); // 500e18
    tradingRewards += tokenBalance / 1e12; // +500e6 USDC
    proposal.yesToken.burnFrom(user, tokenBalance);
}

// Transfer USDC
usdc.transfer(user, tradingRewards); // 800e6 USDC
```

**Important**:

- Only winning proposal tokens can be redeemed
- Losing proposal tokens are worthless
- VUSD always redeemable (if from winning proposal)
- YES tokens only redeemable if `RESOLVED_YES`
- NO tokens only redeemable if `RESOLVED_NO`

---

## Decimal Conversion Reference

### USDC → VUSD/YES/NO (Multiply by 1e12)

```solidity
// Example: 100 USDC → 100 VUSD
uint256 usdcAmount = 100e6;        // 100 USDC (6 decimals)
uint256 vusdAmount = usdcAmount * 1e12; // 100e18 VUSD (18 decimals)
```

**Locations**:

- Line 122: `claimVirtualTokenForProposal()` - VUSD minting
- Line 189: `createProposal()` - VUSD minting for pools
- Line 196: `createProposal()` - YES/NO token minting
- Line 208-210: `createProposal()` - Pool initialization

### VUSD/YES/NO → USDC (Divide by 1e12)

```solidity
// Example: 100 VUSD → 100 USDC
uint256 vusdAmount = 100e18;       // 100 VUSD (18 decimals)
uint256 usdcAmount = vusdAmount / 1e12; // 100e6 USDC (6 decimals)
```

**Locations**:

- Line 423: `redeemRewards()` - VUSD redemption
- Line 430: `redeemRewards()` - YES token redemption
- Line 435: `redeemRewards()` - NO token redemption

---

## Pricing Mechanism

### Initial Pool Price

**Starting Price**: 0.5 VUSD per YES/NO token

**Calculation** (lines 283-293):

```solidity
if (token0 == tokenA) {
    // YES is token0
    priceX18 = 0.5e18; // 0.5 VUSD per YES
    tickUpper = 0;     // Cap at 1.0 VUSD per YES
} else {
    // VUSD is token0
    priceX18 = 2e18;   // 2 YES per VUSD = 0.5 VUSD per YES
    tickUpper = 0;     // Cap at 1.0 VUSD per YES
}
```

### Price Range

| Scenario           | Min Price    | Max Price        | Starting Price |
| ------------------ | ------------ | ---------------- | -------------- |
| **YES is token0**  | ~0 VUSD/YES  | **1.0 VUSD/YES** | 0.5 VUSD/YES   |
| **VUSD is token0** | 0.5 VUSD/YES | **1.0 VUSD/YES** | 0.5 VUSD/YES   |

**Note**: Both scenarios are capped at 1.0 VUSD per YES/NO token.

### Price Discovery

1. **AMM-Based**: Prices determined by Uniswap V4 AMM pools
2. **Supply/Demand**: Trading activity moves prices
3. **TWAP Tracking**: 30-second Time-Weighted Average Price
4. **Competition**: Only YES pool prices tracked for winner selection

### Price Calculation Formula

```solidity
// Step 1: Get tick from pool
int24 tick = getCurrentTick(pool);

// Step 2: Convert tick to raw price
uint256 raw = _priceFromTick(tick); // token1 / token0

// Step 3: Convert to YES price
bool yesIsToken0 = (pool.currency0 == yesToken);
uint256 yesPrice = yesIsToken0 ? raw : (1e36 / raw); // vUSD / YES
```

---

## Complete Example Flow

### Scenario: User deposits 100 USDC and trades on 3 proposals

#### Step 1: Deposit

```
User: 100 USDC (6 decimals)
  ↓ depositToMarket()
Market: deposits[marketId][user] = 100e6 USDC
```

#### Step 2: Proposal Creation (by someone else)

```
Creator creates Proposal 1:
  - Uses 1500 USDC from their deposit
  - Creates: YES/VUSD and NO/VUSD pools
  - Starting price: 0.5 VUSD per YES/NO
```

#### Step 3: Claim VUSD

```
User: 100 USDC available
  ↓ claimVirtualTokenForProposal(proposal1Id)
User: 100 VUSD (18 decimals) for Proposal 1
  ↓ claimVirtualTokenForProposal(proposal2Id)
User: 100 VUSD (18 decimals) for Proposal 2
  ↓ claimVirtualTokenForProposal(proposal3Id)
User: 100 VUSD (18 decimals) for Proposal 3
```

#### Step 4: Trading

```
Proposal 1:
  User: 100 VUSD
    ↓ Swap 100 VUSD → 50 YES (on YES/VUSD pool)
  User: 50 YES tokens

Proposal 2:
  User: 100 VUSD
    ↓ Swap 100 VUSD → 50 NO (on NO/VUSD pool)
  User: 50 NO tokens

Proposal 3:
  User: 100 VUSD
    ↓ (No trading - VUSD unused)
  User: 100 VUSD
```

#### Step 5: Market Graduation

```
Deadline passes
  ↓
Proposal 1 wins (highest YES price)
  ↓
acceptedProposals[marketId] = proposal1Id
```

#### Step 6: Market Resolution

```
Resolver verifies: RESOLVED_YES
  ↓
market.status = RESOLVED_YES
```

#### Step 7: Redemption

```
User Position:
  - Proposal 1: 50 YES tokens ✅ (winner, resolved YES)
  - Proposal 2: 50 NO tokens ❌ (loser, worthless)
  - Proposal 3: 100 VUSD ❌ (loser, worthless)

Redemption:
  ↓ redeemRewards()
  - 50 YES → 50 USDC
  - 0 VUSD (already used)
  ↓
User receives: 50 USDC (6 decimals)
```

---

## Key Rules and Constraints

### 1. Token Isolation

- Each proposal has its own VUSD, YES, and NO contracts
- VUSD from Proposal 1 cannot be used on Proposal 2
- Tokens cannot be swapped between proposals

### 2. Decimal Consistency

- All conversions use `1e12` factor
- USDC (6 decimals) ↔ VUSD/YES/NO (18 decimals)
- Always maintain 1:1 value relationship

### 3. Price Limits

- Max price: 1.0 VUSD per YES/NO token
- Min price: ~0 VUSD per YES/NO token
- Starting price: 0.5 VUSD per YES/NO token

### 4. Winner Selection

- Only YES pool prices tracked
- Highest YES price wins at deadline
- NO pool prices not used for competition

### 5. Redemption Rules

- Only winning proposal tokens redeemable
- VUSD always redeemable (if from winner)
- YES tokens: redeemable if `RESOLVED_YES`
- NO tokens: redeemable if `RESOLVED_NO`
- Losing proposal tokens: worthless

---

## Gas Cost Estimates

| Operation                        | Estimated Gas | Description             |
| -------------------------------- | ------------- | ----------------------- |
| `depositToMarket()`              | ~50k          | Deposit USDC            |
| `createProposal()`               | ~500k         | Create proposal + pools |
| `claimVirtualTokenForProposal()` | ~50k          | Mint VUSD               |
| `mintYesNo()`                    | ~80k          | Convert VUSD to YES/NO  |
| `redeemYesNo()`                  | ~80k          | Convert YES/NO to VUSD  |
| Swap (Uniswap)                   | ~100k         | Trade on AMM            |
| `redeemRewards()`                | ~100k         | Redeem winning tokens   |

---

## Summary

### Token Flow Diagram

```
USDC (6 decimals)
  │
  ├─→ Deposit → Market Contract
  │
  ├─→ Create Proposal → Split:
  │   ├─→ 2/3 → YES/NO tokens (18 decimals)
  │   └─→ 1/3 → VUSD (18 decimals)
  │
  └─→ Claim VUSD → User gets VUSD (18 decimals)
        │
        ├─→ mintYesNo() → YES + NO tokens
        │
        ├─→ Swap on Uniswap → Trade tokens
        │
        └─→ redeemYesNo() → Back to VUSD
            │
            └─→ redeemRewards() → Back to USDC (6 decimals)
```

### Value Preservation

Throughout all conversions:

- **1 USDC = 1 VUSD = 1 YES = 1 NO = $1**
- Decimal conversions maintain 1:1 value relationship
- Only trading on AMM changes actual value

### Pricing Summary

- **Initial**: 0.5 VUSD per YES/NO token
- **Range**: 0 to 1.0 VUSD per YES/NO token
- **Discovery**: AMM-based (supply/demand)
- **Tracking**: 30-second TWAP for YES pools only
- **Winner**: Highest YES price at deadline
