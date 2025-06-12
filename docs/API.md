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
- [camelCase](#camelcase)
- [pascalCase](#pascalcase)
- [snakeCase](#snakecase)
- [kebabCase](#kebabcase)
- [getTextStats](#gettextstats)
- [detectLanguage](#detectlanguage)
- [numbersToWords](#numberstowords)
- [isEmail](#isemail)

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
