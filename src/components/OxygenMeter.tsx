'use client'

interface OxygenMeterProps {
  level: number
  maxLevel?: number
}

export function OxygenMeter({ level, maxLevel = 100 }: OxygenMeterProps) {
  const percentage = Math.min(100, Math.max(0, (level / maxLevel) * 100))
  const isLow = percentage < 30
  const isMedium = percentage >= 30 && percentage < 60

  const getColor = () => {
    if (isLow) return 'bg-red-500'
    if (isMedium) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-gray-700">🌬️ 氧气量</span>
        <span className={`font-bold ${isLow ? 'text-red-500' : 'text-green-600'}`}>
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-500 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {isLow && (
        <p className="text-red-500 text-sm mt-2 animate-pulse">
          ⚠️ 氧气不足！请添加水草！
        </p>
      )}
    </div>
  )
}
