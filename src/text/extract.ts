import { isEmail } from './validation/email';

// Broad candidate match for "local-part@domain"-shaped substrings. Trailing
// punctuation (e.g. a sentence-ending period right after the domain) is
// handled separately, since a domain legitimately contains dots too.
const emailCandidate = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+/g;

// Trailing punctuation that's part of the surrounding sentence, not the
// address itself (e.g. 'hello@example.com.' or 'hello@example.com,').
const trailingPunctuation = /[.,;:!?)\]}'"]+$/;

/**
 * Extracts all email addresses found in a block of text, rather than
 * validating a single string like {@link isEmail} does.
 *
 * @param text Text to search for email addresses.
 * @returns An array of the email addresses found, in the order they appear.
 * @example
 * extractEmails('Contact us at hello@example.com or support@example.org for help.');
 * // ['hello@example.com', 'support@example.org']
 */
export function extractEmails(text: string): string[] {
  if (!text) return [];

  const candidates = text.match(emailCandidate) ?? [];

  return candidates
    .map((candidate) =>
      isEmail(candidate) ? candidate : candidate.replace(trailingPunctuation, ''),
    )
    .filter(isEmail);
}
