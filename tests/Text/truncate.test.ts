import { describe, expect, it } from 'vitest';
import { truncate } from '../../src/textConvert';

describe('#truncate', () => {
  it("should return 'The quick brown f...' for maxLength 20", () => {
    expect(truncate('The quick brown fox jumps over the lazy dog', 20)).toBe(
      'The quick brown f...',
    );
  });

  it("should return 'The quick brown...' for maxLength 20 with byWords", () => {
    expect(truncate('The quick brown fox jumps over the lazy dog', 20, { byWords: true })).toBe(
      'The quick brown...',
    );
  });

  it('should return the text unchanged when already within maxLength', () => {
    expect(truncate('Short text', 20)).toBe('Short text');
  });

  it('should support a custom ellipsis', () => {
    expect(truncate('The quick brown fox', 10, { ellipsis: '~' })).toBe('The quick~');
  });

  it('should return the ellipsis (sliced) when maxLength is smaller than the ellipsis', () => {
    expect(truncate('Hello world', 2)).toBe('..');
    expect(truncate('Hello world', 0)).toBe('');
  });

  it('should hard-cut when byWords finds no earlier word boundary', () => {
    expect(truncate('Supercalifragilisticexpialidocious', 10, { byWords: true })).toBe(
      'Superca...',
    );
  });

  it("should return 'Please provide a valid input text' for empty input", () => {
    expect(truncate('', 10)).toBe('Please provide a valid input text');
  });
  it('should not cut a grapheme cluster at the truncation boundary', () => {
    // budget for 'ab👍🏽xyz' with maxLength 6 / ellipsis '...' is 3 code units,
    // which lands inside the '👍🏽' surrogate pair -- snap back to the last
    // grapheme boundary instead of emitting a lone surrogate
    expect(truncate('ab👍🏽xyz', 6)).toBe('ab...');
  });
  it('should keep combining-mark sequences intact when truncating', () => {
    // 'e' + combining acute accent is one grapheme cluster (2 code units);
    // a code-unit cut at budget 2 would keep the bare 'e' and strip the accent,
    // so the cluster does not fit and truncation snaps back to 'a'
    expect(truncate('ae\u0301b', 3, { ellipsis: 'x' })).toBe('ax');
  });
});
