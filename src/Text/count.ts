import { clear } from './clear';

/**
 * Return a boolean value number of the letters in a string.
 *
 * @param text String input to get letters count from.
 * @param countNumbers boolean value to determine if numbers should be counted as letters.
 *
 * @returns Number of letters and numbers (if requested) in a string.
 */

export function count(text: string, countNumbers = false): number {
  // Check string length
  if (!text.length) return 0;
  // Create a temp number.
  let temp = 0;
  // Clear the string and split the letters into an array.
  const cleared = clear(text).split('');
  // Loop through the letters array.
  cleared.forEach((letter) => {
    // Check if countNumbers is included
    if (!countNumbers) {
      // Count letters only
      if (!(/[a-z]/g.test(letter) || /[A-Z]/g.test(letter))) {
        return;
      }
      temp++;
      return;
    }
    // Count letters with numbers.
    if (!(/[a-z]/g.test(letter) || /[A-Z]/g.test(letter) || /[0-9]/g.test(letter))) return;
    temp++;
  });

  // Return the number of letters.
  return temp;
}

/**
 * Counts the number of words in a string.
 * Words are defined as sequences of letters, numbers, and apostrophes separated by whitespace.
 *
 * @param text String input to count words from
 * @returns Number of words in the string
 */
export function countWords(text: string): number {
  if (!text?.trim()) return 0;

  // If the text contains only punctuation, return 0
  if (!/[a-zA-Z0-9]/.test(text)) return 0;

  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0 && /[a-zA-Z0-9]/.test(word)).length;
}

/**
 * Counts the number of sentences in a string.
 * Sentences are defined as sequences of text ending with ., !, or ? followed by whitespace or end of string.
 * Text without any sentence-ending punctuation is considered to be a single sentence.
 *
 * @param text String input to count sentences from
 * @returns Number of sentences in the string
 */
export function countSentences(text: string): number {
  if (!text?.trim()) return 0;

  // If there's no sentence-ending punctuation but there is text, it's considered one sentence
  if (!/[.!?]/.test(text) && text.trim().length > 0) return 1;

  return text
    .trim()
    .split(/[.!?]+(?=\s|$)/)
    .filter((sentence) => sentence.trim().length > 0).length;
}
