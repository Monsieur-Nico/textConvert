# Case Conversion

`camelCase`, `pascalCase`, `snakeCase`, `kebabCase`, `slugify`, `capitalize`, `titleCase`.

---

## Table of Contents

- [camelCase](#camelcase)
- [pascalCase](#pascalcase)
- [snakeCase](#snakecase)
- [kebabCase](#kebabcase)
- [slugify](#slugify)
- [capitalize](#capitalize)
- [titleCase](#titlecase)

---

## camelCase

Converts a string to camelCase. Words are split on any run of non-letter characters (spaces, punctuation, digits), so `camelCase` and `pascalCase` treat digits as word boundaries rather than part of a word — see `snakeCase`/`kebabCase` below for the (different) splitting rule those two use.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `string` — The camelCase string.

**Example:**

```js
import { camelCase } from 'textconvert';

camelCase('hello world'); // 'helloWorld'
camelCase('hello2world'); // 'helloWorld' (digits split words, they aren't kept)
```

**Edge Cases:**

- Returns an error message for empty input.
- Consecutive delimiters (`'hello--world'`) and leading/trailing delimiters don't produce empty or malformed words — empty segments from the split are filtered out before casing is applied.
- A non-letter inside a word — including an apostrophe — starts a new word on the other side of it: `camelCase("it's a test")` → `'itSATest'`, not `'itSTest'` or similar. This isn't a case where apostrophes are special-cased; they're simply not letters, same as any other separator.

---

## pascalCase

Converts a string to PascalCase. Same word-splitting rule as `camelCase` (see above), but every word — including the first — is capitalized, and there's no lowercase first word to prepend.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `string` — The PascalCase string.

**Example:**

```js
import { pascalCase } from 'textconvert';

pascalCase('hello world'); // 'HelloWorld'
```

**Edge Cases:**

- Returns an error message for empty input.
- Consecutive/leading/trailing delimiters are handled the same way as `camelCase` — no empty words leak into the output.
- Apostrophes and other non-letters split words the same way `camelCase` does: `pascalCase("it's a test")` → `'ItSATest'`.

---

## snakeCase

Converts a string to snake_case. Uses a different word-splitting strategy than `camelCase`/`pascalCase`: if the input contains any non-letter character, it splits on runs of non-letters (same rule as above); if the input is purely letters (e.g. already `camelCase` or `PascalCase`), it instead splits before each uppercase letter, so word boundaries can be recovered from casing alone.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `string` — The snake_case string.

**Example:**

```js
import { snakeCase } from 'textconvert';

snakeCase('hello world'); // 'hello_world'
snakeCase('helloWorld'); // 'hello_world' (splits on casing, no separators present)
```

**Edge Cases:**

- Returns an error message for empty input.
- Consecutive/leading/trailing delimiters don't produce empty segments in the output (`'hello .World'` → `'hello_world'`).
- Shares its delimiter-joining logic with `kebabCase` — the two differ only in the joining character (`_` vs `-`), so anything true of one's word-splitting behavior is true of the other.

---

## kebabCase

Converts a string to kebab-case. Same word-splitting rule as `snakeCase` (see above) — the two functions are identical apart from the joining character.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `string` — The kebab-case string.

**Example:**

```js
import { kebabCase } from 'textconvert';

kebabCase('hello world'); // 'hello-world'
kebabCase('HelloWorld'); // 'hello-world'
```

**Edge Cases:**

- Returns an error message for empty input.
- Same consecutive/leading/trailing-delimiter and casing-split behavior as `snakeCase`.

---

## slugify

Converts a string into a URL-safe slug: lowercase, punctuation stripped, separators collapsed to a single `-`, and accented characters normalized to their plain-ASCII equivalents.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `string` — The slugified string.

**Example:**

```js
import { slugify } from 'textconvert';

slugify('Hello, World! 100% Awesome'); // 'hello-world-100-awesome'
slugify('Café Résumé Review'); // 'cafe-resume-review'
```

Generating a URL for a blog post title:

```js
function buildPostUrl(title) {
  return `/blog/${slugify(title)}`;
}

buildPostUrl('10 Tips for Better Résumés!'); // '/blog/10-tips-for-better-resumes'
```

**How accent-stripping works:** `slugify` Unicode-normalizes to NFD form (decomposing an accented character like `é` into a plain `e` plus a separate combining accent mark), then strips the combining marks — leaving the plain-ASCII base letter. This only works for scripts that have an ASCII decomposition.

**Edge Cases:**

- Returns an error message for empty input.
- Numbers are preserved (not treated as separators).
- Non-Latin scripts (Chinese, Japanese, Korean, Arabic, Cyrillic, ...) have no ASCII decomposition, so they're treated as separator characters and stripped entirely — not transliterated, not preserved. `slugify('你好世界')` returns `''` (empty string), and `slugify('Café 你好 World')` returns `'cafe-world'`, silently dropping the CJK portion. If you need slugs for non-Latin content, `slugify` isn't the right tool as-is.

---

## capitalize

Capitalizes only the first letter of a string, leaving the rest unchanged.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `string` — The string with its first letter capitalized.

**Example:**

```js
import { capitalize } from 'textconvert';

capitalize('hello world'); // 'Hello world'
capitalize('HELLO WORLD'); // 'HELLO WORLD'
```

**Edge Cases:**

- Returns an error message for empty input.
- Only the first character is touched — the rest of the string, including existing casing, is left as-is.

---

## titleCase

Capitalizes the first letter of every word, keeping spaces and separators intact — distinct from `pascalCase`, which removes them.

Uses simple every-word capitalization rather than the "small words stay lowercase" (a, an, the, of, ...) style-guide convention — simpler, more predictable, and easier to test, at the cost of not being "typographically correct" by those style guides' rules.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `string` — The string with the first letter of every word capitalized.

**Example:**

```js
import { titleCase } from 'textconvert';

titleCase('the lord of the rings'); // 'The Lord Of The Rings'
titleCase('hello-world_example'); // 'Hello-World_Example'
```

**Edge Cases:**

- Returns an error message for empty input.
- Digits and separators (spaces, dashes, underscores, etc.) are left untouched — only letter runs are capitalized.
- A word is any maximal run of letters, so a character like an apostrophe inside a word (`it's`) starts a new "word" on the other side of it (`It'S`), since apostrophes aren't letters.
