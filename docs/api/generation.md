# Generation

`randomString`.

---

## randomString

Generates a random string of a given length, drawn from a cryptographically secure source (`globalThis.crypto.getRandomValues`, the standard Web Crypto API available in both Node and browsers — nothing here falls back to `Math.random`). Suitable for one-off IDs, tokens, or test fixtures.

**Parameters:**

- `length: number` — Number of characters to generate.
- `options?: { charset?: 'alpha' | 'numeric' | 'alphanumeric' | string }` — `'alpha'` (letters only), `'numeric'` (digits only), `'alphanumeric'` (the default), or any other string, used literally as the pool of characters to draw from (e.g. `'ABC123'`).

**Returns:**

- `string` — A random string of the requested length, or `''` if `length` or the resolved charset is empty.

**Example:**

```js
import { randomString } from 'textconvert';

randomString(8); // e.g. 'aZ3kD9pQ' (alphanumeric by default)
randomString(6, { charset: 'numeric' }); // e.g. '482913'
randomString(4, { charset: 'ABC123' }); // custom charset, e.g. 'A1C3'
```

**Edge Cases:**

- Returns `''` (not the shared `'Please provide a valid input text'` error string) for a non-positive or non-integer `length`, and for an empty resolved charset — an empty string is itself a valid, unsurprising answer to "generate zero characters" or "pick from zero options."
- A repeated character in a custom charset (e.g. `'AAB'`) is picked from as-is, not deduplicated — this is the caller's own way of weighting that character more heavily, not a bug.
- Uses rejection sampling internally rather than a plain `randomUint32 % charset.length`, so every character in the charset has exactly equal probability regardless of the charset's length — a plain modulo would introduce a slight, easy-to-miss bias toward the low end of the charset for almost any length.
