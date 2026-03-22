'use client'

interface OxygenMeterProps {
  level: number
  maxLevel?: number
}

export function OxygenMeter({ level, maxLevel = 100 }: OxygenMeterProps) {
  const percentage = Math.min(100, Math.max(0, (level / maxLevel) * 100))
  const isLow = level < 5
  const isMedium = level >= 5 && level < 20

  const getColor = () => {
    if (isLow) return 'from-red-500 to-orange-400'
    if (isMedium) return 'from-yellow-400 to-amber-400'
    return 'from-emerald-400 to-teal-400'
  }

  const getTextColor = () => {
    if (isLow) return 'text-red-400'
    return 'text-emerald-400'
  }

  return (
    <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-white/10">
      <div className="flex items-center gap-2">
        <span className="text-sm">🌬️</span>
        <span className="font-bold text-cyan-200/80 text-xs">氧气</span>
        <span className={`font-bold text-xs ${getTextColor()}`}>
          {level > 0 ? `+${level}` : level}
        </span>
        <div className="flex-1 h-2 bg-slate-700/80 rounded-full overflow-hidden border border-white/5">
          <div
            className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-700 rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
