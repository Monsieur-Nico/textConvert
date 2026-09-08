/**
 * Splits a string into an array of its exact characters, in order.
 * @param text A string to spread.
 * @param clear Whether to clear punctuation from the text first. Default is false.
 * @returns Array of characters, or `[]` for invalid input -- not the shared string sentinel, since this returns `string[]`.
 * @example
 * spread('Hello, world!'); // ['H', 'e', 'l', 'l', 'o', ',', ' ', 'w', 'o', 'r', 'l', 'd', '!']
 * spread('Hello, world!', true); // ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', ' '] -- clearText also lowercases and can leave a trailing space
 */
import { clear as clearText } from './clear';
import { graphemes } from './internal/graphemes';

/**
 * Splits a string into an array of its characters, in order.
 *
 * Characters are grapheme clusters (user-perceived characters), so multi-code-point
 * sequences -- ZWJ emoji, flags, skin-tone modifiers, combining marks -- stay intact
 * as single elements instead of being split into separate code points.
 * @param text A string to spread.
 * @param clear Whether to clear punctuation from the text first. Default is false.
 * @returns Array of characters, or `[]` for invalid input -- not the shared string sentinel, since this returns `string[]`.
 * @example
 * spread('Hello, world!'); // ['H', 'e', 'l', 'l', 'o', ',', ' ', 'w', 'o', 'r', 'l', 'd', '!']
 * spread('👍🏽'); // ['👍🏽'] -- one element, not three code points
 * spread('Hello, world!', true); // ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', ' '] -- clearText also lowercases and can leave a trailing space
 */
export function spread(text: string, clear = false): string[] {
  if (typeof text !== 'string' || !text.trim()) {
    return [];
  }

  // Check if clearing punctuation is necessary.
  if (clear) {
    text = clearText(text);
  }

  // Grapheme clusters rather than code points, matching the segmentation
  // used by reverse() and truncate().
  return graphemes(text);
}
