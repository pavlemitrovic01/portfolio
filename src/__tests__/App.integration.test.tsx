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

vi.mock('../components/sections/Hero', async () => {
  const { createElement } = await import('react')
  return { default: () => createElement('div', { 'data-testid': 'hero' }) }
})
vi.mock('../components/sections/TrustSignals', async () => {
  const { createElement } = await import('react')
  return { default: () => createElement('div', { 'data-testid': 'trust-signals' }) }
})
vi.mock('../components/sections/About', async () => {
  const { createElement } = await import('react')
  return { default: () => createElement('div', { 'data-testid': 'about' }) }
})
vi.mock('../components/sections/Contact', async () => {
  const { createElement } = await import('react')
  return { default: () => createElement('div', { 'data-testid': 'contact' }) }
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
  it('renders normal mode sections', () => {
    render(<App />)
    expect(screen.getByTestId('trust-signals')).toBeInTheDocument()
    expect(screen.getByTestId('about')).toBeInTheDocument()
    expect(screen.queryByTestId('systems')).not.toBeInTheDocument()
  })

  it('renders hero and contact regardless of mode', () => {
    render(<App />)
    expect(screen.getByTestId('hero')).toBeInTheDocument()
    expect(screen.getByTestId('contact')).toBeInTheDocument()
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

  it('activates cl3menza mode after full boot sequence', async () => {
    render(<App />)

    await act(async () => {
      document.body.classList.add('cl3menza-mode')
      await vi.advanceTimersByTimeAsync(BOOT_MS)
    })

    expect(screen.queryByTestId('trust-signals')).not.toBeInTheDocument()
    expect(screen.getByTestId('systems')).toBeInTheDocument()
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
  it('restores normal mode after deactivation', async () => {
    render(<App />)

    await act(async () => {
      document.body.classList.add('cl3menza-mode')
      await vi.advanceTimersByTimeAsync(BOOT_MS)
    })

    await act(async () => {
      document.body.classList.remove('cl3menza-mode')
      await vi.advanceTimersByTimeAsync(1500)
    })

    expect(screen.getByTestId('trust-signals')).toBeInTheDocument()
    expect(screen.queryByTestId('systems')).not.toBeInTheDocument()
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

describe('App — reduced motion', () => {
  it('mode switch still completes when reduced motion is enabled', async () => {
    const framerMotion = await import('framer-motion')
    vi.mocked(framerMotion.useReducedMotion).mockReturnValue(true)

    render(<App />)

    await act(async () => {
      document.body.classList.add('cl3menza-mode')
      await vi.advanceTimersByTimeAsync(BOOT_MS)
    })

    expect(screen.getByText('cl3menza mode activated')).toBeInTheDocument()
    expect(screen.queryByTestId('trust-signals')).not.toBeInTheDocument()

    vi.mocked(framerMotion.useReducedMotion).mockReturnValue(null)
  })
})
