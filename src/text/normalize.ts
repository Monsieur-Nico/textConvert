// Matches Unicode combining diacritical marks (code points 0x0300-0x036F),
// the marks left behind after NFD-decomposing an accented character (e.g.
// an accented "e" decomposes into a plain "e" plus a combining mark).
const combiningMarks = new RegExp(
  `[${String.fromCharCode(0x0300)}-${String.fromCharCode(0x036f)}]`,
  'g',
);

/**
 * Strips accents/diacritics from text, normalizing accented characters to
 * their plain-ASCII equivalents (e.g. 'é' -> 'e'). Non-Latin scripts pass
 * through unchanged -- this only affects characters that decompose into a
 * plain-ASCII base plus a combining mark under Unicode NFD.
 *
 * @param text Text to strip diacritics from.
 * @returns The text with diacritics removed.
 * @example
 * removeDiacritics('Café — résumé'); // 'Cafe — resume'
 */
export function removeDiacritics(text: string): string {
  if (!text) return 'Please provide a valid input text';
  return text.normalize('NFD').replace(combiningMarks, '');
}

/**
 * Collapses runs of whitespace (spaces, tabs, newlines) into a single
 * space, and trims the result.
 *
 * @param text Text to normalize.
 * @returns The text with whitespace runs collapsed to single spaces and
 * the ends trimmed.
 * @example
 * normalizeWhitespace('  Hello   World  \n\n'); // 'Hello World'
 */
export function normalizeWhitespace(text: string): string {
  if (!text) return 'Please provide a valid input text';
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Normalizes line endings to LF (`\n`), converting both CRLF (`\r\n`) and
 * lone CR (`\r`) -- useful for comparing or hashing text that may have
 * come from different platforms (e.g. Windows-authored input).
 *
 * @param text Text to normalize.
 * @returns The text with all line endings converted to `\n`.
 * @example
 * normalizeLineEndings('line1\r\nline2\rline3'); // 'line1\nline2\nline3'
 */
export function normalizeLineEndings(text: string): string {
  if (!text) return 'Please provide a valid input text';
  return text.replace(/\r\n|\r/g, '\n');
}
