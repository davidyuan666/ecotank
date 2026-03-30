'use client'

import { Creature, PlacedCreature, CreatureCategory } from '@/types'
import {
  GoldfishSVG, KoiSVG, TetraSVG,
  ShrimpSVG, CrystalShrimpSVG,
  AppleSnailSVG, ZebraSnailSVG,
  AnacharisSVG, AnubiasSVG, DuckweedSVG
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
      if (creatureId.includes('duckweed')) return <DuckweedSVG />
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
  return (
    <div
      className={`absolute select-none cursor-pointer ${dead ? 'dead-creature' : ''}`}
      style={{
        left: `${x * 100}%`,
        bottom: `${y * 100}%`,
        transform: `translateX(-50%) translateY(50%) ${facingLeft ? 'scaleX(-1)' : ''}`,
        width: category === 'snail' ? '48px' : category === 'shrimp' ? '52px' : '64px',
        height: category === 'snail' ? '38px' : category === 'shrimp' ? '38px' : '40px',
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
  const isDuckweed = instanceId.includes('duckweed')

  return (
    <div
      className={`absolute select-none cursor-pointer ${dead ? 'dead-creature' : isDuckweed ? 'duckweed-float' : 'plant-sway'}`}
      style={{
        left: `${x * 100}%`,
        bottom: isDuckweed ? 'auto' : '0px',
        top: isDuckweed ? '0px' : 'auto',
        transform: 'translateX(-50%)',
        width: isDuckweed ? '60px' : isAnubias ? '120px' : '80px',
        height: isDuckweed ? '30px' : isAnubias ? '140px' : '180px',
        zIndex: dead ? 5 : 8,
      }}
      onClick={() => onRemove(instanceId)}
      title="点击移除"
    >
      <div className="w-full h-full opacity-90 overflow-visible">
        {isDuckweed ? <DuckweedSVG /> : isAnubias ? <AnubiasSVG /> : <AnacharisSVG />}
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
    <svg viewBox="0 0 70 50" className="opacity-60" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="35" cy="25" rx="22" ry="12" fill="#b0b0b0" stroke="#888" strokeWidth="1" />
      <path d="M13 25 Q10 20 12 15 Q15 20 18 25 Q15 30 12 35 Q10 30 13 25Z" fill="#c0c0c0" stroke="#888" strokeWidth="0.5" />
      <path d="M57 25 Q62 22 65 18 Q63 25 57 25Z" fill="#c0c0c0" stroke="#888" strokeWidth="0.5" />
      <line x1="20" y1="35" x2="15" y2="45" stroke="#888" strokeWidth="1.2" />
      <line x1="28" y1="36" x2="24" y2="46" stroke="#888" strokeWidth="1.2" />
      <line x1="36" y1="36" x2="34" y2="46" stroke="#888" strokeWidth="1.2" />
      <line x1="44" y1="35" x2="44" y2="45" stroke="#888" strokeWidth="1.2" />
      <line x1="55" y1="18" x2="58" y2="8" stroke="#888" strokeWidth="1" />
      <line x1="58" y1="18" x2="62" y2="8" stroke="#888" strokeWidth="1" />
      <circle cx="18" cy="22" r="2.5" fill="none" stroke="#888" strokeWidth="1" />
      <circle cx="18" cy="22" r="1.2" fill="#888" />
    </svg>
  )
}

function DeadSnailSVG({ instanceId }: { instanceId: string }) {
  const isZebra = instanceId.includes('zebra')
  return (
    <svg viewBox="0 0 65 50" className="opacity-60" xmlns="http://www.w3.org/2000/svg">
      <circle cx="42" cy="20" r="18" fill="#b09070" stroke="#888" strokeWidth="1" />
      <path d="M30 12 Q38 8 46 12" stroke="#888" strokeWidth="1" fill="none" />
      <path d="M28 18 Q38 14 48 18" stroke="#888" strokeWidth="1" fill="none" />
      <circle cx="42" cy="20" r="3" fill="#a08060" stroke="#888" strokeWidth="0.5" />
      <ellipse cx="30" cy="42" rx="28" ry="6" fill="#c0a882" stroke="#888" strokeWidth="0.5" />
      <path d="M8 42 Q6 36 8 30 Q12 36 14 42Z" fill="#c0a882" stroke="#888" strokeWidth="0.5" />
      <line x1="8" y1="26" x2="4" y2="18" stroke="#888" strokeWidth="1.5" />
      <line x1="8" y1="26" x2="8" y2="16" stroke="#888" strokeWidth="1.5" />
      <circle cx="8" cy="28" r="2" fill="none" stroke="#888" strokeWidth="1" />
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
