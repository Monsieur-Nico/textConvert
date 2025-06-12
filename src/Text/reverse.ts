/**
 * Reverses all characters in a string.
 * @param text A string to reverse.
 * @returns Reversed string.
 */

export function reverse(text: string) {
  // return type is inferred
  // Make sure input is valid
  if (!text) return 'Please provide a valid input text';
  // Split string into characters, reverse all of them and join them back together
  return text.split('').reverse().join('');
}
