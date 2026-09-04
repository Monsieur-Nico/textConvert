/**
 * Shortens text to a maximum length, appending an ellipsis when truncation
 * happens. `maxLength` includes the ellipsis itself.
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

  let cut = text.slice(0, maxLength - ellipsis.length);

  if (byWords) {
    const lastSpace = cut.lastIndexOf(' ');
    if (lastSpace > 0) cut = cut.slice(0, lastSpace);
  }

  return cut + ellipsis;
}
