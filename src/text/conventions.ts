import { regex } from '../assets/regex';

const { values } = regex;

/**
 * Capitalizes only the first letter of a string, leaving the rest unchanged.
 * @param text A string to capitalize.
 * @returns The string with its first letter capitalized.
 * @example
 * capitalize('hello world'); // 'Hello world'
 * capitalize('HELLO WORLD'); // 'HELLO WORLD'
 */
export function capitalize(text: string): string {
  // Make sure there's an input
  if (!text) return 'Please provide a valid input text';

  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Splits text into words the same way snakeCase/kebabCase already did, then
 * joins them back together with the given delimiter, lowercasing the first
 * letter of each word.
 */
function toDelimiterCase(text: string, delimiter: string): string {
  // Make an array of words after splitting them depending on the input case
  const wordsArray: string[] = values.nonAlphaTest.test(text)
    ? text.split(values.nonAlphabetic)
    : text.split(values.upperCaseKeepLetter);

  // Filter the words to 1 letter minimum length and convert the words to lowerCase
  const caseArray: string[] = wordsArray
    .filter((word: string) => word.length > 0)
    .map((word: string) => word.charAt(0).toLowerCase() + word.slice(1));

  return caseArray.join(delimiter);
}

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

  // Convert the remaining words to camelCase, dropping any empty segments
  // left by consecutive delimiters (e.g. 'hello--world') before capitalizing
  // -- capitalize('') returns an error message, not '', so this filter
  // preserves the original behavior where an empty word just contributed
  // nothing to the joined result.
  const cCaseArray: string[] = wordsArray
    .filter((word: string) => word.length > 0)
    .map((word: string) => capitalize(word));

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

  // Convert the words to PascalCase, dropping any empty segments left by
  // consecutive delimiters (see camelCase for why this filter is needed).
  const pCaseArray: string[] = wordsArray
    .filter((word: string) => word.length > 0)
    .map((word: string) => capitalize(word));

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

  return toDelimiterCase(text, '_');
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

  return toDelimiterCase(text, '-');
}

/**
 * Capitalizes the first letter of every word, keeping spaces and separators
 * intact (distinct from {@link pascalCase}, which removes them).
 *
 * Uses simple every-word capitalization rather than the "small words stay
 * lowercase" (a, an, the, of, ...) style convention some style guides use —
 * simpler, more predictable, and easier to test, at the cost of not being
 * "typographically correct" by those style guides' rules.
 * @param text A string to convert to Title Case.
 * @returns The string with the first letter of every word capitalized.
 * @example
 * titleCase('the lord of the rings'); // 'The Lord Of The Rings'
 * titleCase('hello-world_example'); // 'Hello-World_Example'
 */
export function titleCase(text: string): string {
  // Make sure there's an input
  if (!text) return 'Please provide a valid input text';

  return text.replace(/[A-Za-z]+/g, (word) => capitalize(word));
}
