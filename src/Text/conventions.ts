import { regex } from "../assets/regex";

const { values } = regex;

/**
 * Convert a string from any convention to Camel Case convention.
 *
 * @param `text A string to be converted to Camel Case.
 */

export function camelCase(text: string): string {
  // Make sure there's an input
  if (!text) return "Please provide a valid input text";

  // Make an array of words after splitting them
  const wordsArray: string[] = text.split(values.nonAlphabetic);
  // Get the first word out of the array
  const firstWord = wordsArray.shift()?.toLowerCase();

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
 *
 * @param `text A string to be converted to Camel Case.
 */

export function pascalCase(text: string): string {
  // Make sure there's an input
  if (!text) return "Please provide a valid input text";

  // Make an array of words after splitting them
  const wordsArray: string[] = text.split(values.nonAlphabetic);

  // convert the words to camelCase
  const pCaseArray: string[] = wordsArray.map((word: string) => {
    word = word.charAt(0).toUpperCase() + word.slice(1);
    return word;
  });

  // Join the words and return them
  const result: string = pCaseArray.join("");
  return result;
}

/**
 * Convert a string from any convention to Snake Case convention.
 *
 * @param `text A string to be converted to Snake Case.
 */

export function snakeCase(text: string): string {
  // Make sure there's an input
  if (!text) return "Please provide a valid input";

  // Make an array of words after splitting them depending on the input case
  const wordsArray = !values.nonAlphabetic.test(text)
    ? text.split(values.upperCaseKeepLetter)
    : text.split(values.nonAlphabetic);

  console.log(wordsArray);

  // convert the words to camelCase
  const sCaseArray: string[] = wordsArray.map((word: string) => {
    word = word.charAt(0).toLowerCase() + word.slice(1);
    return word;
  });

  // Join the words and return them
  const result: string = sCaseArray.join("_");
  return result;
}
