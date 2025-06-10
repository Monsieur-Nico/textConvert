import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Enables global `describe`, `it`, `expect`
    environment: 'node', // Node.js test environment
    coverage: {
      provider: 'v8', // Use c8 for coverage
      reporter: ['text', 'lcov'], // 'text' shows in terminal, 'lcov' for HTML report
      reportsDirectory: './coverage', // Optional: customize output dir
      exclude: [
        '**/test/**', // Ignore test files
        '**/*.test.ts', // Ignore files ending in .test.ts
        '**/vitest.config.ts', // Ignore this config
        '**/node_modules/**',
      ],
    },
  },
});
