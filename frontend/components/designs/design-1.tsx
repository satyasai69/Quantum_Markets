"use client"

import { TrendingUp, MessageCircle, Share2, Heart } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import MarketBadge from "@/components/market-badge"
import OddsBar from "@/components/odds-bar"

export default function Design1({ isDark }: { isDark: boolean }) {
  const markets = [
    {
      id: 1,
      category: "Technology",
      question: "Which AI model will dominate by 2026?",
      options: [
        { name: "GPT-5", probability: 45, volume: "245M" },
        { name: "Claude-4", probability: 35, volume: "195M" },
        { name: "Gemini-X", probability: 20, volume: "80M" },
      ],
      volume: "520M",
      traders: 12543,
      likes: 2341,
      closes: "18 months",
    },
    {
      id: 2,
      category: "AI",
      question: "Next major AI breakthrough?",
      options: [
        { name: "Multimodal AGI", probability: 38, volume: "156M" },
        { name: "Reasoning AI", probability: 42, volume: "186M" },
        { name: "Embodied AI", probability: 20, volume: "78M" },
      ],
      volume: "420M",
      traders: 8934,
      likes: 5623,
      closes: "2 years",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Market Category Filters */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {["All", "Technology", "AI", "Climate", "Politics", "Sports"].map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
              cat === "All" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Markets Grid */}
      <div className="space-y-4">
        {markets.map((market) => (
          <Card key={market.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <MarketBadge category={market.category} />
                  <h3 className="text-lg font-semibold mt-2">{market.question}</h3>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div>Closes in</div>
                  <div className="font-medium">{market.closes}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {market.options.map((option, idx) => (
                  <OddsBar key={idx} name={option.name} probability={option.probability} volume={option.volume} />
                ))}
              </div>

              {/* Market Stats & Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <TrendingUp size={14} />
                    Volume: {market.volume}
                  </span>
                  <span>{market.traders.toLocaleString()} traders</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-muted">
                    <Heart size={16} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-muted">
                    <MessageCircle size={16} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-muted">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
