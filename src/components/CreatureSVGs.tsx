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
    <svg viewBox="0 0 52 28" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shrimp-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#adb5bd" />
          <stop offset="40%" stopColor="#6c757d" />
          <stop offset="100%" stopColor="#495057" />
        </linearGradient>
      </defs>
      <path d="M44 14 Q46 10 44 6 Q40 10 44 14Z" fill="#adb5bd" />
      <path d="M42 14 Q44 10 42 6 Q38 10 42 14Z" fill="#ced4da" opacity="0.7" />
      <path d="M40 14 Q42 10 40 6 Q36 10 40 14Z" fill="#adb5bd" />
      <ellipse cx="35" cy="14" rx="8" ry="5" fill="url(#shrimp-body)" />
      <path d="M28 10 Q24 6 20 8 Q24 12 28 10Z" fill="#6c757d" />
      <path d="M28 18 Q24 22 20 20 Q24 16 28 18Z" fill="#6c757d" />
      <ellipse cx="20" cy="14" rx="9" ry="6" fill="url(#shrimp-body)" />
      <ellipse cx="12" cy="14" rx="5" ry="4" fill="#adb5bd" />
      <ellipse cx="7" cy="14" rx="3" ry="2.5" fill="#ced4da" />
      <circle cx="7" cy="11" r="2.5" fill="#343a40" />
      <circle cx="8" cy="10.5" r="0.8" fill="#fff" opacity="0.6" />
    </svg>
  )
}

export function CrystalShrimpSVG({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 52 28" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="crystal-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e0f7fa" />
          <stop offset="50%" stopColor="#80deea" />
          <stop offset="100%" stopColor="#4dd0e1" />
        </linearGradient>
      </defs>
      <path d="M44 14 Q46 10 44 6 Q40 10 44 14Z" fill="#b2ebf2" />
      <path d="M42 14 Q44 10 42 6 Q38 10 42 14Z" fill="#e0f7fa" opacity="0.8" />
      <path d="M40 14 Q42 10 40 6 Q36 10 40 14Z" fill="#b2ebf2" />
      <ellipse cx="35" cy="14" rx="8" ry="5" fill="url(#crystal-body)" opacity="0.8" />
      <path d="M28 10 Q24 6 20 8 Q24 12 28 10Z" fill="#4dd0e1" />
      <path d="M28 18 Q24 22 20 20 Q24 16 28 18Z" fill="#4dd0e1" />
      <ellipse cx="20" cy="14" rx="9" ry="6" fill="url(#crystal-body)" opacity="0.7" />
      <ellipse cx="12" cy="14" rx="5" ry="4" fill="#e0f7fa" opacity="0.6" />
      <ellipse cx="7" cy="14" rx="3" ry="2.5" fill="#b2ebf2" />
      <circle cx="7" cy="11" r="2.5" fill="#0097a7" opacity="0.8" />
      <circle cx="8" cy="10.5" r="0.8" fill="#fff" opacity="0.8" />
      <line x1="15" y1="10" x2="20" y2="8" stroke="#fff" strokeWidth="0.5" opacity="0.4" />
      <line x1="25" y1="12" x2="32" y2="10" stroke="#fff" strokeWidth="0.5" opacity="0.4" />
    </svg>
  )
}

export function AppleSnailSVG({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="snail-shell" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#c0392b" />
        </radialGradient>
      </defs>
      <path d="M28 44 Q28 28 20 24 Q10 22 10 34 Q10 44 20 44Z" fill="#f5cba7" />
      <path d="M12 32 Q12 22 22 18 Q30 18 28 28 Q28 36 20 38Z" fill="url(#snail-shell)" />
      <path d="M15 30 Q16 24 22 22 Q28 24 26 30 Q26 36 20 36Z" fill="#e74c3c" opacity="0.6" />
      <path d="M18 28 Q19 24 23 23 Q27 24 26 28 Q26 32 22 32Z" fill="#c0392b" opacity="0.5" />
      <path d="M20 26 Q21 24 23 24 Q25 24 24 26 Q24 28 22 28Z" fill="#922b21" opacity="0.4" />
      <path d="M20 44 Q18 48 16 44" stroke="#f5cba7" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M26 44 Q28 48 30 44" stroke="#f5cba7" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="22" cy="44" rx="8" ry="3" fill="#f5cba7" opacity="0.5" />
      <path d="M10 36 Q6 30 8 26 Q12 30 10 36Z" fill="#f5cba7" />
      <circle cx="8" cy="24" r="2.5" fill="#f5cba7" />
      <circle cx="8" cy="23" r="1.5" fill="#1a1a1a" />
      <circle cx="7.5" cy="22.5" r="0.5" fill="#fff" opacity="0.6" />
    </svg>
  )
}

export function ZebraSnailSVG({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 48 44" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="zebra-shell" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#FFF3CD" />
          <stop offset="100%" stopColor="#F4D03F" />
        </radialGradient>
      </defs>
      <path d="M28 40 Q28 26 20 22 Q10 20 10 30 Q10 40 20 40Z" fill="#f5cba7" />
      <path d="M12 28 Q12 20 20 16 Q28 18 26 28 Q26 36 20 36Z" fill="url(#zebra-shell)" />
      <path d="M14 27 Q14 22 20 20 Q26 22 24 27" stroke="#2c3e50" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M13 30 Q13 25 19 23 Q25 25 23 30" stroke="#2c3e50" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M12 33 Q12 28 18 26 Q24 28 22 33" stroke="#2c3e50" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M20 40 Q18 44 16 40" stroke="#f5cba7" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M26 40 Q28 44 30 40" stroke="#f5cba7" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="22" cy="40" rx="8" ry="3" fill="#f5cba7" opacity="0.5" />
      <path d="M10 32 Q6 26 8 22 Q12 26 10 32Z" fill="#f5cba7" />
      <circle cx="8" cy="20" r="2.5" fill="#f5cba7" />
      <circle cx="8" cy="19" r="1.5" fill="#1a1a1a" />
      <circle cx="7.5" cy="18.5" r="0.5" fill="#fff" opacity="0.6" />
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
