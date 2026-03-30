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

type TimerBag = {
  intervalId: ReturnType<typeof setInterval> | null
  timeoutIds: ReturnType<typeof setTimeout>[]
}

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
  const timersRef = useRef<TimerBag>({
    intervalId: null,
    timeoutIds: [],
  })

  useEffect(() => {
    cl3menzaModeRef.current = cl3menzaMode
  }, [cl3menzaMode])

  useEffect(() => {
    const focusMainContent = () => {
      document.getElementById('main-content')?.focus()
    }

    const clearTransitionTimers = () => {
      const bag = timersRef.current

      if (bag.intervalId !== null) {
        clearInterval(bag.intervalId)
        bag.intervalId = null
      }

      bag.timeoutIds.forEach(clearTimeout)
      bag.timeoutIds = []
    }

    const pushTimeout = (timeoutId: ReturnType<typeof setTimeout>) => {
      timersRef.current.timeoutIds.push(timeoutId)
    }

    const runFullBootEntry = () => {
      clearTransitionTimers()

      hasBootedRef.current = true
      setModeAnnouncement('')
      setGlitching(false)
      setTerminalLines([])
      setTerminal(true)

      let idx = 0
      const iv = setInterval(() => {
        idx += 1
        setTerminalLines(TERMINAL_LINES.slice(0, idx))

        if (idx >= TERMINAL_LINES.length) {
          clearInterval(iv)
          timersRef.current.intervalId = null

          const t1 = setTimeout(() => {
            setTerminal(false)
            setGlitching(true)
            cl3menzaModeRef.current = true
            setCl3menzaMode(true)

            const t2 = setTimeout(() => {
              setGlitching(false)
              setModeAnnouncement('cl3menza mode activated')
              focusMainContent()
            }, 1200)

            pushTimeout(t2)
          }, 400)

          pushTimeout(t1)
        }
      }, 120)

      timersRef.current.intervalId = iv
    }

    const runQuickEntry = () => {
      clearTransitionTimers()
      setTerminal(false)
      setGlitching(false)
      setTerminalLines([])
      cl3menzaModeRef.current = true
      setCl3menzaMode(true)
      setModeAnnouncement('cl3menza mode activated')
    }

    const runQuietExit = () => {
      clearTransitionTimers()
      setTerminal(false)
      setGlitching(false)
      cl3menzaModeRef.current = false
      setCl3menzaMode(false)
      setModeAnnouncement('cl3menza mode deactivated')
    }

    const runManualExit = () => {
      clearTransitionTimers()
      setTerminal(false)
      setGlitching(true)
      cl3menzaModeRef.current = false
      setCl3menzaMode(false)

      const t = setTimeout(() => {
        setGlitching(false)
        setModeAnnouncement('cl3menza mode deactivated')
        focusMainContent()
      }, 1200)

      pushTimeout(t)
    }

    const unsubscribe = subscribe(() => {
      const isActive = get()
      const internal = cl3menzaModeRef.current

      if (isActive && !internal) {
        if (hasBootedRef.current) {
          runQuickEntry()
        } else {
          runFullBootEntry()
        }
        return
      }

      if (!isActive && internal) {
        const quiet = 'cl3Quiet' in document.body.dataset
        if (quiet) {
          delete document.body.dataset.cl3Quiet
          runQuietExit()
        } else {
          runManualExit()
        }
      }
    })

    return () => {
      clearTransitionTimers()
      unsubscribe()
    }
  }, []) // subscribe/get are stable module-level references

  return {
    cl3menzaMode,
    glitching,
    terminal,
    terminalLines,
    modeAnnouncement,
  }
}
