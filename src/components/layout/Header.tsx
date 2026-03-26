import { useState, useEffect } from 'react'
import { useCl3menzaBodyClass } from '../../hooks/useCl3menzaBodyClass'

export default function Header() {
  const cl3menzaMode = useCl3menzaBodyClass()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [cl3menzaMode])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header>
      <div className="container topbar">
        <div className="brand">
          <span className="brand-text">Pavle Mitrovic / cl3menza</span>
          {cl3menzaMode && (
            <button className="cl3-mode-badge" onClick={() => document.body.classList.remove('cl3menza-mode')}>
              cl3menza mode: ON <span>×</span>
            </button>
          )}
        </div>
        <button
          type="button"
          className="mobile-nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="header-topbar-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="mobile-nav-toggle-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
        <nav
          id="header-topbar-nav"
          className={`topbar-nav${menuOpen ? ' is-open' : ''}`}
        >
          {!cl3menzaMode ? (
            <>
              <a href="#signals" onClick={closeMenu}>Signals</a>
              <a href="#about" onClick={closeMenu}>About</a>
              <a href="#contact" onClick={closeMenu}>Contact</a>
            </>
          ) : (
            <>
              <a href="#offers" onClick={closeMenu}>Systems</a>
              <a href="#projects" onClick={closeMenu}>Projects</a>
              <a href="#project" onClick={closeMenu}>Flagship</a>
              <a href="#anatomy" onClick={closeMenu}>Anatomy</a>
              <a href="#process" onClick={closeMenu}>Process</a>
              <a href="#contact" onClick={closeMenu}>Contact</a>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
