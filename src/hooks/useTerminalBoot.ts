import { useState, useEffect, useRef } from 'react'

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

export function useTerminalBoot(
  subscribe: (cb: () => void) => () => void,
  get: () => boolean,
) {
  const [cl3menzaMode, setCl3menzaMode] = useState(false)
  const [glitching, setGlitching] = useState(false)
  const [terminal, setTerminal] = useState(false)
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [modeAnnouncement, setModeAnnouncement] = useState('')
  const cl3menzaModeRef = useRef(false)
  const hasBootedRef = useRef(false)
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

    const unsub = subscribe(() => {
      const isActive = get()
      const internal = cl3menzaModeRef.current

      if (isActive && !internal) {
        if (hasBootedRef.current) {
          // Subsequent activation — quick re-entry, no boot
          cl3menzaModeRef.current = true
          setCl3menzaMode(true)
          setModeAnnouncement('cl3menza mode activated')
        } else {
          // First activation — full boot sequence → fragment explosion
          hasBootedRef.current = true
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
        }
      } else if (!isActive && internal) {
        const quiet = 'cl3Quiet' in document.body.dataset
        if (quiet) {
          delete document.body.dataset.cl3Quiet
        }

        if (quiet) {
          // Scroll-driven deactivation — no fragment, just fade
          cl3menzaModeRef.current = false
          setCl3menzaMode(false)
          setModeAnnouncement('cl3menza mode deactivated')
        } else {
          // Manual deactivation (header badge) — fragment explosion
          setGlitching(true)
          cl3menzaModeRef.current = false
          setCl3menzaMode(false)
          const t = setTimeout(() => {
            setGlitching(false)
            setModeAnnouncement('cl3menza mode deactivated')
            document.getElementById('main-content')?.focus()
          }, 1200)
          modeTransitionTimersRef.current.timeoutIds.push(t)
        }
      }
    })

    return () => {
      clearModeTransitionTimers()
      unsub()
    }
  }, []) // subscribe/get are stable module-level references

  return { cl3menzaMode, glitching, terminal, terminalLines, modeAnnouncement }
}
