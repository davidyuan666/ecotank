'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Creature, CreaturePosition } from '@/types'
import { MovingCreature } from './CreatureCard'
import { OxygenMeter } from './OxygenMeter'

interface LayerInfo {
  id: string
  name: string
  type: 'water' | 'sand'
  creatures: string[]
}

const LAYER_CONFIGS: LayerInfo[] = [
  { id: 'layer-1', name: '第1层', type: 'water', creatures: [] },
  { id: 'layer-2', name: '第2层', type: 'water', creatures: [] },
  { id: 'layer-3', name: '第3层', type: 'water', creatures: [] },
  { id: 'layer-4', name: '第4层', type: 'water', creatures: [] },
  { id: 'sand', name: '沙底层', type: 'sand', creatures: [] },
]

const WATER_SPLIT = 0.85
const LAYER_SPLIT = WATER_SPLIT / 4

function getLayerYRange(layerIndex: number) {
  if (layerIndex === 4) {
    return { min: 0.85, max: 0.98 }
  }
  const top = (3 - layerIndex) * LAYER_SPLIT
  const bottom = top + LAYER_SPLIT
  return { min: top, max: bottom - 0.03 }
}

function getRandomTarget(layerIndex: number, currentX: number, currentY: number) {
  const { min, max } = getLayerYRange(layerIndex)
  const x = Math.max(0.05, Math.min(0.88, currentX + (Math.random() - 0.5) * 0.35))
  const y = min + Math.random() * (max - min)
  return { x, y }
}

function getCreatureSpeed(category: Creature['category']) {
  switch (category) {
    case 'fish': return 0.007
    case 'shrimp': return 0.004
    case 'snail': return 0.0012
    default: return 0
  }
}

function findAvailableLayer(layers: LayerInfo[]): number {
  for (let i = 0; i < 4; i++) {
    if (layers[i].creatures.length < 4) return i
  }
  return 4
}

const EMOJI_MAP: Record<string, string> = {
  'goldfish': '🐠', 'koi': '🐟', 'tetra': '🐡',
  'shrimp': '🦐', 'crystal': '🦞',
  'apple-snail': '🐚', 'zebra-snail': '🐌',
  'anacharis': '🌿', 'anubias': '🌱',
}

const OXYGEN_MAP: Record<string, number> = {
  'fish': -3, 'shrimp': -1.5, 'snail': -1, 'plant': 2,
}

