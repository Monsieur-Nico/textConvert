# Numbers

`numbersToWords`, `ordinal`, `ordinalToWords`, `formatNumber`.

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

---

## ordinal

Gets a non-negative integer's ordinal suffix form.

**Parameters:**

- `number: number` — The number to convert.

**Returns:**

- `string` — The number followed by its ordinal suffix, or an error message for invalid input.

**Example:**

```js
import { ordinal } from 'textconvert';

ordinal(1); // '1st'
ordinal(2); // '2nd'
ordinal(3); // '3rd'
ordinal(4); // '4th'
ordinal(11); // '11th' -- not '11st'
ordinal(21); // '21st'
ordinal(112); // '112th' -- not '112nd'
```

**Edge Cases:**

- English ordinals go by the last **two** digits, not just the last one — `11`, `12`, and `13` are always `'th'`, even though their last digit alone (`1`, `2`, `3`) would otherwise map to `'st'`/`'nd'`/`'rd'`. This repeats every hundred (`111`, `112`, `113` are `'th'` too, but `121` is back to `'st'`).
- Returns `'Please provide a valid input text'` — rather than throwing — for negative numbers, non-integers, and `NaN`.
- English only — there's no locale/language parameter.

---

## ordinalToWords

Gets a non-negative integer's ordinal word form, building on `numbersToWords`.

**Parameters:**

- `number: number` — The number to convert.

**Returns:**

- `string` — The number's ordinal words, or an error message for invalid input.

**Example:**

```js
import { ordinalToWords } from 'textconvert';

ordinalToWords(1); // 'first'
ordinalToWords(3); // 'third'
ordinalToWords(21); // 'twenty-first'
ordinalToWords(100); // 'one hundredth'
```

**Edge Cases:**

- Only the **last word** of `numbersToWords`'s cardinal output changes to its ordinal form — the rest of a compound number stays exactly as `numbersToWords` produced it (`145` -> `'one hundred and forty-fifth'`, not `'one hundred and forty-threeth'` or similar).
- Irregular endings: `one` -> `first`, `two` -> `second`, `three` -> `third`, `five` -> `fifth`, `eight` -> `eighth`, `nine` -> `ninth`, `twelve` -> `twelfth`. Tens ending in `-y` (`twenty`, `thirty`, ...) become `-ieth` (`twentieth`, `thirtieth`). Everything else just appends `-th` (`four` -> `fourth`, `thousand` -> `thousandth`).
- Returns `'Please provide a valid number under 100 million'` — rather than throwing — for numbers `>= 100,000,000`, negative numbers, and non-integers, matching `numbersToWords`'s own convention.
- English only — there's no locale/language parameter.

---

## formatNumber

Formats a number with thousands separators, English/US style (comma thousands separator, period decimal point).

Deliberately **not locale-aware** — no `fr`/`es`/`de`/etc. variants. Native `Intl.NumberFormat` already solves formatted/localized numbers well, and building/maintaining locale data ourselves is a large ongoing maintenance burden this project shouldn't take on — the same reasoning that keeps `numbersToWords` and `detectLanguage` from growing into a full i18n framework.

**Parameters:**

- `number: number` — The number to format.
- `options.decimals?: number` — Number of decimal places to round/pad to. Omit to preserve the input's natural precision.

**Returns:**

- `string` — The formatted number, or an error message for invalid input.

**Example:**

```js
import { formatNumber } from 'textconvert';

formatNumber(1234567); // '1,234,567'
formatNumber(1234567.89); // '1,234,567.89'
formatNumber(1234.5, { decimals: 2 }); // '1,234.50'
formatNumber(-1234.5); // '-1,234.5'
```

**Edge Cases:**

- Omitting `decimals` preserves the input's natural precision — no trailing zeros are added, and nothing is rounded. Specifying `decimals` always pads/rounds to exactly that many places, even if the input had fewer or more (`1234.5` with `{ decimals: 2 }` -> `'1,234.50'`; `1234.567` with `{ decimals: 2 }` -> `'1,234.57'`, rounded).
- Negative numbers get a leading minus sign (`-1,234.5`) — no accounting-style parentheses option.
- Numbers at or beyond `1e21` (or `-1e21`) are expanded to their full digit string rather than JavaScript's own scientific notation (`1e+21`) — a double that large is always a whole number (IEEE 754 can't represent a fractional component at that magnitude), so there's no precision lost by expanding it.
- Very small magnitudes whose natural JS string form uses scientific notation (below roughly `1e-6`, e.g. `0.0000001` -> `'1e-7'`) are **not** expanded — out of scope for v1, unlike the large-number case above.
- Returns `'Please provide a valid input text'` — rather than throwing — for `NaN`, `Infinity`/`-Infinity`, and a negative or non-integer `decimals` option.
- English only — there's no locale/language parameter.
