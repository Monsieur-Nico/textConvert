import { describe, expect, it } from 'vitest';
import { ordinalToWords } from '../../src/textConvert';

describe('#ordinalToWords', () => {
  it('should convert single-digit numbers using the irregular table', () => {
    expect(ordinalToWords(1)).toBe('first');
    expect(ordinalToWords(2)).toBe('second');
    expect(ordinalToWords(3)).toBe('third');
    expect(ordinalToWords(5)).toBe('fifth');
    expect(ordinalToWords(8)).toBe('eighth');
    expect(ordinalToWords(9)).toBe('ninth');
    expect(ordinalToWords(12)).toBe('twelfth');
  });

  it('should apply the generic +th rule for regular numbers', () => {
    expect(ordinalToWords(0)).toBe('zeroth');
    expect(ordinalToWords(4)).toBe('fourth');
    expect(ordinalToWords(6)).toBe('sixth');
    expect(ordinalToWords(7)).toBe('seventh');
    expect(ordinalToWords(10)).toBe('tenth');
    expect(ordinalToWords(11)).toBe('eleventh');
    expect(ordinalToWords(13)).toBe('thirteenth');
    expect(ordinalToWords(19)).toBe('nineteenth');
  });

  it('should convert whole tens using the -y -> -ieth rule', () => {
    expect(ordinalToWords(20)).toBe('twentieth');
    expect(ordinalToWords(30)).toBe('thirtieth');
    expect(ordinalToWords(40)).toBe('fortieth');
    expect(ordinalToWords(90)).toBe('ninetieth');
  });

  it('should only ordinalize the ones word in a tens-ones compound', () => {
    expect(ordinalToWords(21)).toBe('twenty-first');
    expect(ordinalToWords(32)).toBe('thirty-second');
    expect(ordinalToWords(45)).toBe('forty-fifth');
    expect(ordinalToWords(89)).toBe('eighty-ninth');
    expect(ordinalToWords(99)).toBe('ninety-ninth');
  });

  it('should ordinalize only the final segment of a compound number', () => {
    expect(ordinalToWords(100)).toBe('one hundredth');
    expect(ordinalToWords(101)).toBe('one hundred and first');
    expect(ordinalToWords(145)).toBe('one hundred and forty-fifth');
    expect(ordinalToWords(1000)).toBe('one thousandth');
    expect(ordinalToWords(1001)).toBe('one thousand and first');
    expect(ordinalToWords(12345)).toBe('twelve thousand three hundred and forty-fifth');
    expect(ordinalToWords(100000)).toBe('one hundred thousandth');
    expect(ordinalToWords(1000000)).toBe('one millionth');
  });

  it("should return 'Please provide a valid number under 100 million' for negative numbers", () => {
    expect(ordinalToWords(-1)).toBe('Please provide a valid number under 100 million');
  });

  it("should return 'Please provide a valid number under 100 million' for non-integers", () => {
    expect(ordinalToWords(1.5)).toBe('Please provide a valid number under 100 million');
  });

  it("should return 'Please provide a valid number under 100 million' for numbers >= 100 million", () => {
    expect(ordinalToWords(100000000)).toBe('Please provide a valid number under 100 million');
  });
});
