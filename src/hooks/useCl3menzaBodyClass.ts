import { useSyncExternalStore } from 'react'

const CL3_CLASS = 'cl3menza-mode'

const listeners = new Set<() => void>()
let observer: MutationObserver | null = null

function ensureObserver() {
  if (observer) return
  observer = new MutationObserver(() => {
    listeners.forEach((listener) => listener())
  })
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
}

/**
 * Single MutationObserver; all subscribers notified on body `class` mutations.
 * Used by useCl3menzaBodyClass (DOM truth for layout) and App.tsx orchestration.
 */
export function subscribeCl3BodyClassMutations(onChange: () => void): () => void {
  ensureObserver()
  listeners.add(onChange)
  return () => {
    listeners.delete(onChange)
    if (listeners.size === 0 && observer) {
      observer.disconnect()
      observer = null
    }
  }
}

export function getCl3menzaBodyClass(): boolean {
  if (typeof document === 'undefined') return false
  return document.body.classList.contains(CL3_CLASS)
}

function getCl3menzaBodyClassServerSnapshot(): boolean {
  return false
}

/** Immediate `document.body` class — Hero / Header / Footer (independent of App internal state lag). */
export function useCl3menzaBodyClass(): boolean {
  return useSyncExternalStore(
    subscribeCl3BodyClassMutations,
    getCl3menzaBodyClass,
    getCl3menzaBodyClassServerSnapshot
  )
}
