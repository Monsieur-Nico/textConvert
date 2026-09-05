import { scanMaximalRuns, stripTrailing } from './internal/scan';
import { extractEmails } from './extract';
import { maskText } from './mask';
import { isPhoneNumber } from './validation/phoneNumber';

// Characters allowed in a phone number candidate, checked one character at
// a time (O(1) per check, no regex backtracking risk) rather than with a
// `+`-quantified regex scanned across the whole string.
const phoneChars = new Set([...'+0123456789 ().-']);

/**
 * Finds phone-number-shaped candidate substrings: maximal runs of
 * phone-safe characters, trimmed of surrounding whitespace. Letters and
 * any other character end a run, so ordinary prose naturally breaks
 * candidates apart.
 */
function findPhoneCandidates(text: string): string[] {
  return scanMaximalRuns(text, phoneChars);
}

const dotChars = new Set(['.']);

// A trailing '.' is ambiguous: it's a valid mid-number separator (as in
// '555.123.4567') but also commonly a sentence-ending period, which
// findPhoneCandidates can't otherwise tell apart. Since a phone number
// never legitimately ends the match on a '.', it's always stripped before
// validating.
function stripTrailingDots(value: string): string {
  return stripTrailing(value, dotChars);
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
 * Finds credit-card-shaped candidate substrings, the same maximal-run
 * approach as {@link findPhoneCandidates}.
 */
function findCreditCardCandidates(text: string): string[] {
  return scanMaximalRuns(text, creditCardChars);
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

// Characters allowed in an IPv4 candidate: digits and the dot separator.
const ipv4Chars = new Set([...'0123456789.']);

/**
 * Finds IPv4-shaped candidate substrings, the same maximal-run approach as
 * {@link findPhoneCandidates}.
 */
function findIpv4Candidates(text: string): string[] {
  return scanMaximalRuns(text, ipv4Chars);
}

/**
 * Validates a candidate as exactly 4 dot-separated octets, each 0-255, with
 * no leading zeros (e.g. '01') other than a bare '0' -- some parsers treat
 * a leading-zero octet as octal, so rejecting it outright avoids that
 * ambiguity rather than picking a side. Returns the 4 parsed octets, or
 * `null` if the candidate isn't a validly-shaped IPv4 address.
 */
function parseIpv4Octets(candidate: string): number[] | null {
  const parts = candidate.split('.');
  if (parts.length !== 4) return null;

  const octets: number[] = [];

  for (const part of parts) {
    if (part.length === 0 || part.length > 3) return null;
    if (part.length > 1 && part[0] === '0') return null;

    // No separate "is this all digits" check needed: candidates only ever
    // reach here from findIpv4Candidates, which already restricted the
    // whole string to ipv4Chars (digits and '.') before this split -- so
    // every part is guaranteed to be digits-only already.
    const value = Number(part);
    if (value > 255) return null;

    octets.push(value);
  }

  return octets;
}

// RFC 1918 private ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16), plus
// loopback (127.0.0.0/8) and link-local (169.254.0.0/16) -- never matched,
// with no opt-in override, since these are non-globally-unique addresses
// that appear on every organization's own network. Masking one in a debug
// log actively destroys its usefulness (e.g. "which internal server made
// this request") with no corresponding privacy benefit, unlike a public IP.
function isPrivateOrReservedIpv4(octets: number[]): boolean {
  const [a, b] = octets;

  if (a === 10) return true; // 10.0.0.0/8
  if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
  if (a === 192 && b === 168) return true; // 192.168.0.0/16
  if (a === 127) return true; // 127.0.0.0/8 (loopback)
  if (a === 169 && b === 254) return true; // 169.254.0.0/16 (link-local)

  return false;
}

/**
 * Public IPv4 addresses found in text -- candidates that parse as 4 valid
 * octets and aren't a private/loopback/link-local address.
 */
function findPublicIpv4Addresses(text: string): string[] {
  return findIpv4Candidates(text).filter((candidate) => {
    const octets = parseIpv4Octets(candidate);
    return octets !== null && !isPrivateOrReservedIpv4(octets);
  });
}

// Characters allowed in a JWT candidate: the base64url alphabet plus the
// two dots separating its three segments.
const jwtChars = new Set([...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.']);

/**
 * Finds JWT-shaped candidate substrings, the same maximal-run approach as
 * {@link findPhoneCandidates}.
 */
function findJwtCandidates(text: string): string[] {
  return scanMaximalRuns(text, jwtChars);
}

/**
 * Decodes a base64url segment (the `-`/`_` alphabet, no padding) to a UTF-8
 * string using the standard Web Crypto/encoding globals available in both
 * Node and browsers -- same "universal Web API, not a Node-only import"
 * approach as {@link randomString}'s use of `globalThis.crypto`. Returns
 * `null` rather than throwing on invalid input, since this runs against
 * attacker-controlled candidate text.
 */
function base64UrlDecode(segment: string): string | null {
  try {
    const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    return globalThis.atob(padded);
  } catch {
    return null;
  }
}

/**
 * Validates a candidate as a structurally-real JWT: exactly 3 non-empty
 * dot-separated segments, where the first (the header) base64url-decodes
 * to JSON containing a string `alg` field. This is the properly-scoped
 * replacement for a bare `eyJ`-prefix check (rejected in #320 -- `eyJ` is
 * just base64 for `{`, the start of any base64-encoded JSON, not something
 * JWT-specific).
 *
 * Deliberately does not verify the signature, check expiry, or otherwise
 * confirm the token is real/valid -- only that it's shaped like one.
 */
function isValidJwt(candidate: string): boolean {
  const segments = candidate.split('.');
  if (segments.length !== 3 || segments.some((segment) => segment.length === 0)) return false;

  const decodedHeader = base64UrlDecode(segments[0]);
  if (decodedHeader === null) return false;

  try {
    const header: unknown = JSON.parse(decodedHeader);
    return (
      typeof header === 'object' &&
      header !== null &&
      'alg' in header &&
      typeof (header as { alg: unknown }).alg === 'string'
    );
  } catch {
    return false;
  }
}

/** JWTs found in text, validated with {@link isValidJwt}. */
function findJwts(text: string): string[] {
  return findJwtCandidates(text).filter(isValidJwt);
}

export interface RedactOptions {
  /** Which types to redact. Default is 'email', 'phone', and 'creditCard'. 'apiKey', 'ip', and 'jwt' are opt-in only, given their higher false-positive risk (or, for 'jwt', simply being a bearer secret rather than classic PII). */
  types?: Array<'email' | 'phone' | 'creditCard' | 'apiKey' | 'ip' | 'jwt'>;
  /** Character(s) to use for masked positions, passed through to maskText. Default is '*'. */
  maskChar?: string;
}

/**
 * Scans free-form text for embedded PII (emails, phone numbers, credit
 * card numbers, public IPv4 addresses) and secrets (API keys/tokens, JWTs)
 * and masks each match in place, using {@link extractEmails} to locate
 * emails and {@link maskText} to mask every match — for sanitizing logs,
 * support tickets, or user-generated content before storage or display.
 *
 * `redact` is best-effort pattern matching, not a complete PII/secret
 * detector — false negatives are possible, and it shouldn't be relied on
 * as the only safeguard for sensitive data (pair it with review, not use
 * it as a substitute for one). Two gaps worth knowing about specifically:
 *
 * - **`'ip'` never matches private/loopback/link-local addresses** (`10.x`,
 *   `172.16-31.x`, `192.168.x`, `127.x`, `169.254.x`), with no option to
 *   include them in v1. This is deliberate (masking them destroys
 *   debugging value with no privacy benefit), but means `types: ['ip']`
 *   does not mean "every IP" — if your threat model needs that, `redact`
 *   doesn't cover it yet.
 * - **`'jwt'` requires the token fully intact as one unbroken run** of
 *   base64url characters and dots. A JWT that's been line-wrapped,
 *   truncated, or had whitespace injected mid-token — including a
 *   truncated header+payload with the signature cut off, which can still
 *   leak real claims data — will not match.
 *
 * @param text Text to redact.
 * @param options.types Which types to redact. Default is `'email'`, `'phone'`, and `'creditCard'`. `'apiKey'`, `'ip'`, and `'jwt'` are opt-in only.
 * @param options.maskChar Character(s) to use for masked positions, passed through to {@link maskText}. Default is `'*'`.
 * @returns The text with each detected match masked in place.
 * @example
 * redact('Contact me at jordan@example.com or 555-123-4567');
 * // 'Contact me at jo**************** or 55**********'
 * redact('Card: 4111 1111 1111 1111', { types: ['creditCard'] });
 * // 'Card: ***************1111'
 * redact('Key: AKIAIOSFODNN7EXAMPLE leaked', { types: ['apiKey'] });
 * // 'Key: ******************** leaked'
 * redact('Server 10.0.0.5 hit by 203.0.113.42', { types: ['ip'] });
 * // 'Server 10.0.0.5 hit by ************'
 */
export function redact(text: string, options: RedactOptions = {}): string {
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

  if (types.includes('ip')) {
    for (const ip of new Set(findPublicIpv4Addresses(text))) {
      result = result.split(ip).join(maskText(ip, { visibleStart: 0, visibleEnd: 0, maskChar }));
    }
  }

  if (types.includes('jwt')) {
    for (const jwt of new Set(findJwts(text))) {
      result = result.split(jwt).join(maskText(jwt, { visibleStart: 0, visibleEnd: 0, maskChar }));
    }
  }

  return result;
}
