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
        bottom: '0px',
        transform: 'translateX(-50%)',
        width: isAnubias ? '120px' : '80px',
        height: isAnubias ? '140px' : '180px',
        zIndex: dead ? 5 : 8,
      }}
      onClick={() => onRemove(instanceId)}
      title="点击移除"
    >
      <div className="w-full h-full opacity-80 overflow-visible">
        {isAnubias ? <AnubiasSVG /> : <AnacharisSVG />}
      </div>
    </div>
  )
}

interface DeadBoneProps {
  category: CreatureCategory
  instanceId: string
}

export function DeadBone({ category, instanceId }: DeadBoneProps) {
  switch (category) {
    case 'fish': return <DeadFishSVG instanceId={instanceId} />
    case 'shrimp': return <DeadShrimpSVG instanceId={instanceId} />
    case 'snail': return <DeadSnailSVG instanceId={instanceId} />
    case 'plant': return <DeadPlantSVG instanceId={instanceId} />
    default: return <DeadFishSVG instanceId={instanceId} />
  }
}

function DeadFishSVG({ instanceId }: { instanceId: string }) {
  const isKoi = instanceId.includes('koi')
  const isTetra = instanceId.includes('tetra')
  return (
    <svg viewBox="0 0 64 40" className="opacity-60" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="28" cy="20" rx="18" ry="13" fill="#b0b0b0" stroke="#888" strokeWidth="1" />
      <ellipse cx="16" cy="20" rx="9" ry="7" fill="#b0b0b0" stroke="#888" strokeWidth="1" />
      <path d="M7 20 Q2 13 5 6 Q9 13 7 20Z" fill="#c0c0c0" stroke="#888" strokeWidth="0.5" />
      <path d="M42 12 Q50 5 56 12 Q50 18 42 12Z" fill="#c0c0c0" stroke="#888" strokeWidth="0.5" />
      <line x1="8" y1="18" x2="22" y2="20" stroke="#888" strokeWidth="1.5" />
      <line x1="22" y1="16" x2="34" y2="20" stroke="#888" strokeWidth="1" />
      <line x1="22" y1="24" x2="34" y2="20" stroke="#888" strokeWidth="1" />
      <line x1="34" y1="14" x2="34" y2="26" stroke="#888" strokeWidth="1" />
      <circle cx="14" cy="17" r="3.5" fill="none" stroke="#888" strokeWidth="1" />
      <circle cx="14" cy="17" r="1.5" fill="#666" />
    </svg>
  )
}

function DeadShrimpSVG({ instanceId }: { instanceId: string }) {
  const isCrystal = instanceId.includes('crystal')
  return (
    <svg viewBox="0 0 52 28" className="opacity-60" xmlns="http://www.w3.org/2000/svg">
      <path d="M44 14 Q46 10 44 6 Q40 10 44 14Z" fill="#b0b0b0" stroke="#888" strokeWidth="0.5" />
      <ellipse cx="35" cy="14" rx="8" ry="5" fill="#b0b0b0" stroke="#888" strokeWidth="1" />
      <ellipse cx="20" cy="14" rx="9" ry="6" fill="#b0b0b0" stroke="#888" strokeWidth="1" />
      <ellipse cx="12" cy="14" rx="5" ry="4" fill="#b0b0b0" stroke="#888" strokeWidth="1" />
      <ellipse cx="7" cy="14" rx="3" ry="2.5" fill="#c0c0c0" stroke="#888" strokeWidth="0.5" />
      <line x1="8" y1="11" x2="10" y2="8" stroke="#888" strokeWidth="1" />
      <line x1="10" y1="17" x2="12" y2="20" stroke="#888" strokeWidth="1" />
      <line x1="20" y1="10" x2="22" y2="7" stroke="#888" strokeWidth="1" />
      <line x1="20" y1="18" x2="22" y2="21" stroke="#888" strokeWidth="1" />
      <line x1="28" y1="11" x2="30" y2="8" stroke="#888" strokeWidth="1" />
      <line x1="28" y1="17" x2="30" y2="20" stroke="#888" strokeWidth="1" />
      <circle cx="7" cy="11" r="2.5" fill="none" stroke="#888" strokeWidth="1" />
    </svg>
  )
}

function DeadSnailSVG({ instanceId }: { instanceId: string }) {
  const isZebra = instanceId.includes('zebra')
  return (
    <svg viewBox="0 0 48 48" className="opacity-60" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 44 Q28 28 20 24 Q10 22 10 34 Q10 44 20 44Z" fill="#c8a882" stroke="#888" strokeWidth="1" />
      <path d="M12 32 Q12 22 22 18 Q30 18 28 28 Q28 36 20 38Z" fill="#b09070" stroke="#888" strokeWidth="1" />
      <path d="M15 30 Q16 24 22 22 Q28 24 26 30 Q26 36 20 36Z" fill="#a08060" stroke="#888" strokeWidth="0.5" />
      <path d="M20 26 Q21 24 23 24 Q25 24 24 26 Q24 28 22 28Z" fill="#907050" stroke="#888" strokeWidth="0.5" />
      <path d="M20 44 Q18 48 16 44" stroke="#c8a882" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M26 44 Q28 48 30 44" stroke="#c8a882" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M10 36 Q6 30 8 26 Q12 30 10 36Z" fill="#c8a882" stroke="#888" strokeWidth="1" />
      <circle cx="8" cy="24" r="2.5" fill="#b09070" stroke="#888" strokeWidth="1" />
    </svg>
  )
}

function DeadPlantSVG({ instanceId }: { instanceId: string }) {
  return (
    <svg viewBox="0 0 40 60" className="opacity-40" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="10" width="4" height="40" rx="2" fill="#6b8e6b" stroke="#5a7a5a" strokeWidth="0.5" />
      <path d="M20 20 Q8 15 6 8 Q14 14 20 20Z" fill="#5a7a5a" />
      <path d="M20 20 Q32 15 34 8 Q26 14 20 20Z" fill="#5a7a5a" />
      <path d="M20 35 Q6 28 4 20 Q14 28 20 35Z" fill="#4a6a4a" />
      <path d="M20 50 Q10 42 8 32 Q16 42 20 50Z" fill="#4a6a4a" />
    </svg>
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
