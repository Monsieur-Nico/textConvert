import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['**/*.d.ts'],
      // Just under actual coverage (99% lines, 97% branches, 100% functions
      // as of v3.0.3), so a real drop fails CI. Raise them as coverage grows.
      thresholds: {
        lines: 98,
        functions: 100,
        branches: 95,
        statements: 97,
      },
    },
  },
});
