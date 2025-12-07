"use client"

import { TrendingUp, Users } from "lucide-react"
import MarketBadge from "@/components/market-badge"

export default function Design10({ isDark }: { isDark: boolean }) {
  const markets = [
    {
      id: 1,
      category: "Crypto",
      question: "Bitcoin price by EOY 2025?",
      options: [
        { name: "$120k-$150k", probability: 42 },
        { name: "$80k-$120k", probability: 38 },
        { name: "$50k-$80k", probability: 20 },
      ],
      volume: "892M",
      traders: 24532,
    },
    {
      id: 2,
      category: "AI",
      question: "Major AI milestone in 2025?",
      options: [
        { name: "Reasoning breakthrough", probability: 48 },
        { name: "Embodied AI advance", probability: 35 },
        { name: "Other", probability: 17 },
      ],
      volume: "456M",
      traders: 18934,
    },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 space-y-6">
      {markets.map((market) => (
        <div key={market.id} className="space-y-4">
          {/* Question Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MarketBadge category={market.category} />
              <span className="text-xs text-muted-foreground">Live Market</span>
            </div>
            <h3 className="text-lg font-semibold">{market.question}</h3>
          </div>

          {/* Options Stacked */}
          <div className="space-y-2">
            {market.options.map((option, idx) => {
              const colors = ["from-emerald-500", "from-purple-500", "from-blue-500"]
              return (
                <button
                  key={idx}
                  className={`w-full group relative overflow-hidden rounded-lg transition-all hover:shadow-lg`}
                >
                  {/* Background Bar */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${
                      colors[idx] || colors[0]
                    } to-transparent opacity-10 transition-opacity group-hover:opacity-20`}
                    style={{ width: `${option.probability}%` }}
                  />

                  {/* Content */}
                  <div className="relative p-4 border border-border rounded-lg bg-card group-hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">{option.name}</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-foreground">{option.probability}%</div>
                        <div className="text-xs text-muted-foreground">of predictions</div>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Market Stats */}
          <div className="flex gap-6 text-sm border-t border-border pt-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp size={16} />
              <span>Volume: {market.volume}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users size={16} />
              <span>{market.traders.toLocaleString()} traders</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
