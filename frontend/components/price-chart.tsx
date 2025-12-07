"use client"

import React, { useState, useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

interface PriceDataPoint {
  time: string
  [key: string]: string | number
}

interface PriceChartProps {
  options: { name: string; amountBet: number }[]
  data?: PriceDataPoint[] // Optional, will be generated if not provided
}

export type TimePeriod = "1H" | "1D" | "1W" | "1M"

// Generate static mock data for price history based on time period
export function generateMockPriceData(
  options: { name: string; amountBet: number }[],
  timePeriod: TimePeriod = "1M"
): PriceDataPoint[] {
  const data: PriceDataPoint[] = []
  const totalPool = options.reduce((sum, opt) => sum + opt.amountBet, 0)
  
  // Current probabilities
  const currentProbs = options.map(opt => (opt.amountBet / totalPool) * 100)
  
  // Determine number of data points and interval based on time period
  let totalPoints: number
  let intervalMinutes: number
  
  switch (timePeriod) {
    case "1H":
      totalPoints = 12 // 1 point per 5 minutes (12 points = 60 minutes)
      intervalMinutes = 5
      break
    case "1D":
      totalPoints = 24 // 1 point per hour
      intervalMinutes = 60
      break
    case "1W":
      totalPoints = 7 // 1 point per day
      intervalMinutes = 24 * 60
      break
    case "1M":
      totalPoints = 30 // 1 point per day
      intervalMinutes = 24 * 60
      break
    default:
      totalPoints = 30
      intervalMinutes = 24 * 60
  }
  
  for (let i = totalPoints; i >= 0; i--) {
    const date = new Date()
    date.setMinutes(date.getMinutes() - (i * intervalMinutes))
    
    // Format time label based on time period
    let timeLabel: string
    if (i === 0) {
      timeLabel = "Now"
    } else {
      switch (timePeriod) {
        case "1H":
          // Show minutes ago or time
          if (i === totalPoints) {
            timeLabel = `${totalPoints * 5}m ago`
          } else {
            const hours = date.getHours()
            const minutes = date.getMinutes()
            timeLabel = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
          }
          break
        case "1D":
          // Show hours ago or time
          if (i === totalPoints) {
            timeLabel = `${totalPoints}h ago`
          } else {
            const hours = date.getHours()
            const minutes = date.getMinutes()
            timeLabel = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
          }
          break
        case "1W":
          // Show day name or date
          if (i === totalPoints) {
            timeLabel = `${totalPoints}d ago`
          } else {
            const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
            timeLabel = dayName
          }
          break
        case "1M":
          // Show date
          if (i === totalPoints) {
            timeLabel = `${totalPoints}d ago`
          } else if (i <= 7) {
            timeLabel = `${i}d ago`
          } else {
            const month = date.toLocaleDateString("en-US", { month: "short" })
            const day = date.getDate()
            timeLabel = `${month} ${day}`
          }
          break
        default:
          timeLabel = `${i}d ago`
      }
    }
    
    const point: PriceDataPoint = { time: timeLabel }
    
    // Generate price data with some variation (simulating market movement)
    options.forEach((option, idx) => {
      const baseProb = currentProbs[idx]
      // Add some random variation that decreases as we go back in time
      // More variation in recent periods, less in past
      const variation = (Math.random() - 0.5) * 15 * (1 - i / totalPoints)
      const yesPrice = Math.max(5, Math.min(95, baseProb + variation))
      
      // Store Yes price (No price is always 100 - Yes)
      point[option.name] = Number(yesPrice.toFixed(1))
    })
    
    data.push(point)
  }
  
  return data
}

const colors = [
  "#10b981", // green
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#f59e0b", // orange
  "#ec4899", // pink
  "#06b6d4", // cyan
]

export default function PriceChart({ options, data: initialData }: PriceChartProps) {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("1M")
  
  // Generate data based on selected time period
  const chartData = useMemo(() => {
    return generateMockPriceData(options, timePeriod)
  }, [options, timePeriod])
  
  const chartConfig: Record<string, { label: string; color: string }> = {}
  
  options.forEach((option, idx) => {
    chartConfig[option.name] = {
      label: option.name,
      color: colors[idx % colors.length],
    }
  })

  const timePeriods: { value: TimePeriod; label: string }[] = [
    { value: "1H", label: "1 Hour" },
    { value: "1D", label: "1 Day" },
    { value: "1W", label: "1 Week" },
    { value: "1M", label: "1 Month" },
  ]

  return (
    <div className="w-full h-[450px] p-6 rounded-lg border border-border bg-background">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">Price History</h3>
          <p className="text-sm text-muted-foreground">Track price movements over time (in cents)</p>
        </div>
        <div className="flex gap-2">
          {timePeriods.map((period) => (
            <button
              key={period.value}
              onClick={() => setTimePeriod(period.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                timePeriod === period.value
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>
      <ChartContainer config={chartConfig} className="h-[320px]">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="time" 
            className="text-xs"
            tick={{ fill: "currentColor" }}
            interval="preserveStartEnd"
            angle={timePeriod === "1D" || timePeriod === "1H" ? -45 : 0}
            textAnchor={timePeriod === "1D" || timePeriod === "1H" ? "end" : "middle"}
            height={timePeriod === "1D" || timePeriod === "1H" ? 60 : 30}
          />
          <YAxis 
            domain={[0, 100]}
            className="text-xs"
            tick={{ fill: "currentColor" }}
            label={{ value: "Price (¢)", angle: -90, position: "insideLeft" }}
          />
          <ChartTooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null
              
              return (
                <div className="rounded-lg border bg-background p-3 shadow-lg">
                  <div className="grid gap-2">
                    {payload.map((entry, idx) => {
                      const yesPrice = typeof entry.value === "number" ? entry.value : 0
                      const noPrice = 100 - yesPrice
                      return (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-xs font-semibold">
                              {entry.dataKey?.toString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4 pl-7">
                            <span className="text-xs text-muted-foreground">Yes:</span>
                            <span className="text-xs font-mono font-semibold text-green-600 dark:text-green-400">
                              {yesPrice.toFixed(1)}¢
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4 pl-7">
                            <span className="text-xs text-muted-foreground">No:</span>
                            <span className="text-xs font-mono font-semibold text-red-600 dark:text-red-400">
                              {noPrice.toFixed(1)}¢
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="line"
          />
          {options.map((option, idx) => {
            const color = colors[idx % colors.length]
            return (
              <Line
                key={option.name}
                type="monotone"
                dataKey={option.name}
                stroke={color}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: color }}
              />
            )
          })}
        </LineChart>
      </ChartContainer>
    </div>
  )
}
