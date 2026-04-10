import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from 'framer-motion'

// S-curve: starts behind portrait back (X=85%), short vertical drop, then S-curve through cards
// viewBox: 0 0 1000 3000 (preserveAspectRatio="none")
const PATH_D =
  'M 850 100 L 850 280 C 850 450 250 400 250 700 S 800 950 800 1300 S 200 1550 200 1900 S 800 2150 800 2500 S 500 2800 500 3000'

// Junction orbs — positioned at curve inflection points
const ORB_POSITIONS = [
  { cx: 850, cy: 100 },   // origin — behind portrait (hidden by image z-index)
  { cx: 250, cy: 700 },
  { cx: 800, cy: 1300 },
  { cx: 200, cy: 1900 },
  { cx: 800, cy: 2500 },
] as const

// Junction % positions for LandingCards alignment (excludes origin orb)
// x: 250/1000=25%, 800/1000=80%  |  y: 700/3000≈23%, 1300/3000≈43%, 1900/3000≈63%, 2500/3000≈83%
export const JUNCTIONS = [
  { left: '25%', top: '23%', side: 'left' as const },
  { left: '80%', top: '43%', side: 'right' as const },
  { left: '20%', top: '63%', side: 'left' as const },
  { left: '80%', top: '83%', side: 'right' as const },
]

interface LandingPathProps {
  containerRef: React.RefObject<HTMLDivElement | null>
  /** Index into JUNCTIONS that carries the 10% reward orb interaction */
  rewardOrbIndex?: number
  onRewardOrbClick?: () => void
}

export default function LandingPath({ containerRef, rewardOrbIndex, onRewardOrbClick }: LandingPathProps) {
  const reduceMotion = useReducedMotion() === true
  const svgRef = useRef<SVGSVGElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end end'],
  })

  // Orb activation thresholds — each orb lights up when the line reaches it
  const orb0 = useTransform(scrollYProgress, [0.0, 0.06], [0, 1])   // origin — portrait
  const orb1 = useTransform(scrollYProgress, [0.18, 0.28], [0, 1])
  const orb2 = useTransform(scrollYProgress, [0.38, 0.48], [0, 1])
  const orb3 = useTransform(scrollYProgress, [0.58, 0.68], [0, 1])
  const orb4 = useTransform(scrollYProgress, [0.78, 0.88], [0, 1])
  const orbProgress = [orb0, orb1, orb2, orb3, orb4]

  // Track orb activation — sticky once (mirrors card reveal logic)
  // orb0 = origin (portrait), no junction — skip
  const [act1, setAct1] = useState(false)
  const [act2, setAct2] = useState(false)
  const [act3, setAct3] = useState(false)
  const [act4, setAct4] = useState(false)
  useMotionValueEvent(orb1, 'change', (v) => { if (v >= 0.9) setAct1(true) })
  useMotionValueEvent(orb2, 'change', (v) => { if (v >= 0.9) setAct2(true) })
  useMotionValueEvent(orb3, 'change', (v) => { if (v >= 0.9) setAct3(true) })
  useMotionValueEvent(orb4, 'change', (v) => { if (v >= 0.9) setAct4(true) })
  // Junction i maps to orb i+1
  const junctionActivated = [act1, act2, act3, act4]

  return (
    <>
      <svg
        ref={svgRef}
        className="journey-svg"
        viewBox="0 0 1000 3000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Neon glow filter — native SVG, no CSS drop-shadow */}
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Wider glow for orbs — bright flare effect */}
          <filter id="orbGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="18" result="orbBlur" />
            <feMerge>
              <feMergeNode in="orbBlur" />
              <feMergeNode in="orbBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Layer 1: Static ghost path — shows the route before the line draws */}
        <path
          d={PATH_D}
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity={0.1}
          vectorEffect="non-scaling-stroke"
        />

        {/* Layer 2: Scroll-driven main path */}
        <motion.path
          d={PATH_D}
          fill="none"
          stroke="#00E5FF"
          strokeWidth="2.5"
          filter="url(#neonGlow)"
          vectorEffect="non-scaling-stroke"
          style={{
            pathLength: reduceMotion ? 1 : scrollYProgress,
          }}
          strokeLinecap="round"
        />

        {/* Layer 3: Connector lines — draw from orb to card edge as orb activates */}
        {/* Right cards (1,3): orb left → card left edge (x=550). Left cards (2,4): orb right → card right edge (x=450) */}
        <motion.path d="M 250 700  L 550 700"  fill="none" stroke="rgba(93,184,255,0.40)" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ pathLength: reduceMotion ? 1 : orb1 }} />
        <motion.path d="M 800 1300 L 450 1300" fill="none" stroke="rgba(93,184,255,0.40)" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ pathLength: reduceMotion ? 1 : orb2 }} />
        <motion.path d="M 200 1900 L 550 1900" fill="none" stroke="rgba(93,184,255,0.40)" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ pathLength: reduceMotion ? 1 : orb3 }} />
        <motion.path d="M 800 2500 L 450 2500" fill="none" stroke="rgba(93,184,255,0.40)" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ pathLength: reduceMotion ? 1 : orb4 }} />

        {/* Layer 4: Junction orbs — bright flare with white core */}
        {ORB_POSITIONS.map((pos, i) => (
          <g key={i}>
            {/* Outer cyan glow */}
            <motion.circle
              cx={pos.cx}
              cy={pos.cy}
              r="12"
              fill="#00E5FF"
              filter="url(#orbGlow)"
              style={{
                opacity: reduceMotion ? 1 : orbProgress[i],
                scale: reduceMotion ? 1 : orbProgress[i],
              }}
            />
            {/* White hot core */}
            <motion.circle
              cx={pos.cx}
              cy={pos.cy}
              r="5"
              fill="white"
              filter="url(#neonGlow)"
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
