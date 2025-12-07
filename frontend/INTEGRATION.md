# Frontend Integration Guide

This guide explains how to integrate the Quantum Markets contracts with the frontend.

## Overview

The frontend is integrated with the Quantum Markets smart contracts deployed on Flare Testnet (Coston). The integration uses:

- **Viem** for blockchain interactions
- **React Query** for data fetching and caching
- **Privy** for wallet connection and authentication
- **TypeScript** for type safety

## Contract Addresses

All contract addresses are defined in `src/config/contracts.ts`:

- Market: `0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38`
- MarketUtilsSwapHook: `0x955b741592FAF9388BEC58D25A6aC8B0Cd9c00c0`
- FlareHybridResolver: `0x23294167cDB8041d6b15FA9eb7E1bB3A962ea015`
- USDC: `0xb34e3Dfd595cD28aD15D76dCA86eF7D54b772Db5`

See `src/config/contracts.ts` for the complete list.

## Chain Configuration

The app is configured for **Flare Testnet (Coston)** with Chain ID **16**.

## Hooks

### `useMarket()`

Main hook for interacting with the Market contract.

**Queries:**
- `useMarketData(marketId)` - Get market data
- `useProposalData(proposalId)` - Get proposal data
- `useProposalDataWithBalances(proposalId, userAddress)` - Get proposal with user balances
- `useMarketProposals(marketId)` - Get all proposals for a market
- `useUserDeposit(marketId, userAddress)` - Get user's deposit amount

**Mutations:**
- `useCreateMarket()` - Create a new market
- `useDepositToMarket()` - Deposit USDC to a market
- `useCreateProposal()` - Create a proposal in a market
- `useClaimVirtualToken()` - Claim VUSD for a proposal
- `useMintYesNo()` - Convert VUSD to YES/NO tokens
- `useRedeemYesNo()` - Convert YES/NO tokens back to VUSD
- `useGraduateMarket()` - Graduate a market (select winning proposal)
- `useResolveMarket()` - Resolve a market
- `useRedeemRewards()` - Redeem winning tokens

### `useToken()`

Hook for ERC20 token interactions (USDC).

**Queries:**
- `useUSDCBalance(userAddress)` - Get USDC balance
- `useUSDCAllowance(owner, spender)` - Get USDC allowance

**Mutations:**
- `useApproveUSDC()` - Approve USDC spending

**Helpers:**
- `formatUSDC(value)` - Format USDC amount (6 decimals)
- `parseUSDC(value)` - Parse USDC string to bigint

## Usage Example

```tsx
import { useMarket } from "@/hooks/useMarket";
import { useToken } from "@/hooks/useToken";
import { usePrivy } from "@privy-io/react-auth";
import { CONTRACTS } from "@/config/contracts";
import { Address, parseUnits } from "viem";

function MyComponent() {
  const { user } = usePrivy();
  const { useMarketData, useCreateMarket } = useMarket();
  const { useUSDCBalance, formatUSDC } = useToken();

  const userAddress = user?.wallet?.address as Address | undefined;
  const { data: marketData } = useMarketData(BigInt("1"));
  const { data: balance } = useUSDCBalance(userAddress);
  const createMarket = useCreateMarket();

  const handleCreate = async () => {
    if (!userAddress) return;
    
    await createMarket.mutateAsync({
      creator: userAddress,
      resolver: CONTRACTS.FLARE_HYBRID_RESOLVER as Address,
      minDeposit: parseUnits("1500", 6), // 1500 USDC
      deadline: BigInt(Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60),
      title: "My Market",
    });
  };

  return (
    <div>
      <p>Balance: {balance ? formatUSDC(balance) : "0"} USDC</p>
      <button onClick={handleCreate}>Create Market</button>
    </div>
  );
}
```

## Important Notes

1. **USDC Decimals**: USDC uses 6 decimals, not 18. Use `parseUSDC()` and `formatUSDC()` helpers.

2. **BigInt**: All amounts are in `bigint`. Use `parseUnits()` to convert strings to bigint.

3. **Approvals**: Before depositing, users must approve the Market contract to spend USDC.

4. **Wallet Connection**: Users must connect their wallet via Privy before making transactions.

5. **Error Handling**: All mutations return promises that can be caught with try/catch.

## File Structure

```
frontend/src/
├── config/
│   └── contracts.ts          # Contract addresses and chain config
├── lib/
│   ├── contracts.ts          # Contract client creation
│   └── utils/
│       └── format.ts         # Formatting utilities
├── hooks/
│   ├── useMarket.ts          # Market contract hooks
│   └── useToken.ts           # Token interaction hooks
└── abis/
    ├── Market.json           # Market contract ABI
    ├── FlareHybridResolver.json
    └── BasicMarketResolver.json
```

## Next Steps

1. Update the main page (`app/page.tsx`) to use real contract data instead of mock data
2. Implement market creation UI
3. Implement proposal creation UI
4. Implement trading UI
5. Add transaction status notifications
6. Add error handling and user feedback

See `src/components/market-integration-example.tsx` for a complete example.

