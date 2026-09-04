import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/textConvert.ts',
    output: [
      {
        file: 'dist/textConvert.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/textConvert.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [resolve(), typescript({ tsconfig: './tsconfig.json' })],
    external: [],
  },
  {
    input: 'src/bin/textconvert.ts',
    output: {
      file: 'dist/cli.js',
      format: 'esm',
      banner: '#!/usr/bin/env node',
      sourcemap: true,
    },
    plugins: [resolve(), typescript({ tsconfig: './tsconfig.json' })],
    external: ['node:fs'],
  },
];
