// @vitest-environment jsdom
/// <reference types="vitest/globals" />
import { render, screen, act } from '@testing-library/react'
import App from '../App'

// --- Module mocks ---

vi.mock('framer-motion', async () => {
  const { createElement } = await import('react')
  return {
    motion: {
      div: ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement>) =>
        createElement('div', rest as React.HTMLAttributes<HTMLDivElement>, children),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useReducedMotion: vi.fn(() => null),
  }
})

vi.mock('../components/layout/Layout', async () => {
  const { createElement } = await import('react')
  return { default: ({ children }: { children: React.ReactNode }) => createElement('div', null, children) }
})
vi.mock('../components/layout/Preloader', () => ({ default: () => null }))

vi.mock('../components/landing/LandingScene', async () => {
  const { createElement } = await import('react')
  return { default: ({ cl3menzaMode }: { cl3menzaMode: boolean }) =>
    createElement('div', { 'data-testid': 'landing-scene', 'data-cl3': String(cl3menzaMode) })
  }
})
vi.mock('../components/sections/Contact', async () => {
  const { createElement } = await import('react')
  return { default: () => createElement('div', { 'data-testid': 'contact' }) }
})
vi.mock('../components/sections/HeroCl3menza', async () => {
  const { createElement } = await import('react')
  return { default: () => createElement('div', { 'data-testid': 'hero-cl3menza' }) }
})
vi.mock('../components/sections/Systems', async () => {
  const { createElement } = await import('react')
  return { default: () => createElement('div', { 'data-testid': 'systems' }) }
})
vi.mock('../components/sections/Projects', async () => {
  const { createElement } = await import('react')
  return { default: () => createElement('div', { 'data-testid': 'projects' }) }
})
vi.mock('../components/sections/Flagship', async () => {
  const { createElement } = await import('react')
  return { default: () => createElement('div', { 'data-testid': 'flagship' }) }
})
vi.mock('../components/sections/AnatomyOfBuild', async () => {
  const { createElement } = await import('react')
  return { default: () => createElement('div', { 'data-testid': 'anatomy' }) }
})
vi.mock('../components/sections/Process', async () => {
  const { createElement } = await import('react')
  return { default: () => createElement('div', { 'data-testid': 'process' }) }
})
vi.mock('../components/sections/Stack', async () => {
  const { createElement } = await import('react')
  return { default: () => createElement('div', { 'data-testid': 'stack' }) }
})
vi.mock('../components/sections/Testimonials', async () => {
  const { createElement } = await import('react')
  return { default: () => createElement('div', { 'data-testid': 'testimonials' }) }
})

vi.mock('../hooks/useMagnetic', () => ({ useMagnetic: vi.fn() }))
vi.mock('../hooks/useParallax', () => ({ useParallax: vi.fn() }))

// --- Environment setup ---

beforeAll(() => {
  window.scrollTo = vi.fn()
  HTMLCanvasElement.prototype.getContext = vi.fn(() => null)
})

beforeEach(() => {
  vi.useFakeTimers()
  document.body.classList.remove('cl3menza-mode')
})

afterEach(() => {
  document.body.classList.remove('cl3menza-mode')
  vi.useRealTimers()
})

// Boot sequence: 14 lines × 120ms + 400ms delay + 1200ms glitch = 3280ms
const BOOT_MS = 3500

// --- Tests ---

describe('App — initial render', () => {
  it('renders landing scene in normal mode', () => {
    render(<App />)
    expect(screen.getByTestId('landing-scene')).toBeInTheDocument()
    expect(screen.queryByTestId('systems')).not.toBeInTheDocument()
  })

  it('renders contact regardless of mode', () => {
    render(<App />)
    expect(screen.getByTestId('contact')).toBeInTheDocument()
  })

  it('does not mount cl3 subtree before first activation', () => {
    render(<App />)
    expect(document.querySelector('.cl3-subtree')).not.toBeInTheDocument()
  })
})

describe('App — cl3menza mode activation', () => {
  it('shows terminal overlay during boot sequence', async () => {
    render(<App />)

    await act(async () => {
      document.body.classList.add('cl3menza-mode')
      await vi.advanceTimersByTimeAsync(300)
    })

    expect(document.querySelector('.terminal-overlay')).toBeInTheDocument()
  })

  it('mounts cl3 subtree after boot completes', async () => {
    render(<App />)

    await act(async () => {
      document.body.classList.add('cl3menza-mode')
      await vi.advanceTimersByTimeAsync(BOOT_MS)
    })

    expect(screen.getByTestId('systems')).toBeInTheDocument()
    expect(document.querySelector('.cl3-subtree--active')).toBeInTheDocument()
  })

  it('hides terminal overlay after boot completes', async () => {
    render(<App />)

    await act(async () => {
      document.body.classList.add('cl3menza-mode')
      await vi.advanceTimersByTimeAsync(BOOT_MS)
    })

    expect(document.querySelector('.terminal-overlay')).not.toBeInTheDocument()
  })

  it('announces cl3menza mode activated for screen readers', async () => {
    render(<App />)

    await act(async () => {
      document.body.classList.add('cl3menza-mode')
      await vi.advanceTimersByTimeAsync(BOOT_MS)
    })

    expect(screen.getByText('cl3menza mode activated')).toBeInTheDocument()
  })
})

describe('App — cl3menza mode deactivation', () => {
  it('hides cl3 subtree but keeps it mounted after deactivation', async () => {
    render(<App />)

    await act(async () => {
      document.body.classList.add('cl3menza-mode')
      await vi.advanceTimersByTimeAsync(BOOT_MS)
    })

    await act(async () => {
      document.body.classList.remove('cl3menza-mode')
      await vi.advanceTimersByTimeAsync(1500)
    })

    // cl3 subtree stays mounted but hidden (continuous scroll architecture)
    expect(document.querySelector('.cl3-subtree--hidden')).toBeInTheDocument()
    // sections still in DOM, just visually hidden
    expect(screen.getByTestId('systems')).toBeInTheDocument()
    // landing scene still visible
    expect(screen.getByTestId('landing-scene')).toBeInTheDocument()
  })

  it('announces cl3menza mode deactivated for screen readers', async () => {
    render(<App />)

    await act(async () => {
      document.body.classList.add('cl3menza-mode')
      await vi.advanceTimersByTimeAsync(BOOT_MS)
    })

    await act(async () => {
      document.body.classList.remove('cl3menza-mode')
      await vi.advanceTimersByTimeAsync(1500)
    })

    expect(screen.getByText('cl3menza mode deactivated')).toBeInTheDocument()
  })
})

describe('App — accessibility', () => {
  it('sets aria-hidden and inert on cl3 subtree when deactivated', async () => {
    render(<App />)

    await act(async () => {
      document.body.classList.add('cl3menza-mode')
      await vi.advanceTimersByTimeAsync(BOOT_MS)
    })

    const subtree = document.querySelector('.cl3-subtree')
    expect(subtree).not.toHaveAttribute('aria-hidden')

    await act(async () => {
      document.body.classList.remove('cl3menza-mode')
      await vi.advanceTimersByTimeAsync(1500)
    })

    expect(subtree).toHaveAttribute('aria-hidden', 'true')
  })
})
