const categoryColors: Record<string, { bg: string; text: string }> = {
  Crypto: { bg: "bg-orange-100 dark:bg-orange-950", text: "text-orange-700 dark:text-orange-200" },
  AI: { bg: "bg-purple-100 dark:bg-purple-950", text: "text-purple-700 dark:text-purple-200" },
  Tech: { bg: "bg-blue-100 dark:bg-blue-950", text: "text-blue-700 dark:text-blue-200" },
  Climate: { bg: "bg-green-100 dark:bg-green-950", text: "text-green-700 dark:text-green-200" },
  Sports: { bg: "bg-red-100 dark:bg-red-950", text: "text-red-700 dark:text-red-200" },
  Politics: { bg: "bg-indigo-100 dark:bg-indigo-950", text: "text-indigo-700 dark:text-indigo-200" },
  Technology: { bg: "bg-cyan-100 dark:bg-cyan-950", text: "text-cyan-700 dark:text-cyan-200" },
  Elections: { bg: "bg-teal-100 dark:bg-teal-950", text: "text-teal-700 dark:text-teal-200" },
  Space: { bg: "bg-slate-100 dark:bg-slate-950", text: "text-slate-700 dark:text-slate-200" },
}

export default function MarketBadge({ category }: { category: string }) {
  const colors = categoryColors[category] || categoryColors.Tech
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
      {category}
    </span>
  )
}
