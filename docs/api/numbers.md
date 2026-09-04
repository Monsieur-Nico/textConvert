# Numbers

`numbersToWords`.

---

## numbersToWords

Converts a whole number (below 100 million) to English words.

**Parameters:**

- `number: number` — The number to convert.

**Returns:**

- `string` — The number in words.

**Example:**

```js
import { numbersToWords } from 'textconvert';

numbersToWords(12345); // 'twelve thousand three hundred and forty-five'
numbersToWords(0); // 'zero'
```

**Edge Cases:**

- **Throws** a `TypeError`/`Error` for numbers `>= 100,000,000`, rather than returning an error message string — unlike every other function in this library, which returns `'Please provide a valid input text'` (or similar) for invalid input. Wrap calls in `try`/`catch` if the input isn't already validated as under 100 million.
- **Negative numbers and non-integers are not validated and produce `undefined`, not a sensible result or an error.** `numbersToWords(-5)` and `numbersToWords(12.5)` both return `undefined` — the internal recursion assumes a non-negative integer and simply indexes an array of word-strings with the raw number, which silently fails out-of-bounds instead of throwing. Only pass non-negative integers under 100 million; validate on your side if the input isn't already guaranteed to be one.
- English only — there's no locale/language parameter.
