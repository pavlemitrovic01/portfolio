// @vitest-environment jsdom
/// <reference types="vitest/globals" />
import {
  getCl3menzaBodyClass,
  subscribeCl3BodyClassMutations,
} from '../useCl3menzaBodyClass'

const CL3_CLASS = 'cl3menza-mode'

// Clean up body class after each test
afterEach(() => {
  document.body.classList.remove(CL3_CLASS)
})

// --- getCl3menzaBodyClass ---

describe('getCl3menzaBodyClass', () => {
  it('returns false when body does not have the class', () => {
    expect(getCl3menzaBodyClass()).toBe(false)
  })

  it('returns true when body has the class', () => {
    document.body.classList.add(CL3_CLASS)
    expect(getCl3menzaBodyClass()).toBe(true)
  })

  it('returns false after class is removed', () => {
    document.body.classList.add(CL3_CLASS)
    document.body.classList.remove(CL3_CLASS)
    expect(getCl3menzaBodyClass()).toBe(false)
  })
})

// --- subscribeCl3BodyClassMutations ---

describe('subscribeCl3BodyClassMutations', () => {
  it('returns an unsubscribe function', () => {
    const unsub = subscribeCl3BodyClassMutations(() => {})
    expect(typeof unsub).toBe('function')
    unsub()
  })

  it('calls listener when body class changes', async () => {
    const onChange = vi.fn()
    const unsub = subscribeCl3BodyClassMutations(onChange)

    document.body.classList.add(CL3_CLASS)
    await Promise.resolve() // flush MutationObserver microtask

    expect(onChange).toHaveBeenCalled()
    unsub()
  })

  it('does not call listener after unsubscribe', async () => {
    const onChange = vi.fn()
    const unsub = subscribeCl3BodyClassMutations(onChange)
    unsub()

    document.body.classList.add(CL3_CLASS)
    await Promise.resolve()

    expect(onChange).not.toHaveBeenCalled()
  })

  it('notifies all active subscribers', async () => {
    const a = vi.fn()
    const b = vi.fn()
    const unsubA = subscribeCl3BodyClassMutations(a)
    const unsubB = subscribeCl3BodyClassMutations(b)

    document.body.classList.add(CL3_CLASS)
    await Promise.resolve()

    expect(a).toHaveBeenCalled()
    expect(b).toHaveBeenCalled()
    unsubA()
    unsubB()
  })

  it('only notifies remaining subscribers after one unsubscribes', async () => {
    const a = vi.fn()
    const b = vi.fn()
    const unsubA = subscribeCl3BodyClassMutations(a)
    const unsubB = subscribeCl3BodyClassMutations(b)
    unsubA()

    document.body.classList.add(CL3_CLASS)
    await Promise.resolve()

    expect(a).not.toHaveBeenCalled()
    expect(b).toHaveBeenCalled()
    unsubB()
  })
})
