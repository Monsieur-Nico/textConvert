const alphaChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const numericChars = '0123456789';
const alphanumericChars = alphaChars + numericChars;

function resolveCharset(charset: string): string {
  switch (charset) {
    case 'alpha':
      return alphaChars;
    case 'numeric':
      return numericChars;
    case 'alphanumeric':
      return alphanumericChars;
    default:
      // Anything else is treated as a literal, caller-supplied charset
      // (e.g. 'ABC123') -- picked from as-is, repeats and all, rather than
      // deduplicated, since a repeated character is the caller's own way
      // of weighting it more heavily.
      return charset;
  }
}

// Draws a uniformly-distributed integer in [0, max) using rejection
// sampling, rather than `randomUint32 % max` -- a plain modulo introduces a
// slight bias toward the low end of the range whenever `max` doesn't evenly
// divide 2^32 (true for almost any charset length), which would quietly
// undercut the "cryptographically secure" claim this function makes. The
// rejection probability is negligible for any realistic charset (well
// under 1 in a billion for a 62-character alphanumeric set).
function randomIndex(max: number): number {
  const range = 0x100000000; // 2^32
  const limit = range - (range % max);
  const buffer = new Uint32Array(1);

  let value: number;
  do {
    globalThis.crypto.getRandomValues(buffer);
    value = buffer[0];
  } while (value >= limit);

  return value % max;
}

/**
 * Generates a random string of a given length, drawn from a
 * cryptographically secure source (`globalThis.crypto.getRandomValues`,
 * the standard Web Crypto API available in both Node and browsers --
 * nothing here falls back to `Math.random`). Suitable for one-off IDs,
 * tokens, or test fixtures.
 *
 * @param length Number of characters to generate. Returns `''` for a
 * non-positive or non-integer length.
 * @param options.charset `'alpha'` (letters only), `'numeric'` (digits
 * only), `'alphanumeric'` (the default), or any other string, which is
 * used literally as the pool of characters to draw from (e.g. `'ABC123'`).
 * @returns A random string of the requested length, or `''` if `length`
 * or the resolved charset is empty.
 * @example
 * randomString(8); // e.g. 'aZ3kD9pQ' (alphanumeric by default)
 * randomString(6, { charset: 'numeric' }); // e.g. '482913'
 * randomString(4, { charset: 'ABC123' }); // custom charset, e.g. 'A1C3'
 */
export function randomString(
  length: number,
  options: { charset?: 'alpha' | 'numeric' | 'alphanumeric' | string } = {},
): string {
  if (!Number.isInteger(length) || length <= 0) return '';

  const chars = resolveCharset(options.charset ?? 'alphanumeric');
  if (chars.length === 0) return '';

  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[randomIndex(chars.length)];
  }

  return result;
}