export function Tank() {
  const [layers, setLayers] = useState<LayerInfo[]>(
    LAYER_CONFIGS.map(l => ({ ...l, creatures: [] }))
  )
  const [positions, setPositions] = useState<CreaturePosition[]>([])
  const [bubbleKey, setBubbleKey] = useState(0)
  const animRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const layersRef = useRef(layers)
  const tankRef = useRef<HTMLDivElement>(null)

  useEffect(() => { layersRef.current = layers }, [layers])

  const calculateOxygen = useCallback(() => {
    let total = 0
    positions.forEach(p => {
      if (!p.dead) {
        total += OXYGEN_MAP[p.category] || 0
      }
    })
    return Math.max(0, Math.min(100, total))
  }, [positions])

  const oxygenLevel = calculateOxygen()
  const isDead = oxygenLevel < 1

  const handleDrop = (creature: Creature) => {
    const instanceId = `${creature.id}-${Date.now()}-${Math.random()}`
    const layerIndex = findAvailableLayer(layersRef.current)

    setLayers(prev => {
      const updated = prev.map((l, i) => {
        if (i === layerIndex) {
          return { ...l, creatures: [...l.creatures, instanceId] }
        }
        return l
      })
      return updated
    })

    const { min, max } = getLayerYRange(layerIndex)
    const x = 0.1 + Math.random() * 0.7
    const y = min + Math.random() * (max - min)

    setPositions(prev => [
      ...prev,
      {
        instanceId,
        x,
        y,
        vx: 0,
        vy: 0,
        targetX: x,
        targetY: y,
        layerIndex,
        moveTimer: Math.random() * 100,
        category: creature.category,
        dead: false,
      },
    ])
  }

  const handleRemoveCreature = (instanceId: string) => {
    setLayers(prev => prev.map(l => ({
      ...l,
      creatures: l.creatures.filter(id => id !== instanceId),
    })))
    setPositions(prev => prev.filter(p => p.instanceId !== instanceId))
  }

  const handleReset = () => {
    cancelAnimationFrame(animRef.current)
    setLayers(LAYER_CONFIGS.map(l => ({ ...l, creatures: [] })))
    setPositions([])
    setBubbleKey(k => k + 1)
    lastTimeRef.current = 0
  }

  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time
      const delta = Math.min(time - lastTimeRef.current, 50)
      lastTimeRef.current = time

      setPositions(prev => prev.map(p => {
        if (p.dead) return p
        const speed = getCreatureSpeed(p.category)
        if (speed === 0) return p

        let newTimer = p.moveTimer + delta
        let { targetX, targetY } = p
        let { vx, vy } = p

        if (newTimer > 2000 + Math.random() * 2000) {
          const next = getRandomTarget(p.layerIndex, p.x, p.y)
          targetX = next.x
          targetY = next.y
          newTimer = 0
        }

        const dx = targetX - p.x
        const dy = targetY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist > 0.005) {
          vx += (dx / dist) * speed * (delta / 16.67)
          vy += (dy / dist) * speed * (delta / 16.67)
        }

        vx *= 0.92
        vy *= 0.92

        let newX = p.x + vx
        let newY = p.y + vy

        const { min, max } = getLayerYRange(p.layerIndex)
        if (newX < 0.05) { newX = 0.05; vx = Math.abs(vx) * 0.5 }
        if (newX > 0.88) { newX = 0.88; vx = -Math.abs(vx) * 0.5 }
        if (newY < min) { newY = min; vy = Math.abs(vy) * 0.5 }
        if (newY > max) { newY = max; vy = -Math.abs(vy) * 0.5 }

        return { ...p, x: newX, y: newY, vx, vy, targetX, targetY, moveTimer: newTimer }
      }))

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  useEffect(() => {
    if (isDead) {
      setPositions(prev => prev.map(p => {
        if (!p.dead && p.layerIndex !== 4) {
          setLayers(layers => layers.map((layer, i) => {
            if (i === 4) {
              return { ...layer, creatures: [...layer.creatures, p.instanceId] }
            }
            return { ...layer, creatures: layer.creatures.filter(id => id !== p.instanceId) }
          }))
          return { ...p, dead: true, layerIndex: 4, vx: 0, vy: 0 }
        }
        return p
      }))
    }
  }, [isDead])

  return (
    <div className="w-full">
      <div className="aquarium-frame rounded-2xl p-4 shadow-2xl border-4 border-sky-700">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-cyan-100">🏠 水缸</h2>
          <div className="flex items-center gap-3">
            <OxygenMeter level={oxygenLevel} />
            <button
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-600 text-white 
                       rounded-lg py-2 px-3 font-medium transition-colors shadow"
            >
              🔄 重置
            </button>
          </div>
        </div>

        <div
          ref={tankRef}
          className="aquarium-container relative rounded-xl overflow-hidden"
          style={{ height: '520px' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 via-cyan-500/30 to-cyan-700/60" />
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-sky-300/50 to-transparent pointer-events-none z-20" />
          <div className="absolute inset-0 bubble-bg z-[1]" key={bubbleKey}>
            <div className="bubble-1" />
            <div className="bubble-2" />
            <div className="bubble-3" />
            <div className="bubble-4" />
          </div>

          <div
            className="absolute inset-0 z-10"
            onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy' }}
            onDrop={e => {
              e.preventDefault()
              const data = e.dataTransfer.getData('application/json')
              if (data) {
                try {
                  const creature = JSON.parse(data) as Creature
                  handleDrop(creature)
                } catch {}
              }
            }}
          >
            {positions.map(pos => (
              <MovingCreature
                key={pos.instanceId}
                instanceId={pos.instanceId}
                emoji={EMOJI_MAP[pos.instanceId.split('-')[0]] || '❓'}
                x={pos.x}
                y={pos.y}
                speed={getCreatureSpeed(pos.category)}
                facingLeft={pos.vx < -0.0005}
                dead={pos.dead}
                onRemove={handleRemoveCreature}
              />
            ))}
          </div>

          <div className="absolute left-0 right-0 bottom-0 h-[15%] sand-layer rounded-b-xl z-10">
            <div className="absolute -top-4 left-0 right-0 h-5 bg-gradient-to-b from-transparent to-amber-800/50" />
          </div>

          <div className="absolute left-0 right-0 bottom-[15%] h-px bg-amber-700/60 z-10" />
        </div>

        <div className="mt-3 flex gap-2 flex-wrap">
          {layers.map((layer, i) => (
            <div key={layer.id} className="text-xs text-cyan-200/70 px-2 py-1 bg-cyan-900/30 rounded">
              {layer.name}: {layer.creatures.length}{i < 4 ? '/4' : ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
