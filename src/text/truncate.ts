import { iterateGraphemes } from './internal/graphemes';

/**
 * Shortens text to a maximum length, appending an ellipsis when truncation
 * happens. `maxLength` includes the ellipsis itself.
 *
 * Truncation never splits a grapheme cluster (surrogate pairs, combining
 * marks, ZWJ emoji sequences) in half: the cut snaps back to the last
 * cluster boundary that fits the length budget.
 *
 * @param text Text to truncate.
 * @param maxLength Maximum length of the returned string, including the ellipsis.
 * @param options.ellipsis String appended when the text is truncated. Default is '...'.
 * @param options.byWords When true, truncates at the last full word instead of cutting mid-word. Default is false.
 * @returns The truncated string, or the original string unchanged if it's already within maxLength.
 * @example
 * truncate('The quick brown fox jumps over the lazy dog', 20); // 'The quick brown f...'
 * truncate('The quick brown fox jumps over the lazy dog', 20, { byWords: true }); // 'The quick brown...'
 * truncate('Short text', 20); // 'Short text'
 */
export function truncate(
  text: string,
  maxLength: number,
  options: { ellipsis?: string; byWords?: boolean } = {},
): string {
  // Make sure there's an input
  if (!text) return 'Please provide a valid input text';

  // No truncation needed
  if (text.length <= maxLength) return text;

  const { ellipsis = '...', byWords = false } = options;

  // Not enough room for any text alongside the ellipsis — return as much of
  // the ellipsis as fits.
  if (maxLength <= ellipsis.length) return ellipsis.slice(0, Math.max(maxLength, 0));

  const budget = maxLength - ellipsis.length;

  // Build the cut from grapheme clusters so the boundary never splits a
  // multi-code-unit cluster (surrogate pairs, combining marks) in half.
  let cut = '';
  let width = 0;

  for (const segment of iterateGraphemes(text)) {
    if (width + segment.length > budget) break;
    cut += segment;
    width += segment.length;
  }

  if (byWords) {
    const lastSpace = cut.lastIndexOf(' ');
    if (lastSpace > 0) cut = cut.slice(0, lastSpace);
  }

  return cut + ellipsis;
}
