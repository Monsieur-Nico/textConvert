/**
 * Splits text into grapheme clusters (user-perceived characters) using
 * `Intl.Segmenter` with `granularity: 'grapheme'`.
 *
 * Unlike `String.prototype.split('')` (UTF-16 code units) or spread syntax
 * (code points), this keeps multi-code-unit clusters -- surrogate pairs,
 * combining marks, ZWJ emoji sequences, skin-tone modifiers -- intact as
 * single units.
 *
 * @param text A string to split.
 * @returns An array of grapheme clusters.
 * @example
 * graphemes('👍🏽'); // ['👍🏽'] -- one cluster, not three code points
 */
export function graphemes(text: string): string[] {
  const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

  return Array.from(segmenter.segment(text), (segment) => segment.segment);
}
