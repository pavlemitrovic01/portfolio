import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

interface LandingActivationProps {
  cl3menzaMode: boolean
  onPrefetch: () => void
}

const ENTER_LINE_RATIO = 0.45
const EXIT_LINE_RATIO = 0.72
const PREFETCH_LINE_RATIO = 1.75
const ENTER_COOLDOWN_MS = 1800
const EXIT_COOLDOWN_MS = 900

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export default function LandingActivation({
  cl3menzaMode,
  onPrefetch,
}: LandingActivationProps) {
  const zoneRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const reduceMotion = useReducedMotion() === true

  const cl3Ref = useRef(cl3menzaMode)
  const prefetchedRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const cooldownUntilRef = useRef(0)

  useEffect(() => {
    cl3Ref.current = cl3menzaMode
  }, [cl3menzaMode])

  useEffect(() => {
    const zone = zoneRef.current
    if (!zone) return

    const setProgressVisuals = (progress: number) => {
      zone.style.setProperty('--activation-progress', progress.toFixed(3))

      if (glowRef.current && !reduceMotion) {
        const opacity = 0.08 + progress * 0.92
        const scale = 0.55 + progress * 0.45
        glowRef.current.style.opacity = `${opacity}`
        glowRef.current.style.transform = `scale(${scale})`
      }
    }

    const tick = () => {
      rafRef.current = null

      const rect = zone.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const zoneMid = rect.top + rect.height / 2

      const enterLine = vh * ENTER_LINE_RATIO
      const exitLine = vh * EXIT_LINE_RATIO
      const prefetchLine = vh * PREFETCH_LINE_RATIO
      const buildupStart = vh * 1.15

      const progress = clamp(
        (buildupStart - zoneMid) / (buildupStart - enterLine),
        0,
        1,
      )

      setProgressVisuals(progress)

      if (!prefetchedRef.current && rect.top < prefetchLine) {
        prefetchedRef.current = true
        onPrefetch()
      }

      const now = performance.now()
      if (now < cooldownUntilRef.current) return

      const shouldEnter = zoneMid <= enterLine
      const shouldExit = zoneMid >= exitLine

      if (shouldEnter && !cl3Ref.current) {
        cooldownUntilRef.current = now + ENTER_COOLDOWN_MS

        if (!document.body.classList.contains('cl3menza-mode')) {
          document.body.classList.add('cl3menza-mode')
        }

        return
      }

      if (shouldExit && cl3Ref.current) {
        cooldownUntilRef.current = now + EXIT_COOLDOWN_MS
        document.body.dataset.cl3Quiet = 'true'
        document.body.classList.remove('cl3menza-mode')
      }
    }

    const schedule = () => {
      if (rafRef.current !== null) return
      rafRef.current = window.requestAnimationFrame(tick)
    }

    setProgressVisuals(0)
    schedule()

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [onPrefetch, reduceMotion])

  // ── Visual shell ──────────────────────────────────────────────
  return (
    <div
      ref={zoneRef}
      className="landing-activation"
      id="landing-activation"
      data-cl3-active={cl3menzaMode ? 'true' : 'false'}
    >
      {/* Scroll-driven energy glow — inner behavior owns this ref */}
      <div ref={glowRef} className="landing-activation-glow" aria-hidden="true" />

      {/* Visual content */}
      <div className="lact-content">
        <p className="lact-pre">Ready to build with the mind behind this?</p>
        <p className="lact-sub">
          Get ready to enter{' '}
          <span className="lact-glitch" data-text="cl3menza">cl3menza</span>
          {' '}mode
        </p>
        <div className="lact-heading" aria-label="cl3menza mode">
          <span className="lact-brand">cl3menza</span>
          <span className="lact-mode"> mode</span>
          <span className="lact-dashes" aria-hidden="true"> ——</span>
        </div>
      </div>

      {/* Scroll indicator — keeps existing classes for CSS continuity */}
      <div className="landing-activation-line" aria-hidden="true">
        <div className="landing-activation-pulse" />
      </div>
      <p className="landing-activation-hint" aria-hidden="true">Keep scrolling</p>
    </div>
  )
}
