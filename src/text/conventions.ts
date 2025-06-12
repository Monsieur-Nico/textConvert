import { regex } from '../assets/regex';

const { values } = regex;

/**
 * Convert a string from any convention to Camel Case convention.
 * @param text A string to be converted to Camel Case.
 * @returns A string in camelCase convention.
 * @example
 * camelCase('hello world'); // 'helloWorld'
 */
export function camelCase(text: string): string {
  // Make sure there's an input
  if (!text) return 'Please provide a valid input text';

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
  return firstWord + cCaseArray.join('');
}

/**
 * Convert a string from any convention to Pascal Case convention.
 * @param text A string to be converted to Camel Case.
 * @returns A string in PascalCase convention.
 * @example
 * pascalCase('hello world'); // 'HelloWorld'
 */
export function pascalCase(text: string): string {
  // Make sure there's an input
  if (!text) return 'Please provide a valid input text';

  // Make an array of words after splitting them
  const wordsArray: string[] = text.split(values.nonAlphabetic);

  // convert the words to camelCase
  const pCaseArray: string[] = wordsArray.map((word: string) => {
    word = word.charAt(0).toUpperCase() + word.slice(1);
    return word;
  });

  // Join the words and return them
  return pCaseArray.join('');
}

/**
 * Convert a string from any convention to Snake Case convention.
 * @param text A string to be converted to Snake Case.
 * @returns A string in snake_case convention.
 * @example
 * snakeCase('hello world'); // 'hello_world'
 */
export function snakeCase(text: string): string {
  // Make sure there's an input
  if (!text) return 'Please provide a valid input text';

  // Make an array of words after splitting them depending on the input case
  const wordsArray: string[] = values.nonAlphaTest.test(text)
    ? text.split(values.nonAlphabetic)
    : text.split(values.upperCaseKeepLetter);

  // Filter the words to 1 letter minimum length and convert the words to lowerCase
  const sCaseArray: string[] = wordsArray
    .filter((word: string) => word.length > 0)
    .map((word: string) => {
      word = word.charAt(0).toLowerCase() + word.slice(1);
      return word;
    });

  // Join the words with "_" and return them
  return sCaseArray.join('_');
}

/**
 * Convert a string from any convention to Kebab Case convention.
 * @param text A string to be converted to Kebab Case.
 * @returns A string in kebab-case convention.
 * @example
 * kebabCase('hello world'); // 'hello-world'
 */
export function kebabCase(text: string): string {
  // Make sure there's an input
  if (!text) return 'Please provide a valid input text';

  // Make an array of words after splitting them depending on the input case
  const wordsArray: string[] = values.nonAlphaTest.test(text)
    ? text.split(values.nonAlphabetic)
    : text.split(values.upperCaseKeepLetter);

  // Filter the words to 1 letter minimum length and convert the words to lowerCase
  const kCaseArray: string[] = wordsArray
    .filter((word: string) => word.length > 0)
    .map((word: string) => {
      word = word.charAt(0).toLowerCase() + word.slice(1);
      return word;
    });

  // Join the words with "-" and return them
  return kCaseArray.join('-');
}
