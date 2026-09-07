// Create digits in words
//
// Exported so wordsToNumber can parse against the exact same vocabulary
// numbersToWords produces, rather than a second, independently-maintained list.
export const ONES_AND_TEENS: string[] =
  'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split(
    ' ',
  );
export const TENS_WORDS: string[] = 'twenty thirty forty fifty sixty seventy eighty ninety'.split(
  ' ',
);

// Shared with ordinalToWords, which builds on numbersToWords's cardinal
// output and needs to reject the same inputs the same way.
const MAX_WORDABLE_NUMBER = 100000000;

export function isValidWordableNumber(number: number): boolean {
  return Number.isInteger(number) && number >= 0 && number < MAX_WORDABLE_NUMBER;
}

export const INVALID_NUMBER_MESSAGE = 'Please provide a valid number under 100 million';

/**
 * Get any non-negative integer below 100 million converted to words.
 * @param number Integer input to turn into text.
 * @returns A string of numbers converted to words, or an error message for invalid input.
 * @example
 * numbersToWords(12345); // 'twelve thousand three hundred and forty-five'
 * numbersToWords(-5); // 'Please provide a valid number under 100 million'
 */
export function numbersToWords(number: number): string {
  // Reject anything that isn't a non-negative integer under 100 million,
  // matching the sentinel-return convention every other function in this
  // library follows rather than throwing.
  if (!isValidWordableNumber(number)) {
    return INVALID_NUMBER_MESSAGE;
  }

  // Check if the input is between 0-19
  if (number < 20) return ONES_AND_TEENS[number];

  // Create a digit variable
  const digit: number = number % 10;

  // Check if the input is between 20-99
  if (number < 100)
    return TENS_WORDS[~~(number / 10) - 2] + (digit ? '-' + ONES_AND_TEENS[digit] : '');

  // Check if the input is between 100 and 999
  if (number < 1000)
    return (
      ONES_AND_TEENS[~~(number / 100)] +
      ' hundred' +
      (number % 100 == 0 ? '' : ' and ' + numbersToWords(number % 100))
    );

  // Check if the input is between 1,000 and 999,999
  if (number < 1000000) {
    const thousands = ~~(number / 1000);
    const remainder = number % 1000;

    return (
      numbersToWords(thousands) +
      ' thousand' +
      (remainder != 0 ? (remainder < 100 ? ' and ' : ' ') + numbersToWords(remainder) : '')
    );
  }

  // Handle millions (1,000,000 to 99,999,999)
  const millions = ~~(number / 1000000);
  const remainder = number % 1000000;

  return (
    numbersToWords(millions) +
    ' million' +
    (remainder != 0 ? (remainder < 100 ? ' and ' : ' ') + numbersToWords(remainder) : '')
  );
}
