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

Converts a string to camelCase.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `string` — The camelCase string.

**Example:**

```js
import { camelCase } from 'textconvert';

camelCase('hello world'); // 'helloWorld'
```

**Edge Cases:**

- Returns an error message for empty input.

---

## pascalCase

Converts a string to PascalCase.

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

---

## snakeCase

Converts a string to snake_case.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `string` — The snake_case string.

**Example:**

```js
import { snakeCase } from 'textconvert';

snakeCase('hello world'); // 'hello_world'
```

**Edge Cases:**

- Returns an error message for empty input.

---

## kebabCase

Converts a string to kebab-case.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `string` — The kebab-case string.

**Example:**

```js
import { kebabCase } from 'textconvert';

kebabCase('hello world'); // 'hello-world'
```

**Edge Cases:**

- Returns an error message for empty input.

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

**Edge Cases:**

- Returns an error message for empty input.
- Numbers are preserved (not treated as separators).

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
