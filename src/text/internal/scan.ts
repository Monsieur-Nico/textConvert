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
