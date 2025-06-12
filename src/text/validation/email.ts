/**
 * Validates if a string is a valid email address according to RFC 5322 standards.
 *
 * This function performs comprehensive validation including:
 * - Basic email structure (local part + @ + domain)
 * - Valid characters in local part and domain
 * - Domain must contain at least one dot
 * - No consecutive dots
 * - No trailing dots or hyphens
 * - Length limits (local part ≤ 64 chars, domain ≤ 255 chars)
 * - Non-ASCII character rejection
 *
 * @param text - The string to validate as an email address
 * @returns boolean indicating if the string is a valid email address
 *
 * @example
 * ```typescript
 * isEmail('user@example.com')     // true
 * isEmail('user.name@example.com') // true
 * isEmail('user+tag@example.com') // true
 * isEmail('plainaddress')         // false
 * isEmail('@example.com')         // false
 * isEmail('user@')               // false
 * ```
 */
export function isEmail(text: string): boolean {
  if (!text || typeof text !== 'string') {
    return false;
  }

  const email = text.trim();

  // Reject non-ASCII characters
  if (/[^\x20-\x7E]/.test(email)) {
    return false;
  }

  const emailRegex =
    /^(?!.*\.{2})[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return false;
  }

  const [localPart, domain] = email.split('@');

  if (!localPart || !domain) return false;
  if (localPart.length > 64 || domain.length > 255) return false;
  if (domain.startsWith('-') || domain.endsWith('-')) return false;
  if (domain.startsWith('.') || domain.endsWith('.')) return false;

  return true;
}
