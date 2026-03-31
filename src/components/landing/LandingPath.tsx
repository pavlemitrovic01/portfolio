import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// S-curve: center → swing right → swing left → swing right → swing left → center
// viewBox: 0 0 1000 1000 (preserveAspectRatio="none")
const PATH_D =
  'M 500 0 C 500 80 740 150 690 230 C 640 310 260 370 310 450 C 360 530 740 590 690 670 C 640 750 260 810 310 890 C 360 950 500 980 500 1000'

// Junction nodes — CSS % positions matching the SVG curve inflection points
// x: 690/1000=69%, 310/1000=31%  |  y: 230/1000=23%, 450/1000=45%, 670/1000=67%, 890/1000=89%
export const JUNCTIONS = [
  { left: '69%', top: '23%', side: 'right' as const },
  { left: '31%', top: '45%', side: 'left' as const },
  { left: '69%', top: '67%', side: 'right' as const },
  { left: '31%', top: '89%', side: 'left' as const },
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
          {/* Matching ambient glow gradient — same hue progression, very low opacity */}
          <linearGradient id="journey-glow-gradient" gradientUnits="userSpaceOnUse" x1="500" y1="0" x2="500" y2="1000">
            <stop offset="0%"   stopColor="rgba(93,184,255,.22)" />
            <stop offset="52%"  stopColor="rgba(124,109,255,.18)" />
            <stop offset="100%" stopColor="rgba(120,255,240,.15)" />
          </linearGradient>
        </defs>
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
