import { useRef, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface LandingHeroProps {
  onPrefetch: () => void
  onStepInside: () => void
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}
const item = (reduceMotion: boolean) => ({
  hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
})

export default function LandingHero({ onPrefetch, onStepInside }: LandingHeroProps) {
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
          <div className="landing-eyebrow">Full-stack product engineer · Serbia → Global</div>
        </motion.div>

        <motion.div variants={it}>
          <h1 className="landing-h1">
            <span className="landing-h1-line">Pavle</span>
            <span className="landing-h1-line lhero-surname" ref={glitchRef}>Mitrovic</span>
          </h1>
        </motion.div>

        <motion.div variants={it}>
          <p className="landing-positioning">
            Full-stack developer focused on product thinking, clean systems, and premium execution.
          </p>
        </motion.div>

        <motion.div variants={it}>
          <p className="landing-sub">
            I build digital products that do not just look good — they feel intentional, work cleanly, and hold up in the real world.
          </p>
        </motion.div>

        <motion.div variants={it}>
          <div className="landing-ctas">
            <button className="button ghost" type="button" onClick={onStepInside} onMouseEnter={onPrefetch}>
              Step Inside
            </button>
            <a
              href="#landing-path"
              className="lhero-scroll-cue"
              aria-label="Scroll to explore the story"
            >
              <span>Curious? Scroll down</span>
              <span className="lhero-scroll-cue-arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Right — Cinematic Portrait with Fade-out */}
      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        className="lhero-portrait-cinematic"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)',
        }}
      >
        <img
          src="/pavle-portrait.webp"
          alt="Pavle Mitrovic"
          className="lhero-portrait-img"
          width="900"
          height="1350"
        />

        {/* Cyan glow behind shoulders */}
        <div className="lhero-portrait-cyan-glow" aria-hidden="true" />
      </motion.div>
    </div>
  )
}
