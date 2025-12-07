"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Address, createWalletClient, custom } from "viem";
import { createContractClient, getWalletClient } from "@/src/lib/contracts";
import { CHAIN_CONFIG } from "@/src/config/contracts";
import { Chain } from "viem";

export function useMarket() {
  const { user, ready, getAccessToken } = usePrivy();
  const queryClient = useQueryClient();

  // Get wallet client from Privy
  const getClient = async () => {
    if (!user?.wallet?.address) return undefined;
    
    // Try to get provider from window.ethereum or Privy's embedded wallet
    const provider = (window as any).ethereum || (window as any).privy?.provider;
    if (!provider) return undefined;

    return createWalletClient({
      chain: CHAIN_CONFIG as Chain,
      transport: custom(provider),
      account: user.wallet.address as Address,
    });
  };

  // Read market data
  const useMarketData = (marketId: bigint) => {
    return useQuery({
      queryKey: ["market", marketId],
      queryFn: async () => {
        const client = createContractClient();
        return client.market.read.markets(marketId);
      },
      enabled: !!marketId && ready,
    });
  };

  // Read proposal data
  const useProposalData = (proposalId: bigint) => {
    return useQuery({
      queryKey: ["proposal", proposalId],
      queryFn: async () => {
        const client = createContractClient();
        return client.market.read.getProposalInfo(proposalId);
      },
      enabled: !!proposalId && ready,
    });
  };

  // Read proposal data with user balances
  const useProposalDataWithBalances = (proposalId: bigint, userAddress?: Address) => {
    return useQuery({
      queryKey: ["proposal", proposalId, "balances", userAddress],
      queryFn: async () => {
        if (!userAddress) return null;
        const client = createContractClient();
        return client.market.read.getProposalInfoWithBalances(proposalId, userAddress);
      },
      enabled: !!proposalId && !!userAddress && ready,
    });
  };

  // Read market proposals
  const useMarketProposals = (marketId: bigint) => {
    return useQuery({
      queryKey: ["market", marketId, "proposals"],
      queryFn: async () => {
        const client = createContractClient();
        const proposalIds = await client.market.read.marketProposals(marketId);
        const proposals = await Promise.all(
          proposalIds.map((id: bigint) => client.market.read.getProposalInfo(id))
        );
        return proposals;
      },
      enabled: !!marketId && ready,
    });
  };

  // Read user deposit
  const useUserDeposit = (marketId: bigint, userAddress?: Address) => {
    return useQuery({
      queryKey: ["deposit", marketId, userAddress],
      queryFn: async () => {
        if (!userAddress) return BigInt(0);
        const client = createContractClient();
        return client.market.read.deposits(marketId, userAddress);
      },
      enabled: !!marketId && !!userAddress && ready,
    });
  };

  // Create market mutation
  const useCreateMarket = () => {
    return useMutation({
      mutationFn: async ({
        creator,
        resolver,
        minDeposit,
        deadline,
        title,
      }: {
        creator: Address;
        resolver: Address;
        minDeposit: bigint;
        deadline: bigint;
        title: string;
      }) => {
        const walletClient = await getClient();
        if (!walletClient) throw new Error("Wallet not connected");
        
        const client = createContractClient(walletClient);
        if (!client.market.write) throw new Error("Write client not available");
        
        const hash = await client.market.write.createMarket(
          creator,
          resolver,
          minDeposit,
          deadline,
          title
        );
        return hash;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["market"] });
      },
    });
  };

  // Deposit to market mutation
  const useDepositToMarket = () => {
    return useMutation({
      mutationFn: async ({
        depositor,
        marketId,
        amount,
      }: {
        depositor: Address;
        marketId: bigint;
        amount: bigint;
      }) => {
        const walletClient = await getClient();
        if (!walletClient) throw new Error("Wallet not connected");
        
        const client = createContractClient(walletClient);
        if (!client.market.write) throw new Error("Write client not available");
        
        const hash = await client.market.write.depositToMarket(depositor, marketId, amount);
        return hash;
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["deposit", variables.marketId] });
        queryClient.invalidateQueries({ queryKey: ["market", variables.marketId] });
      },
    });
  };

  // Create proposal mutation
  const useCreateProposal = () => {
    return useMutation({
      mutationFn: async ({ marketId, title }: { marketId: bigint; title: string }) => {
        const walletClient = await getClient();
        if (!walletClient) throw new Error("Wallet not connected");
        
        const client = createContractClient(walletClient);
        if (!client.market.write) throw new Error("Write client not available");
        
        const hash = await client.market.write.createProposal(marketId, title);
        return hash;
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["market", variables.marketId, "proposals"] });
        queryClient.invalidateQueries({ queryKey: ["proposal"] });
      },
    });
  };

  // Claim virtual token mutation
  const useClaimVirtualToken = () => {
    return useMutation({
      mutationFn: async ({
        depositor,
        proposalId,
      }: {
        depositor: Address;
        proposalId: bigint;
      }) => {
        const walletClient = await getClient();
        if (!walletClient) throw new Error("Wallet not connected");
        
        const client = createContractClient(walletClient);
        if (!client.market.write) throw new Error("Write client not available");
        
        const hash = await client.market.write.claimVirtualTokenForProposal(depositor, proposalId);
        return hash;
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["proposal", variables.proposalId] });
      },
    });
  };

  // Mint YES/NO tokens mutation
  const useMintYesNo = () => {
    return useMutation({
      mutationFn: async ({
        proposalId,
        amount,
      }: {
        proposalId: bigint;
        amount: bigint;
      }) => {
        const walletClient = await getClient();
        if (!walletClient) throw new Error("Wallet not connected");
        
        const client = createContractClient(walletClient);
        if (!client.market.write) throw new Error("Write client not available");
        
        const hash = await client.market.write.mintYesNo(proposalId, amount);
        return hash;
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["proposal", variables.proposalId] });
      },
    });
  };

  // Redeem YES/NO tokens mutation
  const useRedeemYesNo = () => {
    return useMutation({
      mutationFn: async ({
        proposalId,
        amount,
      }: {
        proposalId: bigint;
        amount: bigint;
      }) => {
        const walletClient = await getClient();
        if (!walletClient) throw new Error("Wallet not connected");
        
        const client = createContractClient(walletClient);
        if (!client.market.write) throw new Error("Write client not available");
        
        const hash = await client.market.write.redeemYesNo(proposalId, amount);
        return hash;
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["proposal", variables.proposalId] });
      },
    });
  };

  // Graduate market mutation
  const useGraduateMarket = () => {
    return useMutation({
      mutationFn: async (marketId: bigint) => {
        const walletClient = await getClient();
        if (!walletClient) throw new Error("Wallet not connected");
        
        const client = createContractClient(walletClient);
        if (!client.market.write) throw new Error("Write client not available");
        
        const hash = await client.market.write.graduateMarket(marketId);
        return hash;
      },
      onSuccess: (_, marketId) => {
        queryClient.invalidateQueries({ queryKey: ["market", marketId] });
        queryClient.invalidateQueries({ queryKey: ["market", marketId, "proposals"] });
      },
    });
  };

  // Resolve market mutation
  const useResolveMarket = () => {
    return useMutation({
      mutationFn: async ({
        marketId,
        yesOrNo,
        proof,
      }: {
        marketId: bigint;
        yesOrNo: boolean;
        proof: `0x${string}`;
      }) => {
        const walletClient = await getClient();
        if (!walletClient) throw new Error("Wallet not connected");
        
        const client = createContractClient(walletClient);
        if (!client.market.write) throw new Error("Write client not available");
        
        const hash = await client.market.write.resolveMarket(marketId, yesOrNo, proof);
        return hash;
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["market", variables.marketId] });
      },
    });
  };

  // Redeem rewards mutation
  const useRedeemRewards = () => {
    return useMutation({
      mutationFn: async ({ marketId, user }: { marketId: bigint; user: Address }) => {
        const walletClient = await getClient();
        if (!walletClient) throw new Error("Wallet not connected");
        
        const client = createContractClient(walletClient);
        if (!client.market.write) throw new Error("Write client not available");
        
        const hash = await client.market.write.redeemRewards(marketId, user);
        return hash;
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["market", variables.marketId] });
        queryClient.invalidateQueries({ queryKey: ["deposit", variables.marketId] });
      },
    });
  };

  return {
    // Queries
    useMarketData,
    useProposalData,
    useProposalDataWithBalances,
    useMarketProposals,
    useUserDeposit,
    // Mutations
    useCreateMarket,
    useDepositToMarket,
    useCreateProposal,
    useClaimVirtualToken,
    useMintYesNo,
    useRedeemYesNo,
    useGraduateMarket,
    useResolveMarket,
    useRedeemRewards,
  };
}

