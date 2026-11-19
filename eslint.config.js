import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'coverage',
      'typedoc-site',
      'media/favicons',
      '**/temp.js',
      '**/temp.ts',
      'config/**',
      '*.d.ts',
    ],
  },
  js.configs.recommended,
  // None of the enabled rules need type information, so the parser runs
  // without a TypeScript project and linting stays fast.
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs['flat/eslint-recommended'].rules,
      ...tseslint.configs.recommended.rules,
      ...prettier.rules,
      'no-duplicate-imports': 2,
      'consistent-return': 2,
      'no-eval': 2,
      'no-irregular-whitespace': 1,
    },
  },
  // Vitest globals (describe, it, expect) are enabled in vitest.config.ts.
  {
    files: ['tests/**/*.ts'],
    rules: {
      'no-undef': 'off',
    },
  },
  // Node globals for standalone build/tooling scripts
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
  },
  // Node globals for the CLI entry point -- the one legitimate exception to
  // the rest of src/ staying Node-agnostic by design.
  {
    files: ['src/cli.ts', 'src/bin/**/*.ts'],
    languageOptions: {
      globals: {
        process: 'readonly',
      },
    },
  },
];
