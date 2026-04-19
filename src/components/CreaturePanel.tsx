'use client'

import { useState } from 'react'
import { Creature } from '@/types'
import { creaturesByCategory, categoryNames } from '@/data/creatures'
import { CreatureCard } from './CreatureCard'

export function CreaturePanel() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Object.keys(creaturesByCategory) as (keyof typeof creaturesByCategory)[]

  return (
    <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/10 h-full">
      <h2 className="text-lg font-bold text-cyan-100 mb-4 text-center flex items-center justify-center gap-2">
        <span>🐠</span>
        <span>生物图鉴</span>
      </h2>
      
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            className={`
              px-3 py-1.5 rounded-full text-xs font-semibold transition-all
              ${selectedCategory === cat 
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' 
                : 'bg-slate-700/80 text-cyan-200/80 hover:bg-slate-600/80 border border-white/5'
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
              <h3 className="text-sm font-semibold text-cyan-300/70 mb-2 flex items-center gap-1">
                <span>{categoryNames[cat].split(' ')[0]}</span>
                <span className="text-cyan-300/40">{categoryNames[cat].split(' ').slice(1).join(' ')}</span>
              </h3>
              <div className="space-y-2">
                {creaturesByCategory[cat].map(creature => (
                  <CreatureCard
                    key={creature.id}
                    creature={creature}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
