/**
 * Validates if a string is structurally a valid phone number.
 *
 * This performs syntactic validation only — it does not verify that a
 * country calling code is real, that the digit count matches a specific
 * country's numbering plan, or that the number is actually assigned or
 * reachable (the same scope `isEmail` and `isUrl` use).
 *
 * - With a leading `+` (an explicit country code, e.g. E.164): the
 *   remaining digits must be between 7 and 15, matching E.164's real
 *   bounds — some countries have numbers as short as 7 digits total.
 * - Without a leading `+` (a bare local number): the digits must be
 *   between 10 and 15, since there's no declared country code to trust —
 *   this requires something long enough to plausibly include an area or
 *   city code rather than a bare subscriber number.
 * - Separators (spaces, dashes, dots, parentheses) are allowed and
 *   stripped before counting digits.
 *
 * @param text - The string to validate as a phone number
 * @returns boolean indicating if the string is a structurally valid phone number
 *
 * @example
 * ```typescript
 * isPhoneNumber('+1-202-555-0173')  // true
 * isPhoneNumber('(202) 555 0173')   // true
 * isPhoneNumber('5550173')          // false (too short, no area code)
 * ```
 */
export function isPhoneNumber(text: string): boolean {
  if (!text || typeof text !== 'string') {
    return false;
  }

  const trimmed = text.trim();

  // Only digits, spaces, dashes, dots, and parentheses are allowed, with an
  // optional single leading '+' to signal an explicit country code.
  if (!/^\+?[\d\s().-]+$/.test(trimmed)) {
    return false;
  }

  const digits = trimmed.replace(/\D/g, '');

  if (trimmed.startsWith('+')) {
    return digits.length >= 7 && digits.length <= 15;
  }

  return digits.length >= 10 && digits.length <= 15;
}
