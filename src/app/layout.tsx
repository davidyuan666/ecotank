import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '生态鱼缸模拟器',
  description: '一个模拟生态缸的互动网站',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200">
        {children}
      </body>
    </html>
  )
}
