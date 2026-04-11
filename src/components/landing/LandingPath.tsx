import { useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from 'framer-motion'

// S-curve: starts behind portrait (X=85%), short vertical drop, then S-curve through cards
// viewBox: 0 0 1000 3000 (preserveAspectRatio="none")
const PATH_D =
  'M 850 100 L 850 280 C 850 450 250 400 250 700 S 800 950 800 1300 S 200 1550 200 1900 S 800 2150 800 2500 S 500 2800 500 3000'

// Side filaments — offset ±12px in X from main path endpoints
const FIL_L =
  'M 838 100 L 838 280 C 838 450 238 400 238 700 S 788 950 788 1300 S 188 1550 188 1900 S 788 2150 788 2500 S 488 2800 488 3000'
const FIL_R =
  'M 862 100 L 862 280 C 862 450 262 400 262 700 S 812 950 812 1300 S 212 1550 212 1900 S 812 2150 812 2500 S 512 2800 512 3000'

// Junction orbs — positioned at curve inflection points
const ORB_POSITIONS = [
  { cx: 850, cy: 100 },  // origin — behind portrait
  { cx: 250, cy: 700 },
  { cx: 800, cy: 1300 },
  { cx: 200, cy: 1900 },
  { cx: 800, cy: 2500 },
] as const

// Junction % positions for LandingCards alignment (excludes origin orb)
export const JUNCTIONS = [
  { left: '25%', top: '23%', side: 'left' as const },
  { left: '80%', top: '43%', side: 'right' as const },
  { left: '20%', top: '63%', side: 'left' as const },
  { left: '80%', top: '83%', side: 'right' as const },
]

// Cosmic residue — energy micro-traces distributed along the path
const RESIDUE = [
  { cx: 848, cy: 210 }, { cx: 852, cy: 360 },
  { cx: 690, cy: 435 }, { cx: 500, cy: 545 },
  { cx: 365, cy: 625 }, { cx: 260, cy: 695 },
  { cx: 345, cy: 785 }, { cx: 515, cy: 880 },
  { cx: 672, cy: 975 }, { cx: 792, cy: 1105 },
  { cx: 806, cy: 1215 }, { cx: 665, cy: 1385 },
  { cx: 488, cy: 1495 }, { cx: 335, cy: 1605 },
  { cx: 212, cy: 1715 }, { cx: 222, cy: 1875 },
  { cx: 415, cy: 2045 }, { cx: 628, cy: 2235 },
] as const

interface LandingPathProps {
  containerRef: React.RefObject<HTMLDivElement | null>
  rewardOrbIndex?: number
  onRewardOrbClick?: () => void
}

export default function LandingPath({ containerRef, rewardOrbIndex, onRewardOrbClick }: LandingPathProps) {
  const reduceMotion = useReducedMotion() === true

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end end'],
  })

  // Orb activation thresholds
  const orb0 = useTransform(scrollYProgress, [0.00, 0.06], [0, 1])
  const orb1 = useTransform(scrollYProgress, [0.18, 0.28], [0, 1])
  const orb2 = useTransform(scrollYProgress, [0.38, 0.48], [0, 1])
  const orb3 = useTransform(scrollYProgress, [0.58, 0.68], [0, 1])
  const orb4 = useTransform(scrollYProgress, [0.78, 0.88], [0, 1])
  const orbProgress = [orb0, orb1, orb2, orb3, orb4]

  // Orb bloom opacity — pre-computed individually (can't use hooks in loops)
  const bm0 = useTransform(orb0, (v) => v * 0.28)
  const bm1 = useTransform(orb1, (v) => v * 0.28)
  const bm2 = useTransform(orb2, (v) => v * 0.28)
  const bm3 = useTransform(orb3, (v) => v * 0.28)
  const bm4 = useTransform(orb4, (v) => v * 0.28)
  const orbBloom = [bm0, bm1, bm2, bm3, bm4]

  // Filament opacity — fades in with scroll, avoids pathLength conflict with strokeDasharray
  const filBase = useTransform(scrollYProgress, [0, 0.30], [0, 1])
  const filOpL = useTransform(filBase, (v) => v * 0.14)
  const filOpR = useTransform(filBase, (v) => v * 0.11)

  // Track orb activation — sticky once (mirrors card reveal logic)
  const [act1, setAct1] = useState(false)
  const [act2, setAct2] = useState(false)
  const [act3, setAct3] = useState(false)
  const [act4, setAct4] = useState(false)
  useMotionValueEvent(orb1, 'change', (v) => { if (v >= 0.9) setAct1(true) })
  useMotionValueEvent(orb2, 'change', (v) => { if (v >= 0.9) setAct2(true) })
  useMotionValueEvent(orb3, 'change', (v) => { if (v >= 0.9) setAct3(true) })
  useMotionValueEvent(orb4, 'change', (v) => { if (v >= 0.9) setAct4(true) })
  const junctionActivated = [act1, act2, act3, act4]

  const pl = reduceMotion ? 1 : scrollYProgress

  return (
    <>
      <svg
        className="journey-svg"
        viewBox="0 0 1000 3000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Beam layer filters — max stdDeviation 15 per performance spec */}
          <filter id="f-haze"  x="-18%" y="-2%"   width="136%" height="104%">
            <feGaussianBlur stdDeviation="15" />
          </filter>
          <filter id="f-outer" x="-15%" y="-1.5%" width="130%" height="103%">
            <feGaussianBlur stdDeviation="13" />
          </filter>
          <filter id="f-inner" x="-12%" y="-1%"   width="124%" height="102%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <filter id="f-core"  x="-8%"  y="-0.5%" width="116%" height="101%">
            <feGaussianBlur stdDeviation="4.5" />
          </filter>
          <filter id="f-spine" x="-5%"  y="-0.5%" width="110%" height="101%">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
          {/* Orb filters */}
          <filter id="f-orb-bloom"  x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <filter id="f-orb-halo"   x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="f-orb-center" x="-80%"  y="-80%"  width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
          {/* Residue micro-glow */}
          <filter id="f-residue" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        {/* Ghost guide — very faint orientation trace */}
        <path
          d={PATH_D} fill="none" stroke="white"
          strokeWidth="1.5" opacity="0.05"
          vectorEffect="non-scaling-stroke"
        />

        {/* ── BEAM LAYERS — bottom (widest) to top (sharpest) ── */}

        {/* Layer 5: Carrier haze */}
        <motion.path
          d={PATH_D} fill="none" stroke="#0d3a6b" strokeWidth="50"
          filter="url(#f-haze)" opacity={0.09}
          vectorEffect="non-scaling-stroke" strokeLinecap="round"
          style={{ pathLength: pl }}
        />

        {/* Layer 4: Outer aura */}
        <motion.path
          d={PATH_D} fill="none" stroke="#1a6baa" strokeWidth="28"
          filter="url(#f-outer)" opacity={0.22}
          vectorEffect="non-scaling-stroke" strokeLinecap="round"
          style={{ pathLength: pl }}
        />

        {/* Filaments — segmented secondary currents
            Opacity-driven (not pathLength) to avoid strokeDasharray conflict */}
        {!reduceMotion && (
          <>
            <motion.path
              d={FIL_L} fill="none" stroke="#00E5FF" strokeWidth="0.8"
              strokeDasharray="28 115 20 88 32 142"
              vectorEffect="non-scaling-stroke" strokeLinecap="round"
              style={{ opacity: filOpL }}
            />
            <motion.path
              d={FIL_R} fill="none" stroke="#7dd4ff" strokeWidth="0.6"
              strokeDasharray="16 132 36 78 14 162"
              vectorEffect="non-scaling-stroke" strokeLinecap="round"
              style={{ opacity: filOpR }}
            />
          </>
        )}

        {/* Layer 3: Inner glow */}
        <motion.path
          d={PATH_D} fill="none" stroke="#00E5FF" strokeWidth="14"
          filter="url(#f-inner)" opacity={0.45}
          vectorEffect="non-scaling-stroke" strokeLinecap="round"
          style={{ pathLength: pl }}
        />

        {/* Layer 2: Core ribbon */}
        <motion.path
          d={PATH_D} fill="none" stroke="#00E5FF" strokeWidth="6"
          filter="url(#f-core)" opacity={0.78}
          vectorEffect="non-scaling-stroke" strokeLinecap="round"
          style={{ pathLength: pl }}
        />

        {/* Layer 1: White-hot spine */}
        <motion.path
          d={PATH_D} fill="none" stroke="#E8F9FF" strokeWidth="2.5"
          filter="url(#f-spine)" opacity={0.90}
          vectorEffect="non-scaling-stroke" strokeLinecap="round"
          style={{ pathLength: pl }}
        />

        {/* Cosmic residue — energy micro-traces, CSS-animated opacity */}
        {!reduceMotion && RESIDUE.map((p, i) => (
          <circle
            key={i}
            cx={p.cx} cy={p.cy} r={1.2}
            fill="#00E5FF"
            filter="url(#f-residue)"
            className="beam-residue"
            style={{ animationDelay: `-${(i * 0.37) % 3.5}s` }}
          />
        ))}

        {/* Connector lines — draw from orb to card edge as orb activates */}
        <motion.path d="M 250 700  L 550 700"  fill="none" stroke="rgba(93,184,255,0.35)" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ pathLength: reduceMotion ? 1 : orb1 }} />
        <motion.path d="M 800 1300 L 450 1300" fill="none" stroke="rgba(93,184,255,0.35)" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ pathLength: reduceMotion ? 1 : orb2 }} />
        <motion.path d="M 200 1900 L 550 1900" fill="none" stroke="rgba(93,184,255,0.35)" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ pathLength: reduceMotion ? 1 : orb3 }} />
        <motion.path d="M 800 2500 L 450 2500" fill="none" stroke="rgba(93,184,255,0.35)" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ pathLength: reduceMotion ? 1 : orb4 }} />

        {/* ── ORBS — Faza A: outer bloom + inner halo + white-hot center ── */}
        {ORB_POSITIONS.map((pos, i) => (
          <g key={i}>
            {/* Outer bloom — deep blue, wide glow */}
            <motion.circle
              cx={pos.cx} cy={pos.cy} r={32}
              fill="#0a4a8a" filter="url(#f-orb-bloom)"
              style={{ opacity: reduceMotion ? 0.22 : orbBloom[i] }}
            />
            {/* Inner halo — icy cyan */}
            <motion.circle
              cx={pos.cx} cy={pos.cy} r={15}
              fill="#00E5FF" filter="url(#f-orb-halo)"
              style={{ opacity: reduceMotion ? 0.55 : orbProgress[i] }}
            />
            {/* White-hot center */}
            <motion.circle
              cx={pos.cx} cy={pos.cy} r={4}
              fill="#FFFFFF" filter="url(#f-orb-center)"
              style={{
                opacity: reduceMotion ? 1 : orbProgress[i],
                scale: reduceMotion ? 1 : orbProgress[i],
              }}
            />
          </g>
        ))}
      </svg>

      {/* Junction DOM nodes — for halo ring effect (always circular, unaffected by SVG scaling) */}
      {JUNCTIONS.map((j, i) => {
        const isReward = i === rewardOrbIndex
        const isActivated = junctionActivated[i]
        return (
          <div
            key={i}
            className={`journey-junction${isReward ? ' journey-junction--reward' : ''}${isActivated ? ' journey-junction--activated' : ''}`}
            style={{ left: j.left, top: j.top }}
            aria-hidden={isReward ? undefined : true}
            role={isReward ? 'button' : undefined}
            tabIndex={isReward ? 0 : undefined}
            aria-label={isReward ? 'Discover hidden reward' : undefined}
            onClick={isReward ? onRewardOrbClick : undefined}
            onKeyDown={isReward ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onRewardOrbClick?.()
              }
            } : undefined}
          >
            <div className="journey-junction-halo" />
          </div>
        )
      })}
    </>
  )
}
