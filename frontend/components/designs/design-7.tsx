"use client"
import MarketBadge from "@/components/market-badge"

export default function Design7({ isDark }: { isDark: boolean }) {
  const markets = [
    {
      id: 1,
      category: "Technology",
      question: "Will Bitcoin reach $100k in 2025?",
      options: [
        { name: "Yes", probability: 72 },
        { name: "No", probability: 28 },
      ],
      volume: "340M",
      closes: "15 days",
    },
    {
      id: 2,
      category: "AI",
      question: "Next major AI breakthrough?",
      options: [
        { name: "Reasoning AI", probability: 48 },
        { name: "Embodied AI", probability: 35 },
        { name: "Other", probability: 17 },
      ],
      volume: "256M",
      closes: "6 months",
    },
    {
      id: 3,
      category: "Climate",
      question: "Climate record by 2027?",
      options: [
        { name: "Yes", probability: 65 },
        { name: "No", probability: 25 },
        { name: "Uncertain", probability: 10 },
      ],
      volume: "189M",
      closes: "2 years",
    },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 space-y-3">
      {markets.map((market) => (
        <div
          key={market.id}
          className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <MarketBadge category={market.category} />
                <span className="text-xs text-muted-foreground">{market.closes}</span>
              </div>
              <h3 className="text-sm font-semibold text-pretty">{market.question}</h3>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-xs text-muted-foreground">Volume</div>
              <div className="text-xs font-bold">{market.volume}</div>
            </div>
          </div>

          {/* Options - Horizontal Bar */}
          <div className="flex items-center gap-2 h-6">
            {market.options.map((option, idx) => {
              const colors = ["bg-emerald-500", "bg-red-500", "bg-blue-500"]
              return (
                <div
                  key={idx}
                  className={`h-full rounded flex items-center justify-center text-xs font-bold text-white transition-all hover:opacity-80 ${
                    colors[idx]
                  }`}
                  style={{ width: `${option.probability}%`, minWidth: "30px" }}
                  title={`${option.name}: ${option.probability}%`}
                >
                  {option.probability > 15 && `${option.name}`}
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-3 text-xs">
            {market.options.map((option, idx) => {
              const colors = ["bg-emerald-500", "bg-red-500", "bg-blue-500"]
              return (
                <div key={idx} className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${colors[idx]}`} />
                  <span>
                    {option.name} {option.probability}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
