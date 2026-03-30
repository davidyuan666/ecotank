'use client'

interface ComfortMeterProps {
  creatureCount: number
}

export function ComfortMeter({ creatureCount }: ComfortMeterProps) {
  const isComfortable = creatureCount <= 6
  const isCrowded = creatureCount > 10

  const getComfortStatus = () => {
    if (isComfortable) return { text: '舒适', bgGrad: 'from-emerald-500 to-teal-400', tagBg: 'bg-emerald-500/30', tagText: 'text-emerald-300', valueText: 'text-emerald-400' }
    if (isCrowded) return { text: '拥挤', bgGrad: 'from-red-500 to-orange-400', tagBg: 'bg-red-500/30', tagText: 'text-red-300', valueText: 'text-red-400' }
    return { text: '适中', bgGrad: 'from-yellow-400 to-amber-400', tagBg: 'bg-amber-500/30', tagText: 'text-amber-300', valueText: 'text-amber-400' }
  }

  const status = getComfortStatus()
  const percentage = Math.min(100, Math.max(0, (creatureCount / 10) * 100))

  return (
    <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-white/10">
      <div className="flex items-center gap-2">
        <span className="text-sm">🏠</span>
        <span className="font-bold text-cyan-200/80 text-xs">空间舒适度</span>
        <span className={`font-bold text-xs ${status.valueText}`}>{creatureCount}个</span>
        <div className="flex-1 h-2 bg-slate-700/80 rounded-full overflow-hidden border border-white/5">
          <div
            className={`h-full bg-gradient-to-r ${status.bgGrad} transition-all duration-700 rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.tagBg} ${status.tagText}`}>
          {status.text}
        </span>
      </div>
    </div>
  )
}
