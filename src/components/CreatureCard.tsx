'use client'

import { Creature, PlacedCreature, CreatureCategory } from '@/types'

interface CreatureCardProps {
  creature: Creature
  onDragStart: (creature: Creature) => void
}

export function CreatureCard({ creature, onDragStart }: CreatureCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify(creature))
    e.dataTransfer.effectAllowed = 'copy'
    onDragStart(creature)
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white/80 backdrop-blur-sm rounded-lg p-3 cursor-grab active:cursor-grabbing 
                 hover:bg-white/100 hover:shadow-lg transition-all duration-200 
                 border border-blue-100 hover:border-blue-300"
    >
      <div className="flex items-center gap-2">
        <span className="text-3xl">{creature.emoji}</span>
        <div>
          <div className="font-medium text-gray-800">{creature.name}</div>
          <div className={`text-sm ${creature.oxygenChange >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            氧气: {creature.oxygenChange >= 0 ? '+' : ''}{creature.oxygenChange}
          </div>
        </div>
      </div>
    </div>
  )
}

interface MovingCreatureProps {
  instanceId: string
  emoji: string
  category: CreatureCategory
  x: number
  y: number
  facingLeft: boolean
  dead: boolean
  onRemove: (instanceId: string) => void
}

export function MovingCreature({
  instanceId, emoji, category, x, y, facingLeft, dead, onRemove
}: MovingCreatureProps) {
  const getCreatureClass = () => {
    switch (category) {
      case 'fish': return 'creature-fish'
      case 'shrimp': return 'creature-shrimp'
      case 'snail': return 'creature-snail'
      default: return ''
    }
  }

  return (
    <div
      className={`absolute select-none cursor-pointer ${dead ? 'dead-creature' : ''} ${getCreatureClass()}`}
      style={{
        left: `${x * 100}%`,
        bottom: `${y * 100}%`,
        transform: `translateX(-50%) translateY(50%)`,
        zIndex: dead ? 5 : 10,
      }}
      onClick={() => onRemove(instanceId)}
      title="点击移除"
    >
      <div className={`relative ${facingLeft ? 'scale-x-[-1]' : ''} ${!dead ? 'creature-idle' : ''}`}>
        <span className={`text-3xl ${dead ? 'grayscale opacity-60' : ''}`}>
          {emoji}
        </span>
      </div>
    </div>
  )
}

interface FixedCreatureProps {
  instanceId: string
  emoji: string
  x: number
  dead: boolean
  onRemove: (instanceId: string) => void
}

export function FixedCreature({ instanceId, emoji, x, dead, onRemove }: FixedCreatureProps) {
  return (
    <div
      className={`absolute select-none cursor-pointer ${dead ? 'dead-creature' : ''}`}
      style={{
        left: `${x * 100}%`,
        bottom: '8px',
        transform: 'translateX(-50%)',
        zIndex: dead ? 5 : 8,
      }}
      onClick={() => onRemove(instanceId)}
      title="点击移除"
    >
      <div className={`plant-container ${!dead ? 'plant-sway' : 'grayscale opacity-60'}`}>
        <span className="text-5xl leading-none">{emoji}</span>
      </div>
    </div>
  )
}

interface PlacedCreatureItemProps {
  creature: PlacedCreature
  onRemove: (instanceId: string) => void
  isDead?: boolean
}

export function PlacedCreatureItem({ creature, onRemove, isDead }: PlacedCreatureItemProps) {
  return (
    <div
      className={`
        rounded-lg p-2 flex items-center justify-between border shadow-sm
        ${isDead 
          ? 'bg-gray-800/90 border-gray-700 opacity-50' 
          : 'bg-white/90 border-blue-100'
        }
      `}
    >
      <div className="flex items-center gap-2">
        <span className={`text-2xl ${isDead ? 'grayscale' : ''}`}>{creature.emoji}</span>
        <span className={`text-sm font-medium ${isDead ? 'text-gray-400' : 'text-gray-800'}`}>
          {creature.name}
          {isDead && ' ☠️'}
        </span>
      </div>
      <button
        onClick={() => onRemove(creature.instanceId)}
        className="w-6 h-6 rounded-full bg-red-100 hover:bg-red-200 
                   flex items-center justify-center text-red-600 text-xs"
      >
        ✕
      </button>
    </div>
  )
}
