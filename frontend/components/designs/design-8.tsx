"use client"

import { MessageCircle, Heart } from "lucide-react"
import MarketBadge from "@/components/market-badge"

export default function Design8({ isDark }: { isDark: boolean }) {
  const markets = [
    {
      id: 1,
      category: "Crypto",
      question: "Best performing crypto 2025?",
      options: [
        { name: "Bitcoin", probability: 45, volume: "245M" },
        { name: "Ethereum", probability: 35, volume: "195M" },
        { name: "Other", probability: 20, volume: "80M" },
      ],
      traders: 12543,
      likes: 2341,
    },
    {
      id: 2,
      category: "AI",
      question: "Next AI model leader?",
      options: [
        { name: "GPT-5", probability: 40, volume: "156M" },
        { name: "Claude", probability: 35, volume: "145M" },
        { name: "Gemini", probability: 25, volume: "115M" },
      ],
      traders: 8934,
      likes: 5623,
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 space-y-3">
      {markets.map((market) => (
        <div key={market.id} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
          {/* Title */}
          <div className="flex items-start gap-3 mb-3">
            <MarketBadge category={market.category} />
            <h3 className="text-sm font-semibold flex-1">{market.question}</h3>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {market.options.map((option, idx) => (
              <button key={idx} className="p-3 rounded-lg bg-muted/50 hover:bg-muted text-center transition-colors">
                <div className="text-2xl font-bold text-foreground">{option.probability}%</div>
                <div className="text-xs text-muted-foreground mt-1">{option.name}</div>
                <div className="text-xs text-muted-foreground">{option.volume}</div>
              </button>
            ))}
          </div>

          {/* Footer Stats */}
          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>{market.traders.toLocaleString()} traders</span>
            <div className="flex gap-4">
              <button className="flex items-center gap-1 hover:text-foreground transition">
                <Heart size={14} />
                {market.likes}
              </button>
              <button className="flex items-center gap-1 hover:text-foreground transition">
                <MessageCircle size={14} />
                Comment
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
