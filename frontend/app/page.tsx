"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { TrendingUp, X } from "lucide-react"
import AppHeader from "@/components/app-header"
import { useWallets, usePrivy } from "@privy-io/react-auth"
import { useFLRBalance } from "@/src/hooks/useToken"

interface Market {
  id: number
  question: string
  category: string
  options: { name: string; amountBet: number }[] // Changed from percentage to amountBet to represent actual pool
  volume: string
  traders: string
  timeLeft: string
  trend?: number
}

const markets: Market[] = [
  {
    id: 1,
    question: "Which AI model will dominate in 2026?",
    category: "Technology",
    options: [
      { name: "GPT-5", amountBet: 234000000 }, // 45% of 520M
      { name: "Claude-4", amountBet: 182000000 }, // 35% of 520M
      { name: "Gemini-X", amountBet: 104000000 }, // 20% of 520M
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
      { name: "$150k+", amountBet: 315000000 }, // 42% of 750M
      { name: "$100-150k", amountBet: 285000000 }, // 38% of 750M
      { name: "$50-100k", amountBet: 150000000 }, // 20% of 750M
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
      { name: "Yes", amountBet: 234345000 }, // 45% of 521M
      { name: "No", amountBet: 286655000 }, // 55% of 521M
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
      { name: "Yes", amountBet: 284920000 }, // 68% of 419M
      { name: "Maybe", amountBet: 100560000 }, // 24% of 419M
      { name: "No", amountBet: 33520000 }, // 8% of 419M
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
      { name: "Kansas City Chiefs", amountBet: 284640000 }, // 32% of 890M
      { name: "Buffalo Bills", amountBet: 160200000 }, // 18% of 890M
      { name: "San Francisco 49ers", amountBet: 195800000 }, // 22% of 890M
      { name: "Other", amountBet: 249360000 }, // 28% of 890M
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
      { name: "Yes", amountBet: 144400000 }, // 38% of 380M
      { name: "No", amountBet: 235600000 }, // 62% of 380M
    ],
    volume: "$380M",
    traders: "7.2K",
    timeLeft: "90 days",
    trend: -2,
  },
]

const categories = ["All Markets", "Technology", "Crypto", "Economics", "Sports", "Stocks"]

