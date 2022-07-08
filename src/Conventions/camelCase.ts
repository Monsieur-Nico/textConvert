/**
 *
 * @param text input text to convert to CamelCase
 */

export function camelCase(text: string): string {
  // Make sure there's an input
  if (!text) return "Please provide a valid input text";

  // define the regex pattern
  const wordsArray: string[] = text.split(/[-_ ]/g);
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
