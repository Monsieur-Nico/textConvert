# Text Analysis

`clear`, `count`, `countWords`, `countSentences`, `getTextStats`, `isPalindrome`, `reverse`, `spread`, `truncate`, `wordFrequency`.

---

## Table of Contents

- [clear](#clear)
- [count](#count)
- [countWords](#countwords)
- [countSentences](#countsentences)
- [getTextStats](#gettextstats)
- [isPalindrome](#ispalindrome)
- [reverse](#reverse)
- [spread](#spread)
- [truncate](#truncate)
- [wordFrequency](#wordfrequency)

---

## clear

Removes punctuation from a string and returns a cleaned, lowercased string. `count` uses `clear` internally, so its punctuation-stripping and lowercasing rules apply there too.

**Parameters:**

- `text: string` — The input string to clean.

**Returns:**

- `string` — The cleaned string.

**Example:**

```js
import { clear } from 'textconvert';

clear('Hello, world!'); // 'hello world'
```

**Edge Cases:**

- Returns an error message if input is empty.
- Lowercases the entire string, not just strips punctuation — this isn't optional or configurable.
- Punctuation is replaced with a space, so if the input starts or ends with punctuation, the result can carry a leading or trailing space: `clear('Hi!')` → `'hi '` (trailing space), not `'hi'`. Trim the result yourself if that matters for your use case.

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
import { count } from 'textconvert';

count('Hello, world!'); // 10
count('Hello0 world', true); // 11
```

**Edge Cases:**

- Returns 0 for empty input.
- Runs the string through `clear` first (see above), so punctuation and spaces are already excluded before counting begins — you're counting letters (and optionally digits) only, never symbols or whitespace.

---

## countWords

Counts the number of words in a string. A word is any whitespace-separated token that contains at least one letter or digit — pure punctuation between spaces doesn't count as a word.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `number` — The number of words.

**Example:**

```js
import { countWords } from 'textconvert';

countWords('Hello, world!'); // 2
countWords('!!! ...'); // 0 (no letters or digits anywhere)
```

**Edge Cases:**

- Returns 0 for empty or punctuation-only input.
- Splits on whitespace only, not punctuation — `"it's"` and `"well-known"` each count as a single word, unlike `count`/`clear`, which treat punctuation as a separator.

---

## countSentences

Counts the number of sentences in a string. A sentence is a run of text ending in `.`, `!`, or `?` immediately followed by whitespace or the end of the string; text with no sentence-ending punctuation at all is treated as one sentence.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `number` — The number of sentences.

**Example:**

```js
import { countSentences } from 'textconvert';

countSentences('Hello world! How are you?'); // 2
countSentences('Wait... really?! Yes.'); // 2
```

**Edge Cases:**

- Returns 0 for empty input.
- Returns 1 if there is text but no sentence-ending punctuation.
- A run of consecutive sentence-ending punctuation (`...`, `?!`) is treated as ending exactly one sentence, not one per punctuation mark.
- A `.`/`!`/`?` **not** followed by whitespace or end-of-string (e.g. a decimal like `3.14`, or an abbreviation glued to the next word) doesn't count as a sentence boundary at all.
- Implemented as a manual linear scan rather than a backtracking regex, specifically to avoid ReDoS on adversarial input with long runs of punctuation.

---

## getTextStats

Analyzes text and returns comprehensive statistics.

**Parameters:**

- `text: string` — The input string.
- `wordsPerMinute?: number` — Reading speed used for the reading-time estimate (default: 200).

**Returns:**

`TextStatistics` — an object with:

| Field                    | Type     | Meaning                                                              |
| ------------------------ | -------- | -------------------------------------------------------------------- |
| `characterCount`         | `number` | Total characters, including whitespace and punctuation.              |
| `characterCountNoSpaces` | `number` | Characters excluding whitespace.                                     |
| `letterCount`            | `number` | Alphabetic characters only (same rule as `count`).                   |
| `alphanumericCount`      | `number` | Letters and digits (same rule as `count(text, true)`).               |
| `wordCount`              | `number` | Same rule as `countWords`.                                           |
| `sentenceCount`          | `number` | Same rule as `countSentences`.                                       |
| `paragraphCount`         | `number` | Blocks of text separated by 2 or more consecutive newlines.          |
| `averageWordLength`      | `number` | Mean alphanumeric characters per word, rounded to 1 decimal.         |
| `averageSentenceLength`  | `number` | Mean words per sentence, rounded to 1 decimal.                       |
| `readingTimeSeconds`     | `number` | `wordCount / (wordsPerMinute / 60)`, rounded to the nearest second.  |
| `readingTimeFormatted`   | `string` | Human-readable reading time, e.g. `'2 min 30 sec'` or `'45 sec'`.    |
| `fleschReadingEase`      | `number` | Flesch Reading Ease score — higher is easier to read, roughly 0-100. |
| `fleschKincaidGrade`     | `number` | Flesch-Kincaid Grade Level — approximate U.S. school grade needed.   |

**Example:**

```js
import { getTextStats } from 'textconvert';

getTextStats('Hello world! This is a test.');
// {
//   characterCount: 28,
//   characterCountNoSpaces: 23,
//   letterCount: 21,
//   alphanumericCount: 21,
//   wordCount: 6,
//   sentenceCount: 2,
//   paragraphCount: 1,
//   averageWordLength: 3.5,
//   averageSentenceLength: 3,
//   readingTimeSeconds: 2,
//   readingTimeFormatted: '2 sec',
//   fleschReadingEase: 105.1,
//   fleschKincaidGrade: -0.7
// }
```

**Edge Cases:**

- Returns all numeric fields as 0 and `readingTimeFormatted: '0 sec'` for empty (or whitespace-only) input.
- `paragraphCount` is never less than 1 for non-empty input, even if there isn't a single blank-line-separated break.
- Built from the other analysis functions internally (`count`, `countWords`, `countSentences`) rather than re-implementing their rules, so anything documented as an edge case for those applies here too.
- `fleschReadingEase`/`fleschKincaidGrade` both depend on a syllable-count **heuristic** (vowel-group counting, not a dictionary lookup) — it gets common words right (`table` → 2, `beautiful` → 3) but is known to misestimate real irregulars (e.g. `rhythm`). Treat both scores as estimates, not precise measurements, especially on short or unusual text — the formulas can also produce values outside their "typical" 0-100 / grade-level ranges (e.g. a negative grade level on very short, simple text, as in the example above).

---

## isPalindrome

Checks whether text reads the same forwards and backwards, ignoring case, spaces, and punctuation.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `boolean` — `true` if text is a palindrome under those rules, `false` otherwise.

**Example:**

```js
import { isPalindrome } from 'textconvert';

isPalindrome('A man a plan a canal Panama'); // true
isPalindrome('racecar'); // true
isPalindrome('hello world'); // false
```

**Edge Cases:**

- Returns `false` for empty input, matching the boolean-sentinel convention `isEmail`/`isUrl`/`isPhoneNumber` already use.
- Punctuation/whitespace-only _non-empty_ input (e.g. `'!!!'`) normalizes down to an empty string once case/spaces/punctuation are stripped — treated as `true` (an empty string trivially equals its own reverse), not `false`.
- Digits are preserved (not stripped as punctuation), so numeric palindromes work too: `isPalindrome('12321')` is `true`.
- Composes `clear` (lowercases, strips punctuation) and `reverse` internally, so it shares `reverse`'s astral-Unicode limitation — a palindrome check on text containing emoji or other surrogate-pair characters isn't reliable.

---

## reverse

Reverses all characters in a string.

**Parameters:**

- `text: string` — The input string.

**Returns:**

- `string` — The reversed string.

**Example:**

```js
import { reverse } from 'textconvert';

reverse('Hello, world!'); // '!dlrow ,olleH'
```

**Edge Cases:**

- Returns an error message for empty input.
- **Not safe for astral Unicode characters** (most emoji, some rare CJK characters): reversal operates per UTF-16 code unit, not per grapheme. A character represented as a surrogate pair gets its two halves reversed independently, producing corrupted/invalid output — `reverse('Hi 😀!')` does not return a string containing 😀 reversed correctly, it returns a string with the surrogate pair split apart. Avoid `reverse` on text that may contain emoji or other astral-plane characters.

---

## spread

Returns an array of characters from the provided string (optionally removing punctuation first).

**Parameters:**

- `text: string` — The input string.
- `clear?: boolean` — Whether to remove punctuation via `clear` before spreading (default: false).

**Returns:**

- `string[] | string` — Array of characters, or an error message string for invalid input.

**Example:**

```js
import { spread } from 'textconvert';

spread('Hello, world!'); // ['H', 'e', 'l', 'l', 'o', ',', 'w', 'o', 'r', 'l', 'd', '!'] (no space — see Edge Cases)
spread('hello world'); // ['H', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd'] (see Edge Cases)
```

**Edge Cases:**

- Returns an error message for invalid input type or empty string.
- Two behaviors here aren't controlled by the `clear` parameter and apply unconditionally: the **first character is always uppercased** regardless of the input's original casing (`spread('hello')` starts with `'H'`, not `'h'`), and **all whitespace is always stripped** from the output, whether or not `clear` is `true`. The `clear` parameter only controls punctuation removal beyond that.
- Character splitting uses the spread operator (`[...text]`), which is surrogate-pair-aware — unlike `reverse` (see above), `spread` handles astral Unicode characters (most emoji) as single array entries correctly.

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
import { truncate } from 'textconvert';

truncate('The quick brown fox jumps over the lazy dog', 20); // 'The quick brown f...'
truncate('The quick brown fox jumps over the lazy dog', 20, { byWords: true }); // 'The quick brown...'
truncate('Short text', 20); // 'Short text'
```

**Edge Cases:**

- Returns an error message for empty input.
- If `maxLength` is smaller than or equal to the ellipsis length, returns as much of the ellipsis as fits (not the ellipsis in full, and not any of the original text).
- With `byWords`, falls back to a hard mid-word cut if there's no word boundary before the cut point (e.g. one very long word longer than `maxLength`).

---

## wordFrequency

Counts how many times each word appears in a piece of text. Case-insensitive by default — reuses `clear`'s existing lowercasing/punctuation-stripping split rather than a separate tokenizer, so "The" and "the" count together, and a trailing apostrophe (`don't`) splits into two words the same way `clear`/`count` already treat it.

**Parameters:**

- `text: string` — The input string to count word frequency in.

**Returns:**

- `Record<string, number>` — A map of each distinct word to how many times it appears, in first-appearance order.

**Example:**

```js
import { wordFrequency } from 'textconvert';

wordFrequency('the cat sat on the mat');
// { the: 2, cat: 1, sat: 1, on: 1, mat: 1 }
```

**Edge Cases:**

- Returns an empty object (`{}`) for empty, whitespace-only, or punctuation-only input — not the shared `'Please provide a valid input text'` error string, since an empty frequency map is itself a valid, useful answer here.
- Contractions split on the apostrophe (`don't` → `don` and `t` counted separately), matching `clear`'s existing punctuation-stripping behavior rather than introducing special-case handling.
