// The five characters OWASP's Cross-Site Scripting Prevention Cheat Sheet
// (Rule #1, HTML element content) requires escaping -- the deliberate,
// documented scope for v1, not a general-purpose HTML sanitizer. Apostrophe
// uses the hex numeric reference (&#x27;) to match OWASP's own convention.
const htmlEscapes: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
};

// Reverses exactly the escapes above. Also accepts &#39; (the decimal
// numeric form other tools commonly produce for apostrophe) and &apos;
// (the HTML5 named form) as equivalent input, even though escapeHtml never
// outputs either -- this is not a general HTML entity decoder, it only
// reverses these five characters' escaped forms.
const htmlUnescapes: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#39;': "'",
  '&apos;': "'",
};

// Single-pass regexes matched against a lookup-map replacer, rather than
// chained sequential .replace() calls -- chaining would corrupt already-
// escaped output (e.g. escaping '<' before '&' would turn the resulting
// '&lt;' into '&amp;lt;' on the next pass). Matching all target characters
// in one pass sidesteps that entirely: nothing a replacer inserts is
// re-scanned by the same pass.
const escapeRegex = /[&<>"']/g;
const unescapeRegex = /&amp;|&lt;|&gt;|&quot;|&#x27;|&#39;|&apos;/g;

/**
 * Escapes the five HTML special characters (`& < > " '`) in a string, per
 * OWASP's XSS Prevention Cheat Sheet Rule #1 for HTML element content --
 * useful for safely rendering user-supplied text without pulling in a
 * dedicated escaping library.
 *
 * This covers HTML element content only, not other injection contexts
 * (HTML attributes, `<script>` bodies, CSS, URLs) -- those need different,
 * context-specific encoding that this function doesn't provide. See
 * {@link unescapeHtml} for the reverse operation.
 *
 * @param text Text to escape.
 * @returns The escaped string, or an error message for invalid input.
 * @example
 * escapeHtml('<script>alert("hi")</script>');
 * // '&lt;script&gt;alert(&quot;hi&quot;)&lt;/script&gt;'
 */
export function escapeHtml(text: string): string {
  if (!text) return 'Please provide a valid input text';

  return text.replace(escapeRegex, (char) => htmlEscapes[char]);
}

/**
 * Reverses exactly the five escapes {@link escapeHtml} produces. This is
 * not a general-purpose HTML entity decoder -- entities it doesn't produce
 * (`&nbsp;`, `&copy;`, numeric character references like `&#65;`, etc.)
 * are left untouched, by design.
 *
 * @param text Text to unescape.
 * @returns The unescaped string, or an error message for invalid input.
 * @example
 * unescapeHtml('Tom &amp; Jerry');
 * // 'Tom & Jerry'
 */
export function unescapeHtml(text: string): string {
  if (!text) return 'Please provide a valid input text';

  return text.replace(unescapeRegex, (entity) => htmlUnescapes[entity]);
}
