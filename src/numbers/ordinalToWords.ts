import { INVALID_NUMBER_MESSAGE, isValidWordableNumber, numbersToWords } from './numbersToWords';

// Irregular ordinal endings that don't follow the plain "+th" rule.
const irregularOrdinals: Record<string, string> = {
  one: 'first',
  two: 'second',
  three: 'third',
  five: 'fifth',
  eight: 'eighth',
  nine: 'ninth',
  twelve: 'twelfth',
};

function ordinalizeWord(word: string): string {
  if (word in irregularOrdinals) return irregularOrdinals[word];
  // Tens ending in "-y" (twenty, thirty, ...) drop the "y" for "-ieth".
  if (word.endsWith('y')) return `${word.slice(0, -1)}ieth`;
  return `${word}th`;
}

/**
 * Get a non-negative integer's ordinal word form (e.g. `21` -> `'twenty-first'`).
 * @param number Non-negative integer to convert.
 * @returns The number's ordinal words, or an error message for invalid input.
 * @example
 * ordinalToWords(1); // 'first'
 * ordinalToWords(21); // 'twenty-first'
 * ordinalToWords(100); // 'one hundredth'
 */
export function ordinalToWords(number: number): string {
  if (!isValidWordableNumber(number)) {
    return INVALID_NUMBER_MESSAGE;
  }

  const cardinal = numbersToWords(number);

  // Only the last word/segment of the cardinal form changes to its ordinal
  // form -- everything before it stays exactly as numbersToWords produced it.
  const lastSpaceIndex = cardinal.lastIndexOf(' ');
  const prefix = lastSpaceIndex === -1 ? '' : cardinal.slice(0, lastSpaceIndex + 1);
  const lastSegment = lastSpaceIndex === -1 ? cardinal : cardinal.slice(lastSpaceIndex + 1);

  // A hyphenated segment (e.g. "forty-five") is a tens-ones compound --
  // only its ones word takes the ordinal form ("forty-fifth", not
  // "fortieth-five").
  const hyphenIndex = lastSegment.lastIndexOf('-');
  if (hyphenIndex === -1) {
    return prefix + ordinalizeWord(lastSegment);
  }

  const tensPart = lastSegment.slice(0, hyphenIndex + 1);
  const onesPart = lastSegment.slice(hyphenIndex + 1);
  return prefix + tensPart + ordinalizeWord(onesPart);
}
