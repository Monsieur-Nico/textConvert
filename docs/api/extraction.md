# Extraction

`extractEmails`, `extractUrls`.

Both functions find candidate substrings in free-form text with a single linear pass (no regex backtracking risk — see each function's ReDoS note below), then validate every candidate with `isEmail`/`isUrl` before including it, so results are exactly the substrings that would independently pass validation. See [validation.md](validation.md) for the exact rules those two apply.

---

## Table of Contents

- [extractEmails](#extractemails)
- [extractUrls](#extracturls)

---

## extractEmails

Extracts all email addresses found in a block of text, rather than validating a single string like `isEmail` does.

**Parameters:**

- `text: string` — The text to search for email addresses.

**Returns:**

- `string[]` — The email addresses found, in the order they appear.

**Example:**

```js
import { extractEmails } from 'textconvert';

extractEmails('Contact us at hello@example.com or support@example.org for help.');
// ['hello@example.com', 'support@example.org']
```

**How matching works:** candidates are found by scanning for `local-part@domain`-shaped runs character-by-character (checking each character against an allowed set in O(1), rather than scanning the whole string with a `+`-quantified regex) — this avoids ReDoS on adversarial input like a long run of a single allowed symbol (e.g. thousands of repeated `!`). Trailing sentence punctuation (a period right after the domain) is stripped before each candidate is validated.

**Edge Cases:**

- Returns an empty array for empty input or when no valid email is found.
- Strips trailing sentence punctuation (e.g. a period right after the domain) before validating.
- Since every candidate is independently validated with `isEmail`, all of `isEmail`'s rejection rules apply here too — non-ASCII addresses, consecutive dots, and over-length local parts/domains are all silently skipped rather than causing an error.
- Does not de-duplicate — the same address appearing twice in the input appears twice in the result, in order.

---

## extractUrls

Extracts all URLs found in a block of text, rather than validating a single string like `isUrl` does.

**Parameters:**

- `text: string` — The text to search for URLs.

**Returns:**

- `string[]` — The URLs found, in the order they appear.

**Example:**

```js
import { extractUrls } from 'textconvert';

extractUrls('Check out https://example.com and http://another.example.org/path for details.');
// ['https://example.com', 'http://another.example.org/path']
```

**How matching works:** each `http://`/`https://` occurrence is located with `indexOf` (not a regex alternation), then scanned forward one character at a time until a boundary character (whitespace, or a delimiter commonly used to wrap a URL in prose — quotes, angle brackets, parentheses) — again a linear scan with no backtracking risk.

**Edge Cases:**

- Returns an empty array for empty input or when no valid URL is found.
- Only `http://`/`https://` are recognized as URL starts, matching `isUrl`'s scope — a bare `example.com` or an `ftp://` link in the text is never extracted.
- Excludes common wrapping delimiters (quotes, angle brackets, parentheses) from the match, and strips trailing sentence punctuation before validating — `"See https://example.com."` extracts `https://example.com`, not `https://example.com.`.
- Since every candidate is independently validated with `isUrl`, the same IPv4-hostname exception documented there applies here too.
