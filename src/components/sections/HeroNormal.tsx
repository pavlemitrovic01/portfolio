import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const TIMELINE = [
  { year: '2025', title: 'Started building', desc: 'Before Padrino, my focus wasn\'t just on learning tools — it was on understanding how real digital products come to life. Ones that don\'t just look good on screen, but have structure, purpose and the ability to work in the real world. Padrino was the turning point: decisions gained weight, details started making a difference, and development grew into a real product building experience. That\'s when I clearly understood I wanted to do this seriously — not just building interfaces or features, but products with identity, system and real value.' },
  { year: '2025', title: 'Padrino Budva', desc: 'First major project — a full ordering system for a pizza restaurant in Montenegro. Cart, payments, admin panel, delivery zones, real-time notifications. Built from scratch.' },
  { year: '2026', title: 'cl3menza.com', desc: 'Portfolio as product. Not a template, not a resume — a living system that demonstrates the approach. Every interaction is intentional.' },
  { year: '2026', title: 'What\'s next', desc: 'Over the next 12 months, I want to build more ambitious, mature and visually striking products — ones that combine premium execution with real function. Custom web platforms, e-commerce and ordering systems, admin and operations tools, and AI-assisted products that accelerate work and decision-making. The goal is to keep pushing the boundary between developer, product builder and creative systems thinker — not making just another website, but digital products that have attitude, precision and the feeling they were made with purpose.' },
]

const VALUES = [
  { label: 'Build like a product', desc: 'Every project gets product thinking — not just code.' },
  { label: 'Zero template mindset', desc: 'Nothing is copy-pasted. Everything is intentional.' },
  { label: 'Ship what works', desc: 'Real users, real payments, real uptime.' },
]

export default function HeroNormal() {
  const glitchRef = useRef<HTMLSpanElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const glitchingRef = useRef(false)

  const orig = 'Mitrovic'
  const targ = 'cl3menza'
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%'

  useEffect(() => {
    const el = glitchRef.current
    if (!el) return
    let intervalId: ReturnType<typeof setInterval> | null = null
    const handleEnter = () => {
      if (glitchingRef.current) return
      glitchingRef.current = true
      leftColRef.current?.classList.add('glitch-shaking')
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
          leftColRef.current?.classList.remove('glitch-shaking')
          el.textContent = targ
          el.style.color = 'var(--cyan)'
          el.classList.add('glitch-resolved')
          glitchingRef.current = false
        }
      }, 40)
    }
    const handleLeave = () => {
      if (intervalId) { clearInterval(intervalId); intervalId = null }
      leftColRef.current?.classList.remove('glitch-shaking')
      el.textContent = orig
      el.style.color = ''
      el.classList.remove('glitch-resolved')
      glitchingRef.current = false
    }
    el.addEventListener('mouseenter', handleEnter)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      if (intervalId) clearInterval(intervalId)
      el.removeEventListener('mouseenter', handleEnter)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div className="hero-personal">
      <motion.div ref={leftColRef} className="hero-intro" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <div className="eyebrow">Digital product engineer · Serbia → Global</div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h1>
            <span className="line pavle">Pavle</span>
            <span className="line glitch" ref={glitchRef}>Mitrovic</span>
          </h1>
        </motion.div>
        <motion.div variants={itemVariants}>
          <p className="hero-personal-pitch">
            I build digital products with the same seriousness applied to brands, systems and experiences that stay in memory. What interests me most is the intersection of a clear idea, excellent execution and the feeling that every detail is there for a reason — from architecture and performance to interface, rhythm and final impression. I don't think about a product as just code or design, but as a whole that must communicate value, trust and quality at first contact. That intersection of product thinking, engineering and visual precision is where I do my best work.
          </p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <div className="hero-personal-facts">
            <div className="hero-fact">
              <span className="hero-fact-num">1</span>
              <span className="hero-fact-label">Flagship project live</span>
            </div>
            <div className="hero-fact">
              <span className="hero-fact-num">2025</span>
              <span className="hero-fact-label">Building since</span>
            </div>
            <div className="hero-fact">
              <span className="hero-fact-num">0</span>
              <span className="hero-fact-label">Templates used</span>
            </div>
          </div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <div className="hero-actions">
            <a className="button primary magnetic" href="#about">My story</a>
            <a className="button magnetic" href="#contact">Start a project</a>
          </div>
        </motion.div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        className="hero-timeline"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <div className="timeline-line" />
        {TIMELINE.map((item, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-year">{item.year}</div>
            <div className="timeline-content">
              <p className="timeline-title">{item.title}</p>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Values */}
      <motion.div
        className="hero-values"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      >
        {VALUES.map((v, i) => (
          <div key={i} className="hero-value">
            <span className="hero-value-label">{v.label}</span>
            <span className="hero-value-desc">{v.desc}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
