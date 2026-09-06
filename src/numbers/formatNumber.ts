export interface FormatNumberOptions {
  /** Number of decimal places to round/pad to. Omit to preserve the input's natural precision. */
  decimals?: number;
}

const INVALID_NUMBER_MESSAGE = 'Please provide a valid input text';

// Doubles at or beyond this magnitude are always whole numbers -- IEEE 754
// can't represent a fractional component that large -- and both
// Number.prototype.toString and toFixed fall back to scientific notation
// above it, so this is also the threshold past which digit expansion needs
// a manual BigInt-based path instead of those.
const EXPANSION_THRESHOLD = 1e21;

function withThousandsSeparators(digits: string): string {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Formats a number with thousands separators, English/US style (comma
 * thousands separator, period decimal point) -- not locale-aware, see
 * numbersToWords's own docs for why.
 * @param number Number to format.
 * @param options.decimals Number of decimal places to round/pad to. Omit to preserve the input's natural precision.
 * @returns The formatted number, or the shared invalid-input message for anything that isn't a finite number.
 * @example
 * formatNumber(1234567); // '1,234,567'
 * formatNumber(1234567.89); // '1,234,567.89'
 * formatNumber(1234.5, { decimals: 2 }); // '1,234.50'
 * formatNumber(-1234.5); // '-1,234.5'
 */
export function formatNumber(number: number, options: FormatNumberOptions = {}): string {
  const { decimals } = options;

  if (
    typeof number !== 'number' ||
    !Number.isFinite(number) ||
    (decimals !== undefined && (!Number.isInteger(decimals) || decimals < 0))
  ) {
    return INVALID_NUMBER_MESSAGE;
  }

  const isNegative = number < 0;
  const absNumber = Math.abs(number);

  // Beyond EXPANSION_THRESHOLD, the value is necessarily a whole number (see
  // above), so there's no real fractional part to round -- any requested
  // decimals are just zero-padding.
  const absString =
    absNumber >= EXPANSION_THRESHOLD
      ? BigInt(absNumber).toString() + (decimals ? `.${'0'.repeat(decimals)}` : '')
      : decimals !== undefined
        ? absNumber.toFixed(decimals)
        : String(absNumber);

  const [integerPart, fractionPart] = absString.split('.');
  const formattedInteger = withThousandsSeparators(integerPart);
  const formatted =
    fractionPart !== undefined ? `${formattedInteger}.${fractionPart}` : formattedInteger;

  return isNegative ? `-${formatted}` : formatted;
}
