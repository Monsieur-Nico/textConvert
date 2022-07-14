import { regex } from "../assets/regex";

const { values } = regex;

/**
 * Clear punctuations from a string and replaces it with a whitespace character or returns an array of strings.
 *
 * @param text String input to clear from punctuation.
 * @param arrayOutput (Optional), boolean value to select whether to return an array of strings or a single string.
 * Default value is true.
 * @returns Either a string or an array of strings cleared from punctuations based on the arguments passed.
 */

export function clear(text: string, arrayOutput = true): string | string[] {
  // Make sure there's an input
  if (!text) return "Please provide a valid input text";

  // Check if the output should be an array of strings
  if (arrayOutput) {
    return text
      .split(values.nonAlphaTest)
      .filter((word: string) => word.length > 0)
      .map((word: string) => word.trim().toLowerCase());
  }

  // Create an array of words
  const wordsArray: string[] = text.split(values.punctuation);

  // Filter wordsArray and remove punctuations
  const clearWords = wordsArray.map((word) => {
    word = word.trim().toLowerCase().replace(values.punctuation, "");
    return word;
  });

  return clearWords.join(" ");
}
