'use client'

import { CreatureCategory } from '@/types'

interface SVGProps {
  className?: string
  style?: React.CSSProperties
}

export function GoldfishSVG({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 64 40" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="goldfish-body" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#FFB347" />
          <stop offset="60%" stopColor="#FF6B35" />
          <stop offset="100%" stopColor="#D62828" />
        </radialGradient>
        <radialGradient id="goldfish-belly" cx="50%" cy="70%">
          <stop offset="0%" stopColor="#FFD580" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="28" cy="20" rx="18" ry="13" fill="url(#goldfish-body)" />
      <ellipse cx="28" cy="23" rx="13" ry="8" fill="url(#goldfish-belly)" />
      <ellipse cx="16" cy="20" rx="9" ry="7" fill="url(#goldfish-body)" />
      <path d="M7 20 Q2 13 5 6 Q9 13 7 20Z" fill="#FF6B35" />
      <path d="M42 12 Q50 5 56 12 Q50 18 42 12Z" fill="#FF8C42" opacity="0.9" />
      <path d="M28 7 Q30 2 34 4 Q32 8 28 7Z" fill="#D62828" />
      <circle cx="14" cy="17" r="3.5" fill="#fff" />
      <circle cx="14.5" cy="17.5" r="2" fill="#1a1a1a" />
      <circle cx="13.5" cy="16.5" r="0.8" fill="#fff" opacity="0.8" />
      <path d="M10 22 Q14 25 18 22" stroke="#D62828" strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  )
}

export function KoiSVG({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 72 44" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="koi-body" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="50%" stopColor="#f0f0f0" />
          <stop offset="100%" stopColor="#ddd" />
        </radialGradient>
      </defs>
      <ellipse cx="32" cy="22" rx="22" ry="14" fill="url(#koi-body)" />
      <ellipse cx="16" cy="22" rx="10" ry="8" fill="url(#koi-body)" />
      <path d="M8 22 Q3 14 6 6 Q10 14 8 22Z" fill="#E63946" />
      <path d="M50 14 Q58 6 66 14 Q58 22 50 14Z" fill="#E63946" />
      <path d="M26 8 Q29 2 35 5 Q30 9 26 8Z" fill="#E63946" />
      <path d="M50 14 Q56 10 62 14 Q56 18 50 14Z" fill="#E63946" />
      <ellipse cx="36" cy="18" rx="7" ry="4" fill="#E63946" opacity="0.7" />
      <ellipse cx="30" cy="26" rx="5" ry="3" fill="#E63946" opacity="0.5" />
      <ellipse cx="40" cy="28" rx="4" ry="2.5" fill="#1D3557" opacity="0.4" />
      <circle cx="13" cy="19" r="3.5" fill="#fff" />
      <circle cx="13.5" cy="19.5" r="2" fill="#1a1a1a" />
      <circle cx="12.5" cy="18.5" r="0.8" fill="#fff" opacity="0.8" />
    </svg>
  )
}

export function TetraSVG({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 56 36" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tetra-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#48CAE4" />
          <stop offset="50%" stopColor="#0096C7" />
          <stop offset="100%" stopColor="#023E8A" />
        </linearGradient>
      </defs>
      <ellipse cx="26" cy="18" rx="16" ry="11" fill="url(#tetra-body)" />
      <ellipse cx="13" cy="18" rx="8" ry="6" fill="url(#tetra-body)" />
      <path d="M6 18 Q2 12 5 5 Q9 12 6 18Z" fill="#90E0EF" />
      <path d="M38 10 Q46 4 52 10 Q46 16 38 10Z" fill="#48CAE4" opacity="0.8" />
      <path d="M20 5 Q22 1 26 3 Q24 6 20 5Z" fill="#48CAE4" />
      <path d="M26 28 Q30 32 34 28 Q30 30 26 28Z" fill="#48CAE4" opacity="0.6" />
      <path d="M18 14 Q24 10 30 14 Q24 18 18 14Z" fill="#fff" opacity="0.3" />
      <circle cx="11" cy="16" r="3" fill="#fff" />
      <circle cx="11.5" cy="16.5" r="1.8" fill="#1a1a1a" />
      <circle cx="10.5" cy="15.5" r="0.7" fill="#fff" opacity="0.8" />
    </svg>
  )
}

