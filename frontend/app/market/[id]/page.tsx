"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { TrendingUp, CheckCircle2, Clock, XCircle, ExternalLink } from "lucide-react"
import AppHeader from "@/components/app-header"
import PriceChart from "@/components/price-chart"
import { useToast } from "@/hooks/use-toast"
import { useWallets, usePrivy } from "@privy-io/react-auth"
import { createWalletClient, custom, parseEther, getAddress } from "viem"
import { CONTRACTS, CHAIN_CONFIG } from "@/src/config/contracts"
import { useFLRBalance } from "@/src/hooks/useToken"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Market {
  id: number
  question: string
  category: string
  options: { name: string; amountBet: number }[]
  volume: string
  traders: string
  timeLeft: string
  trend?: number
}

// Market data - in a real app, this would come from an API
const markets: Market[] = [
  {
    id: 1,
    question: "Which AI model will dominate in 2026?",
    category: "Technology",
    options: [
      { name: "GPT-5", amountBet: 234000000 },
      { name: "Claude-4", amountBet: 182000000 },
      { name: "Gemini-X", amountBet: 104000000 },
    ],
    volume: "$520M",
    traders: "12.5K",
    timeLeft: "45 days",
    trend: 12,
  },
  {
    id: 2,
    question: "Bitcoin price by end of 2025?",
    category: "Crypto",
    options: [
      { name: "$150k+", amountBet: 315000000 },
      { name: "$100-150k", amountBet: 285000000 },
      { name: "$50-100k", amountBet: 150000000 },
    ],
    volume: "$750M",
    traders: "28.9K",
    timeLeft: "25 days",
    trend: 8,
  },
  {
    id: 3,
    question: "Will there be a US recession in 2025?",
    category: "Economics",
    options: [
      { name: "Yes", amountBet: 234345000 },
      { name: "No", amountBet: 286655000 },
    ],
    volume: "$521M",
    traders: "14.5K",
    timeLeft: "60 days",
    trend: -3,
  },
  {
    id: 4,
    question: "Will Apple release AR glasses in 2025?",
    category: "Technology",
    options: [
      { name: "Yes", amountBet: 284920000 },
      { name: "Maybe", amountBet: 100560000 },
      { name: "No", amountBet: 33520000 },
    ],
    volume: "$419M",
    traders: "9.8K",
    timeLeft: "38 days",
    trend: 5,
  },
  {
    id: 5,
    question: "Which team will win Super Bowl LIX?",
    category: "Sports",
    options: [
      { name: "Kansas City Chiefs", amountBet: 284640000 },
      { name: "Buffalo Bills", amountBet: 160200000 },
      { name: "San Francisco 49ers", amountBet: 195800000 },
      { name: "Other", amountBet: 249360000 },
    ],
    volume: "$890M",
    traders: "42.3K",
    timeLeft: "12 days",
    trend: 15,
  },
  {
    id: 6,
    question: "Will Tesla stock reach $300 by 2026?",
    category: "Stocks",
    options: [
      { name: "Yes", amountBet: 144400000 },
      { name: "No", amountBet: 235600000 },
    ],
    volume: "$380M",
    traders: "7.2K",
    timeLeft: "90 days",
    trend: -2,
  },
]


interface Allocation {
  optionIndex: number
  selection: "yes" | "no" | null
  amount: number
  buySellMode?: "buy" | "sell" // Buy or Sell mode for this option
}

interface BoughtPosition {
  optionIndex: number
  selection: "yes" | "no"
  amount: number
}

interface Transaction {
  id: string
  type: "deposit" | "bet"
  marketId: number
  marketQuestion?: string
  optionName?: string
  selection?: "yes" | "no"
  buySellMode?: "buy" | "sell"
  amount: number
  timestamp: number
  status: "pending" | "completed" | "failed"
  txHash?: string
}

// Helper function to load from localStorage synchronously
function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue
  try {
    const saved = localStorage.getItem(key)
    if (saved === null) return defaultValue
    if (typeof defaultValue === "number") {
      return Number.parseFloat(saved) as T
    }
    if (typeof defaultValue === "object" && defaultValue !== null) {
      return JSON.parse(saved) as T
    }
    return saved as T
  } catch (e) {
    console.error(`Error loading ${key} from localStorage:`, e)
    return defaultValue
  }
}

