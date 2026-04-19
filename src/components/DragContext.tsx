'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Creature } from '@/types'

interface DragContextType {
  draggedCreature: Creature | null
  setDraggedCreature: (creature: Creature | null) => void
}

const DragContext = createContext<DragContextType | undefined>(undefined)

export function DragProvider({ children }: { children: ReactNode }) {
  const [draggedCreature, setDraggedCreature] = useState<Creature | null>(null)

  return (
    <DragContext.Provider value={{ draggedCreature, setDraggedCreature }}>
      {children}
    </DragContext.Provider>
  )
}

export function useDrag() {
  const context = useContext(DragContext)
  if (!context) {
    throw new Error('useDrag must be used within DragProvider')
  }
  return context
}