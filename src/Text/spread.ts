/**
 * Spreads all characters in a string.
 * @param text A string to reverse.
 * @returns Spread string.
 */

export function spread(text: string) {
  // Create a return array.
  const arr = [];
  // Make sure input is valid
  if (!text) return "Please provide a valid input text";
  // Spread string into characters and return them in an array.
  const words = arr.push(text.split(" "));
  return console.log(words);
}