export default function MarketDetailPage() {
  const router = useRouter()
  const params = useParams()
  const marketId = Number.parseInt(params?.id as string)
  const { toast } = useToast()
  const { wallets } = useWallets()
  const { authenticated } = usePrivy()
  
  // Get the connected wallet (prefer external wallet like MetaMask)
  const wallet = wallets.find(w => w.walletClientType === "metamask") || wallets[0]
  
  // Fetch real FLR balance from blockchain
  const { data: flrBalance, isLoading: isLoadingBalance } = useFLRBalance(
    wallet?.address as `0x${string}` | undefined
  )
  
  const [depositDialogOpen, setDepositDialogOpen] = useState(false)
  const [isProcessingTransaction, setIsProcessingTransaction] = useState(false)
  const [depositAmount, setDepositAmount] = useState<string>("")
  // Load initial state from localStorage synchronously to prevent reset on remount
  // Use real FLR balance if available, otherwise fall back to localStorage
  const [userBalance, setUserBalance] = useState<number>(() => 
    loadFromLocalStorage("userBalance", 1000)
  )
  
  // Update userBalance when real balance is fetched
  useEffect(() => {
    if (flrBalance !== undefined && !isLoadingBalance) {
      setUserBalance(flrBalance)
    }
  }, [flrBalance, isLoadingBalance])
  const [tradingBalance, setTradingBalance] = useState<number>(() => 
    loadFromLocalStorage(`tradingBalance_${marketId}`, 0)
  )
  const [allocations, setAllocations] = useState<Record<number, Allocation>>(() => 
    loadFromLocalStorage(`allocations_${marketId}`, {})
  )
  const [placedAllocations, setPlacedAllocations] = useState<Set<number>>(() => {
    const saved = loadFromLocalStorage<string[]>(`placedAllocations_${marketId}`, [])
    return new Set(saved)
  })
  const [boughtPositions, setBoughtPositions] = useState<BoughtPosition[]>(() => {
    const saved = loadFromLocalStorage<BoughtPosition[]>(`boughtPositions_${marketId}`, [])
    return saved || []
  })
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editAmount, setEditAmount] = useState<string>("")
  const [clearConfirmDialogOpen, setClearConfirmDialogOpen] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("transactions")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const market = markets.find((m) => m.id === marketId)

  // Function to send a real blockchain transaction
  const sendBlockchainTransaction = async (
    amount: number,
    transactionType: "deposit" | "bet",
    transactionData?: {
      optionName?: string
      selection?: "yes" | "no"
      buySellMode?: "buy" | "sell"
    }
  ): Promise<string | null> => {
    if (!authenticated || !wallet) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your MetaMask wallet to proceed.",
        variant: "destructive",
      })
      return null
    }

    try {
      setIsProcessingTransaction(true)

      // Get the Ethereum provider from Privy wallet
      const provider = await wallet.getEthereumProvider()
      
      // Check current chain and switch if needed
      const currentChainId = await provider.request({ method: "eth_chainId" })
      const targetChainId = `0x${CHAIN_CONFIG.id.toString(16)}`
      
      // Switch wallet to Flare Testnet (Coston2) network if needed
      if (currentChainId !== targetChainId) {
        try {
          // Try to switch to the chain
          await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: targetChainId }],
          })
        } catch (switchError: any) {
          // If chain switch fails (chain not added), try to add it
          if (switchError?.code === 4902 || switchError?.message?.includes("Unrecognized chain")) {
            try {
              // Add the network
              await provider.request({
                method: "wallet_addEthereumChain",
                params: [{
                  chainId: targetChainId,
                  chainName: CHAIN_CONFIG.name,
                  nativeCurrency: {
                    name: CHAIN_CONFIG.nativeCurrency.name,
                    symbol: CHAIN_CONFIG.nativeCurrency.symbol,
                    decimals: CHAIN_CONFIG.nativeCurrency.decimals,
                  },
                  rpcUrls: CHAIN_CONFIG.rpcUrls.default.http,
                  blockExplorerUrls: [CHAIN_CONFIG.blockExplorers.default.url],
                }],
              })
              // After adding, the chain should be switched automatically
              // But verify it switched
              const newChainId = await provider.request({ method: "eth_chainId" })
              if (newChainId !== targetChainId) {
                // If it didn't switch automatically, try switching again
                await provider.request({
                  method: "wallet_switchEthereumChain",
                  params: [{ chainId: targetChainId }],
                })
              }
            } catch (addError: any) {
              toast({
                title: "Network Setup Required",
                description: `Please add Flare Testnet (Chain ID: ${CHAIN_CONFIG.id}) to your wallet manually.`,
                variant: "destructive",
              })
              throw new Error("Network not available. Please add Flare Testnet to your wallet.")
            }
          } else if (switchError?.code === 4001) {
            // User rejected the request
            toast({
              title: "Transaction Cancelled",
              description: "You rejected the network switch request.",
              variant: "destructive",
            })
            throw new Error("Network switch rejected by user.")
          } else {
            // Other error
            console.warn("Chain switch failed:", switchError)
            toast({
              title: "Network Switch Failed",
              description: `Failed to switch to Flare Testnet. Please switch manually in your wallet.`,
              variant: "destructive",
            })
            throw switchError
          }
        }
      }

      // Create Viem wallet client using the provider
      const walletClient = createWalletClient({
        account: wallet.address as `0x${string}`,
        chain: CHAIN_CONFIG as any,
        transport: custom(provider),
      })

      // Convert amount to wei (using native FLR token with 18 decimals)
      // For USDC or other tokens, you'd need to use the token's decimals
      const amountInWei = parseEther(amount.toString())

      // Use the Market contract address for prediction market transactions
      // getAddress validates and checksums the address
      const recipientAddress = getAddress(CONTRACTS.MARKET)
      
      // Send transaction using Viem wallet client
      // This will trigger MetaMask to show the transaction
      const txHash = await walletClient.sendTransaction({
        to: recipientAddress,
        value: amountInWei,
        // For contract calls, you would add:
        // data: encodeFunctionData({...}) // Encoded function call
      })

      return txHash
    } catch (error: any) {
      console.error("Transaction error:", error)
      
      // Check if user rejected the transaction
      if (error?.code === 4001 || error?.message?.includes("rejected") || error?.message?.includes("denied") || error?.code === "ACTION_REJECTED") {
        toast({
          title: "Transaction Rejected",
          description: "You rejected the transaction in MetaMask.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Transaction Failed",
          description: error?.message || "Failed to send transaction. Please try again.",
          variant: "destructive",
        })
      }
      return null
    } finally {
      setIsProcessingTransaction(false)
    }
  }

  // Function to record a transaction (now with real blockchain integration)
  const recordTransaction = async (
    transaction: Omit<Transaction, "id" | "timestamp" | "status" | "txHash">
  ) => {
    // Send real blockchain transaction
    const txHash = await sendBlockchainTransaction(
      transaction.amount,
      transaction.type,
      {
        optionName: transaction.optionName,
        selection: transaction.selection,
        buySellMode: transaction.buySellMode,
      }
    )

    if (!txHash) {
      // Transaction failed or was rejected
      return null
    }

    const newTransaction: Transaction = {
      ...transaction,
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      status: "completed",
      txHash: txHash,
    }
    
    setTransactions((prev) => {
      const updated = [newTransaction, ...prev]
      // Save to localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("transactions", JSON.stringify(updated))
        } catch (e) {
          console.error("Error saving transactions:", e)
        }
      }
      return updated
    })
    
    // Show success toast notification
    if (transaction.type === "deposit") {
      toast({
        title: "Deposit Successful",
        description: `Successfully deposited $${transaction.amount.toFixed(2)} for this market. Transaction: ${txHash.slice(0, 10)}...`,
        variant: "default",
      })
    } else {
      const actionText = transaction.buySellMode === "sell" ? "Sell" : "Buy"
      toast({
        title: "Transaction Successful",
        description: `${actionText} bet of $${transaction.amount.toFixed(2)} placed for ${transaction.optionName} (${transaction.selection?.toUpperCase()}). Transaction: ${txHash.slice(0, 10)}...`,
        variant: "default",
      })
    }
    
    // Log transaction for debugging
    console.log("Transaction recorded:", newTransaction)
    
    return newTransaction
  }

  // Persist state to localStorage whenever it changes (with debounce to avoid excessive writes)
  useEffect(() => {
    if (typeof window !== "undefined" && userBalance !== undefined) {
      try {
        localStorage.setItem("userBalance", userBalance.toString())
      } catch (e) {
        console.error("Error saving userBalance to localStorage:", e)
      }
    }
  }, [userBalance])

  useEffect(() => {
    if (typeof window !== "undefined" && tradingBalance !== undefined) {
      try {
        localStorage.setItem(`tradingBalance_${marketId}`, tradingBalance.toString())
      } catch (e) {
        console.error("Error saving tradingBalance to localStorage:", e)
      }
    }
  }, [tradingBalance, marketId])

  useEffect(() => {
    if (typeof window !== "undefined" && allocations && Object.keys(allocations).length >= 0) {
      try {
        localStorage.setItem(`allocations_${marketId}`, JSON.stringify(allocations))
      } catch (e) {
        console.error("Error saving allocations to localStorage:", e)
      }
    }
  }, [allocations, marketId])

  useEffect(() => {
    if (typeof window !== "undefined" && placedAllocations) {
      try {
        localStorage.setItem(`placedAllocations_${marketId}`, JSON.stringify(Array.from(placedAllocations)))
      } catch (e) {
        console.error("Error saving placedAllocations to localStorage:", e)
      }
    }
  }, [placedAllocations, marketId])

  useEffect(() => {
    if (typeof window !== "undefined" && boughtPositions) {
      try {
        localStorage.setItem(`boughtPositions_${marketId}`, JSON.stringify(boughtPositions))
      } catch (e) {
        console.error("Error saving boughtPositions to localStorage:", e)
      }
    }
  }, [boughtPositions, marketId])

  useEffect(() => {
    // Initialize allocations for all options
    if (market) {
      const initialAllocations: Record<number, Allocation> = {}
      market.options.forEach((_, idx) => {
        if (!allocations[idx]) {
          initialAllocations[idx] = {
            optionIndex: idx,
            selection: null,
            amount: 0,
            buySellMode: "buy", // Default to buy
          }
        }
      })
      if (Object.keys(initialAllocations).length > 0) {
        setAllocations((prev) => ({ ...prev, ...initialAllocations }))
      }
    }
  }, [market])

  // VUSDC is now calculated directly as tradingBalance - allocation amount
  // No need for separate state, calculated on the fly

  if (!market) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Market not found</p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const parseVolume = (volumeStr: string): number => {
    const match = volumeStr.match(/\$?([\d.]+)([MBK])?/i)
    if (!match) return 0
    const value = parseFloat(match[1])
    const suffix = match[2]?.toUpperCase()
    if (suffix === "B") return value * 1000000000
    if (suffix === "M") return value * 1000000
    if (suffix === "K") return value * 1000
    return value
  }

  const formatCurrency = (value: number): string => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`
    }
    return `$${value.toFixed(2)}`
  }

  const getFormattedVolume = (volumeStr: string): string => {
    const volumeInUSD = parseVolume(volumeStr)
    return formatCurrency(volumeInUSD)
  }

  // Calculate price for Yes/No selection (Polymarket style: Yes + No = 100 cents)
  const calculatePrice = (optionIndex: number, selection: "yes" | "no"): number => {
    const totalPool = market.options.reduce((sum, opt) => sum + opt.amountBet, 0)
    const option = market.options[optionIndex]
    
    // Calculate probability percentage (0-100)
    const probabilityPercent = (option.amountBet / totalPool) * 100
    
    if (selection === "yes") {
      // Yes price in cents = probability percentage
      return probabilityPercent
    } else {
      // No price in cents = 100 - probability percentage
      return 100 - probabilityPercent
    }
  }

  // Convert cents to dollars for display
  const centsToDollars = (cents: number): number => {
    return cents / 100
  }

  // Calculate total allocated amount (for display purposes only)
  const totalAllocated = Object.values(allocations).reduce(
    (sum, alloc) => sum + (alloc.selection ? alloc.amount : 0),
    0
  )

  // Calculate total allocation for a specific option (Yes + No combined)
  const getOptionTotalAllocation = (optionIndex: number): number => {
    const alloc = allocations[optionIndex]
    if (!alloc) return 0
    // For the same option, if there's any allocation (Yes or No), return that amount
    // Since you can only have one selection (Yes OR No) at a time, this works
    return alloc.selection ? alloc.amount : 0
  }

  // Get available amount to sell for a specific option and selection
  const getAvailableToSell = (optionIndex: number, selection: "yes" | "no"): number => {
    const position = boughtPositions.find(
      pos => pos.optionIndex === optionIndex && pos.selection === selection
    )
    return position ? position.amount : 0
  }

  // Trading balance is the maximum amount you can allocate to EACH option (not a shared pool)
  // So you can allocate the full amount to all options independently

  // Handle allocation change
  const handleAllocationChange = (
    optionIndex: number,
    selection: "yes" | "no" | null,
    amount: number,
    buySellMode?: "buy" | "sell"
  ) => {
    const newAmount = Math.max(0, amount)
    
    setAllocations((prev) => {
      const current = prev[optionIndex] || { optionIndex, selection: null, amount: 0, buySellMode: "buy" as const }
      return {
        ...prev,
        [optionIndex]: {
          optionIndex,
          selection,
          amount: newAmount,
          buySellMode: buySellMode || current.buySellMode || "buy", // Default to "buy"
        },
      }
    })
    // VUSDC will be updated automatically via useEffect when allocations change
  }

  // Calculate potential winnings for an allocation (Polymarket style)
  // If you bet $X at price $P (in dollars), you get $X / $P shares
  // If it wins, each share pays $1, so total return = $X / $P
  const calculatePotentialWinnings = (optionIndex: number, selection: "yes" | "no", amount: number): number => {
    const priceCents = calculatePrice(optionIndex, selection)
    const priceDollars = centsToDollars(priceCents)
    // Total return if it wins (includes original bet)
    return amount / priceDollars
  }

  // Calculate maximum potential winnings (since only one option can win)
  const maxPotentialWinnings = Object.values(allocations)
    .filter((alloc) => alloc.selection !== null && alloc.amount > 0)
    .reduce((max, alloc) => {
      if (alloc.selection) {
        const potentialReturn = calculatePotentialWinnings(alloc.optionIndex, alloc.selection, alloc.amount)
        return Math.max(max, potentialReturn)
      }
      return max
    }, 0)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader 
        title="Market Details" 
        showBackButton={true}
        onBackClick={() => router.push("/")}
        userBalance={isLoadingBalance ? undefined : userBalance}
        key={userBalance}
      />

      {/* Sticky Deposit Bar */}
      <div className="sticky top-[65px] z-40 bg-background/95 backdrop-blur-sm border-b border-border/80">
        <div className="max-w-4xl mx-auto px-6 pt-3 pb-2.5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* FLR Balance */}
              {tradingBalance > 0 ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-500/10 border border-green-500/20">
                  <span className="text-xs font-medium text-muted-foreground">FLR</span>
                  <span className="text-sm font-semibold font-mono text-green-600 dark:text-green-400">{tradingBalance.toFixed(4)} FLR</span>
                </div>
              ) : (
                <div className="text-xs text-muted-foreground">
                  No funds deposited for this market
                </div>
              )}
            </div>
            {!authenticated || !wallet ? (
              <div className="text-xs text-muted-foreground px-3 py-1.5">
                Connect MetaMask to deposit
              </div>
            ) : (
              <button
                onClick={() => setDepositDialogOpen(true)}
                className="px-5 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity font-semibold text-sm whitespace-nowrap"
                disabled={isProcessingTransaction}
              >
                {isProcessingTransaction ? "Processing..." : "Deposit for This Market"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Market Info */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              {market.category}
            </span>
            {market.trend && (
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  market.trend > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                <TrendingUp size={12} />
                {market.trend > 0 ? "+" : ""}
                {market.trend}%
              </div>
            )}
          </div>
          <div className="mb-4">
            <h1 className="text-2xl font-semibold">{market.question}</h1>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span>Volume: {getFormattedVolume(market.volume)}</span>
            <span>Traders: {market.traders}</span>
            <span>Closes in: {market.timeLeft}</span>
          </div>
        </div>

        {/* Price Chart */}
        <div className="mb-8">
          <PriceChart options={market.options} />
        </div>

        {/* Trading Balance Display */}
        {tradingBalance > 0 && (
          <div className="mb-8 p-6 rounded-lg border border-border bg-muted/30">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Trading Balance</h3>
                <p className="text-sm text-muted-foreground">Available funds for this market</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold font-mono">{tradingBalance.toFixed(4)} FLR</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Max per option: {tradingBalance.toFixed(4)} FLR
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Total allocated: {totalAllocated.toFixed(4)} FLR
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Options with Yes/No Selections */}
        <div className="space-y-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Allocate Your Trading Balance</h2>
          {market.options.map((option, optionIndex) => {
            const allocation = allocations[optionIndex] || {
              optionIndex,
              selection: null,
              amount: 0,
              buySellMode: "buy" as const,
            }
            const yesPrice = calculatePrice(optionIndex, "yes")
            const noPrice = calculatePrice(optionIndex, "no")
            const totalPool = market.options.reduce((sum, opt) => sum + opt.amountBet, 0)
            const optionPercentage = (option.amountBet / totalPool) * 100

            return (
              <div
                key={optionIndex}
                className={`option-${optionIndex} p-6 rounded-lg border border-border bg-muted/20 hover:bg-muted/30 dark:hover:bg-muted/50 transition-colors`}
              >
                {/* Option Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{option.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{optionPercentage.toFixed(1)}% probability</span>
                      <span>•</span>
                      <span>{formatCurrency(option.amountBet)} bet</span>
                    </div>
                  </div>
                  {/* VUSDC Display */}
                  {tradingBalance > 0 && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-500/10 border border-blue-500/20">
                      <span className="text-xs font-medium text-muted-foreground">VFLR</span>
                      <span className="text-sm font-semibold font-mono text-blue-600 dark:text-blue-400">
                        {(tradingBalance - getOptionTotalAllocation(optionIndex)).toFixed(4)} FLR
                      </span>
                    </div>
                  )}
                </div>

                {/* Buy/Sell Toggle */}
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex items-center gap-0">
                    <button
                      onClick={() => {
                        if (allocation.selection) {
                          handleAllocationChange(
                            optionIndex,
                            allocation.selection,
                            allocation.amount,
                            "buy"
                          )
                        } else {
                          setAllocations((prev) => ({
                            ...prev,
                            [optionIndex]: {
                              ...(prev[optionIndex] || { optionIndex, selection: null, amount: 0, buySellMode: "buy" as const }),
                              buySellMode: "buy",
                            },
                          }))
                        }
                      }}
                      className={`px-4 py-2 text-sm font-semibold transition-all relative ${
                        (allocation.buySellMode || "buy") === "buy"
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Buy
                      {(allocation.buySellMode || "buy") === "buy" && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"></span>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        if (allocation.selection) {
                          handleAllocationChange(
                            optionIndex,
                            allocation.selection,
                            allocation.amount,
                            "sell"
                          )
                        } else {
                          setAllocations((prev) => ({
                            ...prev,
                            [optionIndex]: {
                              ...(prev[optionIndex] || { optionIndex, selection: null, amount: 0, buySellMode: "buy" as const }),
                              buySellMode: "sell",
                            },
                          }))
                        }
                      }}
                      className={`px-4 py-2 text-sm font-semibold transition-all relative ${
                        allocation.buySellMode === "sell"
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Sell
                      {allocation.buySellMode === "sell" && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"></span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Yes/No Selection Buttons */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Yes Button */}
                  <button
                    onClick={() => {
                      const currentMode = allocation.buySellMode || "buy"
                      
                      // In Sell mode, check if user has bought position for Yes
                      if (currentMode === "sell") {
                        const availableToSell = getAvailableToSell(optionIndex, "yes")
                        if (availableToSell === 0) {
                          // Can't sell if nothing was bought
                          return
                        }
                      }
                      
                      // In Buy mode, if switching from No to Yes, clear the No allocation and switch to Yes
                      if (currentMode === "buy" && allocation.selection === "no" && allocation.amount > 0) {
                        // Clear No and switch to Yes with 0 amount (VUSDC is shared)
                        setAllocations(prev => ({
                          ...prev,
                          [optionIndex]: {
                            optionIndex,
                            selection: "yes",
                            amount: 0,
                            buySellMode: currentMode,
                          },
                        }))
                        setPlacedAllocations(prev => {
                          const newSet = new Set(prev)
                          newSet.delete(optionIndex)
                          return newSet
                        })
                        return
                      }
                      
                      if (allocation.selection === "yes" && allocation.buySellMode === currentMode) {
                        // Deselect if already selected with same mode
                        handleAllocationChange(optionIndex, null, 0, currentMode)
                        setPlacedAllocations(prev => {
                          const newSet = new Set(prev)
                          newSet.delete(optionIndex)
                          return newSet
                        })
                      } else {
                        // Switch to Yes
                        const newAmount = currentMode === "sell" 
                          ? Math.min(allocation.amount || 0, getAvailableToSell(optionIndex, "yes"))
                          : 0 // Always start with 0 when switching in Buy mode
                        handleAllocationChange(
                          optionIndex,
                          "yes",
                          newAmount,
                          currentMode
                        )
                        // Clear placed status when selection changes
                        if (placedAllocations.has(optionIndex)) {
                          setPlacedAllocations(prev => {
                            const newSet = new Set(prev)
                            newSet.delete(optionIndex)
                            return newSet
                          })
                        }
                      }
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      allocation.selection === "yes" && (allocation.buySellMode || "buy") === (allocation.buySellMode || "buy")
                        ? "border-green-500 bg-green-500 text-white"
                        : allocation.selection === "yes"
                        ? "border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400"
                        : "border-border bg-muted/30 hover:border-green-500/50 hover:bg-green-500/5 dark:hover:border-green-500 dark:hover:bg-green-500/15"
                    }`}
                  >
                    <div className="text-left w-full">
                      <div className="font-semibold mb-1">
                        Yes {yesPrice.toFixed(0)}¢
                      </div>
                      {allocation.buySellMode === "sell" && getAvailableToSell(optionIndex, "yes") > 0 && (
                        <div className="text-xs mt-1 text-muted-foreground">
                          Own: ${getAvailableToSell(optionIndex, "yes").toFixed(2)}
                        </div>
                      )}
                      {allocation.selection === "yes" && allocation.amount > 0 && (
                        <div className="text-xs mt-1 opacity-90">
                          {allocation.buySellMode === "sell" ? "Sell" : "Buy"} ${allocation.amount.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </button>

                  {/* No Button */}
                  <button
                    onClick={() => {
                      const currentMode = allocation.buySellMode || "buy"
                      
                      // In Sell mode, check if user has bought position for No
                      if (currentMode === "sell") {
                        const availableToSell = getAvailableToSell(optionIndex, "no")
                        if (availableToSell === 0) {
                          // Can't sell if nothing was bought
                          return
                        }
                      }
                      
                      // In Buy mode, if switching from Yes to No, clear the Yes allocation and switch to No
                      if (currentMode === "buy" && allocation.selection === "yes" && allocation.amount > 0) {
                        // Clear Yes and switch to No with 0 amount (VUSDC is shared)
                        setAllocations(prev => ({
                          ...prev,
                          [optionIndex]: {
                            optionIndex,
                            selection: "no",
                            amount: 0,
                            buySellMode: currentMode,
                          },
                        }))
                        setPlacedAllocations(prev => {
                          const newSet = new Set(prev)
                          newSet.delete(optionIndex)
                          return newSet
                        })
                        return
                      }
                      
                      if (allocation.selection === "no" && allocation.buySellMode === currentMode) {
                        // Deselect if already selected with same mode
                        handleAllocationChange(optionIndex, null, 0, currentMode)
                        setPlacedAllocations(prev => {
                          const newSet = new Set(prev)
                          newSet.delete(optionIndex)
                          return newSet
                        })
                      } else {
                        // Switch to No
                        const newAmount = currentMode === "sell"
                          ? Math.min(allocation.amount || 0, getAvailableToSell(optionIndex, "no"))
                          : 0 // Always start with 0 when switching in Buy mode
                        handleAllocationChange(
                          optionIndex,
                          "no",
                          newAmount,
                          currentMode
                        )
                        // Clear placed status when selection changes
                        if (placedAllocations.has(optionIndex)) {
                          setPlacedAllocations(prev => {
                            const newSet = new Set(prev)
                            newSet.delete(optionIndex)
                            return newSet
                          })
                        }
                      }
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      allocation.selection === "no" && (allocation.buySellMode || "buy") === (allocation.buySellMode || "buy")
                        ? "border-red-500 bg-red-500 text-white"
                        : allocation.selection === "no"
                        ? "border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400"
                        : "border-border bg-muted/30 hover:border-red-500/50 hover:bg-red-500/5 dark:hover:border-red-500 dark:hover:bg-red-500/15"
                    }`}
                  >
                    <div className="text-left w-full">
                      <div className="font-semibold mb-1">
                        No {noPrice.toFixed(0)}¢
                      </div>
                      {allocation.buySellMode === "sell" && getAvailableToSell(optionIndex, "no") > 0 && (
                        <div className="text-xs mt-1 text-muted-foreground">
                          Own: ${getAvailableToSell(optionIndex, "no").toFixed(2)}
                        </div>
                      )}
                      {allocation.selection === "no" && allocation.amount > 0 && (
                        <div className="text-xs mt-1 opacity-90">
                          {allocation.buySellMode === "sell" ? "Sell" : "Buy"} ${allocation.amount.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </button>
                </div>

                {/* Amount Input (only show if selection is made) */}
                {allocation.selection && (
                  <div className="mt-4 p-4 rounded-lg bg-background border border-border">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest block mb-2">
                      Amount to Allocate
                    </label>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-muted-foreground">$</span>
                      <input
                        type="number"
                        value={allocation.amount || ""}
                        onChange={(e) => {
                          let amount = Number.parseFloat(e.target.value) || 0
                          const currentMode = allocation.buySellMode || "buy"
                          
                          // In Sell mode, limit to available to sell
                          if (currentMode === "sell" && allocation.selection) {
                            const maxSell = getAvailableToSell(optionIndex, allocation.selection)
                            amount = Math.min(amount, maxSell)
                          }
                          
                          // In Buy mode, limit to available VUSDC (shared between Yes/No for same option)
                          if (currentMode === "buy" && allocation.selection) {
                            const currentAllocation = allocations[optionIndex]
                            const otherAllocation = currentAllocation?.selection === allocation.selection 
                              ? 0 
                              : (currentAllocation?.amount || 0)
                            const availableVusdc = tradingBalance - otherAllocation
                            amount = Math.min(amount, availableVusdc)
                          }
                          
                          handleAllocationChange(
                            optionIndex,
                            allocation.selection,
                            amount,
                            currentMode
                          )
                          // Remove from placed allocations if amount changes
                          if (placedAllocations.has(optionIndex)) {
                            setPlacedAllocations(prev => {
                              const newSet = new Set(prev)
                              newSet.delete(optionIndex)
                              return newSet
                            })
                          }
                        }}
                        placeholder="0.00"
                        className="flex-1 bg-transparent text-foreground font-mono focus:outline-none placeholder-muted-foreground/50"
                        step="0.01"
                        min="0"
                        max={allocation.buySellMode === "sell" && allocation.selection 
                          ? getAvailableToSell(optionIndex, allocation.selection)
                          : tradingBalance - getOptionTotalAllocation(optionIndex) + (allocation.selection ? allocation.amount : 0)
                        }
                      />
                      <button
                        onClick={async () => {
                          const currentMode = allocation.buySellMode || "buy"
                          let canPlace = false
                          
                          if (currentMode === "sell") {
                            // In Sell mode, check if amount is within available to sell
                            const availableToSell = getAvailableToSell(optionIndex, allocation.selection!)
                            canPlace = allocation.amount > 0 && allocation.amount <= availableToSell
                          } else {
                            // In Buy mode, check VUSDC (shared for Yes/No in same option)
                            const availableVusdc = tradingBalance - getOptionTotalAllocation(optionIndex) + allocation.amount
                            canPlace = allocation.amount > 0 && allocation.amount <= availableVusdc
                          }
                          
                          if (canPlace) {
                            // Record transaction - Scenario 2: Place Bet (this will trigger MetaMask)
                            const tx = await recordTransaction({
                              type: "bet",
                              marketId: marketId,
                              marketQuestion: market?.question,
                              optionName: market?.options[optionIndex]?.name,
                              selection: allocation.selection || undefined,
                              buySellMode: currentMode,
                              amount: allocation.amount,
                            })
                            
                            // Only update state if transaction was successful
                            if (tx) {
                              setPlacedAllocations(prev => new Set(prev).add(optionIndex))
                              
                              // If it's a Buy transaction, track the bought position
                              if (currentMode === "buy" && allocation.selection) {
                                setBoughtPositions(prev => {
                                  const existing = prev.find(
                                    p => p.optionIndex === optionIndex && p.selection === allocation.selection
                                  )
                                  if (existing) {
                                    // Update existing position
                                    return prev.map(p =>
                                      p.optionIndex === optionIndex && p.selection === allocation.selection
                                        ? { ...p, amount: p.amount + allocation.amount }
                                        : p
                                    )
                                  } else {
                                    // Add new position
                                    return [...prev, {
                                      optionIndex,
                                      selection: allocation.selection,
                                      amount: allocation.amount,
                                    }]
                                  }
                                })
                              }
                              
                              // If it's a Sell transaction, reduce the bought position
                              if (currentMode === "sell" && allocation.selection) {
                                setBoughtPositions(prev => {
                                  return prev.map(p => {
                                    if (p.optionIndex === optionIndex && p.selection === allocation.selection) {
                                      const newAmount = p.amount - allocation.amount
                                      return newAmount > 0 ? { ...p, amount: newAmount } : null
                                    }
                                    return p
                                  }).filter(Boolean) as BoughtPosition[]
                                })
                              }
                            }
                          }
                        }}
                        disabled={
                          !allocation.amount || 
                          allocation.amount <= 0 || 
                          (allocation.buySellMode === "sell" 
                            ? allocation.amount > getAvailableToSell(optionIndex, allocation.selection!)
                            : allocation.amount > (tradingBalance - getOptionTotalAllocation(optionIndex) + allocation.amount)
                          ) ||
                          placedAllocations.has(optionIndex) ||
                          isProcessingTransaction ||
                          !authenticated ||
                          !wallet
                        }
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                          allocation.amount > 0 && 
                          (allocation.buySellMode === "sell"
                            ? allocation.amount <= getAvailableToSell(optionIndex, allocation.selection!)
                            : allocation.amount <= (tradingBalance - getOptionTotalAllocation(optionIndex) + allocation.amount)
                          ) &&
                          !placedAllocations.has(optionIndex)
                            ? "bg-foreground text-background hover:opacity-90"
                            : placedAllocations.has(optionIndex)
                            ? "bg-green-600 dark:bg-green-500 text-white cursor-default"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                        }`}
                      >
                        {isProcessingTransaction 
                          ? "Processing..." 
                          : placedAllocations.has(optionIndex) 
                            ? "✓ Placed" 
                            : "Place"}
                      </button>
                    </div>
                    {allocation.amount > 0 && (
                      <div className="text-sm text-muted-foreground">
                        Potential return: ${calculatePotentialWinnings(
                          optionIndex,
                          allocation.selection!,
                          allocation.amount
                        ).toFixed(2)} (includes your ${allocation.amount.toFixed(2)} bet)
                      </div>
                    )}
                    {allocation.buySellMode === "sell" && allocation.selection && (
                      <>
                        {allocation.amount > getAvailableToSell(optionIndex, allocation.selection) && (
                          <div className="text-xs text-red-600 dark:text-red-400 mt-2">
                            Warning: Cannot sell more than you bought. Available to sell: ${getAvailableToSell(optionIndex, allocation.selection).toFixed(2)}
                          </div>
                        )}
                        {getAvailableToSell(optionIndex, allocation.selection) > 0 && (
                          <div className="text-xs text-muted-foreground mt-2">
                            Available to sell: ${getAvailableToSell(optionIndex, allocation.selection).toFixed(2)}
                          </div>
                        )}
                        {getAvailableToSell(optionIndex, allocation.selection) === 0 && (
                          <div className="text-xs text-muted-foreground mt-2">
                            No position to sell. Buy first to create a position.
                          </div>
                        )}
                      </>
                    )}
                    {allocation.buySellMode !== "sell" && (
                      <>
                        {allocation.amount > (tradingBalance - getOptionTotalAllocation(optionIndex) + allocation.amount) && (
                          <div className="text-xs text-red-600 dark:text-red-400 mt-2">
                            Warning: Amount exceeds available VFLR. VFLR is shared between Yes/No for this option.
                          </div>
                        )}
                        {allocation.selection === "yes" && allocations[optionIndex]?.selection === "no" && allocations[optionIndex]?.amount > 0 && (
                          <div className="text-xs text-red-600 dark:text-red-400 mt-2">
                            Warning: You already have {allocations[optionIndex].amount.toFixed(4)} FLR allocated to "No". VFLR is shared between Yes/No.
                          </div>
                        )}
                        {allocation.selection === "no" && allocations[optionIndex]?.selection === "yes" && allocations[optionIndex]?.amount > 0 && (
                          <div className="text-xs text-red-600 dark:text-red-400 mt-2">
                            Warning: You already have {allocations[optionIndex].amount.toFixed(4)} FLR allocated to "Yes". VFLR is shared between Yes/No.
                          </div>
                        )}
                        {allocation.amount > 0 && allocation.amount <= (tradingBalance - getOptionTotalAllocation(optionIndex) + allocation.amount) && (
                          <div className="text-xs text-muted-foreground mt-2">
                            Remaining VFLR: {(tradingBalance - getOptionTotalAllocation(optionIndex)).toFixed(4)} FLR
                          </div>
                        )}
                      </>
                    )}
                    {placedAllocations.has(optionIndex) && (
                      <div className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium">
                        ✓ Allocation placed successfully
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Summary */}
        {totalAllocated > 0 && (
          <div className="mb-8 p-6 rounded-lg border border-border bg-muted/50">
            <h3 className="text-lg font-semibold mb-4">Allocation Summary</h3>
            <div className="space-y-2 mb-4">
              {Object.values(allocations)
                .filter((alloc) => alloc.selection && alloc.amount > 0)
                .map((alloc, idx) => {
                  const potentialReturn = calculatePotentialWinnings(
                    alloc.optionIndex,
                    alloc.selection!,
                    alloc.amount
                  )
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">
                            {market.options[alloc.optionIndex].name} - {alloc.selection?.toUpperCase()}
                          </span>
                          {placedAllocations.has(alloc.optionIndex) && (
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                              ✓ Placed
                            </span>
                          )}
                        </div>
                        <span className="font-mono">
                          ${alloc.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-end text-xs text-muted-foreground">
                        Potential return: ${potentialReturn.toFixed(2)}
                      </div>
                    </div>
                  )
                })}
            </div>
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Max Potential Return:</span>
                <span className="font-mono text-lg font-semibold">
                  ${maxPotentialWinnings.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Maximum return if your winning allocation succeeds
              </p>
            </div>
          </div>
        )}

        {/* Transactions Section */}
        {transactions.filter(tx => tx.marketId === marketId).length > 0 && (
          <div className="mb-8 p-6 rounded-lg border border-border bg-muted/30">
            <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
            <div className="space-y-3">
              {transactions
                .filter(tx => tx.marketId === marketId)
                .slice(0, 10) // Show last 10 transactions
                .map((tx) => {
                  const date = new Date(tx.timestamp)
                  const formattedDate = date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                  const formattedTime = date.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  
                  return (
                    <div
                      key={tx.id}
                      className="p-4 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-semibold capitalize">
                              {tx.type === "deposit" ? "Deposit" : `${tx.buySellMode === "sell" ? "Sell" : "Buy"} Bet`}
                            </span>
                            {tx.status === "completed" && (
                              <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                                <CheckCircle2 size={14} />
                                Completed
                              </span>
                            )}
                            {tx.status === "pending" && (
                              <span className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                                <Clock size={14} />
                                Pending
                              </span>
                            )}
                            {tx.status === "failed" && (
                              <span className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-medium">
                                <XCircle size={14} />
                                Failed
                              </span>
                            )}
                          </div>
                          
                          {tx.type === "bet" && (
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div>
                                <span className="font-medium">Option:</span> {tx.optionName}
                              </div>
                              <div>
                                <span className="font-medium">Selection:</span>{" "}
                                <span className="capitalize">{tx.selection}</span>
                                {tx.buySellMode && (
                                  <span className="ml-2 text-xs px-2 py-0.5 rounded bg-muted">
                                    {tx.buySellMode === "buy" ? "Buy" : "Sell"}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {tx.type === "deposit" && (
                            <div className="text-sm text-muted-foreground">
                              <span className="font-medium">Market:</span> {tx.marketQuestion}
                            </div>
                          )}
                          
                          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{formattedDate} at {formattedTime}</span>
                            {tx.txHash && (
                              <a
                                href={`https://coston2-explorer.flare.network/tx/${tx.txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                View on Explorer
                                <ExternalLink size={12} />
                              </a>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-semibold font-mono">
                            {tx.type === "deposit" ? "+" : ""}${tx.amount.toFixed(2)}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {tx.type === "deposit" ? "Deposited" : "Amount"}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
            {transactions.filter(tx => tx.marketId === marketId).length > 10 && (
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Showing last 10 transactions. Total: {transactions.filter(tx => tx.marketId === marketId).length}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={async () => {
              // Place all unplaced allocations
              const unplacedOptions = Object.values(allocations)
                .filter(alloc => {
                  if (!alloc.selection || alloc.amount <= 0 || placedAllocations.has(alloc.optionIndex)) {
                    return false
                  }
                  
                  const currentMode = alloc.buySellMode || "buy"
                  if (currentMode === "sell") {
                    // In Sell mode, check available to sell
                    return alloc.amount <= getAvailableToSell(alloc.optionIndex, alloc.selection)
                  } else {
                    // In Buy mode, check VUSDC (shared for Yes/No)
                    const availableVusdc = tradingBalance - getOptionTotalAllocation(alloc.optionIndex) + alloc.amount
                    return alloc.amount <= availableVusdc
                  }
                })
              
              if (unplacedOptions.length > 0) {
                // Process transactions sequentially to avoid multiple MetaMask popups at once
                const newSet = new Set(placedAllocations)
                
                for (const alloc of unplacedOptions) {
                  const currentMode = alloc.buySellMode || "buy"
                  
                  // Record transaction - Scenario 2: Place Bet (this will trigger MetaMask)
                  const tx = await recordTransaction({
                    type: "bet",
                    marketId: marketId,
                    marketQuestion: market?.question,
                    optionName: market?.options[alloc.optionIndex]?.name,
                    selection: alloc.selection || undefined,
                    buySellMode: currentMode,
                    amount: alloc.amount,
                  })
                  
                  // Only update state if transaction was successful
                  if (tx) {
                    newSet.add(alloc.optionIndex)
                    
                    // Track bought positions for Buy transactions
                    if (currentMode === "buy" && alloc.selection) {
                      setBoughtPositions(prevPos => {
                        const existing = prevPos.find(
                          p => p.optionIndex === alloc.optionIndex && p.selection === alloc.selection
                        )
                        if (existing) {
                          return prevPos.map(p =>
                            p.optionIndex === alloc.optionIndex && p.selection === alloc.selection
                              ? { ...p, amount: p.amount + alloc.amount }
                              : p
                          )
                        } else {
                          return [...prevPos, {
                            optionIndex: alloc.optionIndex,
                            selection: alloc.selection,
                            amount: alloc.amount,
                          }]
                        }
                      })
                    }
                    
                    // Reduce bought positions for Sell transactions
                    if (currentMode === "sell" && alloc.selection) {
                      setBoughtPositions(prevPos => {
                        return prevPos.map(p => {
                          if (p.optionIndex === alloc.optionIndex && p.selection === alloc.selection) {
                            const newAmount = p.amount - alloc.amount
                            return newAmount > 0 ? { ...p, amount: newAmount } : null
                          }
                          return p
                        }).filter(Boolean) as BoughtPosition[]
                      })
                    }
                  }
                }
                
                setPlacedAllocations(newSet)
              }
            }}
            disabled={
              totalAllocated === 0 || 
              tradingBalance === 0 ||
              Object.values(allocations).some(alloc => {
                if (!alloc.selection || alloc.amount <= 0) return false
                const currentMode = alloc.buySellMode || "buy"
                if (currentMode === "sell") {
                  return alloc.amount > getAvailableToSell(alloc.optionIndex, alloc.selection)
                } else {
                  const availableVusdc = tradingBalance - getOptionTotalAllocation(alloc.optionIndex) + alloc.amount
                  return alloc.amount > availableVusdc
                }
              }) ||
              Object.values(allocations).every(alloc => 
                !alloc.selection || 
                alloc.amount <= 0 || 
                placedAllocations.has(alloc.optionIndex)
              ) ||
              isProcessingTransaction ||
              !authenticated ||
              !wallet
            }
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              totalAllocated > 0 && 
              tradingBalance > 0 &&
              !Object.values(allocations).some(alloc => {
                if (!alloc.selection || alloc.amount <= 0) return false
                const currentMode = alloc.buySellMode || "buy"
                if (currentMode === "sell") {
                  return alloc.amount > getAvailableToSell(alloc.optionIndex, alloc.selection)
                } else {
                  const availableVusdc = tradingBalance - getOptionTotalAllocation(alloc.optionIndex) + alloc.amount
                  return alloc.amount > availableVusdc
                }
              }) &&
              Object.values(allocations).some(alloc => 
                alloc.selection && 
                alloc.amount > 0 && 
                !placedAllocations.has(alloc.optionIndex)
              )
                ? "bg-foreground text-background hover:opacity-90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {isProcessingTransaction ? "Processing Transactions..." : "Place All Remaining Allocations"}
          </button>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 text-sm font-medium rounded-lg hover:bg-muted transition-colors border border-border"
          >
            Cancel
          </button>
        </div>
      </main>

      {/* Deposit Dialog */}
      <Dialog open={depositDialogOpen} onOpenChange={setDepositDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Deposit Funds for This Market</DialogTitle>
            <DialogDescription>
              Add funds to your trading balance for this specific market only
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest block mb-2">
                Deposit Amount
              </label>
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-muted/30">
                <span className="text-muted-foreground">$</span>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 bg-transparent text-foreground font-mono focus:outline-none placeholder-muted-foreground/50"
                  step="0.01"
                  min="0"
                  max={userBalance}
                />
              </div>
              {depositAmount && Number.parseFloat(depositAmount) > userBalance && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                  Deposit amount exceeds your balance of {userBalance.toFixed(4)} FLR
                </p>
              )}
            </div>
            <div className="p-4 rounded-lg border border-border bg-muted/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Your Total Balance:</span>
                <span className="text-sm font-semibold font-mono">{userBalance.toFixed(4)} FLR</span>
              </div>
              {tradingBalance > 0 && (
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-sm text-muted-foreground">Deposited for this market:</span>
                  <span className="text-sm font-semibold font-mono text-foreground">{tradingBalance.toFixed(4)} FLR</span>
                </div>
              )}
              <div className="pt-2 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  Note: Funds deposited here are only available for trading in this specific market question.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setDepositDialogOpen(false)}
              className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors border border-border"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                const amount = Number.parseFloat(depositAmount) || 0
                if (amount > 0 && amount <= userBalance) {
                  // Record transaction - Scenario 1: Deposit (this will trigger MetaMask)
                  const tx = await recordTransaction({
                    type: "deposit",
                    marketId: marketId,
                    marketQuestion: market?.question,
                    amount: amount,
                  })
                  
                  // Only update balances if transaction was successful
                  if (tx) {
                    setTradingBalance((prev) => prev + amount)
                    // Deduct from wallet balance
                    setUserBalance((prev) => prev - amount)
                    // VUSDC will be updated automatically via useEffect when tradingBalance changes
                    setDepositAmount("")
                    setDepositDialogOpen(false)
                  }
                }
              }}
              disabled={
                !depositAmount || 
                Number.parseFloat(depositAmount) <= 0 || 
                Number.parseFloat(depositAmount) > userBalance ||
                isProcessingTransaction ||
                !authenticated ||
                !wallet
              }
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                depositAmount && Number.parseFloat(depositAmount) > 0 && Number.parseFloat(depositAmount) <= userBalance && !isProcessingTransaction
                  ? "bg-foreground text-background hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {isProcessingTransaction ? "Processing Transaction..." : "Deposit"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Trading Balance Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Trading Balance</DialogTitle>
            <DialogDescription>
              Update your trading balance for this market
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest block mb-2">
                Trading Balance Amount
              </label>
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-muted/30">
                <span className="text-muted-foreground">$</span>
                <input
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 bg-transparent text-foreground font-mono focus:outline-none placeholder-muted-foreground/50"
                  step="0.01"
                  min="0"
                  max={userBalance + tradingBalance}
                />
              </div>
              {editAmount && Number.parseFloat(editAmount) > userBalance + tradingBalance && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                  Amount exceeds available balance of {(userBalance + tradingBalance).toFixed(4)} FLR
                </p>
              )}
            </div>
            <div className="p-4 rounded-lg border border-border bg-muted/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Available Balance:</span>
                <span className="text-sm font-semibold font-mono">{(userBalance + tradingBalance).toFixed(4)} FLR</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setEditDialogOpen(false)}
              className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors border border-border"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const amount = Number.parseFloat(editAmount) || 0
                const currentTotal = userBalance + tradingBalance
                if (amount >= 0 && amount <= currentTotal) {
                  const difference = amount - tradingBalance
                  setTradingBalance(amount)
                  // Adjust wallet balance based on difference
                  if (difference > 0) {
                    // Increasing trading balance - deduct from wallet
                    setUserBalance((prev) => Math.max(0, prev - difference))
                  } else if (difference < 0) {
                    // Decreasing trading balance - add back to wallet
                    setUserBalance((prev) => prev - difference)
                  }
                  // VUSDC will be updated automatically via useEffect when tradingBalance changes
                  setEditAmount("")
                  setEditDialogOpen(false)
                }
              }}
              disabled={!editAmount || Number.parseFloat(editAmount) < 0 || Number.parseFloat(editAmount) > userBalance + tradingBalance}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                editAmount && Number.parseFloat(editAmount) >= 0 && Number.parseFloat(editAmount) <= userBalance + tradingBalance
                  ? "bg-foreground text-background hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Save
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Clear Deposit Confirmation Dialog */}
      <Dialog open={clearConfirmDialogOpen} onOpenChange={setClearConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Clear Deposit</DialogTitle>
            <DialogDescription>
              Are you sure you want to clear all deposited funds? This will reset your trading balance and all allocations.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-lg border border-border bg-muted/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Current Trading Balance:</span>
                <span className="text-sm font-semibold font-mono">{tradingBalance.toFixed(4)} FLR</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Allocated:</span>
                <span className="text-sm font-semibold font-mono">${totalAllocated.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              This action cannot be undone. All your allocations will be reset.
            </p>
          </div>
          <DialogFooter>
            <button
              onClick={() => setClearConfirmDialogOpen(false)}
              className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors border border-border"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Return trading balance back to wallet
                setUserBalance((prev) => prev + tradingBalance)
                setTradingBalance(0)
                // Reset all allocations
                const resetAllocations: Record<number, Allocation> = {}
                market.options.forEach((_, idx) => {
                  resetAllocations[idx] = {
                    optionIndex: idx,
                    selection: null,
                    amount: 0,
                    buySellMode: "buy" as const,
                  }
                })
                setAllocations(resetAllocations)
                setPlacedAllocations(new Set())
                // Clear bought positions
                setBoughtPositions([])
                setClearConfirmDialogOpen(false)
              }}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 dark:bg-red-500 text-white hover:opacity-90 transition-opacity"
            >
              Clear Deposit
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
