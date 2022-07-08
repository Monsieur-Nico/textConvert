/**
 *
 * @param text input text to convert to PascalCase
 */

export function pascalCase(text: string): string {
  // Make sure there's an input
  if (!text) return "Please provide a valid input text";

  // define the regex pattern
  const wordsArray: string[] = text.split(/[-_ ]/g);

  // convert the words to camelCase
  const pCaseArray: string[] = wordsArray.map((word: string) => {
    word = word.charAt(0).toUpperCase() + word.slice(1);
    return word;
  });

  // Join the words and return them
  const result: string = pCaseArray.join("");
  return result;
}
