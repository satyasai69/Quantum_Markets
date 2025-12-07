import type React from "react"
import { TrendingUp, Users, Volume2, Zap } from "lucide-react"

interface StatItem {
  icon: React.ReactNode
  label: string
  value: string
  trend?: string
  color: string
}

export default function SidebarStats() {
  const stats: StatItem[] = [
    {
      icon: <TrendingUp size={18} />,
      label: "Total Volume",
      value: "$3.9B",
      trend: "+12.4%",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      icon: <Users size={18} />,
      label: "Active Traders",
      value: "92.5K",
      trend: "+8.2%",
      color: "bg-green-500/10 text-green-500",
    },
    {
      icon: <Volume2 size={18} />,
      label: "Markets Live",
      value: "1,248",
      trend: "+3.1%",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      icon: <Zap size={18} />,
      label: "24H Activity",
      value: "2.3M",
      trend: "+24%",
      color: "bg-orange-500/10 text-orange-500",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="text-xs font-semibold text-muted-foreground uppercase">Overview</div>
      <div className="space-y-3">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>{stat.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-muted-foreground truncate">{stat.label}</div>
              <div className="font-semibold text-sm">{stat.value}</div>
            </div>
            {stat.trend && <div className="text-xs font-medium text-emerald-500">{stat.trend}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
