import { describe, expect, it } from 'vitest';
import { spread } from '../../src/textConvert';

describe('#spread', () => {
  it("should return ['H', 'e', 'l', 'l', 'o'] for 'Hello'", () => {
    expect(spread('Hello')).toEqual(['H', 'e', 'l', 'l', 'o']);
  });

  it('should return every character verbatim, including whitespace', () => {
    expect(spread('Hello, world')).toEqual([
      'H',
      'e',
      'l',
      'l',
      'o',
      ',',
      ' ',
      'w',
      'o',
      'r',
      'l',
      'd',
    ]);
  });

  it('should not alter the case of the input', () => {
    expect(spread('hello')).toEqual(['h', 'e', 'l', 'l', 'o']);
  });

  it('should remove punctuation (but keep whitespace) when clear is true', () => {
    expect(spread('Hello, world', true)).toEqual([
      'h',
      'e',
      'l',
      'l',
      'o',
      ' ',
      'w',
      'o',
      'r',
      'l',
      'd',
    ]);
  });

  it('should keep multi-code-point emoji as single elements', () => {
    expect(spread('👍🏽')).toEqual(['👍🏽']);
    expect(spread('👨‍👩‍👧‍👦')).toEqual(['👨‍👩‍👧‍👦']);
  });

  it('should keep flags and keycap sequences intact', () => {
    expect(spread('🇯🇵')).toEqual(['🇯🇵']);
    expect(spread('1️⃣')).toEqual(['1️⃣']);
  });

  it('should keep unnormalized combining marks attached to their base letter', () => {
    // 'cafe\u0301' is NFD: the final cluster is 'e' + U+0301 (combining acute)
    expect(spread('cafe\u0301')).toEqual(['c', 'a', 'f', 'e\u0301']);
  });

  it('should return [] for invalid input type', () => {
    // @ts-expect-error Testing runtime behavior with incorrect types
    expect(spread(123)).toEqual([]);
  });

  it('should return [] for empty/whitespace-only string', () => {
    expect(spread('  ')).toEqual([]);
    expect(spread('')).toEqual([]);
  });
});
