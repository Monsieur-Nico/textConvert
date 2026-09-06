import {
  PositionedMatch,
  scanMaximalRunsWithPositions,
  stripTrailing,
  trailingPunctuationChars,
} from './scan';
import { isEmail } from '../validation/email';
import { isPhoneNumber } from '../validation/phoneNumber';

// Shared, position-aware detection logic behind both redact() and scan() --
// each function here mirrors a specific PII/secret shape, returning every
// match's value alongside its position in the text. Kept in one place so
// the two public functions can't drift out of sync with each other.

/** The PII/secret shapes both redact() and scan() know how to detect. */
export type DetectionType = 'email' | 'phone' | 'creditCard' | 'apiKey' | 'ip' | 'jwt';

// ---- Email --------------------------------------------------------------

// Characters allowed in an email's local-part / domain, checked one
// character at a time (O(1) per check) rather than with a `+`-quantified
// regex scanned across the whole string, which is vulnerable to ReDoS on
// long runs of a single allowed character (e.g. many repeated '!').
const localPartChars = new Set(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.!#$%&'*+/=?^_`{|}~-",
);
const domainChars = new Set('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-');

/**
 * Finds "local-part@domain"-shaped email matches in text, validated with
 * {@link isEmail}, along with each match's position. Shared by
 * `extractEmails` and `scan`.
 */
export function findEmailMatches(text: string): PositionedMatch[] {
  const matches: PositionedMatch[] = [];
  let runStart = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '@' && i > runStart) {
      let end = i + 1;
      while (end < text.length && domainChars.has(text[end])) end++;

      if (end > i + 1) {
        const rawValue = text.slice(runStart, end);
        const value = stripTrailing(rawValue, trailingPunctuationChars);

        if (isEmail(value)) {
          matches.push({ value, start: runStart, end: runStart + value.length });
        }
      }

      i = end - 1;
      runStart = end;
      continue;
    }

    if (!localPartChars.has(char)) runStart = i + 1;
  }

  return matches;
}

// ---- Phone number ---------------------------------------------------------

// Characters allowed in a phone number candidate, checked one character at
// a time (O(1) per check, no regex backtracking risk) rather than with a
// `+`-quantified regex scanned across the whole string.
const phoneChars = new Set([...'+0123456789 ().-']);
const dotChars = new Set(['.']);

/**
 * Finds phone-number-shaped matches, validated with {@link isPhoneNumber},
 * along with each match's position. A trailing '.' is always stripped
 * first: it's a valid mid-number separator (as in '555.123.4567') but also
 * commonly a sentence-ending period, which the character-run scan can't
 * otherwise tell apart, and a phone number never legitimately ends on one.
 */
export function findPhoneNumberMatches(text: string): PositionedMatch[] {
  return scanMaximalRunsWithPositions(text, phoneChars)
    .map((match) => {
      const value = stripTrailing(match.value, dotChars);
      return { value, start: match.start, end: match.start + value.length };
    })
    .filter((match) => isPhoneNumber(match.value));
}

// ---- Credit card ----------------------------------------------------------

// Characters allowed in a credit card candidate: digits and the separators
// commonly used when writing one out (space, dash). No dots/parens/plus —
// unlike phone numbers, card numbers don't use them.
const creditCardChars = new Set([...'0123456789 -']);

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
 * Finds credit-card-shaped matches whose digits (ignoring spaces/dashes)
 * fall in the standard 13-19 digit range (ISO/IEC 7812) and pass a Luhn
 * checksum, along with each match's position.
 */
export function findCreditCardMatches(text: string): PositionedMatch[] {
  return scanMaximalRunsWithPositions(text, creditCardChars).filter((match) => {
    const digits = match.value.replace(/[ -]/g, '');
    return digits.length >= 13 && digits.length <= 19 && isValidLuhn(digits);
  });
}

// ---- API key / token -------------------------------------------------------

// Characters allowed after a known API key/token prefix — letters, digits,
// and underscore. Anything else ends the run.
const tokenChars = new Set([...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_']);

// Known, high-specificity secret prefixes and the minimum total match
// length (prefix + token) required before it counts as a match.
// Deliberately narrow and prefix-based rather than a generic "looks
// random" entropy heuristic, which produces heavy false positives on
// hashes, UUIDs, and ordinary identifiers (see #320's research notes).
const apiKeyPrefixes: Array<{ prefix: string; minLength: number }> = [
  { prefix: 'AKIA', minLength: 20 }, // AWS access key: AKIA + 16 chars
  { prefix: 'ghp_', minLength: 40 }, // GitHub classic PAT: ghp_ + 36 chars
  { prefix: 'github_pat_', minLength: 82 }, // GitHub fine-grained PAT
  { prefix: 'sk_live_', minLength: 32 }, // Stripe live secret key
];

/**
 * Finds API key/token matches: a known prefix followed by a run of token
 * characters meeting that prefix's minimum length, found via
 * `indexOf`-based scanning rather than a regex alternation, along with
 * each match's position.
 */
export function findApiKeyMatches(text: string): PositionedMatch[] {
  const matches: PositionedMatch[] = [];

  for (const { prefix, minLength } of apiKeyPrefixes) {
    let searchFrom = 0;

    while (searchFrom < text.length) {
      const start = text.indexOf(prefix, searchFrom);
      if (start === -1) break;

      let end = start + prefix.length;
      while (end < text.length && tokenChars.has(text[end])) end++;

      if (end - start >= minLength) matches.push({ value: text.slice(start, end), start, end });

      // end is always > start here: every prefix is non-empty, so end
      // starts at start + prefix.length before the token-char loop even
      // runs, unlike a scan that could match zero characters.
      searchFrom = end;
    }
  }

  return matches;
}

// ---- IPv4 -------------------------------------------------------------------

// Characters allowed in an IPv4 candidate: digits and the dot separator.
const ipv4Chars = new Set([...'0123456789.']);

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
    // reach here already restricted to ipv4Chars (digits and '.') by the
    // scan that produced them, so every part is guaranteed digits-only.
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
 * Finds public IPv4 address matches -- candidates that parse as 4 valid
 * octets and aren't a private/loopback/link-local address -- along with
 * each match's position.
 */
export function findPublicIpv4Matches(text: string): PositionedMatch[] {
  return scanMaximalRunsWithPositions(text, ipv4Chars).filter((match) => {
    const octets = parseIpv4Octets(match.value);
    return octets !== null && !isPrivateOrReservedIpv4(octets);
  });
}

// ---- JWT --------------------------------------------------------------------

// Characters allowed in a JWT candidate: the base64url alphabet plus the
// two dots separating its three segments.
const jwtChars = new Set([...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.']);

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
 * to JSON containing a string `alg` field.
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

/**
 * Finds structurally-valid JWT matches, validated with {@link isValidJwt},
 * along with each match's position.
 */
export function findJwtMatches(text: string): PositionedMatch[] {
  return scanMaximalRunsWithPositions(text, jwtChars).filter((match) => isValidJwt(match.value));
}
