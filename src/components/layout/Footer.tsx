import { useState, useEffect } from 'react'
import { useCl3menzaBodyClass } from '../../hooks/useCl3menzaBodyClass'

const START = new Date('2026-01-15T23:00:00')

function useElapsed() {
  const [elapsed, setElapsed] = useState(() => Date.now() - START.getTime())

  useEffect(() => {
    const id = setInterval(() => setElapsed(Date.now() - START.getTime()), 1000)
    return () => clearInterval(id)
  }, [])

  const totalSeconds = Math.floor(elapsed / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, h: hours, m: minutes, s: seconds }
}

export default function Footer() {
  const { days, h, m, s } = useElapsed()
  const cl3menzaMode = useCl3menzaBodyClass()

  return (
    <footer>
      <div className="container">
        <div className="footer-row">
          <div className="footer-left">
            <span>&copy; 2026 cl3menza.com</span>
            <span className="footer-elapsed">Built &middot; {days}d, {h}h {m.toString().padStart(2, '0')}m {s.toString().padStart(2, '0')}s</span>
          </div>
          <nav className="footer-nav">
            {cl3menzaMode ? (
              <>
                <a href="#offers">Systems</a>
                <a href="#projects">Projects</a>
                <a href="#project">Flagship</a>
                <a href="#anatomy">Anatomy</a>
                <a href="#process">Process</a>
                <a href="#contact">Contact</a>
              </>
            ) : (
              <>
                <a href="#signals">Signals</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
              </>
            )}
          </nav>
          <div className="footer-links">
            <a href="https://github.com/pavlemitrovic01/portfolio" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="mailto:hello@cl3menza.com">hello@cl3menza.com</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
