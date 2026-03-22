'use client'

import { Creature, PlacedCreature, CreatureCategory } from '@/types'
import {
  GoldfishSVG, KoiSVG, TetraSVG,
  ShrimpSVG, CrystalShrimpSVG,
  AppleSnailSVG, ZebraSnailSVG,
  AnacharisSVG, AnubiasSVG
} from './CreatureSVGs'

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

function getCreatureSVG(category: CreatureCategory, creatureId: string, dead: boolean) {
  if (dead) {
    return (
      <svg viewBox="0 0 64 40" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="28" cy="20" rx="18" ry="13" fill="#555" />
        <circle cx="14" cy="17" r="3.5" fill="#888" />
      </svg>
    )
  }

  switch (category) {
    case 'fish':
      if (creatureId.includes('koi')) return <KoiSVG />
      if (creatureId.includes('tetra')) return <TetraSVG />
      return <GoldfishSVG />
    case 'shrimp':
      if (creatureId.includes('crystal')) return <CrystalShrimpSVG />
      return <ShrimpSVG />
    case 'snail':
      if (creatureId.includes('zebra')) return <ZebraSnailSVG />
      return <AppleSnailSVG />
    case 'plant':
      if (creatureId.includes('anubias')) return <AnubiasSVG />
      return <AnacharisSVG />
    default:
      return <GoldfishSVG />
  }
}

interface MovingCreatureProps {
  instanceId: string
  category: CreatureCategory
  x: number
  y: number
  facingLeft: boolean
  dead: boolean
  onRemove: (instanceId: string) => void
}

export function MovingCreature({
  instanceId, category, x, y, facingLeft, dead, onRemove
}: MovingCreatureProps) {
  const animClass = dead ? '' : 'swim-animation'

  return (
    <div
      className={`absolute select-none cursor-pointer ${animClass} ${dead ? 'dead-creature' : ''}`}
      style={{
        left: `${x * 100}%`,
        bottom: `${y * 100}%`,
        transform: `translateX(-50%) translateY(50%) ${facingLeft ? 'scaleX(-1)' : ''}`,
        width: category === 'snail' ? '40px' : '64px',
        height: category === 'snail' ? '44px' : '40px',
        zIndex: dead ? 5 : 10,
      }}
      onClick={() => onRemove(instanceId)}
      title="点击移除"
    >
      {getCreatureSVG(category, instanceId, dead)}
    </div>
  )
}

interface FixedCreatureProps {
  instanceId: string
  x: number
  dead: boolean
  onRemove: (instanceId: string) => void
}

export function FixedCreature({ instanceId, x, dead, onRemove }: FixedCreatureProps) {
  const isAnubias = instanceId.includes('anubias')

  return (
    <div
      className={`absolute select-none cursor-pointer ${dead ? 'dead-creature' : 'plant-sway'}`}
      style={{
        left: `${x * 100}%`,
        bottom: '6px',
        transform: 'translateX(-50%)',
        width: isAnubias ? '56px' : '38px',
        height: isAnubias ? '66px' : '76px',
        zIndex: dead ? 5 : 8,
      }}
      onClick={() => onRemove(instanceId)}
      title="点击移除"
    >
      {isAnubias ? <AnubiasSVG /> : <AnacharisSVG />}
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
