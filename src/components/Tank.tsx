'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Creature, CreaturePosition } from '@/types'
import { MovingCreature, FixedCreature, DeadBone } from './CreatureCard'
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

function getRandomTarget(layerIndex: number, currentX: number) {
  const { min, max } = getLayerYRange(layerIndex)
  const x = Math.max(0.05, Math.min(0.88, currentX + (Math.random() - 0.5) * 0.35))
  const y = min + Math.random() * (max - min)
  return { x, y }
}

function getCreatureSpeed(category: Creature['category']) {
  switch (category) {
    case 'fish': return 0.005
    case 'shrimp': return 0.003
    case 'snail': return 0.001
    default: return 0
  }
}

function findAvailableLayer(layers: LayerInfo[]): number {
  for (let i = 0; i < 4; i++) {
    if (layers[i].creatures.length < 4) return i
  }
  return 4
}

const OXYGEN_MAP: Record<string, number> = {
  'fish': -3, 'shrimp': -1.5, 'snail': -1,
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
        total += p.oxygenChange
      }
    })
    return Math.max(0, Math.min(100, total))
  }, [positions])

  const oxygenLevel = calculateOxygen()
  const isDead = oxygenLevel < 1

  const handleDrop = (creature: Creature) => {
    const instanceId = `${creature.id}-${Date.now()}-${Math.random()}`
    const isPlant = creature.category === 'plant'
    const layerIndex = isPlant ? 4 : findAvailableLayer(layersRef.current)

    setLayers(prev => {
      const updated = prev.map((l, i) => {
        if (i === layerIndex) {
          return { ...l, creatures: [...l.creatures, instanceId] }
        }
        return l
      })
      return updated
    })

    let x: number, y: number

    if (isPlant) {
      x = 0.1 + Math.random() * 0.75
      y = 0.86 + Math.random() * 0.08
    } else {
      const { min, max } = getLayerYRange(layerIndex)
      x = 0.1 + Math.random() * 0.7
      y = min + Math.random() * (max - min)
    }

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
        emoji: creature.emoji,
        oxygenChange: creature.oxygenChange,
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
        if (p.dead || p.category === 'plant') return p

        const speed = getCreatureSpeed(p.category)
        if (speed === 0) return p

        let newTimer = p.moveTimer + delta
        let { targetX, targetY } = p
        let { vx, vy } = p

        if (newTimer > 2000 + Math.random() * 2000) {
          const next = getRandomTarget(p.layerIndex, p.x)
          targetX = next.x
          targetY = next.y
          newTimer = 0
        }

        const dx = targetX - p.x
        const dy = targetY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist > 0.005) {
          vx += (dx / dist) * speed * (delta / 16.67)
          vy += (dy / dist) * speed * (delta / 16.67) * 0.3
        }

        vx *= 0.90
        vy *= 0.80

        let newX = p.x + vx
        let newY = p.y + vy

        const { min, max } = getLayerYRange(p.layerIndex)
        if (newX < 0.05) { newX = 0.05; vx = Math.abs(vx) * 0.5 }
        if (newX > 0.88) { newX = 0.88; vx = -Math.abs(vx) * 0.5 }
        if (newY < min) { newY = min; vy = Math.abs(vy) * 0.3 }
        if (newY > max) { newY = max; vy = -Math.abs(vy) * 0.3 }

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
        if (!p.dead) {
          setLayers(layers => {
            const updated = layers.map(layer => {
              if (layer.creatures.includes(p.instanceId)) {
                return { ...layer, creatures: layer.creatures.filter(id => id !== p.instanceId) }
              }
              if (layer.id === 'sand') {
                return { ...layer, creatures: [...layer.creatures, p.instanceId] }
              }
              return layer
            })
            return updated
          })
          return { ...p, dead: true, layerIndex: 4, vx: 0, vy: 0, x: p.x, y: 0.83 }
        }
        return p
      }))
    }
  }, [isDead])

  const swimmingCreatures = positions.filter(p => p.category !== 'plant' && !p.dead)
  const plantCreatures = positions.filter(p => p.category === 'plant' && !p.dead)
  const deadCreatures = positions.filter(p => p.dead)

  return (
    <div className="w-full">
      <div className="aquarium-frame rounded-2xl p-4 shadow-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/80 via-blue-900/70 to-cyan-900/60 rounded-2xl" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(56,189,248,0.08) 0%, transparent 70%)',
        }} />

        <div className="relative z-10">
          <div className="flex justify-end items-center gap-3 mb-3">
            <OxygenMeter level={oxygenLevel} />
            <button
              onClick={handleReset}
              className="bg-white/10 hover:bg-white/20 text-cyan-100 
                       rounded-lg py-2 px-3 font-medium transition-all backdrop-blur-sm
                       border border-white/10 shadow"
            >
              ✨ 重置
            </button>
          </div>

          <div
            ref={tankRef}
            className="aquarium-container relative rounded-xl overflow-hidden"
            style={{ height: '520px' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/60 via-blue-900/50 to-sky-900/80" />
            <div className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(ellipse 300px 150px at 15% 25%, rgba(100,200,255,0.08) 0%, transparent 60%),
                  radial-gradient(ellipse 200px 120px at 75% 40%, rgba(80,180,255,0.06) 0%, transparent 60%),
                  radial-gradient(ellipse 250px 100px at 50% 10%, rgba(150,220,255,0.05) 0%, transparent 60%),
                  radial-gradient(ellipse 180px 80px at 40% 60%, rgba(60,150,200,0.05) 0%, transparent 60%)
                `,
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-sky-300/20 to-transparent pointer-events-none z-20" />
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
              {swimmingCreatures.map(pos => (
                <MovingCreature
                  key={pos.instanceId}
                  instanceId={pos.instanceId}
                  category={pos.category}
                  x={pos.x}
                  y={pos.y}
                  facingLeft={pos.vx < -0.0003}
                  dead={pos.dead}
                  onRemove={handleRemoveCreature}
                />
              ))}
            </div>

            <div className="absolute left-0 right-0 bottom-0 h-[15%] sand-layer rounded-b-xl z-[5] overflow-hidden">
              <div className="absolute left-0 right-0 top-0 bottom-0">
                {deadCreatures.map(pos => (
                  <div
                    key={pos.instanceId}
                    className="absolute bottom-2 cursor-pointer"
                    style={{
                      left: `${pos.x * 100}%`,
                      transform: 'translateX(-50%)',
                    }}
                    onClick={() => handleRemoveCreature(pos.instanceId)}
                    title="点击移除"
                  >
                    <DeadBone category={pos.category} instanceId={pos.instanceId} />
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute left-0 right-0 bottom-[15%] h-6 bg-gradient-to-b from-transparent via-amber-900/40 to-transparent z-[7]" />

            <div className="absolute left-0 right-0 bottom-[14%] z-[8]">
              {plantCreatures.map(pos => (
                <FixedCreature
                  key={pos.instanceId}
                  instanceId={pos.instanceId}
                  x={pos.x}
                  dead={pos.dead}
                  onRemove={handleRemoveCreature}
                />
              ))}
            </div>

            <div className="absolute inset-0 z-[15] pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.03) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.15) 100%)',
                borderRadius: '0.625rem',
              }}
            />
            <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-white/5 to-transparent pointer-events-none z-[16]" />
          </div>
        </div>
      </div>
    </div>
  )
}
