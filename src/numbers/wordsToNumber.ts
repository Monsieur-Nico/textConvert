import { ONES_AND_TEENS, TENS_WORDS } from './numbersToWords';

// Multi-word scale terms map to how much they multiply the value built up so
// far ("hundred" folds into the current group; "thousand"/"million" close a
// group and add it into the running total).
const SCALE_WORDS: Record<string, number> = {
  hundred: 100,
  thousand: 1000,
  million: 1000000,
};

// Optional filler numbersToWords itself always includes ('one hundred and
// five'), but which a human writing the same number often drops ('one
// hundred five'). Tolerated on the way in either way.
const FILLER_WORDS = new Set(['and']);

/**
 * Parse English number-words back into a number -- the reverse of `numbersToWords`.
 * Tolerant of case, an optional `'and'`, and hyphens or spaces between words,
 * even though `numbersToWords` only ever produces one specific combination of these.
 * @param text Number-words to parse, e.g. `'twelve thousand three hundred and forty-five'`.
 * @returns The parsed number, or `NaN` for unparseable input -- matching how `Number('garbage')` signals failure for a numeric return type, since this library's usual string sentinel doesn't fit here.
 * @example
 * wordsToNumber('twenty-three'); // 23
 * wordsToNumber('one hundred and five'); // 105
 * wordsToNumber('twelve thousand three hundred and forty-five'); // 12345
 * wordsToNumber('not a number'); // NaN
 */
export function wordsToNumber(text: string): number {
  if (typeof text !== 'string' || !text.trim()) {
    return NaN;
  }

  const tokens = text
    .toLowerCase()
    .trim()
    .split(/[\s-]+/)
    .filter((token) => !FILLER_WORDS.has(token));

  if (tokens.length === 0) {
    return NaN;
  }

  let total = 0;
  let group = 0;

  for (const token of tokens) {
    const ones = ONES_AND_TEENS.indexOf(token);
    const tensIndex = TENS_WORDS.indexOf(token);
    const scale = SCALE_WORDS[token];

    if (ones !== -1) {
      group += ones;
    } else if (tensIndex !== -1) {
      group += (tensIndex + 2) * 10;
    } else if (scale === 100) {
      group = (group || 1) * scale;
    } else if (scale !== undefined) {
      total += (group || 1) * scale;
      group = 0;
    } else {
      // Unrecognized word -- not a number this function knows how to parse.
      return NaN;
    }
  }

  return total + group;
}
