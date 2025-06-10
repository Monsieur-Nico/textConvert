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
});
