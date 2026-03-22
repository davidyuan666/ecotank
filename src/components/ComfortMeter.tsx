'use client'

interface ComfortMeterProps {
  creatureCount: number
}

export function ComfortMeter({ creatureCount }: ComfortMeterProps) {
  const isComfortable = creatureCount <= 5
  const isCrowded = creatureCount > 8

  const getComfortStatus = () => {
    if (isComfortable) return { text: '舒适', color: 'emerald', bgGrad: 'from-emerald-500 to-teal-400' }
    if (isCrowded) return { text: '拥挤', color: 'red', bgGrad: 'from-red-500 to-orange-400' }
    return { text: '适中', color: 'amber', bgGrad: 'from-yellow-400 to-amber-400' }
  }

  const status = getComfortStatus()
  const percentage = Math.min(100, Math.max(0, (creatureCount / 10) * 100))

  return (
    <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">🏠</span>
          <span className="font-bold text-cyan-200/80 text-sm">空间舒适度</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-bold text-sm ${
            isComfortable ? 'text-emerald-400' : 
            isCrowded ? 'text-red-400' : 'text-amber-400'
          }`}>
            {creatureCount}只
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            isComfortable ? 'bg-emerald-500/30 text-emerald-300' :
            isCrowded ? 'bg-red-500/30 text-red-300' : 
            'bg-amber-500/30 text-amber-300'
          }`}>
            {status.text}
          </span>
        </div>
      </div>
      <div className="h-2.5 bg-slate-700/80 rounded-full overflow-hidden border border-white/5">
        <div
          className={`h-full bg-gradient-to-r ${status.bgGrad} transition-all duration-700 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {isCrowded && (
        <p className="text-red-400 text-xs mt-2 animate-pulse font-medium">
          ⚠️ 生物过多，空间拥挤！
        </p>
      )}
      {isComfortable && creatureCount > 0 && (
        <p className="text-emerald-400 text-xs mt-2 font-medium">
          ✨ 空间充足，生物舒适
        </p>
      )}
    </div>
  )
}
