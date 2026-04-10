import { useState, useCallback } from 'react'

const STORAGE_KEY = 'cl3-rewards'

/**
 * Static reward registry — source of truth for all reward slots.
 * Unlock state lives separately in localStorage (persistent, not session).
 * The 20% slot is marked rotatable — its UI location can change without
 * invalidating an already-unlocked state.
 */
export const REWARD_REGISTRY = {
  TEN_PCT: {
    id: 'reward-10pct',
    slot: 'orb-product-thinking',
    rotatable: false,
  },
  TWENTY_PCT: {
    id: 'reward-20pct',
    slot: 'cl3-product-thinking-pill',
    rotatable: true,   // slot may rotate — unlock persists by id, not slot
  },
  PRIORITY_SLOT: {
    id: 'reward-priority',
    slot: 'navbar-pavle',
    rotatable: false,
  },
} as const

export type RewardId =
  typeof REWARD_REGISTRY[keyof typeof REWARD_REGISTRY]['id']

interface RewardState {
  unlocked: Set<RewardId>
  isUnlocked: (id: RewardId) => boolean
  unlock: (id: RewardId) => void
}

function loadFromStorage(): Set<RewardId> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return new Set(JSON.parse(raw) as RewardId[])
  } catch {
    /* storage unavailable */
  }
  return new Set<RewardId>()
}

/**
 * Local-persistent reward unlock state (localStorage).
 * Completely separate from assist mode (session-only).
 */
export function useRewardState(): RewardState {
  const [unlocked, setUnlocked] = useState<Set<RewardId>>(loadFromStorage)

  const unlock = useCallback((id: RewardId) => {
    setUnlocked(prev => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      } catch {
        /* storage unavailable */
      }
      return next
    })
  }, [])

  const isUnlocked = useCallback(
    (id: RewardId) => unlocked.has(id),
    [unlocked]
  )

  return { unlocked, isUnlocked, unlock }
}
