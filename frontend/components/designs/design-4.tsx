"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import OddsBar from "@/components/odds-bar"

export default function Design4({ isDark }: { isDark: boolean }) {
  const categories = [
    {
      name: "Crypto",
      markets: [
        {
          id: 1,
          question: "Top performing crypto in 2025?",
          options: [
            { name: "Bitcoin", probability: 45, volume: "245M" },
            { name: "Ethereum", probability: 35, volume: "195M" },
            { name: "Other", probability: 20, volume: "80M" },
          ],
          timeLeft: "15 days",
        },
      ],
    },
    {
      name: "AI",
      markets: [
        {
          id: 3,
          question: "Next breakthrough AI capability?",
          options: [
            { name: "Reasoning", probability: 40, volume: "189M" },
            { name: "Embodied AI", probability: 35, volume: "168M" },
            { name: "Multimodal", probability: 25, volume: "143M" },
          ],
          timeLeft: "6 months",
        },
      ],
    },
    {
      name: "Tech",
      markets: [
        {
          id: 4,
          question: "Next major tech innovation?",
          options: [
            { name: "AR Glasses", probability: 38, volume: "98M" },
            { name: "Brain-Computer", probability: 35, volume: "125M" },
            { name: "Quantum", probability: 27, volume: "103M" },
          ],
          timeLeft: "2 years",
        },
      ],
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Tabs defaultValue="Crypto" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {categories.map((cat) => (
            <TabsTrigger key={cat.name} value={cat.name}>
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.name} value={category.name} className="space-y-4 mt-6">
            {category.markets.map((market) => (
              <Card key={market.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-base">{market.question}</h3>
                    <span className="text-xs text-muted-foreground font-medium">{market.timeLeft}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {market.options.map((option, idx) => (
                    <OddsBar key={idx} name={option.name} probability={option.probability} volume={option.volume} />
                  ))}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
