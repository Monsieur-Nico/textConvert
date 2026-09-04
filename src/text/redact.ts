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

// Characters allowed in a credit card candidate: digits and the separators
// commonly used when writing one out (space, dash). No dots/parens/plus —
// unlike phone numbers, card numbers don't use them.
const creditCardChars = new Set([...'0123456789 -']);

/**
 * Finds credit-card-shaped candidate substrings via a single linear pass,
 * the same maximal-run approach as {@link findPhoneCandidates}.
 */
function findCreditCardCandidates(text: string): string[] {
  const candidates: string[] = [];
  let i = 0;

  while (i < text.length) {
    if (!creditCardChars.has(text[i])) {
      i++;
      continue;
    }

    let end = i;
    while (end < text.length && creditCardChars.has(text[end])) end++;

    let start = i;
    while (start < end && text[start] === ' ') start++;
    let trimmedEnd = end;
    while (trimmedEnd > start && text[trimmedEnd - 1] === ' ') trimmedEnd--;

    if (trimmedEnd > start) candidates.push(text.slice(start, trimmedEnd));

    i = end;
  }

  return candidates;
}

// Luhn checksum, used to tell an actual card number apart from an arbitrary
// digit sequence of the same length (order IDs, invoice numbers, ...).
function isValidLuhn(digits: string): boolean {
  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits.charCodeAt(i) - 48;

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

/**
 * Credit card numbers found in text: candidates whose digits (ignoring
 * spaces/dashes) fall in the standard 13-19 digit range (ISO/IEC 7812) and
 * pass a Luhn checksum.
 */
function findCreditCards(text: string): string[] {
  return findCreditCardCandidates(text).filter((candidate) => {
    const digits = candidate.replace(/[ -]/g, '');
    return digits.length >= 13 && digits.length <= 19 && isValidLuhn(digits);
  });
}

// Characters allowed after a known API key/token prefix — letters, digits,
// and underscore. Anything else ends the run.
const tokenChars = new Set([...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_']);

// Known, high-specificity secret prefixes and the minimum total match
// length (prefix + token) required before it counts as a candidate. Deliberately
// narrow and prefix-based rather than a generic "looks random" entropy
// heuristic, which produces heavy false positives on hashes, UUIDs, and
// ordinary identifiers (see #320's research notes).
const apiKeyPrefixes: Array<{ prefix: string; minLength: number }> = [
  { prefix: 'AKIA', minLength: 20 }, // AWS access key: AKIA + 16 chars
  { prefix: 'ghp_', minLength: 40 }, // GitHub classic PAT: ghp_ + 36 chars
  { prefix: 'github_pat_', minLength: 82 }, // GitHub fine-grained PAT
  { prefix: 'sk_live_', minLength: 32 }, // Stripe live secret key
];

/**
 * Finds API key/token candidates: a known prefix followed by a run of
 * token characters meeting that prefix's minimum length, found via
 * `indexOf`-based scanning rather than a regex alternation.
 */
function findApiKeys(text: string): string[] {
  const candidates: string[] = [];

  for (const { prefix, minLength } of apiKeyPrefixes) {
    let searchFrom = 0;

    while (searchFrom < text.length) {
      const start = text.indexOf(prefix, searchFrom);
      if (start === -1) break;

      let end = start + prefix.length;
      while (end < text.length && tokenChars.has(text[end])) end++;

      if (end - start >= minLength) candidates.push(text.slice(start, end));

      searchFrom = end > start ? end : start + 1;
    }
  }

  return candidates;
}

/**
 * Scans free-form text for embedded PII (emails, phone numbers, credit
 * card numbers) and secrets (API keys/tokens) and masks each match in
 * place, using {@link extractEmails} to locate emails and {@link maskText}
 * to mask every match — for sanitizing logs, support tickets, or
 * user-generated content before storage or display.
 *
 * `redact` is best-effort pattern matching, not a complete PII/secret
 * detector — false negatives are possible, and it shouldn't be relied on
 * as the only safeguard for sensitive data (pair it with review, not use
 * it as a substitute for one).
 *
 * @param text Text to redact.
 * @param options.types Which types to redact. Default is `'email'`, `'phone'`, and `'creditCard'`. `'apiKey'` is opt-in only, given its higher false-positive risk.
 * @param options.maskChar Character(s) to use for masked positions, passed through to {@link maskText}. Default is `'*'`.
 * @returns The text with each detected match masked in place.
 * @example
 * redact('Contact me at jordan@example.com or 555-123-4567');
 * // 'Contact me at jo**************** or 55**********'
 * redact('Card: 4111 1111 1111 1111', { types: ['creditCard'] });
 * // 'Card: ***************1111'
 * redact('Key: AKIAIOSFODNN7EXAMPLE leaked', { types: ['apiKey'] });
 * // 'Key: ******************** leaked'
 */
export function redact(
  text: string,
  options: { types?: Array<'email' | 'phone' | 'creditCard' | 'apiKey'>; maskChar?: string } = {},
): string {
  if (!text) return 'Please provide a valid input text';

  const { types = ['email', 'phone', 'creditCard'], maskChar } = options;

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

  if (types.includes('creditCard')) {
    for (const card of new Set(findCreditCards(text))) {
      // Last 4 digits visible matches the standard "card ending in 1234"
      // convention, rather than full masking.
      result = result
        .split(card)
        .join(maskText(card, { visibleStart: 0, visibleEnd: 4, maskChar }));
    }
  }

  if (types.includes('apiKey')) {
    for (const key of new Set(findApiKeys(text))) {
      result = result.split(key).join(maskText(key, { visibleStart: 0, visibleEnd: 0, maskChar }));
    }
  }

  return result;
}
