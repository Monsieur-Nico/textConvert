import { clear } from '../clear';

/**
 * Counts how many times each word appears in a piece of text. Case-insensitive
 * by default -- "The" and "the" count as the same word, since this reuses
 * `clear()`'s existing lowercasing/punctuation-stripping split rather than a
 * separate tokenizer.
 *
 * @param text Text to count word frequency in.
 * @returns A map of each distinct word to how many times it appears, in the
 * order each word first appeared.
 * @example
 * wordFrequency('the cat sat on the mat');
 * // { the: 2, cat: 1, sat: 1, on: 1, mat: 1 }
 */
export function wordFrequency(text: string): Record<string, number> {
  if (!text?.trim()) return {};

  const frequency: Record<string, number> = {};

  for (const word of clear(text).split(' ')) {
    if (!word) continue;
    frequency[word] = (frequency[word] ?? 0) + 1;
  }

  return frequency;
}
