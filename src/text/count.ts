import { clear } from './clear';
import { iterateGraphemes } from './internal/graphemes';

/**
 * Return a number count of the letters in a string.
 *
 * Letters are counted per grapheme cluster (user-perceived character), so a
 * letter with combining marks (e.g. an unnormalized `é`) counts once, not once
 * per code point.
 *
 * @param text String input to get letters count from.
 * @param countNumbers boolean value to determine if numbers should be counted as letters.
 *
 * @returns Number of letters and numbers (if requested) in a string.
 * @example
 * count('Hello, world!'); // 10
 * count('Hello0 world', true); // 11
 * count('cafe\u0301'); // 4 -- the e+combining-acute cluster counts once
 */

export function count(text: string, countNumbers = false): number {
  // Check string length
  if (!text.length) return 0;
  // Create a temp number.
  let temp = 0;
  // Clear the string, then walk it grapheme cluster by grapheme cluster so
  // multi-code-point characters (combining marks, emoji) count once.
  const cleared = clear(text);
  for (const cluster of iterateGraphemes(cleared)) {
    // A cluster's base character is its first code point -- classify by it so
    // combining marks and modifiers attached to the base don't change how the
    // cluster is counted. The ASCII-only classes match the historical
    // behavior of this function; this change only regroups the iteration.
    if (countNumbers ? /^[a-z0-9]/i.test(cluster) : /^[a-z]/i.test(cluster)) {
      temp++;
    }
  }

  // Return the number of letters.
  return temp;
}

/**
 * Counts the number of words in a string.
 * Words are defined as sequences of letters, numbers, and apostrophes separated by whitespace.
 *
 * @param text String input to count words from
 * @returns Number of words in the string
 * @example
 * countWords('Hello, world!'); // 2
 */
export function countWords(text: string): number {
  if (!text?.trim()) return 0;

  // If the text contains only punctuation, return 0
  if (!/[a-zA-Z0-9]/.test(text)) return 0;

  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0 && /[a-zA-Z0-9]/.test(word)).length;
}

/**
 * Counts the number of sentences in a string.
 * Sentences are defined as sequences of text ending with ., !, or ? followed by whitespace or end of string.
 * Text without any sentence-ending punctuation is considered to be a single sentence.
 *
 * @param text String input to count sentences from
 * @returns Number of sentences in the string
 * @example
 * countSentences('Hello world! How are you?'); // 2
 */
export function countSentences(text: string): number {
  const trimmed = text?.trim();
  if (!trimmed) return 0;

  // If there's no sentence-ending punctuation but there is text, it's considered one sentence
  if (!/[.!?]/.test(trimmed)) return 1;

  // Walk the string manually instead of using a backtracking regex split: a
  // lookahead-based `[.!?]+(?=\s|$)` pattern runs in quadratic time on long
  // runs of punctuation that aren't followed by whitespace (ReDoS).
  const punctuationRun = /[.!?]+/g;
  let sentences = 0;
  let segmentStart = 0;
  let match: RegExpExecArray | null;

  while ((match = punctuationRun.exec(trimmed)) !== null) {
    const runEnd = match.index + match[0].length;
    const nextChar = trimmed[runEnd];
    const isBoundary = nextChar === undefined || /\s/.test(nextChar);

    if (isBoundary) {
      if (trimmed.slice(segmentStart, match.index).trim().length > 0) sentences++;
      segmentStart = runEnd;
    }
  }

  if (trimmed.slice(segmentStart).trim().length > 0) sentences++;

  return sentences;
}
