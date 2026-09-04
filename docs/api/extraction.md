# Extraction

`extractEmails`, `extractUrls`, `extractMentions`, `extractHashtags`.

All four functions find candidate substrings in free-form text with a single linear pass (no regex backtracking risk — see each function's notes below). `extractEmails`/`extractUrls` validate every candidate with `isEmail`/`isUrl` before including it, so results are exactly the substrings that would independently pass validation — see [validation.md](validation.md) for the exact rules those two apply. `extractMentions`/`extractHashtags` don't have a separate validator to check against; their character-class scan already guarantees a correctly-shaped result on its own.

---

## Table of Contents

- [extractEmails](#extractemails)
- [extractUrls](#extracturls)
- [extractMentions](#extractmentions)
- [extractHashtags](#extracthashtags)

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

---

## extractMentions

Extracts all `@mentions` found in a block of text, symbol included.

**Parameters:**

- `text: string` — The text to search for mentions.

**Returns:**

- `string[]` — The mentions found (including the leading `@`), in the order they appear.

**Example:**

```js
import { extractMentions } from 'textconvert';

extractMentions('Thanks @jordan and @alex_dev for the review!');
// ['@jordan', '@alex_dev']
```

**How matching works:** each `@` is checked against the character immediately before it — a match only starts when that character isn't itself a letter/digit/underscore. The body after `@` is a run of letters, digits, and underscores (the common convention across Twitter/X, Instagram, and similar platforms) — no hyphens, no dots.

**Edge Cases:**

- Returns an empty array for empty input or when no mentions are found.
- The not-preceded-by-a-body-character rule means an email address's `@` is never mistaken for a mention: `extractMentions('user@example.com')` returns `[]`, not `['@example']`.
- No separate trailing-punctuation stripping is needed (unlike `extractEmails`/`extractUrls`) — since the body is letters/digits/underscore only, the character scan itself naturally stops before any trailing punctuation, e.g. `extractMentions('Thanks, @jordan!')` → `['@jordan']`.
- Does not de-duplicate — the same mention appearing twice in the input appears twice in the result, in order.

---

## extractHashtags

Extracts all `#hashtags` found in a block of text, symbol included.

**Parameters:**

- `text: string` — The text to search for hashtags.

**Returns:**

- `string[]` — The hashtags found (including the leading `#`), in the order they appear.

**Example:**

```js
import { extractHashtags } from 'textconvert';

extractHashtags('Just shipped v2! #typescript #opensource #buildinpublic');
// ['#typescript', '#opensource', '#buildinpublic']
```

**How matching works:** identical rule to `extractMentions` above (see there for the full explanation), just anchored on `#` instead of `@`.

**Edge Cases:**

- Returns an empty array for empty input or when no hashtags are found.
- The same not-preceded-by-a-body-character rule that keeps `extractMentions` from matching inside an email has a useful side effect here too: it keeps a language name like `C#` from being mistaken for a hashtag — `extractHashtags('Written in C#')` returns `[]`.
- No separate trailing-punctuation stripping needed, same reasoning as `extractMentions`.
- Does not de-duplicate.
