'use client'

import { useState } from 'react'
import { TankLayer as TankLayerType, Creature, PlacedCreature } from '@/types'
import { TankLayerComponent } from './TankLayer'
import { OxygenMeter } from './OxygenMeter'

const initialLayers: TankLayerType[] = [
  { id: 'layer-1', name: '第1层', type: 'water', creatures: [], maxCapacity: 4 },
  { id: 'layer-2', name: '第2层', type: 'water', creatures: [], maxCapacity: 4 },
  { id: 'layer-3', name: '第3层', type: 'water', creatures: [], maxCapacity: 4 },
  { id: 'layer-4', name: '第4层', type: 'water', creatures: [], maxCapacity: 4 },
  { id: 'sand', name: '沙底层', type: 'sand', creatures: [], maxCapacity: 10 },
]

export function Tank() {
  const [layers, setLayers] = useState<TankLayerType[]>(initialLayers)

  const calculateOxygen = () => {
    let total = 0
    layers.forEach(layer => {
      layer.creatures.forEach(creature => {
        total += creature.oxygenChange
      })
    })
    return Math.max(0, Math.min(100, total))
  }

  const handleDrop = (layerId: string, creature: Creature) => {
    setLayers(prev => prev.map(layer => {
      if (layer.id === layerId && layer.creatures.length < layer.maxCapacity) {
        const newCreature: PlacedCreature = {
          ...creature,
          instanceId: `${creature.id}-${Date.now()}-${Math.random()}`
        }
        return { ...layer, creatures: [...layer.creatures, newCreature] }
      }
      return layer
    }))
  }

  const handleRemoveCreature = (instanceId: string) => {
    setLayers(prev => prev.map(layer => ({
      ...layer,
      creatures: layer.creatures.filter(c => c.instanceId !== instanceId)
    })))
  }

  const handleReset = () => {
    setLayers(initialLayers)
  }

  const waterLayers = layers.filter(l => l.type === 'water')
  const oxygenLevel = calculateOxygen()

  return (
    <div className="w-full">
      <div className="bg-gradient-to-b from-sky-300/20 via-sky-400/30 to-sky-500/40 
                      rounded-2xl p-4 shadow-2xl border-4 border-sky-600">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-cyan-800">🏠 水缸</h2>
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
        <div className="space-y-3">
          {waterLayers.map(layer => (
            <TankLayerComponent
              key={layer.id}
              layer={layer}
              onDrop={handleDrop}
              onRemoveCreature={handleRemoveCreature}
              oxygenLevel={oxygenLevel}
            />
          ))}
          <TankLayerComponent
            key="sand"
            layer={layers.find(l => l.type === 'sand')!}
            onDrop={handleDrop}
            onRemoveCreature={handleRemoveCreature}
            oxygenLevel={oxygenLevel}
          />
        </div>
      </div>
    </div>
  )
}
