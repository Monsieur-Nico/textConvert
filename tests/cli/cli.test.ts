import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CliArgError, HELP_TEXT, main, parseArgs, readInput, runRedact } from '../../src/cli';

describe('#parseArgs', () => {
  it('returns the help command for no arguments', () => {
    expect(parseArgs([])).toEqual({ command: 'help' });
  });

  it('returns the help command for -h/--help', () => {
    expect(parseArgs(['-h'])).toEqual({ command: 'help' });
    expect(parseArgs(['--help'])).toEqual({ command: 'help' });
  });

  it('throws for an unknown command', () => {
    expect(() => parseArgs(['sluggify'])).toThrow(CliArgError);
  });

  it('parses a bare redact command with no file (stdin)', () => {
    expect(parseArgs(['redact'])).toEqual({
      command: 'redact',
      file: undefined,
      types: undefined,
      maskChar: undefined,
    });
  });

  it('parses a redact command with a file argument', () => {
    expect(parseArgs(['redact', 'input.log'])).toEqual({
      command: 'redact',
      file: 'input.log',
      types: undefined,
      maskChar: undefined,
    });
  });

  it('parses --types as a comma-separated list', () => {
    const result = parseArgs(['redact', 'input.log', '--types', 'email,phone']);
    expect(result).toEqual({
      command: 'redact',
      file: 'input.log',
      types: ['email', 'phone'],
      maskChar: undefined,
    });
  });

  it('trims whitespace around --types entries', () => {
    const result = parseArgs(['redact', '--types', 'email, phone']);
    expect(result).toMatchObject({ types: ['email', 'phone'] });
  });

  it('throws for an invalid --types value', () => {
    expect(() => parseArgs(['redact', '--types', 'ssn'])).toThrow(CliArgError);
  });

  it('throws when --types has no value', () => {
    expect(() => parseArgs(['redact', '--types'])).toThrow(CliArgError);
  });

  it('parses --mask-char', () => {
    const result = parseArgs(['redact', 'input.log', '--mask-char', '#']);
    expect(result).toMatchObject({ maskChar: '#' });
  });

  it('throws when --mask-char has no value', () => {
    expect(() => parseArgs(['redact', '--mask-char'])).toThrow(CliArgError);
  });

  it('returns the help command when -h/--help appears after redact', () => {
    expect(parseArgs(['redact', '--help'])).toEqual({ command: 'help' });
  });

  it('throws for an unknown option', () => {
    expect(() => parseArgs(['redact', '--bogus'])).toThrow(CliArgError);
  });

  it('throws for more than one positional argument', () => {
    expect(() => parseArgs(['redact', 'a.log', 'b.log'])).toThrow(CliArgError);
  });
});

describe('#runRedact', () => {
  it('redacts using the given options, delegating to redact()', () => {
    expect(runRedact('Contact me at jordan@example.com', {})).toBe(
      'Contact me at jo****************',
    );
  });

  it('respects a types filter', () => {
    expect(runRedact('Card: 4111 1111 1111 1111', { types: ['creditCard'] })).toBe(
      'Card: ***************1111',
    );
  });
});

describe('#readInput', () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'textconvert-cli-'));
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('reads the given file', () => {
    const file = join(dir, 'input.log');
    writeFileSync(file, 'hello@example.com');
    expect(readInput(file)).toBe('hello@example.com');
  });

  it('throws for a missing file', () => {
    expect(() => readInput(join(dir, 'missing.log'))).toThrow();
  });
});

describe('#main', () => {
  let dir: string;
  let stdoutSpy: ReturnType<typeof vi.spyOn>;
  let stderrSpy: ReturnType<typeof vi.spyOn>;
  const originalArgv = process.argv;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'textconvert-cli-'));
    stdoutSpy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    stderrSpy = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
    process.exitCode = undefined;
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
    stdoutSpy.mockRestore();
    stderrSpy.mockRestore();
    process.argv = originalArgv;
    process.exitCode = undefined;
  });

  it('prints help text and writes nothing to stderr when called with no arguments', () => {
    process.argv = ['node', 'textconvert'];
    main();
    expect(stdoutSpy).toHaveBeenCalledWith(HELP_TEXT);
    expect(stderrSpy).not.toHaveBeenCalled();
  });

  it('redacts a file and writes the result to stdout', () => {
    const file = join(dir, 'input.log');
    writeFileSync(file, 'Contact me at jordan@example.com');
    process.argv = ['node', 'textconvert', 'redact', file];

    main();

    expect(stdoutSpy).toHaveBeenCalledWith('Contact me at jo****************');
    expect(process.exitCode).toBeUndefined();
  });

  it('sets a non-zero exit code and writes to stderr for a missing file', () => {
    process.argv = ['node', 'textconvert', 'redact', join(dir, 'missing.log')];

    main();

    expect(process.exitCode).toBe(1);
    expect(stderrSpy).toHaveBeenCalled();
    expect(stdoutSpy).not.toHaveBeenCalled();
  });

  it('sets a non-zero exit code for invalid arguments', () => {
    process.argv = ['node', 'textconvert', 'redact', '--types', 'bogus'];

    main();

    expect(process.exitCode).toBe(1);
    expect(stderrSpy).toHaveBeenCalled();
  });
});
