import { readFileSync } from 'node:fs';
import { redact } from './text/redact';

const REDACT_TYPES = ['email', 'phone', 'creditCard', 'apiKey'] as const;
type RedactType = (typeof REDACT_TYPES)[number];

export const HELP_TEXT = `textconvert - CLI for the textconvert library

Usage:
  textconvert redact [file] [options]

  Sanitizes PII/secrets in a file (or stdin, if no file is given) and
  prints the result to stdout.

Options:
  --types <list>       Comma-separated list of what to redact:
                        email,phone,creditCard,apiKey
                        (default: email,phone,creditCard)
  --mask-char <char>    Character(s) used for masked positions (default: *)
  -h, --help            Show this help message

Examples:
  textconvert redact input.log
  textconvert redact input.log --types email,phone
  cat input.log | textconvert redact --mask-char '#' > output.log
`;

export class CliArgError extends Error {}

export type ParsedArgs =
  | { command: 'help' }
  | { command: 'redact'; file?: string; types?: RedactType[]; maskChar?: string };

function isRedactType(value: string): value is RedactType {
  return (REDACT_TYPES as readonly string[]).includes(value);
}

/**
 * Parses CLI arguments (already stripped of `node`/script path, i.e.
 * `process.argv.slice(2)`) into a structured command, or throws
 * {@link CliArgError} with a message ready to print to stderr.
 */
export function parseArgs(argv: string[]): ParsedArgs {
  if (argv.length === 0 || argv[0] === '-h' || argv[0] === '--help') {
    return { command: 'help' };
  }

  const [command, ...rest] = argv;

  if (command !== 'redact') {
    throw new CliArgError(`Unknown command: "${command}". Only "redact" is currently supported.`);
  }

  let file: string | undefined;
  let types: RedactType[] | undefined;
  let maskChar: string | undefined;

  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];

    if (arg === '-h' || arg === '--help') {
      return { command: 'help' };
    }

    if (arg === '--types') {
      const value = rest[++i];
      if (!value) throw new CliArgError('--types requires a value');

      types = value.split(',').map((rawType) => {
        const trimmed = rawType.trim();
        if (!isRedactType(trimmed)) {
          throw new CliArgError(
            `Invalid --types value: "${trimmed}". Must be one of: ${REDACT_TYPES.join(', ')}`,
          );
        }
        return trimmed;
      });
      continue;
    }

    if (arg === '--mask-char') {
      const value = rest[++i];
      if (value === undefined) throw new CliArgError('--mask-char requires a value');
      maskChar = value;
      continue;
    }

    if (arg.startsWith('--')) {
      throw new CliArgError(`Unknown option: "${arg}"`);
    }

    if (file !== undefined) {
      throw new CliArgError(`Unexpected argument: "${arg}"`);
    }

    file = arg;
  }

  return { command: 'redact', file, types, maskChar };
}

/** Reads the given file, or stdin (fd 0) when no file path is given. */
export function readInput(file?: string): string {
  return readFileSync(file ?? 0, 'utf8');
}

export function runRedact(
  input: string,
  options: { types?: RedactType[]; maskChar?: string },
): string {
  return redact(input, options);
}

/**
 * Entry point wiring real process.argv/stdin/stdout/stderr to the pure
 * functions above. Kept separate from those functions (and never called
 * automatically on import) so tests can exercise the parsing/redaction
 * logic directly without touching real IO.
 */
export function main(): void {
  try {
    const parsed = parseArgs(process.argv.slice(2));

    if (parsed.command === 'help') {
      process.stdout.write(HELP_TEXT);
      return;
    }

    const input = readInput(parsed.file);
    const output = runRedact(input, { types: parsed.types, maskChar: parsed.maskChar });
    process.stdout.write(output);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    process.stderr.write(`${message}\n`);
    process.exitCode = 1;
  }
}
