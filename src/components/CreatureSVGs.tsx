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
    <svg viewBox="0 0 70 50" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shrimp-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="50%" stopColor="#EE5A6F" />
          <stop offset="100%" stopColor="#C44569" />
        </linearGradient>
      </defs>
      <ellipse cx="35" cy="25" rx="22" ry="12" fill="url(#shrimp-body)" />
      <path d="M13 25 Q10 20 12 15 Q15 20 18 25 Q15 30 12 35 Q10 30 13 25Z" fill="#FF6B6B" />
      <path d="M57 25 Q62 22 65 18 Q63 25 57 25Z" fill="#C44569" />
      <path d="M57 25 Q62 28 65 32 Q63 25 57 25Z" fill="#C44569" />
      <line x1="20" y1="35" x2="15" y2="45" stroke="#C44569" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="36" x2="24" y2="46" stroke="#C44569" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36" y1="36" x2="34" y2="46" stroke="#C44569" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="44" y1="35" x2="44" y2="45" stroke="#C44569" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="52" y1="33" x2="54" y2="43" stroke="#C44569" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="55" y1="18" x2="58" y2="8" stroke="#FF6B6B" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="58" y1="18" x2="62" y2="8" stroke="#FF6B6B" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="18" cy="22" r="2.5" fill="#1a1a1a" />
      <circle cx="17.5" cy="21.5" r="0.8" fill="#fff" opacity="0.7" />
      <path d="M25 18 Q35 16 45 18" stroke="#EE5A6F" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M24 25 Q35 24 46 25" stroke="#EE5A6F" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M25 32 Q35 32 45 32" stroke="#EE5A6F" strokeWidth="1.5" fill="none" opacity="0.4" />
    </svg>
  )
}

export function CrystalShrimpSVG({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 70 50" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="crystal-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#e8f4f8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#d0e8f0" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <ellipse cx="35" cy="25" rx="22" ry="12" fill="url(#crystal-body)" stroke="#b0d8e8" strokeWidth="0.5" />
      <path d="M13 25 Q10 20 12 15 Q15 20 18 25 Q15 30 12 35 Q10 30 13 25Z" fill="#e8f4f8" opacity="0.8" />
      <path d="M57 25 Q62 22 65 18 Q63 25 57 25Z" fill="#b0d8e8" opacity="0.7" />
      <path d="M57 25 Q62 28 65 32 Q63 25 57 25Z" fill="#b0d8e8" opacity="0.7" />
      <rect x="22" y="20" width="26" height="2" rx="1" fill="#E74C3C" opacity="0.7" />
      <rect x="24" y="25" width="22" height="2" rx="1" fill="#E74C3C" opacity="0.6" />
      <rect x="26" y="30" width="18" height="1.5" rx="0.75" fill="#E74C3C" opacity="0.5" />
      <line x1="20" y1="35" x2="15" y2="45" stroke="#b0d8e8" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <line x1="28" y1="36" x2="24" y2="46" stroke="#b0d8e8" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <line x1="36" y1="36" x2="34" y2="46" stroke="#b0d8e8" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <line x1="44" y1="35" x2="44" y2="45" stroke="#b0d8e8" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <line x1="52" y1="33" x2="54" y2="43" stroke="#b0d8e8" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <line x1="55" y1="18" x2="58" y2="8" stroke="#b0d8e8" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
      <line x1="58" y1="18" x2="62" y2="8" stroke="#b0d8e8" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
      <circle cx="18" cy="22" r="2.5" fill="#1a1a1a" opacity="0.6" />
      <circle cx="17.5" cy="21.5" r="0.8" fill="#fff" opacity="0.9" />
      <ellipse cx="30" cy="18" rx="8" ry="3" fill="#fff" opacity="0.4" />
      <ellipse cx="38" cy="25" rx="10" ry="4" fill="#fff" opacity="0.3" />
    </svg>
  )
}

