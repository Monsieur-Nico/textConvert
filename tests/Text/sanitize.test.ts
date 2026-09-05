import { describe, expect, it } from 'vitest';
import { sanitize } from '../../src/text/sanitize';

describe('#sanitize', () => {
  it('returns text unchanged when no options are set', () => {
    expect(sanitize('  Hello  ')).toBe('  Hello  ');
  });

  it('trims when trim is set', () => {
    expect(sanitize('  Hello  ', { trim: true })).toBe('Hello');
  });

  it('collapses whitespace runs when normalizeWhitespace is set', () => {
    expect(sanitize('Hello   World\n\n', { normalizeWhitespace: true })).toBe('Hello World');
  });

  it('redacts PII with redact defaults when redactPII is true', () => {
    expect(sanitize('Contact jordan@example.com', { redactPII: true })).toBe(
      'Contact jo****************',
    );
  });

  it('redacts only the requested type when redactPII is an options object', () => {
    const result = sanitize('Card 4111 1111 1111 1111 and jordan@example.com', {
      redactPII: { types: ['creditCard'] },
    });
    expect(result).toBe('Card ***************1111 and jordan@example.com');
  });

  it('escapes HTML when escapeHtml is set', () => {
    expect(sanitize('<b>hi</b>', { escapeHtml: true })).toBe('&lt;b&gt;hi&lt;/b&gt;');
  });

  it('runs steps in a fixed order regardless of option declaration order', () => {
    const result = sanitize('  Contact jordan@example.com <b>now</b>  ', {
      trim: true,
      redactPII: true,
      escapeHtml: true,
    });
    expect(result).toBe('Contact jo**************** &lt;b&gt;now&lt;/b&gt;');
  });

  it('combines all four steps', () => {
    const result = sanitize('  Contact jordan@example.com <b>now</b>  ', {
      trim: true,
      normalizeWhitespace: true,
      redactPII: true,
      escapeHtml: true,
    });
    expect(result).toBe('Contact jo**************** &lt;b&gt;now&lt;/b&gt;');
  });

  it('returns an empty string, not the invalid-input message, when trimming empties whitespace-only input', () => {
    expect(sanitize('   ', { trim: true })).toBe('');
  });

  it('returns the shared invalid-input message for empty input', () => {
    expect(sanitize('')).toBe('Please provide a valid input text');
  });
});
