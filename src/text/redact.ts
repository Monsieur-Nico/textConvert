import { extractEmails } from './extract';
import { maskText } from './mask';
import { isPhoneNumber } from './validation/phoneNumber';

// Characters allowed in a phone number candidate, checked one character at
// a time (O(1) per check, no regex backtracking risk) rather than with a
// `+`-quantified regex scanned across the whole string.
const phoneChars = new Set([...'+0123456789 ().-']);

/**
 * Finds phone-number-shaped candidate substrings via a single linear pass:
 * maximal runs of phone-safe characters, trimmed of surrounding whitespace.
 * Letters and any other character end a run, so ordinary prose naturally
 * breaks candidates apart.
 */
function findPhoneCandidates(text: string): string[] {
  const candidates: string[] = [];
  let i = 0;

  while (i < text.length) {
    if (!phoneChars.has(text[i])) {
      i++;
      continue;
    }

    let end = i;
    while (end < text.length && phoneChars.has(text[end])) end++;

    let start = i;
    while (start < end && text[start] === ' ') start++;
    let trimmedEnd = end;
    while (trimmedEnd > start && text[trimmedEnd - 1] === ' ') trimmedEnd--;

    if (trimmedEnd > start) candidates.push(text.slice(start, trimmedEnd));

    i = end;
  }

  return candidates;
}

// A trailing '.' is ambiguous: it's a valid mid-number separator (as in
// '555.123.4567') but also commonly a sentence-ending period, which
// findPhoneCandidates can't otherwise tell apart. Since a phone number
// never legitimately ends the match on a '.', it's always stripped before
// validating.
function stripTrailingDots(value: string): string {
  let end = value.length;
  while (end > 0 && value[end - 1] === '.') end--;
  return value.slice(0, end);
}

/** Phone numbers found in text, validated with {@link isPhoneNumber}. */
function findPhoneNumbers(text: string): string[] {
  return findPhoneCandidates(text).map(stripTrailingDots).filter(isPhoneNumber);
}

/**
 * Scans free-form text for embedded PII (emails and phone numbers) and
 * masks each match in place, using {@link extractEmails} to locate emails
 * and {@link maskText} to mask every match — for sanitizing logs, support
 * tickets, or user-generated content before storage or display.
 *
 * @param text Text to redact.
 * @param options.types Which PII types to redact. Default is both `'email'` and `'phone'`.
 * @param options.maskChar Character(s) to use for masked positions, passed through to {@link maskText}. Default is `'*'`.
 * @returns The text with each detected match masked in place.
 * @example
 * redact('Contact me at jordan@example.com or 555-123-4567');
 * // 'Contact me at jo**************** or 55**********'
 * redact('Email: jordan@example.com', { types: ['email'] });
 * // 'Email: jo****************'
 */
export function redact(
  text: string,
  options: { types?: Array<'email' | 'phone'>; maskChar?: string } = {},
): string {
  if (!text) return 'Please provide a valid input text';

  const { types = ['email', 'phone'], maskChar } = options;

  let result = text;

  if (types.includes('email')) {
    for (const email of new Set(extractEmails(text))) {
      result = result.split(email).join(maskText(email, { maskChar }));
    }
  }

  if (types.includes('phone')) {
    for (const phone of new Set(findPhoneNumbers(text))) {
      result = result.split(phone).join(maskText(phone, { maskChar }));
    }
  }

  return result;
}
