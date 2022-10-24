import { clear } from "../textConvert";

/**
 * Return a boolean value number of the letters in a string.
 *
 * @param text String input to get letters count from.
 * @param countNumbers boolean value to determine if numbers should be counted as letters.
 *
 * @returns Number of letters and numbers (if requested) in a string.
 */

export default function count(text: string, countNumbers = false): number {
  // Create a temp number.
  let temp = 0;

  // Clear the string and split the letters into an array.
  const cleared = clear(text).split("");
  // Loop through the letters array.
  cleared.forEach((letter) => {
    // Check if countNumbers is included
    if (!countNumbers) {
      // Count letters only
      if (!(/[a-z]/g.test(letter) || /[A-Z]/g.test(letter))) {
        return;
      }
      temp++;
      return;
    }
    // Count letters with numbers.
    if (
      !(/[a-z]/g.test(letter) || /[A-Z]/g.test(letter) || /[0-9]/g.test(letter))
    )
      return;
    temp++;
  });

  // Return the number of letters.
  return temp;
}
