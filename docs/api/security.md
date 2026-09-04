# Security

`redact`, `maskText`.

---

## Table of Contents

- [redact](#redact)
- [maskText](#masktext)

---

## redact

Scans free-form text for embedded PII (emails, phone numbers, credit card numbers) and secrets (API keys/tokens) and masks each match in place, using `extractEmails` to locate emails and `maskText` to mask every match — for sanitizing logs, support tickets, or user-generated content before storage or display.

`redact` is best-effort pattern matching, not a complete PII/secret detector. False negatives are possible — pair it with review for anything where a missed match matters, rather than relying on it as the only safeguard.

**Parameters:**

- `text: string` — The text to redact.
- `options.types?: Array<'email' | 'phone' | 'creditCard' | 'apiKey'>` — Which types to redact. Default is `'email'`, `'phone'`, and `'creditCard'`. `'apiKey'` is opt-in only — see Edge Cases.
- `options.maskChar?: string` — Character(s) to use for masked positions, passed through to `maskText`. Default is `'*'`.

**Returns:**

- `string` — The text with each detected match masked in place.

**Example:**

```js
import { redact } from 'textconvert';

redact('Contact me at jordan@example.com or 555-123-4567');
// 'Contact me at jo**************** or 55**********'
redact('Email: jordan@example.com', { types: ['email'] });
// 'Email: jo****************'
redact('Card: 4111 1111 1111 1111', { types: ['creditCard'] });
// 'Card: ***************1111'
redact('Key: AKIAIOSFODNN7EXAMPLE leaked', { types: ['apiKey'] });
// 'Key: ******************** leaked'
```

**Edge Cases:**

- Returns an error message for empty input.
- Returns the text unchanged when no PII of the requested type(s) is found, or when `types` is an empty array.
- Phone detection reuses `isPhoneNumber`'s scope (see [validation.md](validation.md)), so the same limits apply — e.g. a bare 7-digit local number without an area code is not detected, matching `isPhoneNumber('5550173') // false`.
- Credit card numbers are validated with a Luhn checksum, so an arbitrary 13-19 digit sequence (an order ID, an invoice number) that fails the checksum is not matched. The last 4 digits stay visible in the mask, matching the standard "card ending in 1234" convention.
- API key/token detection is prefix-based only (AWS `AKIA...`, GitHub `ghp_...`/`github_pat_...`/`sk_live_...`) — deliberately not entropy-based ("looks like a random string"), which produces heavy false positives on hashes, UUIDs, and ordinary identifiers. Because even prefix-based detection carries more false-positive risk than email/phone/card, `'apiKey'` must be explicitly requested via `types` — it's never included by default.
- Every occurrence of a repeated match is masked, not just the first.
- Phone number and credit card candidates are both found by scanning for maximal runs of an allowed-character set (digits plus separators like spaces/dashes/dots/parens), which is shared internal logic — the two differ only in which characters are allowed and the minimum/maximum digit count applied afterward.

---

## maskText

Partially masks a string for display purposes (e.g. showing a masked email or card number in a UI without exposing the full value).

If neither `visibleStart` nor `visibleEnd` is given, the first 2 characters are shown by default. Specifying either one turns off that implicit default for the side you didn't specify — e.g. passing only `visibleEnd` hides the start entirely, rather than also showing the first 2 characters.

**Parameters:**

- `text: string` — The input string.
- `options.visibleStart?: number` — Number of characters to leave visible at the start.
- `options.visibleEnd?: number` — Number of characters to leave visible at the end.
- `options.maskChar?: string` — Character(s) to use for masked positions. Default is `'*'`.

**Returns:**

- `string` — The masked string, or the original string unchanged if the requested visible portions cover the whole string.

**Example:**

```js
import { maskText, isEmail } from 'textconvert';

maskText('jordan@example.com'); // 'jo****************'
maskText('4111111111111234', { visibleEnd: 4 }); // '************1234'
maskText('secret-token-value', { visibleStart: 0, visibleEnd: 0, maskChar: '#' }); // '##################'

// Only mask values that are actually valid, leave everything else untouched
function maskEmail(email) {
  return isEmail(email) ? maskText(email) : email;
}
```

**Edge Cases:**

- Returns an error message for empty input.
- If the requested visible portions (start + end) cover the whole string, returns the string unchanged rather than over-masking.
- `visibleStart`/`visibleEnd` are clamped to the string's length, and clamped further so the two visible portions never overlap.
- `maskChar` isn't restricted to a single character — passing a multi-character string (e.g. `'#*'`) repeats the whole string per masked position, so the masked region's length can differ from the number of masked characters. Pass a single character if you need a 1:1 length match.
