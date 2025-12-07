"use client"

import { ChevronRight } from "lucide-react"
import { useState } from "react"
import MarketBadge from "@/components/market-badge"

export default function Design9({ isDark }: { isDark: boolean }) {
  const [selectedMarket, setSelectedMarket] = useState(1)

  const markets = [
    {
      id: 1,
      category: "Crypto",
      question: "Bitcoin hitting $100k?",
      options: [
        { name: "Yes", probability: 72 },
        { name: "No", probability: 28 },
      ],
      volume: "340M",
      traders: 12543,
    },
    {
      id: 2,
      category: "AI",
      question: "AGI by 2030?",
      options: [
        { name: "Yes", probability: 38 },
        { name: "No", probability: 45 },
        { name: "Maybe", probability: 17 },
      ],
      volume: "256M",
      traders: 8934,
    },
    {
      id: 3,
      category: "Tech",
      question: "Next major innovation?",
      options: [
        { name: "AR", probability: 42 },
        { name: "Quantum", probability: 35 },
        { name: "Brain-Computer", probability: 23 },
      ],
      volume: "189M",
      traders: 6721,
    },
  ]

  const selected = markets.find((m) => m.id === selectedMarket)

  return (
    <div className="max-w-4xl mx-auto px-4 flex gap-6">
      {/* Sidebar */}
      <div className="w-64 space-y-2">
        {markets.map((market) => (
          <button
            key={market.id}
            onClick={() => setSelectedMarket(market.id)}
            className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between group ${
              selectedMarket === market.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-foreground hover:bg-muted"
            }`}
          >
            <div>
              <div className="text-xs opacity-75">{market.category}</div>
              <div className="text-sm font-medium text-pretty">{market.question}</div>
            </div>
            <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </button>
        ))}
      </div>

      {/* Main Content */}
      {selected && (
        <div className="flex-1">
          <div className="border border-border rounded-lg p-6">
            {/* Header */}
            <div className="mb-6">
              <MarketBadge category={selected.category} />
              <h2 className="text-2xl font-bold mt-3 mb-2">{selected.question}</h2>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <span>{selected.traders.toLocaleString()} traders</span>
                <span>Volume: {selected.volume}</span>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {selected.options.map((option, idx) => {
                const colors = [
                  "border-emerald-500 bg-emerald-500/5",
                  "border-red-500 bg-red-500/5",
                  "border-blue-500 bg-blue-500/5",
                ]
                return (
                  <button
                    key={idx}
                    className={`w-full p-4 rounded-lg border-2 transition-all hover:scale-105 text-left ${
                      colors[idx] || colors[0]
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{option.name}</span>
                      <span className="text-2xl font-bold">{option.probability}%</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
