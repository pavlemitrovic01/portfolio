import { useState, useEffect } from 'react'

const KEY = 'cl3-assist'

/**
 * Session-only assist mode state.
 * When active, sets `data-assist-mode` on <html> so any element
 * on the page can respond via CSS: `[data-assist-mode] .target { … }`
 */
export function useAssistMode(): [boolean, () => void] {
  const [active, setActive] = useState(() => {
    try {
      return sessionStorage.getItem(KEY) === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      if (active) {
        sessionStorage.setItem(KEY, '1')
        document.documentElement.setAttribute('data-assist-mode', '')
      } else {
        sessionStorage.removeItem(KEY)
        document.documentElement.removeAttribute('data-assist-mode')
      }
    } catch {
      /* storage unavailable — degrade silently */
    }
  }, [active])

  const enable = () => setActive(true)
  return [active, enable]
}
