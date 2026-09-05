/**
 * Get a non-negative integer's ordinal suffix form (e.g. `1` -> `'1st'`).
 * @param number Non-negative integer to convert.
 * @returns The number followed by its ordinal suffix, or the shared invalid-input message for anything else.
 * @example
 * ordinal(1); // '1st'
 * ordinal(11); // '11th'
 * ordinal(21); // '21st'
 */
export function ordinal(number: number): string {
  if (!Number.isInteger(number) || number < 0) {
    return 'Please provide a valid input text';
  }

  // English ordinals go by the last *two* digits, not just the last one --
  // 11/12/13 are always 'th' even though their last digit (1/2/3) would
  // otherwise map to 'st'/'nd'/'rd'.
  const lastTwoDigits = number % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${number}th`;
  }

  const lastDigit = number % 10;
  const suffix = lastDigit === 1 ? 'st' : lastDigit === 2 ? 'nd' : lastDigit === 3 ? 'rd' : 'th';

  return `${number}${suffix}`;
}
