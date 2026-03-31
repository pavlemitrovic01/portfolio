import { useRef, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface LandingHeroProps {
  onPrefetch: () => void
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}
const item = (reduceMotion: boolean) => ({
  hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
})

export default function LandingHero({ onPrefetch }: LandingHeroProps) {
  const reduceMotion = useReducedMotion() === true
  const glitchRef = useRef<HTMLSpanElement>(null)
  const glitchingRef = useRef(false)
  const orig = 'Mitrovic'
  const targ = 'cl3menza'
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%'

  useEffect(() => {
    const el = glitchRef.current
    if (!el || reduceMotion) return
    let intervalId: ReturnType<typeof setInterval> | null = null

    const handleEnter = () => {
      if (glitchingRef.current) return
      glitchingRef.current = true
      let i = 0
      const max = 16
      intervalId = setInterval(() => {
        const p = i / max
        const rev = Math.floor(p * targ.length)
        el.textContent = targ.split('').map((c, j) =>
          j < rev ? c : chars[Math.floor(Math.random() * chars.length)]
        ).join('')
        el.style.color = p < 0.3 ? 'var(--blue)' : p < 0.7 ? 'var(--blue-2)' : 'var(--cyan)'
        i++
        if (i >= max) {
          if (intervalId) clearInterval(intervalId)
          intervalId = null
          el.textContent = targ
          el.style.color = 'var(--cyan)'
          glitchingRef.current = false
        }
      }, 40)
    }
    const handleLeave = () => {
      if (intervalId) { clearInterval(intervalId); intervalId = null }
      el.textContent = orig
      el.style.color = ''
      glitchingRef.current = false
    }
    el.addEventListener('mouseenter', handleEnter)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      if (intervalId) clearInterval(intervalId)
      el.removeEventListener('mouseenter', handleEnter)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [reduceMotion])

  const it = item(reduceMotion)

  return (
    <div className="lhero">
      {/* Left — editorial copy */}
      <motion.div
        className="lhero-copy"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={it}>
          <div className="landing-eyebrow">Digital product engineer · Serbia → Global</div>
        </motion.div>

        <motion.div variants={it}>
          <h1 className="landing-h1">
            <span className="landing-h1-line">Pavle</span>
            <span className="landing-h1-line lhero-surname" ref={glitchRef}>Mitrovic</span>
          </h1>
        </motion.div>

        <motion.div variants={it}>
          <p className="landing-positioning">
            Full-stack developer with a builder mindset.
          </p>
        </motion.div>

        <motion.div variants={it}>
          <p className="landing-sub">
            Turning ideas into high-quality, no BS digital products that actually deliver value.
          </p>
        </motion.div>

        <motion.div variants={it}>
          <div className="landing-ctas">
            <a className="button primary" href="#landing-path">
              About me
            </a>
            <a
              className="button ghost"
              href="#landing-activation"
              onMouseEnter={onPrefetch}
            >
              See my work
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Right — portrait / scene visual anchor */}
      <motion.div
        className="lhero-portrait-wrap"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <div className="lhero-portrait">
          <div className="lhero-portrait-glow" aria-hidden="true" />
          <div className="lhero-portrait-placeholder" aria-label="Portrait — Pavle Mitrovic">
            <span className="lhero-portrait-initials">PM</span>
          </div>
        </div>

        <div className="lhero-badge lhero-badge--tl" aria-hidden="true">
          <span className="lhero-badge-dot" />
          <span>Available for projects</span>
        </div>
        <div className="lhero-badge lhero-badge--br" aria-hidden="true">
          <span>Serbia → Global</span>
        </div>
      </motion.div>
    </div>
  )
}
