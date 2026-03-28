import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function LandingPath() {
  const fillRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion() === true

  useEffect(() => {
    const fill = fillRef.current
    if (!fill || reduceMotion) return

    // Mobile: static — no scroll listener
    if (window.matchMedia('(max-width: 760px)').matches) return

    const zone = fill.closest('.landing-path-zone') as HTMLElement | null
    if (!zone) return

    let rafId: number | null = null

    const update = () => {
      const rect = zone.getBoundingClientRect()
      const vh = window.innerHeight
      // progress: 0 when top of zone hits bottom of viewport, 1 when bottom of zone hits top
      const total = rect.height + vh
      const elapsed = vh - rect.top
      const progress = Math.min(1, Math.max(0, elapsed / total))
      fill.style.transform = `scaleY(${progress})`
      rafId = null
    }

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(update)
      }
    }

    // Initial paint
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [reduceMotion])

  return (
    <div className="lpath" aria-hidden="true">
      <div className="lpath-track">
        <div className="lpath-fill" ref={fillRef} />
        <div className="lpath-glow" />
      </div>
      <div className="lpath-node lpath-node--top" />
      <div className="lpath-node lpath-node--bottom" />
    </div>
  )
}
