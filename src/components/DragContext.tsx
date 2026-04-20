'use client'

import { createContext, useContext, useState, useCallback, useRef, useEffect, ReactNode } from 'react'
import { Creature } from '@/types'

interface DragContextType {
  onCreatureClick: (creature: Creature) => void
  setOnCreatureClick: (callback: ((creature: Creature) => void) | undefined) => void
}

const DragContext = createContext<DragContextType | undefined>(undefined)

export function DragProvider({ children }: { children: ReactNode }) {
  const [onCreatureClick, setOnCreatureClick] = useState<((creature: Creature) => void) | undefined>()
  const onCreatureClickRef = useRef(onCreatureClick)

  useEffect(() => {
    onCreatureClickRef.current = onCreatureClick
  }, [onCreatureClick])

  const handleCreatureClick = useCallback((creature: Creature) => {
    console.log('DragContext handleCreatureClick called, callback:', typeof onCreatureClickRef.current)
    onCreatureClickRef.current?.(creature)
  }, [])

  return (
    <DragContext.Provider value={{ onCreatureClick: handleCreatureClick, setOnCreatureClick }}>
      {children}
    </DragContext.Provider>
  )
}

export function useCreatureClick() {
  const context = useContext(DragContext)
  if (!context) {
    throw new Error('useCreatureClick must be used within DragProvider')
  }
  return context
}