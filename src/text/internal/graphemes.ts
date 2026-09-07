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
  return Array.from(iterateGraphemes(text));
}

/**
 * Lazily yields the grapheme clusters of text one at a time.
 *
 * Unlike {@link graphemes}, this doesn't materialize the full array first --
 * callers that only need a prefix (e.g. {@link truncate}) can stop iterating
 * as soon as they have enough, without segmenting the rest of the string.
 *
 * @param text A string to split.
 * @returns An iterable of grapheme clusters.
 */
export function* iterateGraphemes(text: string): Generator<string> {
  const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

  for (const segment of segmenter.segment(text)) {
    yield segment.segment;
  }
}
