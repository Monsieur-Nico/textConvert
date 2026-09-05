# Normalization

`removeDiacritics`, `normalizeWhitespace`, `normalizeLineEndings`.

---

## Table of Contents

- [removeDiacritics](#removediacritics)
- [normalizeWhitespace](#normalizewhitespace)
- [normalizeLineEndings](#normalizelineendings)

---

## removeDiacritics

Strips accents/diacritics from text, normalizing accented characters to their plain-ASCII equivalents (e.g. `é` → `e`). The same NFD-decompose-and-strip-combining-marks logic `slugify` uses internally, made standalone and reusable — `slugify` now calls this instead of duplicating it.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `string` — The text with diacritics removed.

**Example:**

```js
import { removeDiacritics } from 'textconvert';

removeDiacritics('Café — résumé'); // 'Cafe — resume'
```

**Edge Cases:**

- Returns an error message for empty input.
- Non-Latin scripts pass through unchanged — this only affects characters that decompose into a plain-ASCII base plus a combining mark under Unicode NFD (e.g. Latin accented letters), not scripts without that decomposition (Cyrillic, CJK, etc.).

---

## normalizeWhitespace

Collapses runs of whitespace (spaces, tabs, newlines) into a single space, and trims the result.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `string` — The text with whitespace runs collapsed to single spaces and the ends trimmed.

**Example:**

```js
import { normalizeWhitespace } from 'textconvert';

normalizeWhitespace('  Hello   World  \n\n'); // 'Hello World'
```

**Edge Cases:**

- Returns an error message for empty input.
- Collapses newlines and tabs the same as runs of spaces — this is not paragraph-aware (it doesn't preserve intentional blank lines between paragraphs the way `getTextStats`'s `paragraphCount` detects them).

---

## normalizeLineEndings

Normalizes line endings to LF (`\n`), converting both CRLF (`\r\n`) and lone CR (`\r`) — useful for comparing or hashing text that may have come from different platforms (e.g. Windows-authored input).

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `string` — The text with all line endings converted to `\n`.

**Example:**

```js
import { normalizeLineEndings } from 'textconvert';

normalizeLineEndings('line1\r\nline2\rline3'); // 'line1\nline2\nline3'
```

**Edge Cases:**

- Returns an error message for empty input.
- Text with only LF line endings already is returned unchanged.
