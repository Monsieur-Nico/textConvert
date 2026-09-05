import { regex } from '../assets/regex';
import { removeDiacritics } from './normalize';

const { values } = regex;

/**
 * Convert text into a URL-safe slug: lowercase, punctuation stripped,
 * separators collapsed to a single "-", and accented characters normalized
 * to their plain-ASCII equivalents.
 *
 * @param text Text to slugify.
 * @returns A lowercase, hyphen-separated, URL-safe slug.
 * @example
 * slugify('Hello, World! 100% Awesome'); // 'hello-world-100-awesome'
 * slugify('  Multiple   Spaces  '); // 'multiple-spaces'
 */
export function slugify(text: string): string {
  // Make sure there's an input
  if (!text) return 'Please provide a valid input text';

  // Decompose accented characters (NFD) and strip the combining marks,
  // leaving plain-ASCII equivalents.
  const normalized = removeDiacritics(text);

  // Split on runs of non-alphanumeric characters and join with "-"
  const words = normalized.toLowerCase().split(values.nonAlphaNumeric);

  return words.filter((word) => word.length > 0).join('-');
}
