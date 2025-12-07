import { Address, createPublicClient, createWalletClient, http, custom, Chain } from "viem";
import MarketABI from "@/src/abis/Market.json";
import FlareHybridResolverABI from "@/src/abis/FlareHybridResolver.json";
import BasicMarketResolverABI from "@/src/abis/BasicMarketResolver.json";
import { CONTRACTS, CHAIN_CONFIG } from "@/src/config/contracts";

// Extract ABI from JSON files (they have {abi: [...]} structure)
const marketABI = (MarketABI as any).abi || MarketABI;
const flareResolverABI = (FlareHybridResolverABI as any).abi || FlareHybridResolverABI;
const basicResolverABI = (BasicMarketResolverABI as any).abi || BasicMarketResolverABI;

// ERC20 ABI for token interactions
const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
] as const;

// Create public client for read operations
export const publicClient = createPublicClient({
  chain: CHAIN_CONFIG as Chain,
  transport: http(),
});

// Create wallet client (will be set up with user's wallet via Privy)
export function createContractClient(walletClient?: ReturnType<typeof createWalletClient>) {
  return {
    // Market Contract
    market: {
      // Read functions
      read: {
        markets: (marketId: bigint) =>
          publicClient.readContract({
            address: CONTRACTS.MARKET as Address,
            abi: marketABI,
            functionName: "markets",
            args: [marketId],
          }),
        proposals: (proposalId: bigint) =>
          publicClient.readContract({
            address: CONTRACTS.MARKET as Address,
            abi: marketABI,
            functionName: "proposals",
            args: [proposalId],
          }),
        deposits: (marketId: bigint, user: Address) =>
          publicClient.readContract({
            address: CONTRACTS.MARKET as Address,
            abi: marketABI,
            functionName: "deposits",
            args: [marketId, user],
          }),
        marketMax: (marketId: bigint) =>
          publicClient.readContract({
            address: CONTRACTS.MARKET as Address,
            abi: marketABI,
            functionName: "marketMax",
            args: [marketId],
          }),
        marketProposals: (marketId: bigint) =>
          publicClient.readContract({
            address: CONTRACTS.MARKET as Address,
            abi: marketABI,
            functionName: "marketProposals",
            args: [marketId],
          }),
        getProposalInfo: (proposalId: bigint) =>
          publicClient.readContract({
            address: CONTRACTS.MARKET as Address,
            abi: marketABI,
            functionName: "getProposalInfo",
            args: [proposalId],
          }),
        getProposalInfoWithBalances: (proposalId: bigint, user: Address) =>
          publicClient.readContract({
            address: CONTRACTS.MARKET as Address,
            abi: marketABI,
            functionName: "getProposalInfoWithBalances",
            args: [proposalId, user],
          }),
      },
      // Write functions (require wallet)
      write: walletClient
        ? {
            createMarket: async (
              creator: Address,
              resolver: Address,
              minDeposit: bigint,
              deadline: bigint,
              title: string
            ) => {
              const { request } = await publicClient.simulateContract({
                account: walletClient.account,
                address: CONTRACTS.MARKET as Address,
                abi: marketABI,
                functionName: "createMarket",
                args: [creator, resolver, minDeposit, deadline, title],
              });
              return walletClient.writeContract(request);
            },
            depositToMarket: async (depositor: Address, marketId: bigint, amount: bigint) => {
              const { request } = await publicClient.simulateContract({
                account: walletClient.account,
                address: CONTRACTS.MARKET as Address,
                abi: marketABI,
                functionName: "depositToMarket",
                args: [depositor, marketId, amount],
              });
              return walletClient.writeContract(request);
            },
            createProposal: async (marketId: bigint, title: string) => {
              const { request } = await publicClient.simulateContract({
                account: walletClient.account,
                address: CONTRACTS.MARKET as Address,
                abi: marketABI,
                functionName: "createProposal",
                args: [marketId, title],
              });
              return walletClient.writeContract(request);
            },
            claimVirtualTokenForProposal: async (depositor: Address, proposalId: bigint) => {
              const { request } = await publicClient.simulateContract({
                account: walletClient.account,
                address: CONTRACTS.MARKET as Address,
                abi: marketABI,
                functionName: "claimVirtualTokenForProposal",
                args: [depositor, proposalId],
              });
              return walletClient.writeContract(request);
            },
            mintYesNo: async (proposalId: bigint, amount: bigint) => {
              const { request } = await publicClient.simulateContract({
                account: walletClient.account,
                address: CONTRACTS.MARKET as Address,
                abi: marketABI,
                functionName: "mintYesNo",
                args: [proposalId, amount],
              });
              return walletClient.writeContract(request);
            },
            redeemYesNo: async (proposalId: bigint, amount: bigint) => {
              const { request } = await publicClient.simulateContract({
                account: walletClient.account,
                address: CONTRACTS.MARKET as Address,
                abi: marketABI,
                functionName: "redeemYesNo",
                args: [proposalId, amount],
              });
              return walletClient.writeContract(request);
            },
            graduateMarket: async (marketId: bigint) => {
              const { request } = await publicClient.simulateContract({
                account: walletClient.account,
                address: CONTRACTS.MARKET as Address,
                abi: marketABI,
                functionName: "graduateMarket",
                args: [marketId],
              });
              return walletClient.writeContract(request);
            },
            resolveMarket: async (marketId: bigint, yesOrNo: boolean, proof: `0x${string}`) => {
              const { request } = await publicClient.simulateContract({
                account: walletClient.account,
                address: CONTRACTS.MARKET as Address,
                abi: marketABI,
                functionName: "resolveMarket",
                args: [marketId, yesOrNo, proof],
              });
              return walletClient.writeContract(request);
            },
            redeemRewards: async (marketId: bigint, user: Address) => {
              const { request } = await publicClient.simulateContract({
                account: walletClient.account,
                address: CONTRACTS.MARKET as Address,
                abi: marketABI,
                functionName: "redeemRewards",
                args: [marketId, user],
              });
              return walletClient.writeContract(request);
            },
          }
        : null,
    },
    // Flare Hybrid Resolver
    flareResolver: {
      read: {
        resolutionConfigs: (proposalId: bigint) =>
          publicClient.readContract({
            address: CONTRACTS.FLARE_HYBRID_RESOLVER as Address,
            abi: flareResolverABI,
            functionName: "resolutionConfigs",
            args: [proposalId],
          }),
        verifyResolution: (proposalId: bigint, yesOrNo: boolean, proof: `0x${string}`) =>
          publicClient.readContract({
            address: CONTRACTS.FLARE_HYBRID_RESOLVER as Address,
            abi: flareResolverABI,
            functionName: "verifyResolution",
            args: [proposalId, yesOrNo, proof],
          }),
      },
      write: walletClient
        ? {
            setResolutionConfig: async (proposalId: bigint, config: any) => {
              const { request } = await publicClient.simulateContract({
                account: walletClient.account,
                address: CONTRACTS.FLARE_HYBRID_RESOLVER as Address,
                abi: flareResolverABI,
                functionName: "setResolutionConfig",
                args: [proposalId, config],
              });
              return walletClient.writeContract(request);
            },
          }
        : null,
    },
  };
}

// Helper to get wallet client from Privy
export function getWalletClient(provider: any) {
  if (!provider) return undefined;
  
  return createWalletClient({
    chain: CHAIN_CONFIG as Chain,
    transport: custom(provider),
    account: provider.selectedAddress as Address,
  });
}

