/**
 * Finds maximal runs of characters from `allowedChars` in `text`, trimming
 * leading/trailing spaces from each run before returning it. A single
 * linear pass, no regex backtracking risk — shared by any scanner that
 * just needs "runs of these characters" (phone numbers, credit cards).
 */
export function scanMaximalRuns(text: string, allowedChars: Set<string>): string[] {
  const candidates: string[] = [];
  let i = 0;

  while (i < text.length) {
    if (!allowedChars.has(text[i])) {
      i++;
      continue;
    }

    let end = i;
    while (end < text.length && allowedChars.has(text[end])) end++;

    let start = i;
    while (start < end && text[start] === ' ') start++;
    let trimmedEnd = end;
    while (trimmedEnd > start && text[trimmedEnd - 1] === ' ') trimmedEnd--;

    if (trimmedEnd > start) candidates.push(text.slice(start, trimmedEnd));

    i = end;
  }

  return candidates;
}

/**
 * Trims trailing characters in `chars` from the end of `value`. Used to
 * strip sentence-ending punctuation that a scanner swept up along with a
 * real match (e.g. a period right after an email address or phone number).
 */
export function stripTrailing(value: string, chars: Set<string>): string {
  let end = value.length;
  while (end > 0 && chars.has(value[end - 1])) end--;
  return value.slice(0, end);
}

/**
 * Finds `prefix`-anchored tokens (e.g. `@mentions`, `#hashtags`): a single
 * `prefix` character followed by a run of one or more `bodyChars`. A match
 * only starts when the prefix isn't immediately preceded by a body
 * character itself, so e.g. `findPrefixedTokens('user@example.com', '@',
 * wordChars)` doesn't treat the email's `@` as a token start. A single
 * linear pass, no regex backtracking risk.
 */
export function findPrefixedTokens(text: string, prefix: string, bodyChars: Set<string>): string[] {
  const candidates: string[] = [];

  for (let i = 0; i < text.length; i++) {
    if (text[i] !== prefix) continue;
    if (i > 0 && bodyChars.has(text[i - 1])) continue;

    let end = i + 1;
    while (end < text.length && bodyChars.has(text[end])) end++;

    if (end > i + 1) candidates.push(text.slice(i, end));

    i = end - 1;
  }

  return candidates;
}
