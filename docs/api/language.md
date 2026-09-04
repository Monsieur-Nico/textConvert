# Language

`detectLanguage`.

---

## detectLanguage

Detects the most likely language of a given text, using a mix of exact-phrase matching, character-frequency scoring, and stopword matching.

**Parameters:**

- `text: string` — The input string.
- `minLength?: number` — Threshold below which text is considered "short" for confidence purposes (default: 4). See Edge Cases — this does **not** gate detection the way it might sound.
- `options?: { maxCharsToAnalyze?: number; useCache?: boolean }` — `maxCharsToAnalyze` (default 500) caps how much of the text is scanned; `useCache` (default `true`) caches results by the exact input string.

**Returns:**

`LanguageDetectionResult`:

| Field        | Type                       | Meaning                                             |
| ------------ | -------------------------- | --------------------------------------------------- |
| `language`   | `Language`                 | The detected language, or `Language.Unknown`.       |
| `confidence` | `number`                   | A score from 0 to 1 (bucketed — see Edge Cases).    |
| `scores`     | `Record<Language, number>` | Raw per-language scores the winner was chosen from. |

**Example:**

```js
import { detectLanguage } from 'textconvert';

detectLanguage('Bonjour le monde'); // { language: 'french', confidence: 0.95, scores: {...} }
```

**Supported languages:** English, French, Spanish, German, Italian, Portuguese, Dutch — that's the entire list. Text in any other language (Japanese, Arabic, Russian, Chinese, ...) can never be correctly identified; it either falls back to `Language.Unknown` or, in unlucky cases, gets misattributed to whichever supported language's character/stopword profile happens to overlap most.

**Edge Cases:**

- Returns `Language.Unknown` with confidence 0 for empty or whitespace-only input.
- `minLength` does **not** cause short text to be rejected as `Unknown` — text shorter than `minLength` is still analyzed normally, it just has its final confidence multiplied by 0.8. The only things that force an `Unknown` result are: empty input, fewer than ~2 recognized alphabetic characters found in the analyzed text (numbers/symbols-only input), or — for text longer than 2 words — no stopword or language-keyword match from any supported language at all (treated as "not one of the languages we know," including genuinely gibberish input).
- A small set of common short greetings/phrases (`'hello'`, `'bonjour'`, `'hola'`, `'ciao'`, `'hallo'`, `'olá'`, and a few others, matched case-insensitively as exact full-string matches) short-circuits straight to a 0.95-confidence result without running the character-frequency scoring at all — this is why very short greeting-only input can still resolve confidently despite being well under `minLength`.
- Detection only looks at the first `maxCharsToAnalyze` characters (default 500) of the text — content past that point has no effect on the result, regardless of text length.
- Results are cached by the **exact original string** (not normalized) in an in-memory cache capped at 100 entries (oldest evicted first) — a call with `useCache: false` always re-runs detection and doesn't read or write the cache; a call with `useCache: true` (the default) short-circuits on a second call with the identical string, even across unrelated calls in the same process.
- `confidence` isn't a smooth 0-1 score — it's bucketed into a small number of fixed values (e.g. 0.95, 0.85, 0.7) based on which threshold the raw score clears, so don't rely on small differences between two confidence values meaning much.
