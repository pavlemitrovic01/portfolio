import { useState, useEffect, useRef } from 'react'
import type React from 'react'
import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import TrustSignals from './components/sections/TrustSignals'
import Systems from './components/sections/Systems'
import Flagship from './components/sections/Flagship'
import AnatomyOfBuild from './components/sections/AnatomyOfBuild'
import Process from './components/sections/Process'
import Stack from './components/sections/Stack'
import Projects from './components/sections/Projects'
import Testimonials from './components/sections/Testimonials'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Preloader from './components/layout/Preloader'
import { useMagnetic } from './hooks/useMagnetic'
import { useParallax } from './hooks/useParallax'

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
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
  }, [])
  return <canvas ref={canvasRef} className="matrix-canvas" />
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
  useMagnetic()
  useParallax()

  const [glitching, setGlitching] = useState(false)
  const [terminal, setTerminal] = useState(false)
  const [terminalLines, setTerminalLines] = useState<string[]>([])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isAdding = document.body.classList.contains('cl3menza-mode')

      if (isAdding) {
        // Boot sequence → fragment explosion
        setTerminalLines([])
        setTerminal(true)
        let idx = 0
        const iv = setInterval(() => {
          idx++
          setTerminalLines(TERMINAL_LINES.slice(0, idx))
          if (idx >= TERMINAL_LINES.length) {
            clearInterval(iv)
            setTimeout(() => {
              setTerminal(false)
              setGlitching(true)
              setTimeout(() => setGlitching(false), 1200)
            }, 400)
          }
        }, 120)
      } else {
        // Deactivate — fragment explosion only
        setGlitching(true)
        setTimeout(() => setGlitching(false), 1200)
      }
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return (
    <Layout>
      <Hero />
      <TrustSignals />
      <Systems />
      <Projects />
      <Flagship />
      <AnatomyOfBuild />
      <Process />
      <Stack />
      <Testimonials />
      <About />
      <Contact />
      {terminal && (
        <div className="terminal-overlay">
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
            {document.body.classList.contains('cl3menza-mode') ? '// cl3menza mode: OFF' : '// cl3menza mode: ON'}
          </div>
        </div>
      )}
      <Preloader />
    </Layout>
  )
}
