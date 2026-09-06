import {
  DetectionType,
  findApiKeyMatches,
  findCreditCardMatches,
  findJwtMatches,
  findPhoneNumberMatches,
  findPublicIpv4Matches,
} from './internal/detectors';
import { extractEmails } from './extract';
import { maskText } from './mask';

export interface RedactOptions {
  /** Which types to redact. Default is 'email', 'phone', and 'creditCard'. 'apiKey', 'ip', and 'jwt' are opt-in only, given their higher false-positive risk (or, for 'jwt', simply being a bearer secret rather than classic PII). */
  types?: DetectionType[];
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
    for (const phone of new Set(findPhoneNumberMatches(text).map((match) => match.value))) {
      result = result.split(phone).join(maskText(phone, { maskChar }));
    }
  }

  if (types.includes('creditCard')) {
    for (const card of new Set(findCreditCardMatches(text).map((match) => match.value))) {
      // Last 4 digits visible matches the standard "card ending in 1234"
      // convention, rather than full masking.
      result = result
        .split(card)
        .join(maskText(card, { visibleStart: 0, visibleEnd: 4, maskChar }));
    }
  }

  if (types.includes('apiKey')) {
    for (const key of new Set(findApiKeyMatches(text).map((match) => match.value))) {
      result = result.split(key).join(maskText(key, { visibleStart: 0, visibleEnd: 0, maskChar }));
    }
  }

  if (types.includes('ip')) {
    for (const ip of new Set(findPublicIpv4Matches(text).map((match) => match.value))) {
      result = result.split(ip).join(maskText(ip, { visibleStart: 0, visibleEnd: 0, maskChar }));
    }
  }

  if (types.includes('jwt')) {
    for (const jwt of new Set(findJwtMatches(text).map((match) => match.value))) {
      result = result.split(jwt).join(maskText(jwt, { visibleStart: 0, visibleEnd: 0, maskChar }));
    }
  }

  return result;
}
