"use client"

export default function Design1() {
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
      closes: "18mo",
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
      closes: "1y",
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
      closes: "1y",
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
      closes: "8mo",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-light mb-1">Active Markets</h1>
        <p className="text-sm text-muted-foreground">{markets.length} markets</p>
      </div>

      <div className="space-y-px border border-border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-muted/30 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wide">
          <div className="col-span-5">Question</div>
          <div className="col-span-3">Options</div>
          <div className="col-span-2">Volume</div>
          <div className="col-span-2 text-right">Traders</div>
        </div>

        {/* Rows */}
        {markets.map((market, idx) => (
          <div
            key={market.id}
            className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-muted/20 transition-colors cursor-pointer ${
              idx !== markets.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="col-span-5">
              <p className="font-medium text-sm">{market.question}</p>
              <p className="text-xs text-muted-foreground mt-1">{market.category}</p>
            </div>

            <div className="col-span-3">
              <div className="flex flex-wrap gap-1">
                {market.options.map((opt) => (
                  <span
                    key={opt.name}
                    className="inline-block px-2 py-1 bg-muted text-xs rounded text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {opt.name} {opt.percentage}%
                  </span>
                ))}
              </div>
            </div>

            <div className="col-span-2 text-sm text-muted-foreground">${market.volume}</div>
            <div className="col-span-2 text-sm text-muted-foreground text-right">{market.traders}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
