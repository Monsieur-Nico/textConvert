import { regex } from "../assets/regex";

const { values } = regex;

/**
 * Convert a string from any convention to Camel Case convention.
 * @param text input text with type string.
 */

export function camelCase(text: string): string {
  // Make sure there's an input
  if (!text) return "Please provide a valid input text";

  // Make an array of words after splitting them
  const wordsArray: string[] = text.split(values.spaceDash);
  // Get the first word out of the array
  let firstWord = wordsArray.shift()?.toLowerCase();

  // convert the words to camelCase
  const cCaseArray: string[] = wordsArray.map((word: string) => {
    word = word.charAt(0).toUpperCase() + word.slice(1);
    return word;
  });

  // Join the words and return them
  const result: string = firstWord + cCaseArray.join("");
  return result;
}

/**
 * Convert a string from any convention to Pascal Case convention.
 * @param text input text with type string
 */

export function pascalCase(text: string): string {
  // Make sure there's an input
  if (!text) return "Please provide a valid input text";

  // Make an array of words after splitting them
  const wordsArray: string[] = text.split(values.spaceDash);

  // convert the words to camelCase
  const pCaseArray: string[] = wordsArray.map((word: string) => {
    word = word.charAt(0).toUpperCase() + word.slice(1);
    return word;
  });

  // Join the words and return them
  const result: string = pCaseArray.join("");
  return result;
}
