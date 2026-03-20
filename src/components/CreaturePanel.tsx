'use client'

import { useState } from 'react'
import { Creature } from '@/types'
import { creaturesByCategory, categoryNames } from '@/data/creatures'
import { CreatureCard } from './CreatureCard'

export function CreaturePanel() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [draggedCreature, setDraggedCreature] = useState<Creature | null>(null)

  const categories = Object.keys(creaturesByCategory) as (keyof typeof creaturesByCategory)[]

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        🐠 生物选择
      </h2>
      
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            className={`
              px-2 py-1 rounded-full text-xs font-medium transition-all
              ${selectedCategory === cat 
                ? 'bg-blue-500 text-white' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }
            `}
          >
            {categoryNames[cat]}
          </button>
        ))}
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
        {categories
          .filter(cat => selectedCategory === null || selectedCategory === cat)
          .map(cat => (
            <div key={cat}>
              <h3 className="text-sm font-bold text-gray-600 mb-2">
                {categoryNames[cat]}
              </h3>
              <div className="space-y-2">
                {creaturesByCategory[cat].map(creature => (
                  <CreatureCard
                    key={creature.id}
                    creature={creature}
                    onDragStart={setDraggedCreature}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