export function ShrimpSVG({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 80 56" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shrimp-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6b8e6b" />
          <stop offset="50%" stopColor="#4a6a4a" />
          <stop offset="100%" stopColor="#2d4a2d" />
        </linearGradient>
      </defs>
      <path d="M18 28 Q12 22 6 12 Q14 4 24 12 Q28 20 32 28" fill="#4a6a4a" />
      <path d="M18 28 Q12 22 6 12 Q14 4 24 12 Q28 20 32 28" fill="none" stroke="#3a5a3a" strokeWidth="0.5" />
      <path d="M32 28 Q36 20 40 12 Q50 4 62 12 Q70 20 74 28 Q78 36 72 42 Q64 48 52 46 Q38 46 28 40 Q22 36 18 28Z" fill="url(#shrimp-body)" />
      <path d="M72 28 Q78 22 80 18 Q76 28 72 28Z" fill="#3a5a3a" />
      <path d="M72 28 Q78 34 80 38 Q76 28 72 28Z" fill="#3a5a3a" />
      <path d="M70 28 Q76 24 78 20 Q74 28 70 28Z" fill="#4a6a4a" />
      <path d="M70 28 Q76 32 78 36 Q74 28 70 28Z" fill="#4a6a4a" />
      <line x1="28" y1="40" x2="20" y2="52" stroke="#3a5a3a" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="36" y1="42" x2="30" y2="54" stroke="#3a5a3a" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="46" y1="43" x2="42" y2="55" stroke="#3a5a3a" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="56" y1="40" x2="54" y2="52" stroke="#3a5a3a" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="62" y1="14" x2="60" y2="2" stroke="#4a6a4a" strokeWidth="1" strokeLinecap="round" />
      <line x1="64" y1="14" x2="66" y2="2" stroke="#4a6a4a" strokeWidth="1" strokeLinecap="round" />
      <circle cx="20" cy="24" r="4" fill="#2d4a2d" />
      <circle cx="21" cy="23" r="1.5" fill="#1a2e1a" />
      <circle cx="21.5" cy="22.5" r="0.6" fill="#fff" opacity="0.4" />
      <path d="M62 14 Q68 10 74 14" stroke="#3a5a3a" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M60 18 Q66 14 72 18" stroke="#3a5a3a" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M58 22 Q64 18 70 22" stroke="#3a5a3a" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M56 26 Q62 22 68 26" stroke="#3a5a3a" strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  )
}

export function CrystalShrimpSVG({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 80 56" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="crystal-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.92" />
          <stop offset="50%" stopColor="#e0f8ff" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#b0d8f0" stopOpacity="0.82" />
        </linearGradient>
      </defs>
      <path d="M18 28 Q12 22 6 12 Q14 4 24 12 Q28 20 32 28" fill="#a0d0e8" opacity="0.7" />
      <path d="M32 28 Q36 20 40 12 Q50 4 62 12 Q70 20 74 28 Q78 36 72 42 Q64 48 52 46 Q38 46 28 40 Q22 36 18 28Z" fill="url(#crystal-body)" />
      <path d="M72 28 Q78 22 80 18 Q76 28 72 28Z" fill="#80c0d8" opacity="0.8" />
      <path d="M72 28 Q78 34 80 38 Q76 28 72 28Z" fill="#80c0d8" opacity="0.8" />
      <path d="M70 28 Q76 24 78 20 Q74 28 70 28Z" fill="#c0e0f0" opacity="0.6" />
      <rect x="36" y="16" width="28" height="3" rx="1.5" fill="#c0392b" opacity="0.65" clipPath="none" />
      <rect x="40" y="24" width="24" height="3" rx="1.5" fill="#c0392b" opacity="0.5" />
      <rect x="44" y="32" width="20" height="2.5" rx="1" fill="#c0392b" opacity="0.4" />
      <line x1="28" y1="40" x2="20" y2="52" stroke="#80c0d8" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
      <line x1="36" y1="42" x2="30" y2="54" stroke="#80c0d8" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
      <line x1="46" y1="43" x2="42" y2="55" stroke="#80c0d8" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
      <line x1="56" y1="40" x2="54" y2="52" stroke="#80c0d8" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
      <line x1="62" y1="14" x2="60" y2="2" stroke="#80c0d8" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
      <line x1="64" y1="14" x2="66" y2="2" stroke="#80c0d8" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
      <circle cx="20" cy="24" r="4" fill="#006080" opacity="0.5" />
      <circle cx="21" cy="23" r="1.5" fill="#003050" opacity="0.4" />
      <circle cx="21.5" cy="22.5" r="0.6" fill="#fff" opacity="0.6" />
      <line x1="36" y1="14" x2="60" y2="14" stroke="#fff" strokeWidth="0.6" opacity="0.5" />
      <line x1="40" y1="22" x2="62" y2="22" stroke="#fff" strokeWidth="0.6" opacity="0.4" />
      <line x1="44" y1="30" x2="62" y2="30" stroke="#fff" strokeWidth="0.6" opacity="0.3" />
    </svg>
  )
}

export function AppleSnailSVG({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 80 60" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="snail-shell" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#FF8A80" />
          <stop offset="50%" stopColor="#e53935" />
          <stop offset="100%" stopColor="#b71c1c" />
        </radialGradient>
      </defs>
      <ellipse cx="44" cy="26" rx="28" ry="24" fill="url(#snail-shell)" />
      <path d="M28 26 Q28 8 44 8 Q60 8 60 26 Q60 44 44 44 Q28 44 28 26Z" fill="none" stroke="#c62828" strokeWidth="1" opacity="0.3" />
      <path d="M30 26 Q30 12 44 12 Q58 12 58 26 Q58 38 44 38 Q30 38 30 26Z" fill="none" stroke="#d32f2f" strokeWidth="1" opacity="0.3" />
      <path d="M34 26 Q34 18 44 18 Q54 18 54 26 Q54 34 44 34 Q34 34 34 26Z" fill="none" stroke="#e53935" strokeWidth="1" opacity="0.3" />
      <path d="M38 26 Q38 22 44 22 Q50 22 50 26 Q50 30 44 30 Q38 30 38 26Z" fill="#b71c1c" opacity="0.4" />
      <ellipse cx="44" cy="26" rx="5" ry="5" fill="#b71c1c" opacity="0.5" />
      <path d="M12 50 Q8 44 10 38 Q14 44 16 50Z" fill="#f5cba7" />
      <ellipse cx="40" cy="52" rx="36" ry="7" fill="#f5cba7" />
      <path d="M4 50 Q8 46 12 50 Q8 54 4 50Z" fill="#e0b090" />
      <path d="M76 50 Q72 46 68 50 Q72 54 76 50Z" fill="#e0b090" />
      <line x1="16" y1="50" x2="64" y2="50" stroke="#e0b090" strokeWidth="0.5" />
      <path d="M12 50 Q10 42 12 36 Q16 42 18 50" fill="#e0b090" />
      <circle cx="10" cy="34" r="3" fill="#f5cba7" />
      <line x1="10" y1="32" x2="6" y2="24" stroke="#e0b090" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="32" x2="10" y2="22" stroke="#e0b090" strokeWidth="2" strokeLinecap="round" />
      <circle cx="6" cy="23" r="1.5" fill="#1a1a1a" />
      <circle cx="10" cy="21" r="1.5" fill="#1a1a1a" />
      <circle cx="5.5" cy="22.5" r="0.5" fill="#fff" opacity="0.6" />
      <circle cx="9.5" cy="20.5" r="0.5" fill="#fff" opacity="0.6" />
      <path d="M8 35 Q6 38 4 36" stroke="#e0b090" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function ZebraSnailSVG({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 80 60" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="zebra-shell" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="100%" stopColor="#f9a825" />
        </linearGradient>
      </defs>
      <path d="M50 52 Q54 46 56 38 Q58 26 50 18 Q42 10 34 14 Q26 18 26 28 Q26 38 34 44 Q42 50 50 52Z" fill="url(#zebra-shell)" />
      <path d="M50 52 Q54 46 56 38 Q58 26 50 18 Q42 10 34 14 Q26 18 26 28 Q26 38 34 44 Q42 50 50 52Z" fill="none" stroke="#f57f17" strokeWidth="0.8" />
      <path d="M30 30 Q28 22 34 16 Q42 12 48 16 Q54 20 52 30 Q50 40 42 44 Q34 46 30 30Z" fill="none" stroke="#212121" strokeWidth="1.5" opacity="0.6" />
      <path d="M28 32 Q26 26 32 20 Q38 16 44 18 Q50 22 48 30 Q46 38 38 40 Q30 40 28 32Z" fill="none" stroke="#212121" strokeWidth="1.5" opacity="0.6" />
      <path d="M26 34 Q24 28 30 24 Q36 20 40 22 Q44 26 42 32 Q40 38 32 38 Q26 36 26 34Z" fill="#f9a825" opacity="0.3" />
      <ellipse cx="50" cy="54" rx="28" ry="5" fill="#f5cba7" />
      <path d="M22 54 Q18 50 22 46 Q26 50 30 54Z" fill="#e0b090" />
      <path d="M78 54 Q82 50 78 46 Q74 50 70 54Z" fill="#e0b090" />
      <line x1="24" y1="54" x2="76" y2="54" stroke="#e0b090" strokeWidth="0.5" />
      <path d="M22 54 Q20 46 22 40 Q26 46 28 54" fill="#e0b090" />
      <circle cx="20" cy="38" r="3" fill="#f5cba7" />
      <line x1="20" y1="36" x2="14" y2="28" stroke="#e0b090" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="36" x2="20" y2="26" stroke="#e0b090" strokeWidth="2" strokeLinecap="round" />
      <circle cx="14" cy="27" r="1.5" fill="#1a1a1a" />
      <circle cx="20" cy="25" r="1.5" fill="#1a1a1a" />
      <circle cx="13.5" cy="26.5" r="0.5" fill="#fff" opacity="0.6" />
      <circle cx="19.5" cy="24.5" r="0.5" fill="#fff" opacity="0.6" />
    </svg>
  )
}

export function AnacharisSVG({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 60 180" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="anacharis-stem" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#52B788" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#40916C" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="anacharis-leaf1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#74C69D" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#52B788" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="anacharis-leaf2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#95D5B2" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#40916C" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <rect x="27" y="20" width="6" height="155" rx="3" fill="url(#anacharis-stem)" />
      {[40, 70, 100, 130, 160].map((y, i) => (
        <g key={y}>
          <path d={`M30 ${y} Q5 ${y - 18} 3 ${y - 35} Q18 ${y - 10} 30 ${y}Z`} fill="url(#anacharis-leaf1)" />
          <path d={`M30 ${y} Q55 ${y - 18} 57 ${y - 35} Q42 ${y - 10} 30 ${y}Z`} fill="url(#anacharis-leaf2)" />
        </g>
      ))}
    </svg>
  )
}

export function AnubiasSVG({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 120 140" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="anubias-leaf" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#95D5B2" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#52B788" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#2D6A4F" stopOpacity="0.85" />
        </radialGradient>
        <filter id="anubias-blur">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
      </defs>
      <path d="M60 130 Q55 80 35 50 Q15 30 24 10 Q44 30 60 40 Q76 30 96 10 Q105 30 85 50 Q65 80 60 130Z" fill="url(#anubias-leaf)" />
      <path d="M60 120 Q56 75 40 50 Q25 32 32 15 Q48 32 60 38 Q72 32 88 15 Q95 32 80 50 Q64 75 60 120Z" fill="#52B788" opacity="0.45" />
      <path d="M60 110 Q40 80 30 55" stroke="#2D6A4F" strokeWidth="2" fill="none" opacity="0.3" />
      <path d="M60 110 Q80 80 90 55" stroke="#2D6A4F" strokeWidth="2" fill="none" opacity="0.3" />
      <path d="M60 110 Q60 70 60 50" stroke="#2D6A4F" strokeWidth="1.5" fill="none" opacity="0.3" />
      {[20, 40, 60, 80, 100].map((y, i) => (
        <g key={y}>
          <path d={`M60 ${y} Q30 ${y - 25} 22 ${y - 45} Q42 ${y - 20} 60 ${y}Z`} fill="#74C69D" opacity="0.5" />
          <path d={`M60 ${y} Q90 ${y - 25} 98 ${y - 45} Q78 ${y - 20} 60 ${y}Z`} fill="#40916C" opacity="0.5" />
        </g>
      ))}
    </svg>
  )
}

export function getCreatureSVG(category: CreatureCategory, className?: string, style?: React.CSSProperties) {
  switch (category) {
    case 'fish':
      return <GoldfishSVG className={className} style={style} />
    case 'shrimp':
      return <ShrimpSVG className={className} style={style} />
    case 'snail':
      return <AppleSnailSVG className={className} style={style} />
    case 'plant':
      return <AnacharisSVG className={className} style={style} />
    default:
      return <GoldfishSVG className={className} style={style} />
  }
}
