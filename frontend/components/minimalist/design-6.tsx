"use client"

export default function Design6() {
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
    <div className="max-w-3xl mx-auto px-8 py-12">
      <div className="mb-16">
        <h1 className="text-3xl font-light">Focus Mode</h1>
        <p className="text-sm text-muted-foreground mt-2">One question at a time</p>
      </div>

      <div className="space-y-24">
        {markets.map((market, idx) => (
          <div key={market.id} className="pt-12 border-t border-border first:border-0 first:pt-0">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">{market.category}</p>
            <h2 className="text-2xl font-light mb-8 leading-tight">{market.question}</h2>

            <div className="space-y-3 mb-8">
              {market.options.map((opt) => (
                <button
                  key={opt.name}
                  className="w-full px-6 py-4 border border-border rounded-lg hover:border-foreground/30 transition-colors text-left group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium group-hover:translate-x-0.5 transition-transform">{opt.name}</span>
                    <span className="text-muted-foreground font-mono">{opt.percentage}%</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-8 text-xs text-muted-foreground">
              <span>Volume: ${market.volume}</span>
              <span>Traders: {market.traders}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
