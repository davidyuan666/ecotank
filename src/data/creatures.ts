import { Creature } from '@/types'

export const creatures: Creature[] = [
  // 鱼类
  { id: 'goldfish', name: '金鱼', category: 'fish', oxygenChange: -3, emoji: '🐠', description: '美丽的金鱼' },
  { id: 'koi', name: '锦鲤', category: 'fish', oxygenChange: -4, emoji: '🐟', description: '色彩斑斓的锦鲤' },
  { id: 'tetra', name: '灯鱼', category: 'fish', oxygenChange: -2, emoji: '🐡', description: '小巧可爱的灯鱼' },
  
  // 虾类
  { id: 'shrimp', name: '黑壳虾', category: 'shrimp', oxygenChange: -1, emoji: '🦐', description: '勤快的清道夫' },
  { id: 'crystal', name: '水晶虾', category: 'shrimp', oxygenChange: -2, emoji: '🦞', description: '晶莹剔透的水晶虾' },
  
  // 螺类
  { id: 'apple-snail', name: '苹果螺', category: 'snail', oxygenChange: -1, emoji: '🐚', description: '可爱的苹果螺' },
  { id: 'zebra-snail', name: '斑马螺', category: 'snail', oxygenChange: -1, emoji: '🐌', description: '勤劳的除藻螺' },
  
  // 水草（产生氧气）
  { id: 'anacharis', name: '金鱼草', category: 'plant', oxygenChange: 2, emoji: '🌿', description: '产生氧气的水草' },
  { id: 'anubias', name: '水榕', category: 'plant', oxygenChange: 1, emoji: '🌱', description: '易养活的水草' },
]

export const creaturesByCategory = {
  fish: creatures.filter(c => c.category === 'fish'),
  shrimp: creatures.filter(c => c.category === 'shrimp'),
  snail: creatures.filter(c => c.category === 'snail'),
  plant: creatures.filter(c => c.category === 'plant'),
}

export const categoryNames: Record<string, string> = {
  fish: '🐟 鱼类',
  shrimp: '🦐 虾类',
  snail: '🐌 螺类',
  plant: '🌿 水草',
}
