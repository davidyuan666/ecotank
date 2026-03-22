'use client'

import { CreaturePanel } from '@/components/CreaturePanel'
import { Tank } from '@/components/Tank'

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            🌊 生态鱼缸模拟器
          </h1>
          <p className="text-gray-600 text-sm">
            拖拽生物到水缸中，生物会自动游动！水草会产生氧气，氧气归零生物会死亡沉底。
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tank />
          </div>
          <div className="lg:col-span-1">
            <CreaturePanel />
          </div>
        </div>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>💡 小贴士：水草会产生氧气，鱼虾螺会消耗氧气。氧气归零时生物会沉底。</p>
          <p className="mt-1">点击鱼缸中的生物可将其移除。</p>
        </footer>
      </div>
    </main>
  )
}
