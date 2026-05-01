import '@testing-library/jest-dom/vitest'

// jsdom does not implement window.matchMedia — required for
// components using prefers-reduced-motion media query (e.g. CustomCursor).
// Guard: api/__tests__/claude.test.ts runs in Node (no window).
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  })
}
