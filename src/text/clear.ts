import { regex } from '../assets/regex';

const { values } = regex;

/**
 * Clear punctuations from a string and replaces it with a whitespace character or returns an array of strings.
 *
 * Keycap emoji (`#️⃣`, `*️⃣`, `1️⃣`) are kept intact; a bare `#` or `*` is still stripped.
 *
 * @param text String input to clear from punctuation.
 * @returns Either a string or an array of strings cleared from punctuations based on the arguments passed.
 * @example
 * clear('Hello, world!'); // 'hello world'
 */

export function clear(text: string): string {
  // Make sure there's an input
  if (typeof text !== 'string' || !text) return 'Please provide a valid input text';

  // Create an array of words
  const wordsArray: string[] = text.split(values.punctuation);

  // Filter wordsArray and remove punctuations
  const clearWords = wordsArray.map((word) => {
    word = word.trim().toLowerCase().replace(values.punctuation, '');
    return word;
  });

  return clearWords.join(' ');
}
