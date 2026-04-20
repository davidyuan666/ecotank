'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Creature, CreaturePosition } from '@/types'

interface DragContextType {
  hasSand: boolean
  hasWater: boolean
  crowded: boolean
  setCrowded: (value: boolean) => void
  positions: CreaturePosition[]
  onCreatureClick: (creature: Creature) => void
  reset: () => void
}

const DragContext = createContext<DragContextType | undefined>(undefined)

export function DragProvider({ children }: { children: ReactNode }) {
  const [hasSand, setHasSand] = useState(false)
  const [hasWater, setHasWater] = useState(false)
  const [crowded, setCrowded] = useState(false)
  const [positions, setPositions] = useState<CreaturePosition[]>([])

  const handleCreatureClick = useCallback((creature: Creature) => {
    console.log('DragContext handleCreatureClick:', creature.name)
    
    const instanceId = `${creature.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // 沙子 - 无条件添加
    if (creature.category === 'sand') {
      if (hasSand) {
        console.log('沙子已存在')
        return
      }
      setHasSand(true)
      setPositions(prev => [...prev, {
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
      }])
      console.log('已添加沙子')
      return
    }

    // 清水 - 需要先有沙子
    if (creature.category === 'water') {
      if (hasWater) {
        console.log('清水已存在')
        return
      }
      if (!hasSand) {
        alert('请先添加沙子')
        return
      }
      setHasWater(true)
      setPositions(prev => [...prev, {
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
      }])
      console.log('已添加清水')
      return
    }

    // 其他生物 - 需要先有沙子和清水
    if (!hasSand || !hasWater) {
      if (!hasSand) alert('请先添加沙子')
      else alert('请先添加清水')
      return
    }

    // 检查生物数量限制（不含沙、水、死亡）
    const activeCreatures = positions.filter(p =>
      p.category !== 'sand' &&
      p.category !== 'water' &&
      !p.dead
    ).length
    if (activeCreatures >= 20) {
      setCrowded(true)
      return
    }

    // 添加生物
    setPositions(prev => [...prev, {
      instanceId,
      x: 0.1 + Math.random() * 0.7,
      y: 0.1 + Math.random() * 0.6,
      vx: 0, vy: 0,
      targetX: 0.1 + Math.random() * 0.7,
      targetY: 0.1 + Math.random() * 0.6,
      layerIndex: Math.floor(Math.random() * 4),
      moveTimer: Math.random() * 100,
      category: creature.category,
      dead: false,
      emoji: creature.emoji,
      oxygenChange: creature.oxygenChange,
    }])
    console.log('已添加:', creature.name)
  }, [hasSand, hasWater])

  const reset = useCallback(() => {
    setHasSand(false)
    setHasWater(false)
    setCrowded(false)
    setPositions([])
  }, [])

  return (
    <DragContext.Provider value={{ hasSand, hasWater, crowded, setCrowded, positions, onCreatureClick: handleCreatureClick, reset }}>
      {children}
    </DragContext.Provider>
  )
}

export function useTankState() {
  const context = useContext(DragContext)
  if (!context) {
    throw new Error('useTankState must be used within DragProvider')
  }
  return context
}