"use client"

import { useState } from "react"

export default function Design3() {
  const [selectedMarketId, setSelectedMarketId] = useState(1)

  const markets = [
    {
      id: 1,
      question: "Which AI model will dominate by 2026?",
      category: "Technology",
      options: [
        { name: "GPT-5", percentage: 45 },
        { name: "Claude-4", percentage: 35 },
        { name: "Gemini-X", percentage: 20 },
      ],
      volume: "520M",
      traders: "12.5K",
      description: "Which large language model will have the most market dominance?",
    },
    {
      id: 2,
      question: "Bitcoin price by end of 2025?",
      category: "Crypto",
      options: [
        { name: "$150k+", percentage: 42 },
        { name: "$100-150k", percentage: 38 },
        { name: "$50-100k", percentage: 20 },
      ],
      volume: "750M",
      traders: "28.9K",
      description: "What will be the price of Bitcoin by December 31, 2025?",
    },
    {
      id: 3,
      question: "Will there be US recession in 2025?",
      category: "Politics",
      options: [
        { name: "Yes", percentage: 45 },
        { name: "No", percentage: 55 },
      ],
      volume: "521M",
      traders: "14.5K",
      description: "Will the US economy enter a recession in 2025?",
    },
  ]

  const selectedMarket = markets.find((m) => m.id === selectedMarketId)

  return (
    <div className="flex h-[calc(100vh-120px)]">
      {/* Sidebar */}
      <div className="w-80 border-r border-border overflow-y-auto">
        <div className="p-6 space-y-2">
          {markets.map((market) => (
            <button
              key={market.id}
              onClick={() => setSelectedMarketId(market.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                selectedMarketId === market.id ? "bg-foreground/10 border border-foreground/20" : "hover:bg-muted/50"
              }`}
            >
              <p className="text-sm font-medium line-clamp-2">{market.question}</p>
              <p className="text-xs text-muted-foreground mt-1">{market.category}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {selectedMarket && (
          <div className="max-w-2xl">
            <div className="mb-8">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{selectedMarket.category}</p>
              <h1 className="text-3xl font-light mb-4">{selectedMarket.question}</h1>
              <p className="text-sm text-muted-foreground">{selectedMarket.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Volume</p>
                <p className="text-lg font-medium">${selectedMarket.volume}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Traders</p>
                <p className="text-lg font-medium">{selectedMarket.traders}</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Predictions</p>
              {selectedMarket.options.map((opt) => (
                <div key={opt.name} className="flex items-end justify-between">
                  <span className="text-base font-medium">{opt.name}</span>
                  <div className="flex items-baseline gap-3 ml-4">
                    <div className="w-40 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-foreground rounded-full" style={{ width: `${opt.percentage}%` }} />
                    </div>
                    <span className="text-sm font-mono text-muted-foreground w-12 text-right">{opt.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
