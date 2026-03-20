export type CreatureCategory = 'fish' | 'shrimp' | 'snail' | 'plant'

export interface Creature {
  id: string
  name: string
  category: CreatureCategory
  oxygenChange: number
  emoji: string
  description: string
}

export interface PlacedCreature extends Creature {
  instanceId: string
}

export interface TankLayer {
  id: string
  name: string
  type: 'water' | 'sand'
  creatures: PlacedCreature[]
  maxCapacity: number
}
