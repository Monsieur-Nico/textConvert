import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

const commonRules = {
  ...tseslint.configs['eslint-recommended'].rules,
  ...tseslint.configs.recommended.rules,
  ...prettier.rules,
  'no-duplicate-imports': 2,
  'consistent-return': 2,
  'no-eval': 2,
  'no-irregular-whitespace': 1,
};

export default [
  {
    ignores: ['node_modules', 'dist', '**/temp.js', '**/temp.ts', 'config/**'],
  },
  js.configs.recommended,
  // Type-aware linting for src and Tests
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.eslint.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs['eslint-recommended'].rules,
      ...tseslint.configs.recommended.rules,
      ...prettier.rules,
      'no-duplicate-imports': 2,
      'consistent-return': 2,
      'no-eval': 2,
      'no-irregular-whitespace': 1,
    },
  },
  // Non-type-aware linting for other TS files (e.g., config files)
  {
    files: ['*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: commonRules,
  },
  // Override for test files to disable no-undef
  {
    files: ['Tests/**/*.ts'],
    rules: {
      'no-undef': 'off',
    },
  },
  // Override for spread.test.ts to disable ban-ts-comment
  {
    files: ['Tests/Text/spread.test.ts'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
  // Override for commitlint.config.js to disable no-undef
  {
    files: ['commitlint.config.js'],
    rules: {
      'no-undef': 'off',
    },
  },
  // Exclude root .d.ts files from linting
  {
    ignores: ['*.d.ts'],
  },
];