export function AppleSnailSVG({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 65 50" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="snail-shell" cx="45%" cy="40%">
          <stop offset="0%" stopColor="#FFD54F" />
          <stop offset="40%" stopColor="#FFA726" />
          <stop offset="100%" stopColor="#F57C00" />
        </radialGradient>
      </defs>
      <circle cx="42" cy="20" r="18" fill="url(#snail-shell)" />
      <path d="M42 20 Q42 8 50 8 Q58 8 58 16 Q58 24 50 24 Q42 24 42 20Z" fill="none" stroke="#EF6C00" strokeWidth="1.2" opacity="0.5" />
      <path d="M42 20 Q34 12 42 4 Q50 12 42 20Z" fill="none" stroke="#EF6C00" strokeWidth="1.2" opacity="0.5" />
      <circle cx="42" cy="20" r="3" fill="#E65100" opacity="0.6" />
      <ellipse cx="30" cy="42" rx="28" ry="6" fill="#F5DEB3" />
      <path d="M8 42 Q6 36 8 30 Q12 36 14 42Z" fill="#E8C9A0" />
      <circle cx="8" cy="28" r="2.5" fill="#F5DEB3" />
      <line x1="8" y1="26" x2="4" y2="18" stroke="#D4A574" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="26" x2="8" y2="16" stroke="#D4A574" strokeWidth="2" strokeLinecap="round" />
      <circle cx="4" cy="17" r="1.5" fill="#1a1a1a" />
      <circle cx="8" cy="15" r="1.5" fill="#1a1a1a" />
      <circle cx="3.5" cy="16.5" r="0.6" fill="#fff" opacity="0.7" />
      <circle cx="7.5" cy="14.5" r="0.6" fill="#fff" opacity="0.7" />
    </svg>
  )
}

export function ZebraSnailSVG({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 65 50" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="zebra-shell" cx="45%" cy="40%">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="60%" stopColor="#FFE082" />
          <stop offset="100%" stopColor="#FFB300" />
        </radialGradient>
      </defs>
      <circle cx="42" cy="20" r="18" fill="url(#zebra-shell)" />
      <path d="M30 12 Q38 8 46 12" stroke="#424242" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M28 18 Q38 14 48 18" stroke="#424242" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M27 24 Q38 20 49 24" stroke="#424242" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M28 30 Q38 26 48 30" stroke="#424242" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="42" cy="20" r="3" fill="#F57F17" opacity="0.5" />
      <ellipse cx="30" cy="42" rx="28" ry="6" fill="#F5DEB3" />
      <path d="M8 42 Q6 36 8 30 Q12 36 14 42Z" fill="#E8C9A0" />
      <circle cx="8" cy="28" r="2.5" fill="#F5DEB3" />
      <line x1="8" y1="26" x2="4" y2="18" stroke="#D4A574" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="26" x2="8" y2="16" stroke="#D4A574" strokeWidth="2" strokeLinecap="round" />
      <circle cx="4" cy="17" r="1.5" fill="#1a1a1a" />
      <circle cx="8" cy="15" r="1.5" fill="#1a1a1a" />
      <circle cx="3.5" cy="16.5" r="0.6" fill="#fff" opacity="0.7" />
      <circle cx="7.5" cy="14.5" r="0.6" fill="#fff" opacity="0.7" />
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

export function DuckweedSVG({ className, style }: SVGProps) {
  return (
    <svg viewBox="0 0 80 40" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="20" rx="18" ry="12" fill="#7CB342" opacity="0.85" />
      <ellipse cx="60" cy="22" rx="16" ry="10" fill="#8BC34A" opacity="0.8" />
      <ellipse cx="40" cy="18" rx="14" ry="9" fill="#9CCC65" opacity="0.75" />
      <ellipse cx="25" cy="18" rx="8" ry="5" fill="#AED581" opacity="0.5" />
      <ellipse cx="55" cy="20" rx="7" ry="4" fill="#C5E1A5" opacity="0.5" />
      <path d="M20 32 Q20 38 22 40" stroke="#558B2F" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M60 32 Q60 37 62 39" stroke="#558B2F" strokeWidth="1.5" fill="none" opacity="0.6" />
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
