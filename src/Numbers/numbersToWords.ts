// Create digits in words
const numbers: string[] =
  "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(
    " "
  );
const tens: string[] =
  "twenty thirty forty fifty sixty seventy eighty ninety".split(" ");

/**
 * Get any number below 100 million converted to words.
 * @param number Integer input to turn into text.
 * @returns A string of numbers converted to words.
 */
export function numbersToWords(number: number): string {
  // Check if the number is less than 1 million
  if (number >= 100000000) {
    throw new Error("Please enter a number under 100 million!");
  }

  // Check if the input is between 0-19
  if (number < 20) return numbers[number];

  // Create a digit variable
  const digit: number = number % 10;

  // Check if the input is between 20-99
  if (number < 100)
    return tens[~~(number / 10) - 2] + (digit ? "-" + numbers[digit] : "");
  // Check if the input is between 100 and 999
  if (number < 1000)
    return (
      numbers[~~(number / 100)] +
      " hundred" +
      (number % 100 == 0 ? "" : " and " + numbersToWords(number % 100))
    );
  // Otherwise repeat the function for thousands
  if (number < 999999)
    return (
      numbersToWords(~~(number / 1000)) +
      " thousand" +
      (number % 1000 != 0 ? " " + numbersToWords(number % 1000) : "")
    );
  return (
    numbersToWords(~~(number / 1000000)) +
    " million" +
    (number % 1000000 != 0 ? " " + numbersToWords(number % 1000000) : "")
  );
}
