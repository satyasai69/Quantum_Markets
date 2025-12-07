"use client"

import { TrendingUp, MessageCircle, Share2, Heart } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import MarketBadge from "@/components/market-badge"

export default function Design6({ isDark }: { isDark: boolean }) {
  const markets = [
    {
      id: 1,
      category: "Crypto",
      size: "large",
      question: "Bitcoin price by end of 2025?",
      options: [
        { name: "$150k+", probability: 42 },
        { name: "$100-150k", probability: 38 },
        { name: "$50-100k", probability: 20 },
      ],
      volume: "892M",
      traders: 24532,
    },
    {
      id: 2,
      category: "AI",
      size: "small",
      question: "Next AI milestone?",
      options: [
        { name: "AGI", probability: 38 },
        { name: "Advanced Reasoning", probability: 45 },
        { name: "Other", probability: 17 },
      ],
      volume: "156M",
      traders: 8934,
    },
    {
      id: 3,
      category: "Tech",
      size: "small",
      question: "Apple next release?",
      options: [
        { name: "AR Glasses", probability: 42 },
        { name: "VR Headset", probability: 35 },
        { name: "AI Device", probability: 23 },
      ],
      volume: "234M",
      traders: 12103,
    },
    {
      id: 4,
      category: "Climate",
      size: "medium",
      question: "Climate summit outcome?",
      options: [
        { name: "Strong Action", probability: 38 },
        { name: "Moderate Action", probability: 45 },
        { name: "Weak Action", probability: 17 },
      ],
      volume: "345M",
      traders: 7821,
    },
    {
      id: 5,
      category: "Sports",
      size: "small",
      question: "World Cup winner?",
      options: [
        { name: "European", probability: 45 },
        { name: "South American", probability: 35 },
        { name: "Other", probability: 20 },
      ],
      volume: "89M",
      traders: 3421,
    },
    {
      id: 6,
      category: "Elections",
      size: "medium",
      question: "2028 election winner?",
      options: [
        { name: "Candidate A", probability: 35 },
        { name: "Candidate B", probability: 40 },
        { name: "Third Party", probability: 25 },
      ],
      volume: "1.2B",
      traders: 34521,
    },
  ]

  const getGridClass = (size: string) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2"
      case "medium":
        return "md:col-span-2"
      default:
        return ""
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-max">
        {markets.map((market) => (
          <Card
            key={market.id}
            className={`overflow-hidden hover:shadow-lg transition-all ${getGridClass(market.size)}`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <MarketBadge category={market.category} />
              </div>
              <h3 className={`font-bold leading-tight ${market.size === "large" ? "text-xl" : "text-sm"}`}>
                {market.question}
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {market.options.map((option, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-muted-foreground">{option.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            idx === 0 ? "bg-emerald-500" : idx === 1 ? "bg-blue-500" : "bg-red-500"
                          }`}
                          style={{ width: `${option.probability}%` }}
                        />
                      </div>
                      <span className="font-bold w-8 text-right">{option.probability}%</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              {market.size !== "small" && (
                <div className="pt-2 border-t border-border space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <TrendingUp size={12} />
                    {market.volume} volume
                  </div>
                  <div>{market.traders.toLocaleString()} traders</div>
                </div>
              )}

              {/* Action Buttons */}
              {market.size === "large" && (
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                  <button className="p-2 rounded hover:bg-muted text-center text-xs">
                    <Heart size={16} className="mx-auto mb-1" />
                    Like
                  </button>
                  <button className="p-2 rounded hover:bg-muted text-center text-xs">
                    <MessageCircle size={16} className="mx-auto mb-1" />
                    Chat
                  </button>
                  <button className="p-2 rounded hover:bg-muted text-center text-xs">
                    <Share2 size={16} className="mx-auto mb-1" />
                    Share
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
