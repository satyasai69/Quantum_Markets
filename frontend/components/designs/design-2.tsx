"use client"
import { Card, CardContent } from "@/components/ui/card"
import MarketBadge from "@/components/market-badge"

export default function Design2({ isDark }: { isDark: boolean }) {
  const markets = [
    {
      id: 1,
      category: "Crypto",
      question: "Which coin will have highest gains in 2025?",
      options: [
        { name: "Bitcoin", probability: 45, volume: "892M", color: "from-orange-500" },
        { name: "Ethereum", probability: 35, volume: "645M", color: "from-purple-500" },
        { name: "Solana", probability: 20, volume: "267M", color: "from-cyan-500" },
      ],
      change: "+12.4%",
      volume: "1.8B",
      time: "closes 3 days",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="border-primary/50 bg-gradient-to-br from-primary/10 to-transparent">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">24H Volume</div>
            <div className="text-3xl font-bold mt-1">$8.2B</div>
            <div className="text-xs text-emerald-500 mt-2">+12.4%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Active Markets</div>
            <div className="text-3xl font-bold mt-1">1,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Traders Online</div>
            <div className="text-3xl font-bold mt-1">23.4K</div>
          </CardContent>
        </Card>
      </div>

      {/* Markets */}
      <div className="space-y-4">
        {markets.map((market) => (
          <Card key={market.id} className="overflow-hidden border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MarketBadge category={market.category} />
                    <span className="text-xs font-medium text-muted-foreground">{market.time}</span>
                  </div>
                  <h3 className="text-xl font-bold">{market.question}</h3>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-emerald-500">{market.change}</div>
                  <div className="text-xs text-muted-foreground">Volume: {market.volume}</div>
                </div>
              </div>

              <div className={`grid gap-4 ${market.options.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                {market.options.map((option, idx) => {
                  const colors = [
                    "border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent hover:border-orange-500/60",
                    "border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-transparent hover:border-purple-500/60",
                    "border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-transparent hover:border-cyan-500/60",
                  ]
                  return (
                    <button
                      key={idx}
                      className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${colors[idx] || colors[0]}`}
                    >
                      <div className="text-sm font-medium text-muted-foreground mb-2">{option.name}</div>
                      <div className="text-4xl font-bold mb-1">{option.probability}%</div>
                      <div className="text-xs text-muted-foreground">Vol: {option.volume}</div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
