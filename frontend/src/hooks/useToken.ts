"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Address, createWalletClient, custom, parseUnits, formatUnits } from "viem";
import { publicClient } from "@/src/lib/contracts";
import { CONTRACTS, CHAIN_CONFIG } from "@/src/config/contracts";
import { Chain } from "viem";

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

export function useToken() {
  const { user, ready } = usePrivy();
  const queryClient = useQueryClient();

  // Get wallet client from Privy
  const getClient = async () => {
    if (!user?.wallet?.address) return undefined;
    
    const provider = (window as any).ethereum || (window as any).privy?.provider;
    if (!provider) return undefined;

    return createWalletClient({
      chain: CHAIN_CONFIG as Chain,
      transport: custom(provider),
      account: user.wallet.address as Address,
    });
  };

  // Read USDC balance
  const useUSDCBalance = (userAddress?: Address) => {
    return useQuery({
      queryKey: ["usdcBalance", userAddress],
      queryFn: async () => {
        if (!userAddress) return BigInt(0);
        return publicClient.readContract({
          address: CONTRACTS.USDC as Address,
          abi: ERC20_ABI,
          functionName: "balanceOf",
          args: [userAddress],
        });
      },
      enabled: !!userAddress && ready,
    });
  };

  // Read USDC allowance
  const useUSDCAllowance = (owner?: Address, spender?: Address) => {
    return useQuery({
      queryKey: ["usdcAllowance", owner, spender],
      queryFn: async () => {
        if (!owner || !spender) return BigInt(0);
        return publicClient.readContract({
          address: CONTRACTS.USDC as Address,
          abi: ERC20_ABI,
          functionName: "allowance",
          args: [owner, spender],
        });
      },
      enabled: !!owner && !!spender && ready,
    });
  };

  // Approve USDC mutation
  const useApproveUSDC = () => {
    return useMutation({
      mutationFn: async ({ spender, amount }: { spender: Address; amount: bigint }) => {
        const walletClient = await getClient();
        if (!walletClient) throw new Error("Wallet not connected");

        const { request } = await publicClient.simulateContract({
          account: walletClient.account,
          address: CONTRACTS.USDC as Address,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [spender, amount],
        });

        return walletClient.writeContract(request);
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["usdcAllowance", variables.spender],
        });
      },
    });
  };

  // Helper to format USDC (6 decimals)
  const formatUSDC = (value: bigint) => {
    return formatUnits(value, 6);
  };

  // Helper to parse USDC (6 decimals)
  const parseUSDC = (value: string) => {
    return parseUnits(value, 6);
  };

  return {
    useUSDCBalance,
    useUSDCAllowance,
    useApproveUSDC,
    formatUSDC,
    parseUSDC,
  };
}

// Standalone hook for token balance (works with any ERC20 token)
export function useTokenBalance(userAddress?: Address, tokenAddress?: Address) {
  const { ready } = usePrivy();
  
  return useQuery({
    queryKey: ["tokenBalance", userAddress, tokenAddress],
    queryFn: async () => {
      if (!userAddress || !tokenAddress) return undefined;
      
      try {
        const balance = await publicClient.readContract({
          address: tokenAddress,
          abi: ERC20_ABI,
          functionName: "balanceOf",
          args: [userAddress],
        });
        
        // Get token decimals
        const decimals = await publicClient.readContract({
          address: tokenAddress,
          abi: ERC20_ABI,
          functionName: "decimals",
        });
        
        // Convert to number (formatted)
        return Number(formatUnits(balance, decimals));
      } catch (error) {
        console.error("Error fetching token balance:", error);
        return undefined;
      }
    },
    enabled: !!userAddress && !!tokenAddress && ready,
    refetchInterval: 10000, // Refetch every 10 seconds
  });
}

// Hook to fetch native FLR balance
export function useFLRBalance(userAddress?: Address) {
  const { ready } = usePrivy();
  
  return useQuery({
    queryKey: ["flrBalance", userAddress],
    queryFn: async () => {
      if (!userAddress) return undefined;
      
      try {
        const balance = await publicClient.getBalance({
          address: userAddress,
        });
        
        // FLR has 18 decimals, convert to number
        return Number(formatUnits(balance, 18));
      } catch (error) {
        console.error("Error fetching FLR balance:", error);
        return undefined;
      }
    },
    enabled: !!userAddress && ready,
    refetchInterval: 10000, // Refetch every 10 seconds
  });
}

