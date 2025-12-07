"use client"

import { useState } from "react"

export default function Design5() {
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
    },
  ]

  const selectedMarket = markets.find((m) => m.id === selectedMarketId)
  const getColorForIndex = (idx: number) => {
    const colors = ["bg-blue-500/20", "bg-purple-500/20", "bg-pink-500/20"]
    return colors[idx % colors.length]
  }

  return (
    <div className="grid grid-cols-3 h-[calc(100vh-120px)]">
      {/* List */}
      <div className="border-r border-border overflow-y-auto p-6 space-y-2">
        {markets.map((market) => (
          <button
            key={market.id}
            onClick={() => setSelectedMarketId(market.id)}
            className={`w-full text-left p-3 rounded text-sm transition-colors ${
              selectedMarketId === market.id ? "bg-muted" : "hover:bg-muted/50"
            }`}
          >
            <p className="font-medium line-clamp-2">{market.question}</p>
          </button>
        ))}
      </div>

      {/* Details */}
      <div className="col-span-2 border-l border-border p-8">
        {selectedMarket && (
          <div>
            <div className="mb-12">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{selectedMarket.category}</p>
              <h1 className="text-4xl font-light">{selectedMarket.question}</h1>
            </div>

            <div className="space-y-6">
              {selectedMarket.options.map((opt, idx) => (
                <div key={opt.name}>
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-lg font-light">{opt.name}</span>
                    <span className="text-3xl font-light text-muted-foreground">{opt.percentage}%</span>
                  </div>
                  <div className={`h-12 rounded-lg ${getColorForIndex(idx)} transition-all`} />
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border space-y-2 text-sm text-muted-foreground">
              <p>Volume: ${selectedMarket.volume}</p>
              <p>Traders: {selectedMarket.traders}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
