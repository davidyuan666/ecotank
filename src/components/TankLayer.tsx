'use client'

import { TankLayer, Creature, PlacedCreature } from '@/types'
import { PlacedCreatureItem } from './CreatureCard'

interface TankLayerProps {
  layer: TankLayer
  onDrop: (layerId: string, creature: Creature) => void
  onRemoveCreature: (instanceId: string) => void
  oxygenLevel: number
}

export function TankLayerComponent({ layer, onDrop, onRemoveCreature, oxygenLevel }: TankLayerProps) {
  const isDead = oxygenLevel < 1
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('application/json')
    if (data) {
      try {
        const creature = JSON.parse(data) as Creature
        onDrop(layer.id, creature)
      } catch (err) {
        console.error('Failed to parse dropped creature')
      }
    }
  }

  const isSand = layer.type === 'sand'

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`
        rounded-lg p-3 min-h-[140px] transition-all duration-200
        ${isSand 
          ? 'bg-gradient-to-t from-amber-700 via-amber-600 to-amber-500 border-2 border-amber-800' 
          : 'bg-gradient-to-b from-cyan-400/30 via-cyan-500/40 to-cyan-600/50 border-2 border-cyan-300'
        }
        ${layer.creatures.length === 0 && !isSand ? 'border-dashed' : ''}
      `}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className={`font-bold text-sm ${isSand ? 'text-amber-100' : 'text-cyan-800'}`}>
          {layer.name}
        </h3>
        <span className={`text-xs ${isSand ? 'text-amber-200' : 'text-cyan-700'}`}>
          {layer.creatures.length}/{layer.maxCapacity}
        </span>
      </div>
      
      {layer.creatures.length === 0 ? (
        <div className={`text-center py-6 ${isSand ? 'text-amber-200/50' : 'text-cyan-200/60'}`}>
          {isSand ? '沙底层' : '拖拽生物到这里'}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {layer.creatures.map((creature) => (
            <PlacedCreatureItem
              key={creature.instanceId}
              creature={creature}
              onRemove={onRemoveCreature}
              isDead={isDead}
            />
          ))}
        </div>
      )}
    </div>
  )
}
