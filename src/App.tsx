import { lazy, Suspense, useState, useEffect } from 'react'
import type React from 'react'
import Layout from './components/layout/Layout'
import LandingScene from './components/landing/LandingScene'
import Contact from './components/sections/Contact'
import Preloader from './components/layout/Preloader'
import { useParallax } from './hooks/useParallax'
import { subscribeCl3BodyClassMutations, getCl3menzaBodyClass } from './hooks/useCl3menzaBodyClass'
import { useTerminalBoot } from './hooks/useTerminalBoot'
import MatrixRain from './components/canvas/MatrixRain'

const HeroCl3menza = lazy(() => import('./components/sections/HeroCl3menza'))
const Systems = lazy(() => import('./components/sections/Systems'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Flagship = lazy(() => import('./components/sections/Flagship'))
const AnatomyOfBuild = lazy(() => import('./components/sections/AnatomyOfBuild'))
const Process = lazy(() => import('./components/sections/Process'))
const Stack = lazy(() => import('./components/sections/Stack'))
const Testimonials = lazy(() => import('./components/sections/Testimonials'))

export default function App() {
  useParallax()

  const { cl3menzaMode, glitching, terminal, terminalLines, modeAnnouncement } =
    useTerminalBoot(subscribeCl3BodyClassMutations, getCl3menzaBodyClass)

  const [hasActivated, setHasActivated] = useState(false)

  useEffect(() => {
    if (cl3menzaMode && !hasActivated) {
      setHasActivated(true)
    }
  }, [cl3menzaMode, hasActivated])

  return (
    <Layout>
      <LandingScene cl3menzaMode={cl3menzaMode} />

      {hasActivated && (
        <div
          className={`cl3-subtree ${cl3menzaMode ? 'cl3-subtree--active' : 'cl3-subtree--hidden'}`}
          aria-hidden={!cl3menzaMode || undefined}
          inert={!cl3menzaMode || undefined}
        >
          <Suspense fallback={<div className="lazy-fallback" />}>
            <HeroCl3menza />
            <Systems />
            <Projects />
            <Flagship />
            <AnatomyOfBuild />
            <Process />
            <Stack />
            <Testimonials />
          </Suspense>
        </div>
      )}

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
