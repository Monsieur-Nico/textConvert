# Security

`redact`, `maskText`, `escapeHtml`, `unescapeHtml`, `sanitize`.

---

## Table of Contents

- [redact](#redact)
- [maskText](#masktext)
- [escapeHtml](#escapehtml)
- [unescapeHtml](#unescapehtml)
- [sanitize](#sanitize)

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

---

## escapeHtml

Escapes the five HTML special characters (`& < > " '`) in a string, per [OWASP's XSS Prevention Cheat Sheet Rule #1](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) for HTML element content — useful for safely rendering user-supplied text without pulling in a dedicated escaping library.

This covers HTML element content only, not other injection contexts (HTML attributes, `<script>` bodies, CSS, URLs) — those need different, context-specific encoding that this function doesn't provide.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `string` — The escaped string, or an error message for invalid input.

**Example:**

```js
import { escapeHtml } from 'textconvert';

escapeHtml('<script>alert("hi")</script>');
// '&lt;script&gt;alert(&quot;hi&quot;)&lt;/script&gt;'
```

**Edge Cases:**

- Returns an error message for empty input.
- The five escaped characters are `&` → `&amp;`, `<` → `&lt;`, `>` → `&gt;`, `"` → `&quot;`, `'` → `&#x27;` — the hex numeric form for apostrophe, matching OWASP's own convention (some other escaping libraries, e.g. lodash, use the decimal `&#39;` instead — both decode identically in every HTML parser, this just documents which one `escapeHtml` itself produces).
- Backtick is deliberately **not** escaped — it's not part of OWASP's Rule #1 for HTML element content, despite sometimes being confused for one (it shows up in separate, unrelated advice about never using backtick as an HTML attribute delimiter).
- Implemented as a single pass over the string with one combined regex, not chained sequential replacements — chaining would corrupt its own output (escaping `<` before `&` would turn the resulting `&lt;` into `&amp;lt;` on a second pass).

---

## unescapeHtml

Reverses exactly the five escapes `escapeHtml` produces.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `string` — The unescaped string, or an error message for invalid input.

**Example:**

```js
import { unescapeHtml } from 'textconvert';

unescapeHtml('Tom &amp; Jerry');
// 'Tom & Jerry'
```

**Edge Cases:**

- Returns an error message for empty input.
- **Not a general-purpose HTML entity decoder.** Only the five entities `escapeHtml` produces are reversed — `&nbsp;`, `&copy;`, numeric character references like `&#65;`, and every other named or numeric entity are left untouched, by design.
- Accepts both `&#x27;` (hex, what `escapeHtml` produces) and `&#39;` (decimal) as valid apostrophe input, plus the named `&apos;` form — even though `escapeHtml` only ever outputs `&#x27;`, so round-tripping output from other tools that use a different convention still works.

---

## sanitize

Runs text through a configurable pipeline of `trim`, `normalizeWhitespace`, `redact`, and `escapeHtml` — composition, not new detection logic, for the common "clean this user input/log line before it's stored or displayed" case.

**Parameters:**

- `text: string` — The input string.
- `options.trim?: boolean` — Trim leading/trailing whitespace.
- `options.normalizeWhitespace?: boolean` — Collapse internal whitespace runs to a single space (also trims — see [normalization.md](normalization.md#normalizewhitespace)).
- `options.redactPII?: boolean | RedactOptions` — Redact PII/secrets via `redact`. `true` uses `redact`'s own defaults; pass an options object (`{ types, maskChar }`, the same shape `redact` itself takes) for finer control.
- `options.escapeHtml?: boolean` — Escape the five HTML special characters via `escapeHtml`.

**Returns:**

- `string` — The sanitized text.

**Example:**

```js
import { sanitize } from 'textconvert';

sanitize('  Contact jordan@example.com <b>now</b>  ', {
  trim: true,
  redactPII: true,
  escapeHtml: true,
});
// 'Contact jo**************** &lt;b&gt;now&lt;/b&gt;'

sanitize('Card 4111 1111 1111 1111 and jordan@example.com', {
  redactPII: { types: ['creditCard'] },
});
// 'Card ***************1111 and jordan@example.com'
```

**Edge Cases:**

- Returns an error message for empty input.
- Steps run in a **fixed order** — `trim` → `normalizeWhitespace` → `redactPII` → `escapeHtml` — regardless of the order options are given in. Redaction runs on the raw, unescaped text (so pattern matching isn't affected by HTML-escaped characters), and escaping always runs last, so the final output is safe to render no matter which other steps ran.
- If `trim` (or `normalizeWhitespace`, which also trims) reduces whitespace-only input to an empty string, `sanitize` returns `''` directly rather than passing that empty string on to `redact`/`escapeHtml` — both of which would otherwise report it as invalid input via their own shared sentinel message, which would be a confusing thing to see back from a call that started with valid (if all-whitespace) text.
- Every option defaults to off — `sanitize(text)` with no options returns `text` completely unchanged (aside from the shared invalid-input check on `text` itself).
