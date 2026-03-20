import { useState, useEffect } from 'react'

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const start = Date.now()
    const duration = 1200
    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / duration, 1)
      setProgress(p)
      if (p < 1) {
        requestAnimationFrame(tick)
      } else {
        setTimeout(() => setHidden(true), 300)
      }
    }
    requestAnimationFrame(tick)
  }, [])

  if (hidden) return null

  return (
    <div className={`preloader ${progress >= 1 ? 'preloader--done' : ''}`}>
      <div className="preloader-inner">
        <div className="preloader-brand">
          <span className="preloader-dot" />
          <span className="preloader-name">cl3menza</span>
        </div>
        <div className="preloader-bar">
          <div className="preloader-fill" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </div>
  )
}
