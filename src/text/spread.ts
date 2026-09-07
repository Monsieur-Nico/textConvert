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

export function spread(text: string, clear = false): string[] {
  if (typeof text !== 'string' || !text.trim()) {
    return [];
  }

  // Check if clearing punctuation is necessary.
  if (clear) {
    text = clearText(text);
  }

  return [...text];
}
