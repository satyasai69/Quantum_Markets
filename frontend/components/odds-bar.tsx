export default function OddsBar({
  name,
  probability,
  volume,
}: {
  name: string
  probability: number
  volume: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-xs text-muted-foreground">Vol: {volume}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden flex items-center px-2">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded flex items-center justify-center text-white text-sm font-bold"
            style={{ width: `${probability}%` }}
          >
            {probability > 20 && `${probability}%`}
          </div>
          {probability <= 20 && <span className="text-xs font-semibold text-foreground ml-auto">{probability}%</span>}
        </div>
      </div>
    </div>
  )
}
