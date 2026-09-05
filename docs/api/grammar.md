# Grammar

`pluralize`.

---

## pluralize

Returns the plural form of an English word. Useful for UI copy like `` `${count} ${pluralize('item', count)}` ``.

This is a documented, honest subset of English pluralization, not a complete linguistic solution — regular suffix rules (`-s`, `-es`, `-ies`) plus a maintained list of the most common irregulars and uncountable nouns.

**Parameters:**

- `word: string` — The singular word to pluralize.
- `count?: number` — If provided, returns `word` unchanged when `count === 1`; any other value (including `0`, negative, or omitted) returns the plural form, matching standard English usage ("0 items", "1 item").

**Returns:**

- `string` — The pluralized (or singular, if `count === 1`) form of `word`, or an error message for invalid input.

**Example:**

```js
import { pluralize } from 'textconvert';

pluralize('cat'); // 'cats'
pluralize('cat', 1); // 'cat'
pluralize('cat', 5); // 'cats'
pluralize('child'); // 'children'
pluralize('box'); // 'boxes'
```

**Edge Cases:**

- Returns `'Please provide a valid input text'` for empty input, matching the sentinel-return convention every other string-returning function in this library follows.
- Uncountable nouns (`sheep`, `fish`, `species`, etc.) are returned unchanged regardless of `count`.
- Does not cover every irregular — notably, Greek-derived `-ch` words pronounced /k/ (`stomach` → `stomachs`, not `stomaches`) and consonant-doubling irregulars (`quiz` → `quizzes`, not `quizes`) fall through to the regular suffix rules and produce an incorrect result. Only the maintained irregulars list in `src/text/pluralize.ts` is handled correctly.
- Preserves the input's leading capitalization (`Child` → `Children`), but does not attempt to preserve casing beyond the first letter (e.g. all-caps input isn't specially handled).
