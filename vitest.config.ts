import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: [],
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'json', 'html', 'lcov'],
      reportOnFailure: true,
      include: [
        'api/src/**/*.ts',
        'server.ts',
      ],
      exclude: [
        'node_modules/',
        'dist/',
        'web/',
        'coverage/',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/node_modules/**',
        'tests/**',
        '**/*.config.*',
      ],
      all: true,
      lines: 90,
      functions: 90,
      branches: 80,
      statements: 90,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
