import {
  DetectionType,
  findApiKeyMatches,
  findCreditCardMatches,
  findEmailMatches,
  findJwtMatches,
  findPhoneNumberMatches,
  findPublicIpv4Matches,
} from './internal/detectors';

export interface ScanMatch {
  /** Which kind of match this is. */
  type: DetectionType;
  /** The matched substring, exactly as it appears in the input text. */
  value: string;
  /** Index of the match's first character in the input text. */
  start: number;
  /** Index one past the match's last character in the input text. */
  end: number;
}

export interface ScanOptions {
  /** Which types to look for. Default is 'email', 'phone', and 'creditCard'. 'apiKey', 'ip', and 'jwt' are opt-in only, given their higher false-positive risk (or, for 'jwt', simply being a bearer secret rather than classic PII). */
  types?: DetectionType[];
}

/**
 * Scans free-form text for the same embedded PII (emails, phone numbers,
 * credit card numbers, public IPv4 addresses) and secrets (API keys/tokens,
 * JWTs) that `redact` detects, but returns each match as structured
 * data instead of masking it in place — for callers that want to inspect,
 * log, or make their own decision about what was found, rather than have
 * it masked automatically.
 *
 * Reuses exactly the same detection logic `redact` does, so it
 * carries the same known gaps and false-positive/negative characteristics
 * — see `redact`'s own documentation for the specifics on `'ip'` and
 * `'jwt'`. `scan` is best-effort pattern matching, not a complete
 * PII/secret detector.
 *
 * @param text Text to scan.
 * @param options.types Which types to look for. Default is `'email'`, `'phone'`, and `'creditCard'`. `'apiKey'`, `'ip'`, and `'jwt'` are opt-in only.
 * @returns Every match found, in the order it appears in the text.
 * @example
 * scan('Contact jordan@example.com, card 4111 1111 1111 1111');
 * // [
 * //   { type: 'email', value: 'jordan@example.com', start: 8, end: 26 },
 * //   { type: 'creditCard', value: '4111 1111 1111 1111', start: 33, end: 52 },
 * // ]
 */
export function scan(text: string, options: ScanOptions = {}): ScanMatch[] {
  if (!text) return [];

  const { types = ['email', 'phone', 'creditCard'] } = options;

  const matches: ScanMatch[] = [];

  if (types.includes('email')) {
    for (const match of findEmailMatches(text)) matches.push({ type: 'email', ...match });
  }

  if (types.includes('phone')) {
    for (const match of findPhoneNumberMatches(text)) matches.push({ type: 'phone', ...match });
  }

  if (types.includes('creditCard')) {
    for (const match of findCreditCardMatches(text)) matches.push({ type: 'creditCard', ...match });
  }

  if (types.includes('apiKey')) {
    for (const match of findApiKeyMatches(text)) matches.push({ type: 'apiKey', ...match });
  }

  if (types.includes('ip')) {
    for (const match of findPublicIpv4Matches(text)) matches.push({ type: 'ip', ...match });
  }

  if (types.includes('jwt')) {
    for (const match of findJwtMatches(text)) matches.push({ type: 'jwt', ...match });
  }

  return matches.sort((a, b) => a.start - b.start);
}
