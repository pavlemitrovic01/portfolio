import { useState, useEffect } from 'react'

export default function Header() {
  const [cl3menzaMode, setCl3menzaMode] = useState(false)

  useEffect(() => {
    const update = () => setCl3menzaMode(document.body.classList.contains('cl3menza-mode'))
    update()
    const observer = new MutationObserver(update)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return (
    <header>
      <div className="container topbar">
        <div className="brand">
          Pavle Mitrovic / cl3menza
          {cl3menzaMode && (
            <button className="cl3-mode-badge" onClick={() => document.body.classList.remove('cl3menza-mode')}>
              cl3menza mode: ON <span>×</span>
            </button>
          )}
        </div>
        <nav>
          {!cl3menzaMode ? (
            <>
              <a href="#signals">Signals</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </>
          ) : (
            <>
              <a href="#offers">Systems</a>
              <a href="#projects">Projects</a>
              <a href="#project">Flagship</a>
              <a href="#process">Process</a>
              <a href="#contact">Contact</a>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
