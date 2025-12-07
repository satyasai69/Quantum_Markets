"use client"

import { Heart, MessageCircle, Share2, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import MarketBadge from "@/components/market-badge"

export default function Design5({ isDark }: { isDark: boolean }) {
  const feed = [
    {
      id: 1,
      category: "Climate",
      question: "Hottest year on record in 2025?",
      options: [
        { name: "Yes", probability: 72 },
        { name: "No", probability: 28 },
      ],
      closeSoon: true,
      volume: "289M",
      comments: 543,
      likes: 2341,
    },
    {
      id: 2,
      category: "Elections",
      question: "2026 US midterm winner?",
      options: [
        { name: "Republicans", probability: 48 },
        { name: "Democrats", probability: 52 },
      ],
      closeSoon: false,
      volume: "1.2B",
      comments: 3892,
      likes: 12450,
    },
    {
      id: 3,
      category: "Space",
      question: "Next space exploration milestone?",
      options: [
        { name: "Mars Landing", probability: 22 },
        { name: "Lunar Base", probability: 48 },
        { name: "Asteroid Mining", probability: 30 },
      ],
      closeSoon: false,
      volume: "456M",
      comments: 1203,
      likes: 8765,
    },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 space-y-4">
      {feed.map((market) => (
        <Card key={market.id} className="overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-md">
          <CardContent className="p-6">
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <MarketBadge category={market.category} />
                {market.closeSoon && (
                  <span className="px-2 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-semibold">
                    Closes Soon
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold leading-tight">{market.question}</h3>
            </div>

            <div className={`grid gap-3 mb-6 ${market.options.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
              {market.options.map((option, idx) => {
                const colors = [
                  "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 hover:border-emerald-500/60 hover:bg-emerald-500/10",
                  "border-red-500/30 bg-red-500/5 text-red-600 hover:border-red-500/60 hover:bg-red-500/10",
                  "border-blue-500/30 bg-blue-500/5 text-blue-600 hover:border-blue-500/60 hover:bg-blue-500/10",
                ]
                return (
                  <button
                    key={idx}
                    className={`p-4 rounded-lg border-2 font-bold text-lg transition-all hover:scale-105 ${colors[idx] || colors[0]}`}
                  >
                    <div>{option.name}</div>
                    <div className="text-2xl mt-1">{option.probability}%</div>
                  </button>
                )
              })}
            </div>

            {/* Volume Info */}
            <div className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
              <TrendingUp size={14} />
              Volume: {market.volume}
            </div>

            {/* Engagement Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex gap-4 text-sm text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-foreground transition">
                  <MessageCircle size={16} />
                  {market.comments}
                </button>
                <button className="flex items-center gap-1 hover:text-foreground transition">
                  <Heart size={16} />
                  {market.likes}
                </button>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                <Share2 size={14} />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
