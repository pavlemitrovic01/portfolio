import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const LABELS = [
  { pct: '20%', side: 'right', text: '§ 001' },
  { pct: '52%', side: 'left', text: '§ 002' },
  { pct: '80%', side: 'right', text: '§ 003' },
] as const

export default function LandingPath() {
  const fillRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion() === true

  useEffect(() => {
    const fill = fillRef.current
    const container = containerRef.current
    if (!fill || !container || reduceMotion) return

    // Mobile: static — no scroll listener
    if (window.matchMedia('(max-width: 760px)').matches) return

    const zone = fill.closest('.landing-path-zone') as HTMLElement | null
    if (!zone) return

    let rafId: number | null = null

    const update = () => {
      const rect = zone.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height + vh
      const elapsed = vh - rect.top
      const progress = Math.min(1, Math.max(0, elapsed / total))
      fill.style.transform = `scaleY(${progress})`
      container.style.setProperty('--lpath-progress', String(progress))
      rafId = null
    }

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [reduceMotion])

  return (
    <div className="lpath" ref={containerRef} aria-hidden="true">
      <div className="lpath-track">
        <div className="lpath-fill" ref={fillRef} />
        <div className="lpath-glow" />
      </div>
      <div className="lpath-node lpath-node--top" />
      <div className="lpath-node lpath-node--bottom" />
      {LABELS.map(({ pct, side, text }) => (
        <div key={text} className={`lpath-label lpath-label--${side}`} style={{ top: pct }}>
          {text}
        </div>
      ))}
    </div>
  )
}
