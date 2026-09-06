// Matches exactly what formatNumber produces (an optional leading '-', an
// integer part that's either ungrouped digits or correctly comma-grouped
// in threes, and an optional '.'-prefixed decimal part), plus a couple of
// deliberate extra leniencies: missing thousands separators are accepted
// (the ungrouped-digits branch) even though formatNumber always groups
// numbers >= 1000, since a plain typed-in number is a natural thing to
// feed this. Incorrectly-grouped separators (e.g. '1,23,456') are
// rejected -- the grouped branch requires every group after the first to
// be exactly 3 digits, so a malformed one fails to match at all rather
// than silently parsing partial digits.
const PARSE_NUMBER_PATTERN = /^-?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?$/;

/**
 * Parses a formatted number string back into a numeric value -- the
 * reverse of formatNumber.
 * @param text Text to parse.
 * @returns The parsed number, or NaN for anything that isn't formatNumber-shaped.
 * @example
 * parseNumber('1,234,567'); // 1234567
 * parseNumber('1,234.56'); // 1234.56
 * parseNumber('-1,234.5'); // -1234.5
 */
export function parseNumber(text: string): number {
  if (typeof text !== 'string') return NaN;

  const trimmed = text.trim();
  if (!PARSE_NUMBER_PATTERN.test(trimmed)) return NaN;

  return Number(trimmed.replace(/,/g, ''));
}