export default function Home() {
  const router = useRouter()
  const { wallets } = useWallets()
  const { authenticated } = usePrivy()
  
  // Get the connected wallet (prefer external wallet like MetaMask)
  const wallet = wallets.find(w => w.walletClientType === "metamask") || wallets[0]
  
  // Fetch real FLR balance from blockchain
  const { data: flrBalance, isLoading: isLoadingBalance } = useFLRBalance(
    wallet?.address as `0x${string}` | undefined
  )
  
  const [userBalance, setUserBalance] = useState<number>(1000)
  
  // Update userBalance when real balance is fetched
  useEffect(() => {
    if (flrBalance !== undefined && !isLoadingBalance) {
      setUserBalance(flrBalance)
    }
  }, [flrBalance, isLoadingBalance])
  
  const [selectedCategory, setSelectedCategory] = useState("All Markets")
  const [selectedMarket, setSelectedMarket] = useState<number | null>(null)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [betAmount, setBetAmount] = useState<string>("")

  const filteredMarkets =
    selectedCategory === "All Markets" ? markets : markets.filter((m) => m.category === selectedCategory)

  const selectedMarketData = markets.find((m) => m.id === selectedMarket)

  // Parse volume string (e.g., "$520M" -> 520000000)
  const parseVolume = (volumeStr: string): number => {
    const match = volumeStr.match(/\$?([\d.]+)([MBK])?/i)
    if (!match) return 0
    
    const value = parseFloat(match[1])
    const suffix = match[2]?.toUpperCase()
    
    if (suffix === 'B') return value * 1000000000
    if (suffix === 'M') return value * 1000000
    if (suffix === 'K') return value * 1000
    return value
  }

  // Format currency value (USD only)
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

  // Get formatted volume
  const getFormattedVolume = (volumeStr: string): string => {
    const volumeInUSD = parseVolume(volumeStr)
    return formatCurrency(volumeInUSD)
  }

  const calculateWinnings = () => {
    if (!betAmount || selectedOption === null || !selectedMarketData) return 0
    const amount = Number.parseFloat(betAmount)
    if (isNaN(amount)) return 0

    const totalPool = selectedMarketData.options.reduce((sum, opt) => sum + opt.amountBet, 0)
    const selectedOpt = selectedMarketData.options[selectedOption]
    const odds = totalPool / selectedOpt.amountBet
    return (amount * odds).toFixed(2)
  }

  const calculateReturnPerUnit = () => {
    if (selectedOption === null || !selectedMarketData) return 0

    // Total pool = sum of all amounts bet on all options
    const totalPool = selectedMarketData.options.reduce((sum, opt) => sum + opt.amountBet, 0)
    const selectedOpt = selectedMarketData.options[selectedOption]

    // Odds = total pool / amount bet on this option
    const odds = totalPool / selectedOpt.amountBet
    return odds.toFixed(2)
  }

  const potentialWinnings = calculateWinnings()
  const returnPerUnit = calculateReturnPerUnit()

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <AppHeader title="Quantum Market" userBalance={isLoadingBalance ? undefined : userBalance} />

        {/* Category Filter */}
        <div className="border-b border-border/80 bg-background sticky top-[65px] z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex gap-2 overflow-x-auto overflow-y-visible scrollbar-hide" style={{ paddingLeft: '12px', paddingRight: '12px', paddingTop: '8px', paddingBottom: '8px', marginLeft: '-12px', marginRight: '-12px' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${selectedCategory === cat
                    ? "bg-foreground text-background scale-105"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-light text-muted-foreground">{filteredMarkets.length} markets</h2>
              <p className="text-xs text-muted-foreground/60 mt-1">Last updated 2 seconds ago</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max">
            {filteredMarkets.map((market) => (
              <button
                key={market.id}
                onClick={() => {
                  router.push(`/market/${market.id}`)
                }}
                className="text-left group border border-border rounded-lg p-6 hover:border-foreground/20 transition-all duration-300 hover:shadow-md hover:bg-muted/30 active:scale-[0.99]"
              >
                {/* Header with Category and Trend */}
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                    {market.category}
                  </span>
                  {market.trend && (
                    <div
                      className={`flex items-center gap-1 text-xs font-medium ${market.trend > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                        }`}
                    >
                      <TrendingUp size={12} />
                      {market.trend > 0 ? "+" : ""}
                      {market.trend}%
                    </div>
                  )}
                </div>

                {/* Question */}
                <h3 className="text-base font-medium leading-snug mb-5 text-foreground line-clamp-3 group-hover:line-clamp-none transition-all">
                  {market.question}
                </h3>

                {/* Options */}
                <div className="space-y-2 mb-6">
                  {market.options.map((option, idx) => (
                    <div
                      key={idx}
                      className={`option-${idx} flex items-center justify-between px-3 py-2.5 rounded-md text-sm group/option hover:bg-muted transition-colors duration-150`}
                    >
                      <span className="font-medium text-foreground group-hover/option:font-semibold">
                        {option.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-12 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-foreground transition-all duration-500"
                            style={{
                              width: `${(option.amountBet / market.options.reduce((sum, opt) => sum + opt.amountBet, 0)) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="font-mono text-sm text-muted-foreground group-hover/option:text-foreground w-8 text-right">
                          {(
                            (option.amountBet / market.options.reduce((sum, opt) => sum + opt.amountBet, 0)) *
                            100
                          ).toFixed(0)}
                          %
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50 text-xs text-muted-foreground">
                  <div className="flex gap-4">
                    <span className="group-hover:text-foreground transition-colors">{getFormattedVolume(market.volume)}</span>
                    <span className="group-hover:text-foreground transition-colors">{market.traders} traders</span>
                  </div>
                  <span className="text-xs group-hover:text-foreground transition-colors">{market.timeLeft}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Empty State */}
          {filteredMarkets.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm">No markets found in this category</p>
            </div>
          )}
        </main>

        {selectedMarket && selectedMarketData && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in">
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <div className="bg-background rounded-lg border border-border max-w-md w-full p-8 animate-in zoom-in-95 shadow-lg max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedMarket(null)}
                  className="absolute top-4 right-4 p-1 hover:bg-muted rounded-md transition-colors"
                >
                  <X size={18} />
                </button>

                <div className="mb-6">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                    {selectedMarketData.category}
                  </span>
                  <h3 className="text-lg font-medium mt-2">{selectedMarketData.question}</h3>
                </div>

                {/* Option Selection */}
                <div className="space-y-2 mb-6">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                    Select an option
                  </p>
                  {selectedMarketData.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 border ${selectedOption === idx
                        ? "border-foreground bg-foreground/10"
                        : "border-border bg-muted hover:bg-muted/80"
                        }`}
                    >
                      <div className="text-left">
                        <div className="font-medium">{option.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                      $1 = $
                      {(
                        selectedMarketData.options.reduce((sum, opt) => sum + opt.amountBet, 0) /
                        option.amountBet
                      ).toFixed(2)}{" "}
                      if correct
                        </div>
                      </div>
                      <span className="font-mono text-sm text-muted-foreground">
                        {(
                          (option.amountBet / selectedMarketData.options.reduce((sum, opt) => sum + opt.amountBet, 0)) *
                          100
                        ).toFixed(0)}
                        %
                      </span>
                    </button>
                  ))}
                </div>

                {/* Bet Amount Input */}
                {selectedOption !== null && (
                  <div className="mb-6">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest block mb-3">
                      Bet amount
                    </label>
                    <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-muted/30">
                      <span className="text-muted-foreground">$</span>
                      <input
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                        placeholder="0.00"
                        className="flex-1 bg-transparent text-foreground font-mono focus:outline-none placeholder-muted-foreground/50"
                        step="1"
                        min="0"
                      />
                    </div>
                  </div>
                )}

                {/* Winnings Display */}
                {selectedOption !== null && betAmount && (
                  <div className="mb-6 p-4 rounded-lg bg-muted/50 border border-border/50">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Potential winnings if correct:</span>
                      <span className="font-mono font-semibold text-lg">
                        ${potentialWinnings}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Based on{" "}
                      {(
                        (selectedMarketData.options[selectedOption].amountBet /
                          selectedMarketData.options.reduce((sum, opt) => sum + opt.amountBet, 0)) *
                        100
                      ).toFixed(0)}
                      % current odds ($1 = $
                      {returnPerUnit})
                    </p>
                  </div>
                )}

                {/* Market Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-t border-b border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Volume</p>
                    <p className="font-semibold text-sm">{getFormattedVolume(selectedMarketData.volume)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Traders</p>
                    <p className="font-semibold text-sm">{selectedMarketData.traders}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Closes in</p>
                    <p className="font-semibold text-sm">{selectedMarketData.timeLeft}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    disabled={selectedOption === null || !betAmount}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${selectedOption !== null && betAmount
                      ? "bg-foreground text-background hover:opacity-90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                  >
                    Place Bet
                  </button>
                  <button
                    onClick={() => setSelectedMarket(null)}
                    className="flex-1 px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors border border-border"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
