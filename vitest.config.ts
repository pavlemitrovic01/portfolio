import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['api/**/*.ts', 'src/hooks/**/*.ts'],
      exclude: ['**/__tests__/**'],
      thresholds: {
        lines: 80,
        functions: 80,
      },
    },
  },
})
