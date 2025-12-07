import { Heart, MessageCircle, Share2, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import MarketBadge from "@/components/market-badge"

interface MarketOption {
  name: string
  probability: number
  volume: string
}

interface MarketCardProps {
  category: string
  question: string
  options: MarketOption[]
  volume: string
  traders: number
  likes: number
  closes: string
}

export default function MarketCard({ category, question, options, volume, traders, likes, closes }: MarketCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <MarketBadge category={category} />
          <span className="text-xs font-medium text-muted-foreground">{closes}</span>
        </div>

        {/* Question */}
        <h3 className="text-lg font-semibold mb-6 leading-tight hover:text-primary transition-colors cursor-pointer">
          {question}
        </h3>

        {/* Options */}
        <div className={`grid gap-3 mb-6 ${options.length > 2 ? "grid-cols-3" : "grid-cols-2"}`}>
          {options.map((option, idx) => {
            const colors = [
              "border-blue-500/30 bg-blue-500/5 hover:border-blue-500/60 hover:bg-blue-500/10",
              "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/60 hover:bg-emerald-500/10",
              "border-orange-500/30 bg-orange-500/5 hover:border-orange-500/60 hover:bg-orange-500/10",
            ]
            return (
              <button
                key={idx}
                className={`p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 active:scale-95 ${colors[idx] || colors[0]}`}
              >
                <div className="text-xs font-medium text-muted-foreground mb-1">{option.name}</div>
                <div className="text-2xl font-bold">{option.probability}%</div>
              </button>
            )
          })}
        </div>

        {/* Stats Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <TrendingUp size={14} />
              {volume}
            </span>
            <span>{traders.toLocaleString()} traders</span>
          </div>
          <span className="font-medium text-sm flex items-center gap-1">
            <Heart size={14} />
            {likes.toLocaleString()}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-border/50">
          <button className="flex-1 h-8 rounded-lg flex items-center justify-center gap-2 text-xs font-medium bg-muted hover:bg-muted/70 transition-colors">
            <Heart size={14} />
            Like
          </button>
          <button className="flex-1 h-8 rounded-lg flex items-center justify-center gap-2 text-xs font-medium bg-muted hover:bg-muted/70 transition-colors">
            <MessageCircle size={14} />
            Comment
          </button>
          <button className="flex-1 h-8 rounded-lg flex items-center justify-center gap-2 text-xs font-medium bg-muted hover:bg-muted/70 transition-colors">
            <Share2 size={14} />
            Share
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
