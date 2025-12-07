"use client"

import { useState } from "react"

export default function Design2() {
  const [expandedId, setExpandedId] = useState<number | null>(1)

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

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-light mb-1">Markets</h1>
        <p className="text-sm text-muted-foreground">{markets.length} prediction markets</p>
      </div>

      <div className="space-y-3">
        {markets.map((market) => (
          <div
            key={market.id}
            className="border border-border rounded-lg p-6 cursor-pointer hover:border-foreground/30 transition-colors"
            onClick={() => setExpandedId(expandedId === market.id ? null : market.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p className="font-medium text-base">{market.question}</p>
                <p className="text-xs text-muted-foreground mt-2">{market.category}</p>
              </div>
              <div className="text-right ml-4">
                <p className="text-sm font-mono text-muted-foreground">${market.volume}</p>
                <p className="text-xs text-muted-foreground">{market.traders} traders</p>
              </div>
            </div>

            {expandedId === market.id && (
              <div className="mt-6 pt-6 border-t border-border space-y-3">
                {market.options.map((opt) => (
                  <div key={opt.name} className="flex items-center justify-between">
                    <span className="text-sm">{opt.name}</span>
                    <div className="flex items-center gap-3 ml-4">
                      <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-foreground rounded-full transition-all"
                          style={{ width: `${opt.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-mono text-muted-foreground w-10 text-right">{opt.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
