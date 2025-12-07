"use client";

/**
 * Example component showing how to integrate with Quantum Markets contracts
 * This demonstrates the basic usage of the hooks
 */

import { useMarket } from "@/src/hooks/useMarket";
import { useToken } from "@/src/hooks/useToken";
import { usePrivy } from "@privy-io/react-auth";
import { CONTRACTS } from "@/src/config/contracts";
import { Address } from "viem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export function MarketIntegrationExample() {
  const { user, ready } = usePrivy();
  const { useMarketData, useCreateMarket, useDepositToMarket, useCreateProposal } = useMarket();
  const { useUSDCBalance, useApproveUSDC, formatUSDC, parseUSDC } = useToken();

  const [marketId, setMarketId] = useState<string>("");
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [proposalTitle, setProposalTitle] = useState<string>("");

  const userAddress = user?.wallet?.address as Address | undefined;
  const { data: usdcBalance } = useUSDCBalance(userAddress);
  const { data: marketData } = useMarketData(BigInt(marketId || "0"));
  const createMarket = useCreateMarket();
  const depositToMarket = useDepositToMarket();
  const createProposal = useCreateProposal();
  const approveUSDC = useApproveUSDC();

  const handleCreateMarket = async () => {
    if (!userAddress) return;
    
    try {
      const hash = await createMarket.mutateAsync({
        creator: userAddress,
        resolver: CONTRACTS.FLARE_HYBRID_RESOLVER as Address,
        minDeposit: parseUSDC("1500"),
        deadline: BigInt(Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60), // 7 days
        title: "Example Market",
      });
      console.log("Market created:", hash);
    } catch (error) {
      console.error("Error creating market:", error);
    }
  };

  const handleDeposit = async () => {
    if (!userAddress || !marketId || !depositAmount) return;

    try {
      // First approve USDC
      await approveUSDC.mutateAsync({
        spender: CONTRACTS.MARKET as Address,
        amount: parseUSDC(depositAmount),
      });

      // Then deposit
      const hash = await depositToMarket.mutateAsync({
        depositor: userAddress,
        marketId: BigInt(marketId),
        amount: parseUSDC(depositAmount),
      });
      console.log("Deposit successful:", hash);
    } catch (error) {
      console.error("Error depositing:", error);
    }
  };

  const handleCreateProposal = async () => {
    if (!marketId || !proposalTitle) return;

    try {
      const hash = await createProposal.mutateAsync({
        marketId: BigInt(marketId),
        title: proposalTitle,
      });
      console.log("Proposal created:", hash);
    } catch (error) {
      console.error("Error creating proposal:", error);
    }
  };

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please connect your wallet</div>;
  }

  return (
    <div className="space-y-4 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Market Integration Example</CardTitle>
          <CardDescription>
            Example of how to interact with Quantum Markets contracts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* User Balance */}
          <div>
            <p className="text-sm text-muted-foreground">Your USDC Balance:</p>
            <p className="text-2xl font-bold">
              {usdcBalance ? formatUSDC(usdcBalance) : "0"} USDC
            </p>
          </div>

          {/* Create Market */}
          <div className="space-y-2">
            <h3 className="font-semibold">Create Market</h3>
            <Button
              onClick={handleCreateMarket}
              disabled={createMarket.isPending}
            >
              {createMarket.isPending ? "Creating..." : "Create Example Market"}
            </Button>
          </div>

          {/* Deposit to Market */}
          <div className="space-y-2">
            <h3 className="font-semibold">Deposit to Market</h3>
            <Input
              placeholder="Market ID"
              value={marketId}
              onChange={(e) => setMarketId(e.target.value)}
            />
            <Input
              placeholder="Amount (USDC)"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              type="number"
            />
            <Button
              onClick={handleDeposit}
              disabled={depositToMarket.isPending || approveUSDC.isPending}
            >
              {depositToMarket.isPending || approveUSDC.isPending
                ? "Processing..."
                : "Deposit"}
            </Button>
          </div>

          {/* Create Proposal */}
          <div className="space-y-2">
            <h3 className="font-semibold">Create Proposal</h3>
            <Input
              placeholder="Market ID"
              value={marketId}
              onChange={(e) => setMarketId(e.target.value)}
            />
            <Input
              placeholder="Proposal Title"
              value={proposalTitle}
              onChange={(e) => setProposalTitle(e.target.value)}
            />
            <Button
              onClick={handleCreateProposal}
              disabled={createProposal.isPending}
            >
              {createProposal.isPending ? "Creating..." : "Create Proposal"}
            </Button>
          </div>

          {/* Market Data Display */}
          {marketId && marketData && (
            <div className="mt-4 p-4 border rounded">
              <h3 className="font-semibold mb-2">Market Data</h3>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(marketData, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

