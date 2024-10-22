/**
 * Returns an array of characters from the provided string.
 * @param text A string to spread.
 * @param clear Whether to clear punctuation from the text. Default is false.
 * @returns Array of characters or an error message.
 */
import { clear as clearText } from "./clear";

export function spread(text: string, clear = false): string[] | string {
  // Check if clearing punctuation is necessary.
  if (clear) {
    text = clearText(text);
  }

  // Make sure input is valid.
  if (typeof text !== "string") {
    return "Input text should be a string!";
  }

  if (!text.trim()) {
    return "Please provide a valid text input";
  }

  // Spread string into characters and return them in an array.
  const characters = [
    ...(text.charAt(0).toLocaleUpperCase() + text.slice(1)).replace(/\s/g, ""),
  ];

  return characters;
}
