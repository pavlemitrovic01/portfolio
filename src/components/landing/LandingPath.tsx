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
