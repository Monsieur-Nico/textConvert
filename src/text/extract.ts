import { isEmail } from './validation/email';
import { isUrl } from './validation/url';

// Characters allowed in an email's local-part / domain, checked one
// character at a time (O(1) per check) rather than with a `+`-quantified
// regex scanned across the whole string, which is vulnerable to ReDoS on
// long runs of a single allowed character (e.g. many repeated '!').
const localPartChars = new Set(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.!#$%&'*+/=?^_`{|}~-",
);
const domainChars = new Set('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-');
const trailingPunctuationChars = new Set([...'.,;:!?)]}\'"']);

// Characters that end a URL candidate: whitespace and the delimiters
// commonly used to wrap a URL in prose (quotes, angle brackets, parens),
// which are almost never actually part of the URL itself.
const urlBoundaryChars = new Set([...' \t\n\r\f\v<>"\'()[]{}']);

// Trims trailing punctuation (e.g. a sentence-ending period right after the
// domain) that's part of the surrounding sentence, not the address itself.
function stripTrailingPunctuation(value: string): string {
  let end = value.length;
  while (end > 0 && trailingPunctuationChars.has(value[end - 1])) end--;
  return value.slice(0, end);
}

/**
 * Finds "local-part@domain"-shaped candidate substrings in text via a
 * single linear pass, without regex backtracking risk.
 */
function findEmailCandidates(text: string): string[] {
  const candidates: string[] = [];
  let runStart = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '@' && i > runStart) {
      let end = i + 1;
      while (end < text.length && domainChars.has(text[end])) end++;

      if (end > i + 1) candidates.push(text.slice(runStart, end));

      i = end - 1;
      runStart = end;
      continue;
    }

    if (!localPartChars.has(char)) runStart = i + 1;
  }

  return candidates;
}

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

  return findEmailCandidates(text).map(stripTrailingPunctuation).filter(isEmail);
}

/**
 * Finds "http(s)://..."-shaped candidate substrings in text by locating
 * each scheme occurrence with `indexOf` and scanning forward one character
 * at a time until a boundary character, without regex backtracking risk.
 */
function findUrlCandidates(text: string): string[] {
  const candidates: string[] = [];
  let searchFrom = 0;

  while (searchFrom < text.length) {
    const httpsAt = text.indexOf('https://', searchFrom);
    const httpAt = text.indexOf('http://', searchFrom);

    let start: number;
    if (httpsAt === -1) start = httpAt;
    else if (httpAt === -1) start = httpsAt;
    else start = Math.min(httpsAt, httpAt);

    if (start === -1) break;

    let end = start;
    while (end < text.length && !urlBoundaryChars.has(text[end])) end++;

    candidates.push(text.slice(start, end));
    searchFrom = end > start ? end : start + 1;
  }

  return candidates;
}

/**
 * Extracts all URLs found in a block of text, rather than validating a
 * single string like {@link isUrl} does.
 *
 * @param text Text to search for URLs.
 * @returns An array of the URLs found, in the order they appear.
 * @example
 * extractUrls('Check out https://example.com and http://another.example.org/path for details.');
 * // ['https://example.com', 'http://another.example.org/path']
 */
export function extractUrls(text: string): string[] {
  if (!text) return [];

  return findUrlCandidates(text).map(stripTrailingPunctuation).filter(isUrl);
}
