import { describe, expect, it } from 'vitest';
import {
  normalizeLineEndings,
  normalizeWhitespace,
  removeDiacritics,
} from '../../src/text/normalize';

describe('#removeDiacritics', () => {
  it('strips accents from accented characters', () => {
    expect(removeDiacritics('Café — résumé')).toBe('Cafe — resume');
  });

  it('leaves plain ASCII text unchanged', () => {
    expect(removeDiacritics('Hello World')).toBe('Hello World');
  });

  it('returns the shared invalid-input message for empty input', () => {
    expect(removeDiacritics('')).toBe('Please provide a valid input text');
  });
});

describe('#normalizeWhitespace', () => {
  it('collapses runs of whitespace into a single space', () => {
    expect(normalizeWhitespace('  Hello   World  \n\n')).toBe('Hello World');
  });

  it('collapses tabs and newlines too', () => {
    expect(normalizeWhitespace('a\t\tb\n\nc')).toBe('a b c');
  });

  it('leaves already-normalized text unchanged', () => {
    expect(normalizeWhitespace('Hello World')).toBe('Hello World');
  });

  it('returns the shared invalid-input message for empty input', () => {
    expect(normalizeWhitespace('')).toBe('Please provide a valid input text');
  });
});

describe('#normalizeLineEndings', () => {
  it('converts CRLF to LF', () => {
    expect(normalizeLineEndings('line1\r\nline2\r\nline3')).toBe('line1\nline2\nline3');
  });

  it('converts lone CR to LF', () => {
    expect(normalizeLineEndings('line1\rline2')).toBe('line1\nline2');
  });

  it('leaves LF-only text unchanged', () => {
    expect(normalizeLineEndings('line1\nline2')).toBe('line1\nline2');
  });

  it('handles a mix of line ending styles', () => {
    expect(normalizeLineEndings('a\r\nb\rc\nd')).toBe('a\nb\nc\nd');
  });

  it('returns the shared invalid-input message for empty input', () => {
    expect(normalizeLineEndings('')).toBe('Please provide a valid input text');
  });
});
