import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import type React from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import TrustSignals from './components/sections/TrustSignals'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Preloader from './components/layout/Preloader'
import { useMagnetic } from './hooks/useMagnetic'
import { useParallax } from './hooks/useParallax'
import { subscribeCl3BodyClassMutations, getCl3menzaBodyClass } from './hooks/useCl3menzaBodyClass'

const Systems = lazy(() => import('./components/sections/Systems'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Flagship = lazy(() => import('./components/sections/Flagship'))
const AnatomyOfBuild = lazy(() => import('./components/sections/AnatomyOfBuild'))
const Process = lazy(() => import('./components/sections/Process'))
const Stack = lazy(() => import('./components/sections/Stack'))
const Testimonials = lazy(() => import('./components/sections/Testimonials'))

const MatrixRain: React.FC = () => {
  const reduceMotion = useReducedMotion() === true
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (reduceMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|/\\+=~^%$#@!?'
    const fontSize = 14
    const cols = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(cols).fill(1)
    let animId: number
    const draw = () => {
      ctx.fillStyle = 'rgba(2,4,8,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const progress = y / (canvas.height / fontSize)
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffffff'
          ctx.shadowColor = '#78fff0'
          ctx.shadowBlur = 15
        } else if (progress < 0.3) {
          ctx.fillStyle = 'rgba(120,255,240,0.9)'
          ctx.shadowColor = '#78fff0'
          ctx.shadowBlur = 8
        } else {
          ctx.fillStyle = `rgba(120,255,240,${0.15 + Math.random() * 0.4})`
          ctx.shadowBlur = 0
        }
        ctx.font = `${fontSize}px "Space Grotesk", monospace`
        ctx.fillText(char, i * fontSize, y * fontSize)
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [reduceMotion])
  return <canvas ref={canvasRef} className="matrix-canvas" aria-hidden />
}

const TERMINAL_LINES = [
  '> initializing cl3menza.os v2.1.78...',
  '> scanning environment... ✓',
  '> loading react@19.0.0 ✓',
  '> loading framer-motion@12.0.0 ✓',
  '> loading typescript@5.0.0 ✓',
  '> loading supabase-js@2.0.0 ✓',
  '> injecting glitch-identity.css ✓',
  '> calibrating particle engine ✓',
  '> mounting premium.config ✓',
  '> overriding default.theme ✓',
  '> enabling cl3menza-mode ████████████ 100%',
  '> SYSTEM READY.',
  '',
  '// welcome to cl3menza mode',
]

export default function App() {
  const reduceMotion = useReducedMotion() === true
  const sectionFade = reduceMotion
    ? {
        initial: { opacity: 0, y: 0 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.01, ease: [0.22, 1, 0.36, 1] as const } },
        exit: { opacity: 0, y: 0, transition: { duration: 0.01 } },
      }
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
      }

  useMagnetic()
  useParallax()

  const [cl3menzaMode, setCl3menzaMode] = useState(false)
  const [glitching, setGlitching] = useState(false)
  const [terminal, setTerminal] = useState(false)
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [modeAnnouncement, setModeAnnouncement] = useState('')
  const cl3menzaModeRef = useRef(false)
  const modeTransitionTimersRef = useRef<{
    intervalId: ReturnType<typeof setInterval> | null
    timeoutIds: ReturnType<typeof setTimeout>[]
  }>({ intervalId: null, timeoutIds: [] })

  useEffect(() => {
    cl3menzaModeRef.current = cl3menzaMode
  }, [cl3menzaMode])

  useEffect(() => {
    const clearModeTransitionTimers = () => {
      const slot = modeTransitionTimersRef.current
      if (slot.intervalId !== null) {
        clearInterval(slot.intervalId)
        slot.intervalId = null
      }
      slot.timeoutIds.forEach(clearTimeout)
      slot.timeoutIds = []
    }

    const unsub = subscribeCl3BodyClassMutations(() => {
      const isActive = getCl3menzaBodyClass()
      const internal = cl3menzaModeRef.current

      if (isActive && !internal) {
        // Activating — boot sequence → fragment explosion
        setTerminalLines([])
        setTerminal(true)
        let idx = 0
        const iv = setInterval(() => {
          idx++
          setTerminalLines(TERMINAL_LINES.slice(0, idx))
          if (idx >= TERMINAL_LINES.length) {
            clearInterval(iv)
            modeTransitionTimersRef.current.intervalId = null
            const t1 = setTimeout(() => {
              setTerminal(false)
              setGlitching(true)
              cl3menzaModeRef.current = true
              setCl3menzaMode(true)
              window.scrollTo({ top: 0, behavior: 'instant' })
              const t2 = setTimeout(() => {
                setGlitching(false)
                setModeAnnouncement('cl3menza mode activated')
                document.getElementById('main-content')?.focus()
              }, 1200)
              modeTransitionTimersRef.current.timeoutIds.push(t2)
            }, 400)
            modeTransitionTimersRef.current.timeoutIds.push(t1)
          }
        }, 120)
        modeTransitionTimersRef.current.intervalId = iv
      } else if (!isActive && internal) {
        // Deactivating — fragment explosion
        setGlitching(true)
        cl3menzaModeRef.current = false
        setCl3menzaMode(false)
        window.scrollTo({ top: 0, behavior: 'instant' })
        const t = setTimeout(() => {
          setGlitching(false)
          setModeAnnouncement('cl3menza mode deactivated')
          document.getElementById('main-content')?.focus()
        }, 1200)
        modeTransitionTimersRef.current.timeoutIds.push(t)
      }
    })

    return () => {
      clearModeTransitionTimers()
      unsub()
    }
  }, [])

  return (
    <Layout>
      <Hero />

      <AnimatePresence mode="wait">
        {!cl3menzaMode ? (
          <motion.div key="normal" {...sectionFade}>
            <TrustSignals />
            <About />
          </motion.div>
        ) : (
          <motion.div key="cl3menza" {...sectionFade}>
            <Suspense fallback={<div className="lazy-fallback" />}>
              <Systems />
              <Projects />
              <Flagship />
              <AnatomyOfBuild />
              <Process />
              <Stack />
              <Testimonials />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      <Contact />

      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{modeAnnouncement}</div>

      {terminal && (
        <div className="terminal-overlay" role="status" aria-label="cl3menza mode loading" aria-live="polite">
          <MatrixRain />
          <div className="terminal-window">
            <div className="terminal-header">
              <span className="terminal-dot td-r" />
              <span className="terminal-dot td-y" />
              <span className="terminal-dot td-g" />
              <span className="terminal-title">cl3menza.os — terminal</span>
            </div>
            <div className="terminal-body">
              {terminalLines.map((line, i) => (
                <div key={i} className={`terminal-line ${line.startsWith('//') ? 'tl-comment' : ''} ${line.includes('READY') ? 'tl-ready' : ''} ${line.includes('100%') ? 'tl-progress' : ''}`}>
                  {line}
                  {i === terminalLines.length - 1 && <span className="terminal-cursor" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {glitching && (
        <div className="fragment-overlay" aria-hidden="true">
          {Array.from({length: 48}).map((_, i) => {
            const col = i % 6
            const row = Math.floor(i / 6)
            const tx = (Math.random() * 300 - 150)
            const ty = (Math.random() * 300 - 150)
            const rot = (Math.random() * 1440 - 720)
            const delay = (Math.random() * 400)
            return (
              <div
                key={i}
                className="fragment-tile"
                style={{
                  left: `${(col / 6) * 100}%`,
                  top: `${(row / 8) * 100}%`,
                  width: `${100/6}%`,
                  height: `${100/8}%`,
                  '--tx': `${tx}vw`,
                  '--ty': `${ty}vh`,
                  '--rot': `${rot}deg`,
                  '--delay': `${delay}ms`,
                  '--col': col,
                  '--row': row,
                } as React.CSSProperties}
              />
            )
          })}
          <div className="fragment-label">
            {cl3menzaMode ? '// cl3menza mode: ON' : '// cl3menza mode: OFF'}
          </div>
        </div>
      )}
      <Preloader />
    </Layout>
  )
}
