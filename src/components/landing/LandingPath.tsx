import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// S-curve: portrait zone → swing right (1st junction) → swing left → swing right → swing left → center
// Path starts at x=760 (76% — portrait zone) then descends into S-curve
// viewBox: 0 0 1000 1000 (preserveAspectRatio="none")
const PATH_D =
  'M 760 0 C 760 85 760 160 680 240 C 625 320 260 370 300 440 C 350 515 740 575 680 650 C 625 730 260 795 300 870 C 350 940 500 978 500 1000'

// Junction nodes — CSS % positions matching the SVG curve inflection points
// x: 680/1000=68%, 300/1000=30%  |  y: 240/1000=24%, 440/1000=44%, 650/1000=65%, 870/1000=87%
export const JUNCTIONS = [
  { left: '68%', top: '24%', side: 'right' as const },
  { left: '30%', top: '44%', side: 'left' as const },
  { left: '68%', top: '65%', side: 'right' as const },
  { left: '30%', top: '87%', side: 'left' as const },
]

interface LandingPathProps {
  containerRef: React.RefObject<HTMLDivElement | null>
}

export default function LandingPath({ containerRef }: LandingPathProps) {
  const fillRef = useRef<SVGPathElement>(null)
  const reduceMotion = useReducedMotion() === true

  useEffect(() => {
    const fill = fillRef.current
    if (!fill || reduceMotion) return

    if (window.matchMedia('(max-width: 760px)').matches) {
      // Mobile: static full fill
      fill.style.strokeDasharray = ''
      fill.style.strokeDashoffset = '0'
      return
    }

    const totalLength = fill.getTotalLength()
    fill.style.strokeDasharray = `${totalLength}`
    fill.style.strokeDashoffset = `${totalLength}`

    const container = containerRef.current
    if (!container) return

    let rafId: number | null = null

    const update = () => {
      rafId = null
      const rect = container.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height + vh
      const elapsed = vh - rect.top
      const progress = Math.min(1, Math.max(0, elapsed / total))
      fill.style.strokeDashoffset = `${totalLength * (1 - progress)}`
    }

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [reduceMotion, containerRef])

  return (
    <>
      {/* SVG: path lines only (circles omitted — DOM nodes below stay perfectly round) */}
      <svg
        className="journey-svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Subtle premium gradient: blue → violet → cyan along vertical path */}
          <linearGradient id="journey-path-gradient" gradientUnits="userSpaceOnUse" x1="500" y1="0" x2="500" y2="1000">
            <stop offset="0%"   stopColor="rgba(93,184,255,.95)" />
            <stop offset="52%"  stopColor="rgba(124,109,255,.88)" />
            <stop offset="100%" stopColor="rgba(120,255,240,.85)" />
          </linearGradient>
          {/* Ambient glow gradient — medium-strength hue progression */}
          <linearGradient id="journey-glow-gradient" gradientUnits="userSpaceOnUse" x1="500" y1="0" x2="500" y2="1000">
            <stop offset="0%"   stopColor="rgba(93,184,255,.45)" />
            <stop offset="52%"  stopColor="rgba(124,109,255,.38)" />
            <stop offset="100%" stopColor="rgba(120,255,240,.32)" />
          </linearGradient>
          {/* Wide atmospheric bloom — soft wash for volumetric presence */}
          <linearGradient id="journey-bloom-gradient" gradientUnits="userSpaceOnUse" x1="500" y1="0" x2="500" y2="1000">
            <stop offset="0%"   stopColor="rgba(93,184,255,.18)" />
            <stop offset="50%"  stopColor="rgba(124,109,255,.14)" />
            <stop offset="100%" stopColor="rgba(120,255,240,.12)" />
          </linearGradient>
        </defs>
        {/* atmospheric bloom — widest, softest layer */}
        <path d={PATH_D} className="journey-bloom" vectorEffect="non-scaling-stroke" />
        {/* dim track */}
        <path d={PATH_D} className="journey-track" vectorEffect="non-scaling-stroke" />
        {/* scroll-driven colored fill */}
        <path d={PATH_D} className="journey-fill" ref={fillRef} vectorEffect="non-scaling-stroke" />
        {/* outer glow layer */}
        <path d={PATH_D} className="journey-glow" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Junction nodes — absolute DOM divs (never distorted by SVG scaling) */}
      {JUNCTIONS.map((j, i) => (
        <div
          key={i}
          className="journey-junction"
          style={{ left: j.left, top: j.top }}
          aria-hidden="true"
        >
          <div className="journey-junction-halo" />
          <div className="journey-junction-core" />
        </div>
      ))}
    </>
  )
}
