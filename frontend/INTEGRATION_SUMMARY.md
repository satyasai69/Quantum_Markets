# Contract Integration Summary

## ✅ Completed Integration

The Quantum Markets contracts have been successfully integrated with the frontend!

### What Was Done

1. **ABI Export** ✅
   - ABIs exported from contracts to `frontend/src/abis/`
   - Market.json, FlareHybridResolver.json, BasicMarketResolver.json

2. **Configuration** ✅
   - Created `src/config/contracts.ts` with all deployed addresses
   - Updated chain config to Flare Testnet (Coston) - Chain ID 16
   - All contract addresses from `.env` are now in config

3. **Dependencies** ✅
   - Installed `viem` for blockchain interactions
   - Installed `@tanstack/react-query` for data fetching
   - Added React Query provider to app

4. **Contract Client** ✅
   - Created `src/lib/contracts.ts` with typed contract interactions
   - Supports both read and write operations
   - Integrated with Privy wallet system

5. **React Hooks** ✅
   - Created `src/hooks/useMarket.ts` - All market operations
   - Created `src/hooks/useToken.ts` - USDC token operations
   - All hooks use React Query for caching and state management

6. **Utilities** ✅
   - Created `src/lib/utils/format.ts` - Formatting helpers
   - Created example component showing integration

7. **Provider Updates** ✅
   - Updated `app/providers.tsx` to use Coston (Chain ID 16)
   - Added React Query provider
   - Fixed chain configuration

### File Structure

```
frontend/
├── src/
│   ├── config/
│   │   └── contracts.ts          # Contract addresses & chain config
│   ├── lib/
│   │   ├── contracts.ts          # Contract client creation
│   │   └── utils/
│   │       └── format.ts         # Formatting utilities
│   ├── hooks/
│   │   ├── useMarket.ts         # Market contract hooks
│   │   └── useToken.ts           # Token hooks
│   └── abis/
│       ├── Market.json
│       ├── FlareHybridResolver.json
│       └── BasicMarketResolver.json
├── app/
│   └── providers.tsx             # Updated with React Query & correct chain
└── components/
    └── market-integration-example.tsx  # Example usage
```

### How to Use

#### 1. Read Market Data

```tsx
import { useMarket } from "@/hooks/useMarket";

function MyComponent() {
  const { useMarketData } = useMarket();
  const { data: market } = useMarketData(BigInt("1"));
  
  return <div>{market?.title}</div>;
}
```

#### 2. Create a Market

```tsx
import { useMarket } from "@/hooks/useMarket";
import { useToken } from "@/hooks/useToken";
import { CONTRACTS } from "@/config/contracts";
import { parseUSDC } from "viem";

function CreateMarket() {
  const { useCreateMarket } = useMarket();
  const createMarket = useCreateMarket();
  
  const handleCreate = async () => {
    await createMarket.mutateAsync({
      creator: userAddress,
      resolver: CONTRACTS.FLARE_HYBRID_RESOLVER,
      minDeposit: parseUSDC("1500"),
      deadline: BigInt(Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60),
      title: "My Market",
    });
  };
  
  return <button onClick={handleCreate}>Create Market</button>;
}
```

#### 3. Deposit USDC

```tsx
import { useMarket } from "@/hooks/useMarket";
import { useToken } from "@/hooks/useToken";
import { parseUSDC } from "viem";

function Deposit() {
  const { useDepositToMarket } = useMarket();
  const { useApproveUSDC, parseUSDC: parseUSDCAmount } = useToken();
  
  const deposit = useDepositToMarket();
  const approve = useApproveUSDC();
  
  const handleDeposit = async () => {
    // First approve
    await approve.mutateAsync({
      spender: CONTRACTS.MARKET,
      amount: parseUSDCAmount("1000"),
    });
    
    // Then deposit
    await deposit.mutateAsync({
      depositor: userAddress,
      marketId: BigInt("1"),
      amount: parseUSDCAmount("1000"),
    });
  };
  
  return <button onClick={handleDeposit}>Deposit</button>;
}
```

### Available Hooks

#### Market Hooks (`useMarket()`)

**Queries:**
- `useMarketData(marketId)` - Get market info
- `useProposalData(proposalId)` - Get proposal info
- `useProposalDataWithBalances(proposalId, user)` - Get proposal with user balances
- `useMarketProposals(marketId)` - Get all proposals in a market
- `useUserDeposit(marketId, user)` - Get user's deposit amount

**Mutations:**
- `useCreateMarket()` - Create new market
- `useDepositToMarket()` - Deposit USDC
- `useCreateProposal()` - Create proposal
- `useClaimVirtualToken()` - Claim VUSD
- `useMintYesNo()` - Convert VUSD to YES/NO
- `useRedeemYesNo()` - Convert YES/NO back to VUSD
- `useGraduateMarket()` - Graduate market
- `useResolveMarket()` - Resolve market
- `useRedeemRewards()` - Redeem winning tokens

#### Token Hooks (`useToken()`)

**Queries:**
- `useUSDCBalance(userAddress)` - Get USDC balance
- `useUSDCAllowance(owner, spender)` - Get allowance

**Mutations:**
- `useApproveUSDC()` - Approve USDC spending

**Helpers:**
- `formatUSDC(value)` - Format USDC (6 decimals)
- `parseUSDC(value)` - Parse USDC string to bigint

### Contract Addresses

All addresses are in `src/config/contracts.ts`:

- **Market**: `0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38`
- **MarketUtilsSwapHook**: `0x955b741592FAF9388BEC58D25A6aC8B0Cd9c00c0`
- **FlareHybridResolver**: `0x23294167cDB8041d6b15FA9eb7E1bB3A962ea015`
- **USDC**: `0xb34e3Dfd595cD28aD15D76dCA86eF7D54b772Db5`

### Next Steps

1. **Update Main Page** - Replace mock data in `app/page.tsx` with real contract data
2. **Add Market Creation UI** - Form to create new markets
3. **Add Trading UI** - Interface for minting/redeeming YES/NO tokens
4. **Add Transaction Notifications** - Show success/error toasts
5. **Add Loading States** - Better UX during transactions

### Example Component

See `src/components/market-integration-example.tsx` for a complete working example!

### Testing

To test the integration:

1. Make sure you're connected to Flare Testnet (Coston)
2. Have some testnet FLR for gas
3. Get some testnet USDC (if needed)
4. Try creating a market or depositing

### Notes

- All amounts use `bigint` - use `parseUnits()` or `parseUSDC()` helpers
- USDC uses 6 decimals, not 18
- Users must approve USDC before depositing
- All mutations return transaction hashes
- React Query automatically caches and refetches data

