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
});
