"use client"

import { Heart, MessageCircle, Share2, Flame } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import MarketBadge from "@/components/market-badge"

export default function Design3({ isDark }: { isDark: boolean }) {
  const markets = [
    {
      id: 1,
      category: "Sports",
      question: "Will Warriors win the 2025 NBA Championship?",
      options: [
        { name: "Yes", probability: 34, color: "bg-blue-500" },
        { name: "No", probability: 66, color: "bg-orange-500" },
      ],
      hot: true,
      comments: 342,
      predictions: 5230,
      shares: 821,
      timeLeft: "6 months",
    },
    {
      id: 2,
      category: "Politics",
      question: "Will there be a US recession in 2025?",
      options: [
        { name: "Yes", probability: 45, color: "bg-red-500" },
        { name: "No", probability: 55, color: "bg-green-500" },
      ],
      hot: false,
      comments: 1204,
      predictions: 12450,
      shares: 3421,
      timeLeft: "1 year",
    },
    {
      id: 3,
      category: "Technology",
      question: "Will Apple release an AI phone in 2025?",
      options: [
        { name: "Yes", probability: 72, color: "bg-purple-500" },
        { name: "No", probability: 28, color: "bg-gray-500" },
      ],
      hot: true,
      comments: 892,
      predictions: 8765,
      shares: 2103,
      timeLeft: "8 months",
    },
    {
      id: 4,
      category: "Sports",
      question: "2025 NBA Championship winner?",
      options: [
        { name: "Lakers", probability: 24, color: "bg-purple-500" },
        { name: "Celtics", probability: 32, color: "bg-green-500" },
        { name: "Warriors", probability: 18, color: "bg-blue-500" },
        { name: "Other", probability: 26, color: "bg-gray-500" },
      ],
      hot: true,
      comments: 342,
      predictions: 5230,
      shares: 821,
      timeLeft: "6 months",
    },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 space-y-6">
      {markets.map((market) => (
        <Card key={market.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <MarketBadge category={market.category} />
                {market.hot && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/20 text-orange-600 text-xs font-semibold">
                    <Flame size={12} />
                    Hot
                  </div>
                )}
              </div>
              <div className="text-xs font-medium text-muted-foreground">{market.timeLeft}</div>
            </div>

            {/* Question */}
            <h3 className="text-xl font-bold mb-6">{market.question}</h3>

            {/* Prediction Options */}
            <div className={`grid gap-4 mb-6 ${market.options.length > 2 ? "grid-cols-2" : "grid-cols-2"}`}>
              {market.options.map((option, idx) => (
                <button
                  key={idx}
                  className={`relative p-6 rounded-xl text-white font-bold text-lg transition-all hover:scale-105 overflow-hidden group ${option.color}`}
                >
                  <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity" />
                  <div className="relative z-10">
                    <div className="text-sm font-medium opacity-90 mb-1">{option.name}</div>
                    <div className="text-4xl font-black">{option.probability}%</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Engagement Stats & Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex gap-6 text-sm text-muted-foreground">
                <button className="flex items-center gap-2 hover:text-foreground transition">
                  <MessageCircle size={16} />
                  {market.comments}
                </button>
                <button className="flex items-center gap-2 hover:text-foreground transition">
                  <Heart size={16} />
                  {market.predictions}
                </button>
                <button className="flex items-center gap-2 hover:text-foreground transition">
                  <Share2 size={16} />
                  {market.shares}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
