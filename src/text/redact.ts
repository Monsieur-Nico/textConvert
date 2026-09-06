import { DetectionType, findMatchesByType, TypedMatch } from './internal/detectors';
import { maskText } from './mask';

// Mask presentation per type -- how much of the match stays visible.
// Email and phone fall through to maskText's own default (first 2 chars
// visible); the rest hide everything, except creditCard which keeps the
// last 4 visible to match the standard "card ending in 1234" convention.
function maskOptionsFor(
  type: DetectionType,
  maskChar: string | undefined,
): { visibleStart?: number; visibleEnd?: number; maskChar?: string } {
  if (type === 'creditCard') return { visibleStart: 0, visibleEnd: 4, maskChar };
  if (type === 'apiKey' || type === 'ip' || type === 'jwt') {
    return { visibleStart: 0, visibleEnd: 0, maskChar };
  }
  return { maskChar };
}

// Drops any match that overlaps one already kept, in the order matches are
// given -- so passing them in detector-priority order (as findMatchesByType
// does) means the higher-priority type wins a same-span overlap (e.g. a
// digit run that's shaped like both a phone number and a credit card),
// while purely position-based overlaps elsewhere just resolve to whichever
// comes first in the text.
function dropOverlapping(matches: TypedMatch[]): TypedMatch[] {
  const sorted = [...matches].sort((a, b) => a.start - b.start);
  const kept: TypedMatch[] = [];
  let lastEnd = -1;

  for (const match of sorted) {
    if (match.start < lastEnd) continue;
    kept.push(match);
    lastEnd = match.end;
  }

  return kept;
}

export interface RedactOptions {
  /** Which types to redact. Default is 'email', 'phone', and 'creditCard'. 'apiKey', 'ip', and 'jwt' are opt-in only, given their higher false-positive risk (or, for 'jwt', simply being a bearer secret rather than classic PII). */
  types?: DetectionType[];
  /** Character(s) to use for masked positions, passed through to maskText. Default is '*'. */
  maskChar?: string;
}

/**
 * Scans free-form text for embedded PII (emails, phone numbers, credit
 * card numbers, public IPv4 addresses) and secrets (API keys/tokens, JWTs)
 * and masks each match in place with {@link maskText} — for sanitizing
 * logs, support tickets, or user-generated content before storage or
 * display.
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

  const matches = dropOverlapping(findMatchesByType(text, types));

  let result = '';
  let cursor = 0;

  for (const match of matches) {
    result += text.slice(cursor, match.start);
    result += maskText(match.value, maskOptionsFor(match.type, maskChar));
    cursor = match.end;
  }

  return result + text.slice(cursor);
}
