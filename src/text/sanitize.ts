import { escapeHtml } from './html';
import { normalizeWhitespace } from './normalize';
import { redact, type RedactOptions } from './redact';

export interface SanitizeOptions {
  /** Trim leading/trailing whitespace. */
  trim?: boolean;
  /** Collapse internal whitespace runs to a single space (also trims the ends -- see {@link normalizeWhitespace}). */
  normalizeWhitespace?: boolean;
  /** Redact PII/secrets via {@link redact}. `true` uses redact's own defaults; pass an options object to control its `types`/`maskChar`. */
  redactPII?: boolean | RedactOptions;
  /** Escape the five HTML special characters via {@link escapeHtml}. Always the last step, regardless of option order -- see below. */
  escapeHtml?: boolean;
}

/**
 * Runs `text` through a configurable pipeline of existing textConvert
 * functions -- trimming, whitespace normalization, PII/secret redaction,
 * and HTML escaping -- for the common "clean this user input/log line
 * before it's stored or displayed" case.
 *
 * This is composition, not new detection logic: every step just calls
 * the same underlying function ({@link normalizeWhitespace},
 * {@link redact}, {@link escapeHtml}) that already exists standalone, in
 * a fixed order regardless of the order options are given in:
 * `trim` -> `normalizeWhitespace` -> `redactPII` -> `escapeHtml`.
 *
 * Redaction deliberately runs on the raw, unescaped text -- so pattern
 * matching isn't affected by HTML-escaped characters -- and escaping
 * always runs last, so the final output is safe to render no matter
 * which other steps ran.
 *
 * @param text Text to sanitize.
 * @param options Which steps to run. Every step defaults to off --
 * `sanitize(text)` with no options returns `text` unchanged (aside from
 * the shared invalid-input check).
 * @returns The sanitized text.
 * @example
 * sanitize('  Contact jordan@example.com <b>now</b>  ', {
 *   trim: true,
 *   redactPII: true,
 *   escapeHtml: true,
 * });
 * // 'Contact jo**************** &lt;b&gt;now&lt;/b&gt;'
 */
export function sanitize(text: string, options: SanitizeOptions = {}): string {
  if (!text) return 'Please provide a valid input text';

  let result = text;

  if (options.trim) result = result.trim();
  if (options.normalizeWhitespace) result = normalizeWhitespace(result);

  // Whitespace-only input can legitimately reduce to '' at this point
  // (e.g. sanitize('   ', { trim: true })) -- that's a valid outcome, not
  // an error, so return it directly rather than letting an empty string
  // flow into redact/escapeHtml, which would each report it as invalid
  // input via their own shared sentinel message.
  if (!result) return '';

  if (options.redactPII) {
    result = redact(result, typeof options.redactPII === 'object' ? options.redactPII : undefined);
  }

  if (options.escapeHtml) result = escapeHtml(result);

  return result;
}
