/**
 * Partially masks a string for display purposes (e.g. showing a masked
 * email or card number in a UI without exposing the full value).
 *
 * If neither `visibleStart` nor `visibleEnd` is given, the first 2
 * characters are shown by default. Specifying either one turns off that
 * implicit default for the side you didn't specify — e.g. passing only
 * `visibleEnd` hides the start entirely, rather than also showing the
 * first 2 characters.
 *
 * @param text Text to mask.
 * @param options.visibleStart Number of characters to leave visible at the start.
 * @param options.visibleEnd Number of characters to leave visible at the end.
 * @param options.maskChar Character(s) to use for masked positions. Default is '*'.
 * @returns The masked string, or the original string unchanged if the
 * requested visible portions cover the whole string.
 * @example
 * maskText('jordan@example.com'); // 'jo****************'
 * maskText('4111111111111234', { visibleEnd: 4 }); // '************1234'
 * maskText('secret-token-value', { visibleStart: 0, visibleEnd: 0, maskChar: '#' }); // '##################'
 */
export function maskText(
  text: string,
  options: { visibleStart?: number; visibleEnd?: number; maskChar?: string } = {},
): string {
  if (!text) return 'Please provide a valid input text';

  const { visibleStart, visibleEnd, maskChar = '*' } = options;
  const visibilitySpecified = visibleStart !== undefined || visibleEnd !== undefined;

  const start = Math.max(0, visibleStart ?? (visibilitySpecified ? 0 : 2));
  const end = Math.max(0, visibleEnd ?? 0);

  // Clamp to the string's length so the visible portions never overlap.
  const clampedStart = Math.min(start, text.length);
  const clampedEnd = Math.min(end, text.length - clampedStart);

  const maskedLength = text.length - clampedStart - clampedEnd;
  if (maskedLength <= 0) return text;

  return (
    text.slice(0, clampedStart) +
    maskChar.repeat(maskedLength) +
    text.slice(text.length - clampedEnd)
  );
}
