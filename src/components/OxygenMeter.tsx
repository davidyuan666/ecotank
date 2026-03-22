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
    if (isLow) return 'bg-gradient-to-r from-red-500 to-orange-400'
    if (isMedium) return 'bg-gradient-to-r from-yellow-400 to-amber-400'
    return 'bg-gradient-to-r from-emerald-400 to-teal-400'
  }

  return (
    <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-cyan-200/80 text-sm">🌬️ 氧气</span>
        <span className={`font-bold text-sm ${isLow ? 'text-red-400' : 'text-emerald-400'}`}>
          {level > 0 ? `+${level}` : level}
        </span>
      </div>
      <div className="h-2.5 bg-slate-700/80 rounded-full overflow-hidden border border-white/5">
        <div
          className={`h-full ${getColor()} transition-all duration-700 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {isLow && (
        <p className="text-red-400 text-xs mt-2 animate-pulse font-medium">
          ⚠️ 氧气不足！生物濒临死亡！
        </p>
      )}
    </div>
  )
}
