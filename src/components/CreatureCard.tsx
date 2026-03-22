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
        width: category === 'snail' ? '52px' : category === 'shrimp' ? '58px' : '64px',
        height: category === 'snail' ? '40px' : category === 'shrimp' ? '42px' : '40px',
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
        width: isAnubias ? '144px' : '96px',
        height: isAnubias ? '168px' : '216px',
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
    <svg viewBox="0 0 80 56" className="opacity-60" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 28 Q36 20 40 12 Q50 4 62 12 Q70 20 74 28 Q78 36 72 42 Q64 48 52 46 Q38 46 28 40 Q22 36 18 28Z" fill="#b0b0b0" stroke="#888" strokeWidth="1" />
      <path d="M18 28 Q12 22 6 12 Q14 4 24 12 Q28 20 32 28Z" fill="#c0c0c0" stroke="#888" strokeWidth="0.5" />
      <path d="M72 28 Q78 22 80 18 Q76 28 72 28Z" fill="#c0c0c0" stroke="#888" strokeWidth="0.5" />
      <line x1="28" y1="40" x2="20" y2="52" stroke="#888" strokeWidth="1.2" />
      <line x1="36" y1="42" x2="30" y2="54" stroke="#888" strokeWidth="1.2" />
      <line x1="46" y1="43" x2="42" y2="55" stroke="#888" strokeWidth="1.2" />
      <line x1="56" y1="40" x2="54" y2="52" stroke="#888" strokeWidth="1.2" />
      <line x1="62" y1="14" x2="60" y2="2" stroke="#888" strokeWidth="1" />
      <line x1="64" y1="14" x2="66" y2="2" stroke="#888" strokeWidth="1" />
      <circle cx="20" cy="24" r="4" fill="none" stroke="#888" strokeWidth="1" />
      <circle cx="20" cy="24" r="2" fill="#888" />
    </svg>
  )
}

function DeadSnailSVG({ instanceId }: { instanceId: string }) {
  const isZebra = instanceId.includes('zebra')
  return (
    <svg viewBox="0 0 80 60" className="opacity-60" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="44" cy="26" rx="28" ry="24" fill="#b09070" stroke="#888" strokeWidth="1" />
      <path d="M28 26 Q28 8 44 8 Q60 8 60 26 Q60 44 44 44 Q28 44 28 26Z" fill="none" stroke="#888" strokeWidth="0.8" />
      <path d="M30 26 Q30 12 44 12 Q58 12 58 26 Q58 38 44 38 Q30 38 30 26Z" fill="none" stroke="#888" strokeWidth="0.8" />
      <path d="M34 26 Q34 18 44 18 Q54 18 54 26 Q54 34 44 34 Q34 34 34 26Z" fill="none" stroke="#888" strokeWidth="0.8" />
      <ellipse cx="44" cy="26" rx="5" ry="5" fill="#a08060" stroke="#888" strokeWidth="0.5" />
      <ellipse cx="40" cy="52" rx="36" ry="6" fill="#c0a882" stroke="#888" strokeWidth="0.5" />
      <path d="M12 50 Q10 44 12 38 Q14 44 16 50Z" fill="#c0a882" stroke="#888" strokeWidth="0.5" />
      <line x1="10" y1="36" x2="6" y2="24" stroke="#888" strokeWidth="1.5" />
      <line x1="10" y1="36" x2="10" y2="22" stroke="#888" strokeWidth="1.5" />
      <circle cx="10" cy="34" r="2.5" fill="none" stroke="#888" strokeWidth="1" />
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
