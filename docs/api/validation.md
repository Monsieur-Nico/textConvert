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
isEmail('not-an-email'); // false
```

**Edge Cases:**

- Returns `false` for empty, non-string, or malformed input.

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
isUrl('ftp://fileserver'); // false
isUrl('not a url'); // false
```

**Edge Cases:**

- Returns `false` for empty input, non-string inputs or wrong protocol/format.

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
