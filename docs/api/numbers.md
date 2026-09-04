# Numbers

`numbersToWords`.

---

## numbersToWords

Converts a non-negative integer below 100 million to English words.

**Parameters:**

- `number: number` — The number to convert.

**Returns:**

- `string` — The number in words, or an error message for invalid input.

**Example:**

```js
import { numbersToWords } from 'textconvert';

numbersToWords(12345); // 'twelve thousand three hundred and forty-five'
numbersToWords(0); // 'zero'
numbersToWords(-5); // 'Please provide a valid number under 100 million'
```

**Edge Cases:**

- Returns `'Please provide a valid number under 100 million'` — rather than throwing — for numbers `>= 100,000,000`, negative numbers, and non-integers, matching the sentinel-return convention every other function in this library follows.
- English only — there's no locale/language parameter.
