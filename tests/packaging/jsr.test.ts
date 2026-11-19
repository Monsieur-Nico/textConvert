import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

// JSR publishes src/ as-is, and Deno and JSR's npm layer transpile each file on
// its own. Code that only works in a whole-program build, such as re-exporting
// an interface without `type`, then fails at module link time even though the
// Rollup bundle published to npm works (#465). This mirrors that: transpile
// every source file in isolation and load the entry point in a real Node ESM
// process, since Vitest's own module loader doesn't enforce named exports.

const SRC = join(__dirname, '..', '..', 'src');

function transpileSourceTree(outDir: string): void {
  const files = readdirSync(SRC, { recursive: true, encoding: 'utf8' }).filter(
    (f) => f.endsWith('.ts') && !f.endsWith('.d.ts') && !f.endsWith('.test.ts'),
  );

  for (const file of files) {
    const { outputText } = ts.transpileModule(readFileSync(join(SRC, file), 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    });
    // Source imports omit extensions ('./numbers/formatNumber'); JSR resolves
    // them to the .ts file, so point them at the transpiled .js output.
    const js = outputText.replace(/(from\s+['"])(\.{1,2}\/[^'"]+)(['"])/g, '$1$2.js$3');
    const target = join(outDir, file.replace(/\.ts$/, '.js'));
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, js);
  }
  writeFileSync(join(outDir, 'package.json'), JSON.stringify({ type: 'module' }));
}

describe('JSR entry point (per-file transpilation)', () => {
  let outDir: string;

  beforeAll(() => {
    outDir = mkdtempSync(join(tmpdir(), 'textconvert-jsr-'));
    transpileSourceTree(outDir);
  });

  afterAll(() => {
    rmSync(outDir, { recursive: true, force: true });
  });

  it('loads and runs when every file is transpiled on its own', () => {
    const entry = pathToFileURL(join(outDir, 'textConvert.js')).href;
    const script = `import { numbersToWords } from ${JSON.stringify(entry)}; console.log(numbersToWords(42));`;
    const output = execFileSync(process.execPath, ['--input-type=module', '-e', script], {
      encoding: 'utf8',
    });
    expect(output.trim()).toBe('forty-two');
  });
});
