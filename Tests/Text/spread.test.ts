import { describe, expect, it } from 'vitest';
import { spread } from '../../src/textConvert';

describe('#spread', () => {
  it("should return ['H', 'e', 'l', 'l', 'o'] for 'Hello'", () => {
    expect(spread('Hello')).toEqual(['H', 'e', 'l', 'l', 'o']);
  });
  it("should return ['H', 'e', 'l', 'l', 'o', ',', 'w', 'o', 'r', 'l', 'd'] for 'Hello, world'", () => {
    expect(spread('Hello, world')).toEqual([
      'H',
      'e',
      'l',
      'l',
      'o',
      ',',
      'w',
      'o',
      'r',
      'l',
      'd',
    ]);
  });
  it("should return ['H', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd'] for 'Hello, world'", () => {
    expect(spread('Hello, world', true)).toEqual([
      'H',
      'e',
      'l',
      'l',
      'o',
      'w',
      'o',
      'r',
      'l',
      'd',
    ]);
  });

  // Adding more test cases to improve coverage
  it('should return error message for invalid input type', () => {
    // @ts-ignore - Testing runtime behavior with incorrect types
    expect(spread(123)).toBe('Input text should be a string!');
  });

  it('should return error message for empty string', () => {
    expect(spread('  ')).toBe('Please provide a valid text input');
  });

  it('should capitalize the first letter when spreading', () => {
    expect(spread('hello')).toEqual(['H', 'e', 'l', 'l', 'o']);
  });
});
