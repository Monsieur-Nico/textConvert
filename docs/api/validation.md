# Validation

`isEmail`, `isUrl`, `isPhoneNumber`.

---

## Table of Contents

- [isEmail](#isemail)
- [isUrl](#isurl)
- [isPhoneNumber](#isphonenumber)

---

## isEmail

Validates if a string is a valid email address (RFC 5322).

**Parameters:**

- `text: string` — The string to validate.

**Returns:**

- `boolean` — `true` if valid, `false` otherwise.

**Example:**

```js
import { isEmail } from 'textconvert';

isEmail('user@example.com'); // true
isEmail('user.name+tag@example.com'); // true
isEmail('not-an-email'); // false
```

**Edge Cases:**

- Returns `false` for empty, non-string, or malformed input.
- Rejects non-ASCII characters entirely — there's no internationalized-domain or Unicode local-part support (`isEmail('josé@example.com')` is `false`, even though that's a real deliverable address on most modern mail systems).
- Rejects **any** occurrence of two consecutive dots (`..`) anywhere in the string, not just the local part — `user..name@example.com` and `user@sub..example.com` both fail.
- Local part is capped at 64 characters, domain at 255 — matching the practical limits most mail systems enforce, not a hard RFC 5322 rule.
- Domain can't start or end with a hyphen or a dot.
- The TLD (final domain segment) must be at least 2 letters — `user@example.c` is rejected.
- Related: `extractEmails` (in [extraction.md](extraction.md)) finds every `isEmail`-valid address embedded in a larger block of text, rather than validating one string in isolation.

---

## isUrl

Validates if a string is a valid URL.

**Parameters:**

- `text: string` — The string to validate.

**Returns:**

- `boolean` — `true` if valid, `false` otherwise.

**Example:**

```js
import { isUrl } from 'textconvert';

isUrl('https://example.com/path?query=123'); // true
isUrl('https://192.168.1.1'); // true (IPv4 host, no TLD needed)
isUrl('ftp://fileserver'); // false
isUrl('not a url'); // false
```

**Edge Cases:**

- Returns `false` for empty input, non-string inputs or wrong protocol/format.
- Only `http://` and `https://` are accepted — `ftp://`, `mailto:`, `//example.com` (protocol-relative), and bare domains without a scheme (`example.com`) are all rejected.
- Rejects unencoded spaces and any non-ASCII character in the string.
- Hostname must contain at least one dot and a final segment (TLD) of 2+ characters — `https://localhost` and `https://example` both fail — **except** for IPv4 addresses, which are checked with their own rule (each of the four octets must be 0-255) and don't need a TLD at all: `https://192.168.1.1` passes, `https://999.1.1.1` doesn't.
- Validation is layered: a few cheap regex pre-checks reject obviously-malformed input, then the string is parsed with the native `URL` constructor and the parsed `hostname` is what actually gets checked. `isUrl` only returns a boolean — it doesn't give you the parsed/normalized URL back, so if you need that, parse it yourself with `new URL(text)` after confirming validity.

---

## isPhoneNumber

Validates if a string is structurally a valid phone number. This is syntactic validation only — it does not verify that a country calling code is real, that the digit count matches a specific country's numbering plan, or that the number is actually assigned or reachable.

- With a leading `+` (an explicit country code, e.g. E.164): the remaining digits must be between 7 and 15.
- Without a leading `+` (a bare local number): the digits must be between 10 and 15, since there's no declared country code to trust.
- Separators (spaces, dashes, dots, parentheses) are allowed and stripped before counting digits.

**Parameters:**

- `text: string` — The string to validate.

**Returns:**

- `boolean` — `true` if valid, `false` otherwise.

**Example:**

```js
import { isPhoneNumber } from 'textconvert';

isPhoneNumber('+1-202-555-0173'); // true (international, explicit country code)
isPhoneNumber('(202) 555 0173'); // true (local, includes area code)
isPhoneNumber('5550173'); // false (too short, no area code)
```

**Edge Cases:**

- Returns `false` for empty, non-string, or malformed input.
- Returns `false` for numbers below the international (7-digit) or local (10-digit) floor, or above E.164's 15-digit max.
- Does not verify the country calling code or the number's real-world validity.
- Only digits, spaces, dashes, dots, parentheses, and a single leading `+` are accepted as characters at all — any letter (`1-800-FLOWERS`) or other symbol fails immediately, before the digit-count check even runs.
- Related: `redact`'s `'phone'` type (in [security.md](security.md)) reuses this exact validation to decide what counts as a phone number when scanning free-form text, so the same 7/10-digit floors apply there too.
