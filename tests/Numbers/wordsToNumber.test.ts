import { describe, expect, it } from 'vitest';
import { numbersToWords, wordsToNumber } from '../../src/textConvert';

describe('#wordsToNumber', () => {
  it("should return 0 for 'zero'", () => {
    expect(wordsToNumber('zero')).toBe(0);
  });
  it("should return 5 for 'five'", () => {
    expect(wordsToNumber('five')).toBe(5);
  });
  it("should return 19 for 'nineteen'", () => {
    expect(wordsToNumber('nineteen')).toBe(19);
  });
  it("should return 20 for 'twenty'", () => {
    expect(wordsToNumber('twenty')).toBe(20);
  });
  it("should return 23 for 'twenty-three'", () => {
    expect(wordsToNumber('twenty-three')).toBe(23);
  });
  it("should return 100 for 'one hundred'", () => {
    expect(wordsToNumber('one hundred')).toBe(100);
  });
  it("should return 105 for 'one hundred and five'", () => {
    expect(wordsToNumber('one hundred and five')).toBe(105);
  });
  it("should return 1000 for 'one thousand'", () => {
    expect(wordsToNumber('one thousand')).toBe(1000);
  });
  it("should return 12345 for 'twelve thousand three hundred and forty-five'", () => {
    expect(wordsToNumber('twelve thousand three hundred and forty-five')).toBe(12345);
  });
  it("should return 100005 for 'one hundred thousand and five'", () => {
    expect(wordsToNumber('one hundred thousand and five')).toBe(100005);
  });
  it("should return 1000000 for 'one million'", () => {
    expect(wordsToNumber('one million')).toBe(1000000);
  });
  it("should return 1000005 for 'one million and five'", () => {
    expect(wordsToNumber('one million and five')).toBe(1000005);
  });
  it("should return 92000000 for 'ninety-two million'", () => {
    expect(wordsToNumber('ninety-two million')).toBe(92000000);
  });

  // Round-trip: wordsToNumber(numbersToWords(n)) === n across the shape of
  // number numbersToWords can produce, including the sub-100 remainder case
  // #393 added 'and' before.
  describe('round-trips through numbersToWords', () => {
    const samples = [
      0, 5, 19, 20, 42, 99, 100, 105, 152, 999, 1000, 1005, 1552, 11552, 99999, 100000, 100005,
      111552, 999999, 1000000, 1000005, 10000000, 92000000, 99999999,
    ];

    it.each(samples)('round-trips %i', (n) => {
      expect(wordsToNumber(numbersToWords(n))).toBe(n);
    });
  });

  // Tolerance beyond numbersToWords's own output shape.
  it('should be case-insensitive', () => {
    expect(wordsToNumber('Twenty-Three')).toBe(23);
    expect(wordsToNumber('ONE HUNDRED AND FIVE')).toBe(105);
  });
  it("should treat 'and' as optional", () => {
    expect(wordsToNumber('one hundred five')).toBe(105);
    expect(wordsToNumber('one hundred thousand five')).toBe(100005);
  });
  it('should treat hyphens and spaces interchangeably', () => {
    expect(wordsToNumber('twenty three')).toBe(23);
    expect(wordsToNumber('one-hundred-and-five')).toBe(105);
  });

  it('should return NaN for unparseable text', () => {
    expect(wordsToNumber('not a number')).toBeNaN();
  });
  it('should return NaN for an empty string', () => {
    expect(wordsToNumber('')).toBeNaN();
  });
  it('should return NaN for whitespace-only input', () => {
    expect(wordsToNumber('   ')).toBeNaN();
  });
  it('should return NaN for a non-string input', () => {
    // @ts-expect-error -- intentionally passing an invalid type to test runtime behavior
    expect(wordsToNumber(105)).toBeNaN();
  });
});
