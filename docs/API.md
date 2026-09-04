# textConvert API Reference

This document provides detailed documentation for all public functions exported by the textConvert library.

---

## Table of Contents

- [clear](#clear)
- [count](#count)
- [countWords](#countwords)
- [countSentences](#countsentences)
- [reverse](#reverse)
- [spread](#spread)
- [truncate](#truncate)
- [maskText](#masktext)
- [camelCase](#camelcase)
- [pascalCase](#pascalcase)
- [snakeCase](#snakecase)
- [kebabCase](#kebabcase)
- [slugify](#slugify)
- [getTextStats](#gettextstats)
- [detectLanguage](#detectlanguage)
- [numbersToWords](#numberstowords)
- [isEmail](#isemail)
- [isUrl](#isurl)
- [isPhoneNumber](#isphonenumber)
- [extractEmails](#extractemails)
- [extractUrls](#extracturls)

---

## clear

Removes punctuation from a string and returns a cleaned string.

**Parameters:**

- `text: string` — The input string to clean.

**Returns:**

- `string` — The cleaned string.

**Example:**

```js
clear('Hello, world!'); // 'hello world'
```

**Edge Cases:**

- Returns an error message if input is empty.

---

## count

Counts the number of letters in a string (optionally including numbers).

**Parameters:**

- `text: string` — The input string.
- `countNumbers?: boolean` — Whether to include numbers (default: false).

**Returns:**

- `number` — The count of letters (and numbers, if specified).

**Example:**

```js
count('Hello, world!'); // 10
count('Hello0 world', true); // 11
```

**Edge Cases:**

- Returns 0 for empty input.

---

## countWords

Counts the number of words in a string.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `number` — The number of words.

**Example:**

```js
countWords('Hello, world!'); // 2
```

**Edge Cases:**

- Returns 0 for empty or punctuation-only input.

---

## countSentences

Counts the number of sentences in a string.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `number` — The number of sentences.

**Example:**

```js
countSentences('Hello world! How are you?'); // 2
```

**Edge Cases:**

- Returns 0 for empty input.
- Returns 1 if there is text but no sentence-ending punctuation.

---

## reverse

Reverses all characters in a string.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `string` — The reversed string.

**Example:**

```js
reverse('Hello, world!'); // '!dlrow ,olleH'
```

**Edge Cases:**

- Returns an error message for empty input.

---

## spread

Returns an array of characters from the provided string (optionally removing punctuation).

**Parameters:**

- `text: string` — The input string.
- `clear?: boolean` — Whether to remove punctuation (default: false).

**Returns:**

- `string[] | string` — Array of characters or error message.

**Example:**

```js
spread('Hello, world!'); // ['H', 'e', ...]
spread('Hello, world!', true); // ['H', 'e', ...]
```

**Edge Cases:**

- Returns an error message for invalid input type or empty string.

---

## truncate

Shortens text to a maximum length, appending an ellipsis when truncation happens. `maxLength` includes the ellipsis itself.

**Parameters:**

- `text: string` — The input string.
- `maxLength: number` — Maximum length of the returned string, including the ellipsis.
- `options?: { ellipsis?: string; byWords?: boolean }` — `ellipsis` overrides the default `'...'`; `byWords` (default `false`) snaps the cut to the last full word instead of cutting mid-word.

**Returns:**

- `string` — The truncated string, or the original string unchanged if it's already within `maxLength`.

**Example:**

```js
truncate('The quick brown fox jumps over the lazy dog', 20); // 'The quick brown f...'
truncate('The quick brown fox jumps over the lazy dog', 20, { byWords: true }); // 'The quick brown...'
truncate('Short text', 20); // 'Short text'
```

**Edge Cases:**

- Returns an error message for empty input.
- If `maxLength` is smaller than or equal to the ellipsis length, returns as much of the ellipsis as fits.
- With `byWords`, falls back to a hard cut if there's no word boundary before the cut point.

---

## camelCase

Converts a string to camelCase.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `string` — The camelCase string.

**Example:**

```js
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
slugify('Hello, World! 100% Awesome'); // 'hello-world-100-awesome'
slugify('Café Résumé Review'); // 'cafe-resume-review'
```

**Edge Cases:**

- Returns an error message for empty input.
- Numbers are preserved (not treated as separators).

---

## getTextStats

Analyzes text and returns comprehensive statistics.

**Parameters:**

- `text: string` — The input string.
- `wordsPerMinute?: number` — Reading speed (default: 200).

**Returns:**

- `TextStatistics` — Object with character, word, sentence counts, averages, and reading time.

**Example:**

```js
getTextStats('Hello world! This is a test.');
// {
//   characterCount: 28,
//   wordCount: 6,
//   sentenceCount: 2,
//   ...
// }
```

**Edge Cases:**

- Returns all counts as 0 for empty input.

---

## detectLanguage

Detects the most likely language of a given text.

**Parameters:**

- `text: string` — The input string.
- `minLength?: number` — Minimum text length for reliable detection (default: 4).
- `options?: { maxCharsToAnalyze?: number; useCache?: boolean }` — Additional options.

**Returns:**

- `LanguageDetectionResult` — Object with language, confidence, and scores.

**Example:**

```js
detectLanguage('Bonjour le monde'); // { language: 'French', ... }
```

**Edge Cases:**

- Returns 'Unknown' for empty or too-short input.

---

## numbersToWords

Converts a number (< 100 million) to English words.

**Parameters:**

- `number: number` — The number to convert.

**Returns:**

- `string` — The number in words.

**Example:**

```js
numbersToWords(12345); // 'twelve thousand three hundred and forty-five'
```

**Edge Cases:**

- Throws error for numbers >= 100 million.

---

## isEmail

Validates if a string is a valid email address (RFC 5322).

**Parameters:**

- `text: string` — The string to validate.

**Returns:**

- `boolean` — `true` if valid, `false` otherwise.

**Example:**

```js
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
isPhoneNumber('+1-202-555-0173'); // true
isPhoneNumber('(202) 555 0173'); // true
isPhoneNumber('5550173'); // false
```

**Edge Cases:**

- Returns `false` for empty, non-string, or malformed input.
- Returns `false` for numbers below the international (7-digit) or local (10-digit) floor, or above E.164's 15-digit max.
- Does not verify the country calling code or the number's real-world validity.

---

## extractEmails

Extracts all email addresses found in a block of text, rather than validating a single string like `isEmail` does. Each candidate is validated with `isEmail` before being included, so results are exactly the substrings that would pass `isEmail`.

**Parameters:**

- `text: string` — The text to search for email addresses.

**Returns:**

- `string[]` — The email addresses found, in the order they appear.

**Example:**

```js
extractEmails('Contact us at hello@example.com or support@example.org for help.');
// ['hello@example.com', 'support@example.org']
```

**Edge Cases:**

- Returns an empty array for empty input or when no valid email is found.
- Strips trailing sentence punctuation (e.g. a period right after the domain) before validating.

---

## extractUrls

Extracts all URLs found in a block of text, rather than validating a single string like `isUrl` does. Each candidate is validated with `isUrl` before being included, so results are exactly the substrings that would pass `isUrl`.

**Parameters:**

- `text: string` — The text to search for URLs.

**Returns:**

- `string[]` — The URLs found, in the order they appear.

**Example:**

```js
extractUrls('Check out https://example.com and http://another.example.org/path for details.');
// ['https://example.com', 'http://another.example.org/path']
```

**Edge Cases:**

- Returns an empty array for empty input or when no valid URL is found.
- Only `http://`/`https://` are recognized as URL starts (matching `isUrl`'s scope).
- Excludes common wrapping delimiters (quotes, angle brackets, parentheses) from the match, and strips trailing sentence punctuation before validating.

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
maskText('jordan@example.com'); // 'jo****************'
maskText('4111111111111234', { visibleEnd: 4 }); // '************1234'
maskText('secret-token-value', { visibleStart: 0, visibleEnd: 0, maskChar: '#' }); // '##################'
```

**Edge Cases:**

- Returns an error message for empty input.
- If the requested visible portions (start + end) cover the whole string, returns the string unchanged rather than over-masking.
- `visibleStart`/`visibleEnd` are clamped to the string's length, and clamped further so the two visible portions never overlap.
