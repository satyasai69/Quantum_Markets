"use client"

export default function Design4() {
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
    {
      id: 4,
      question: "Will Apple release AR glasses in 2025?",
      category: "Technology",
      options: [
        { name: "Yes", percentage: 68 },
        { name: "Maybe", percentage: 24 },
        { name: "No", percentage: 8 },
      ],
      volume: "419M",
      traders: "9.8K",
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-2xl font-light">Minimal Cards</h1>
        <p className="text-sm text-muted-foreground mt-1">Click any option to predict</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {markets.map((market) => (
          <div
            key={market.id}
            className="border border-border rounded-lg p-5 hover:border-foreground/30 transition-colors"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">{market.category}</p>
            <h3 className="font-medium text-sm mb-4 line-clamp-2">{market.question}</h3>

            <div className="space-y-2 mb-4">
              {market.options.map((opt) => (
                <button
                  key={opt.name}
                  className="w-full flex items-center justify-between px-3 py-2 rounded text-sm hover:bg-muted transition-colors text-left"
                >
                  <span>{opt.name}</span>
                  <span className="font-mono text-muted-foreground">{opt.percentage}%</span>
                </button>
              ))}
            </div>

            <div className="flex gap-4 text-xs text-muted-foreground pt-3 border-t border-border/50">
              <span>${market.volume}</span>
              <span>{market.traders}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
