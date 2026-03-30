'use client'

import { CreaturePanel } from '@/components/CreaturePanel'
import { Tank } from '@/components/Tank'

function WaveIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <path d="M2 20 Q8 12 14 20 Q20 28 26 20 Q30 16 34 18" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" fill="none" className="wave-path-1" />
      <path d="M2 26 Q8 18 14 26 Q20 34 26 26 Q30 22 34 24" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" fill="none" className="wave-path-2" />
      <circle cx="8" cy="10" r="3" fill="#38bdf8" opacity="0.6" />
      <circle cx="28" cy="8" r="2" fill="#7dd3fc" opacity="0.5" />
    </svg>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-4">
          <div className="inline-flex items-center gap-2 mb-2">
            <WaveIcon />
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
              生态鱼缸模拟器
            </h1>
            <WaveIcon />
          </div>

        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tank />
          </div>
          <div className="lg:col-span-1">
            <CreaturePanel />
          </div>
        </div>

        <footer className="mt-8 text-center text-gray-400 text-xs">
          <p>点击鱼缸中的生物可将其移除。</p>
        </footer>
      </div>
    </main>
  )
}
