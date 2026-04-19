'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Creature, CreaturePosition } from '@/types'
import { MovingCreature, FixedCreature, DeadBone } from './CreatureCard'
import { OxygenMeter } from './OxygenMeter'
import { ComfortMeter } from './ComfortMeter'
import { useCreatureClick } from './DragContext'

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

const WATER_SPLIT = 0.80
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
  const x = Math.max(0.05, Math.min(0.88, currentX + (Math.random() - 0.5) * 0.15))
  const y = min + Math.random() * (max - min)
  return { x, y }
}

function getCreatureSpeed(category: Creature['category']) {
  switch (category) {
    case 'fish': return 0.0003
    case 'shrimp': return 0.0002
    case 'snail': return 0.0001
    default: return 0
  }
}

function findAvailableLayer(layers: LayerInfo[]): number {
  for (let i = 0; i < 4; i++) {
    if (layers[i].creatures.length < 4) return i
  }
  return 4
}

export function Tank() {
  const [layers, setLayers] = useState<LayerInfo[]>(
    LAYER_CONFIGS.map(l => ({ ...l, creatures: [] }))
  )
  const [positions, setPositions] = useState<CreaturePosition[]>([])
  const [hasSand, setHasSand] = useState(false)
  const [hasWater, setHasWater] = useState(false)
  const [bubbleKey, setBubbleKey] = useState(0)
  const animRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const layersRef = useRef(layers)
  const tankRef = useRef<HTMLDivElement>(null)

  useEffect(() => { layersRef.current = layers }, [layers])

  const calculateOxygen = useCallback(() => {
    let total = 0
    positions.forEach(p => {
      if (!p.dead && p.category !== 'sand' && p.category !== 'water') {
        total += p.oxygenChange
      }
    })
    return total
  }, [positions])

  const oxygenLevel = calculateOxygen()
  const displayOxygen = Math.max(0, Math.min(100, oxygenLevel))
  const isDead = oxygenLevel <= 0

  const { setOnCreatureClick } = useCreatureClick()

  useEffect(() => {
    setOnCreatureClick(handleDrop)
    return () => setOnCreatureClick(undefined)
  }, [setOnCreatureClick, hasSand, hasWater, positions, layers])

  const handleDrop = (creature: Creature) => {
    const instanceId = `${creature.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    if (creature.category === 'sand') {
      if (hasSand) return
      setHasSand(true)
      setPositions(prev => [
        ...prev,
        {
          instanceId,
          x: 0, y: 0,
          vx: 0, vy: 0,
          targetX: 0, targetY: 0,
          layerIndex: 4,
          moveTimer: 0,
          category: 'sand',
          dead: false,
          emoji: creature.emoji,
          oxygenChange: 0,
        },
      ])
      return
    }

    if (creature.category === 'water') {
      if (hasWater || !hasSand) return
      setHasWater(true)
      setPositions(prev => [
        ...prev,
        {
          instanceId,
          x: 0.5, y: 0.8,
          vx: 0, vy: 0,
          targetX: 0.5, targetY: 0.8,
          layerIndex: 0,
          moveTimer: 0,
          category: 'water',
          dead: false,
          emoji: creature.emoji,
          oxygenChange: 0,
        },
      ])
      return
    }

    if (!hasSand || !hasWater) return

    const isPlant = creature.category === 'plant'
    const isDuckweed = creature.id === 'duckweed'
    
    if (isPlant && !isDuckweed) {
      const currentPlantCount = positions.filter(p => p.category === 'plant' && !p.instanceId.includes('duckweed') && !p.dead).length
      if (currentPlantCount >= 5) return
    }
    
    const layerIndex = (isPlant && !isDuckweed) ? 4 : findAvailableLayer(layersRef.current)

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

    if (isDuckweed) {
      x = 0.1 + Math.random() * 0.75
      y = 0.05 + Math.random() * 0.1
    } else if (isPlant) {
      x = 0.1 + Math.random() * 0.75
      y = 0.82 + Math.random() * 0.08
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
    const creature = positions.find(p => p.instanceId === instanceId)
    if (creature?.category === 'sand') {
      setHasSand(false)
    }
    if (creature?.category === 'water') {
      setHasWater(false)
    }
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
    setHasSand(false)
    setHasWater(false)
    setBubbleKey(k => k + 1)
    lastTimeRef.current = 0
  }

  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time
      const delta = Math.min(time - lastTimeRef.current, 50)
      lastTimeRef.current = time

      setPositions(prev => prev.map(p => {
        if (p.dead || p.category === 'plant' || p.category === 'sand' || p.category === 'water') return p

        const speed = getCreatureSpeed(p.category)
        if (speed === 0) return p

        let newTimer = p.moveTimer + delta
        let { targetX, targetY } = p
        let { vx, vy } = p

        if (newTimer > 8000 + Math.random() * 4000) {
          const next = getRandomTarget(p.layerIndex, p.x)
          targetX = next.x
          targetY = next.y
          newTimer = 0
        }

        const dx = targetX - p.x
        const dy = targetY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist > 0.001) {
          vx = (dx / dist) * speed
          vy = (dy / dist) * speed
        } else {
          vx = 0
          vy = 0
        }

        return {
          ...p,
          x: p.x + vx * delta,
          y: p.y + vy * delta,
          vx, vy,
          targetX, targetY,
          moveTimer: newTimer,
        }
      }))

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [layers])

  useEffect(() => {
    if (!isDead) return
    
    setPositions(prev => prev.map(p => {
      if (p.dead || p.category === 'plant' || p.category === 'sand' || p.category === 'water') return p
      return { ...p, dead: true }
    }))
  }, [isDead])

  const swimmingCreatures = positions.filter(p => p.category !== 'plant' && p.category !== 'sand' && p.category !== 'water' && !p.dead)
  const plantCreatures = positions.filter(p => p.category === 'plant' && !p.instanceId.includes('duckweed') && !p.dead)
  const duckweedCreatures = positions.filter(p => p.category === 'plant' && p.instanceId.includes('duckweed') && !p.dead)
  const deadCreatures = positions.filter(p => p.dead)
  const totalCreatures = swimmingCreatures.length + plantCreatures.length + duckweedCreatures.length

  return (
    <div className="w-full">
      <div className="aquarium-frame rounded-2xl p-5 shadow-2xl border-2 border-cyan-200/30 relative overflow-hidden bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-600/30">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-slate-700/30 to-slate-600/20 rounded-2xl" />
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-500/30 to-transparent" />
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-300/20 via-transparent to-slate-500/20" />
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-cyan-300/20 via-transparent to-slate-500/20" />

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-3">
              <ComfortMeter creatureCount={totalCreatures} />
              <button
                onClick={handleReset}
                className="bg-white/10 hover:bg-white/20 text-cyan-100 
                         rounded-lg py-2 px-3 font-medium transition-all backdrop-blur-sm
                         border border-white/10 shadow"
              >
                重置
              </button>
              <OxygenMeter level={displayOxygen} />
            </div>

          <div
            ref={tankRef}
            className="aquarium-container relative rounded-xl overflow-hidden"
            style={{ height: 'calc(90vh - 140px)' }}
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
            {!hasSand && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-[20]">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏖️</div>
                  <p className="text-cyan-300/80 text-lg font-medium">拖拽沙子到底部</p>
                </div>
              </div>
            )}

            {hasSand && !hasWater && (
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
            )}

            {hasSand && !hasWater && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-[15]">
                <div className="text-center bg-slate-900/60 backdrop-blur-sm rounded-xl px-6 py-4">
                  <div className="text-5xl mb-3">💧</div>
                  <p className="text-cyan-300/90 text-base font-medium">拖拽清水（占80%）</p>
                </div>
              </div>
            )}

            {hasSand && hasWater && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/65 via-blue-900/55 to-sky-900/85" />
                <div className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      radial-gradient(ellipse 300px 150px at 15% 25%, rgba(100,200,255,0.12) 0%, transparent 60%),
                      radial-gradient(ellipse 200px 120px at 75% 40%, rgba(80,180,255,0.09) 0%, transparent 60%),
                      radial-gradient(ellipse 250px 100px at 50% 10%, rgba(150,220,255,0.08) 0%, transparent 60%),
                      radial-gradient(ellipse 180px 80px at 40% 60%, rgba(60,150,200,0.07) 0%, transparent 60%)
                    `,
                  }}
                />
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-sky-200/25 via-cyan-300/15 to-transparent pointer-events-none z-20" />
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[18]"
                  style={{
                    background: `
                      linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 25%, transparent 75%, rgba(255,255,255,0.08) 100%),
                      radial-gradient(ellipse 400px 200px at 20% 30%, rgba(255,255,255,0.12) 0%, transparent 50%)
                    `
                  }}
                />
                <div className="absolute inset-0 bubble-bg z-[1]" key={bubbleKey}>
                  <div className="bubble-1" />
                  <div className="bubble-2" />
                  <div className="bubble-3" />
                  <div className="bubble-4" />
                </div>

                <div className="absolute inset-0 z-10">
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

                <div className="absolute left-0 right-0 top-[12%] z-[6]">
                  {duckweedCreatures.map(pos => (
                    <FixedCreature
                      key={pos.instanceId}
                      instanceId={pos.instanceId}
                      x={pos.x}
                      dead={pos.dead}
                      onRemove={handleRemoveCreature}
                    />
                  ))}
                </div>

                <div className="absolute inset-0 z-[15] pointer-events-none rounded-xl"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.2) 100%)',
                    boxShadow: 'inset 0 0 60px rgba(0,0,0,0.15), inset 0 -20px 40px rgba(0,0,0,0.1)'
                  }}
                />
                <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-white/8 via-white/3 to-transparent pointer-events-none z-[16] rounded-l-xl" />
                <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-white/4 to-transparent pointer-events-none z-[16] rounded-r-xl" />
                <div className="absolute inset-0 pointer-events-none z-[17] rounded-xl"
                  style={{
                    background: 'radial-gradient(ellipse 200px 300px at 85% 40%, rgba(255,255,255,0.08) 0%, transparent 60%)'
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
