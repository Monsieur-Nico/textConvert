import { clear } from './clear';
import { reverse } from './reverse';

/**
 * Checks whether text reads the same forwards and backwards, ignoring
 * case, spaces, and punctuation.
 *
 * Composes {@link clear} (lowercases, strips punctuation) and
 * {@link reverse} internally, so it shares reverse's astral-Unicode
 * limitation on emoji/surrogate-pair characters -- see reverse's own docs.
 *
 * @param text Text to check.
 * @returns `true` if text is a palindrome under those rules, `false` otherwise.
 * @example
 * isPalindrome('A man a plan a canal Panama'); // true
 * isPalindrome('racecar'); // true
 * isPalindrome('hello world'); // false
 */
export function isPalindrome(text: string): boolean {
  if (!text) return false;

  const normalized = clear(text).replace(/\s+/g, '');

  // Nothing left after stripping case/spaces/punctuation (e.g. text was
  // punctuation-only, like '!!!') -- an empty string trivially equals its
  // own reverse.
  if (!normalized) return true;

  return normalized === reverse(normalized);
}
