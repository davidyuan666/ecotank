export type CreatureCategory = 'fish' | 'shrimp' | 'snail' | 'plant'

export interface Creature {
  id: string
  name: string
  category: CreatureCategory
  oxygenChange: number
  emoji: string
  description: string
  speed?: number
}

export interface PlacedCreature extends Creature {
  instanceId: string
}

export interface CreaturePosition {
  instanceId: string
  x: number
  y: number
  vx: number
  vy: number
  targetX: number
  targetY: number
  layerIndex: number
  moveTimer: number
  category: CreatureCategory
  dead: boolean
}
