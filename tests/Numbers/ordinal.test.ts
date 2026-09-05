import { describe, expect, it } from 'vitest';
import { ordinal } from '../../src/textConvert';

describe('#ordinal', () => {
  it('should append st/nd/rd/th based on the last digit', () => {
    expect(ordinal(1)).toBe('1st');
    expect(ordinal(2)).toBe('2nd');
    expect(ordinal(3)).toBe('3rd');
    expect(ordinal(4)).toBe('4th');
    expect(ordinal(0)).toBe('0th');
  });

  it('should use th for the 11/12/13 exception regardless of the last digit', () => {
    expect(ordinal(11)).toBe('11th');
    expect(ordinal(12)).toBe('12th');
    expect(ordinal(13)).toBe('13th');
  });

  it('should resume st/nd/rd for 21-23 despite 11-13 ending the previous ten', () => {
    expect(ordinal(21)).toBe('21st');
    expect(ordinal(22)).toBe('22nd');
    expect(ordinal(23)).toBe('23rd');
  });

  it('should reapply the 11/12/13 exception for every hundred (111, 112, 113)', () => {
    expect(ordinal(111)).toBe('111th');
    expect(ordinal(112)).toBe('112th');
    expect(ordinal(113)).toBe('113th');
    expect(ordinal(121)).toBe('121st');
  });

  it('should handle large numbers', () => {
    expect(ordinal(1001)).toBe('1001st');
  });

  it("should return 'Please provide a valid input text' for negative numbers", () => {
    expect(ordinal(-1)).toBe('Please provide a valid input text');
  });

  it("should return 'Please provide a valid input text' for non-integers", () => {
    expect(ordinal(1.5)).toBe('Please provide a valid input text');
  });

  it("should return 'Please provide a valid input text' for NaN", () => {
    expect(ordinal(NaN)).toBe('Please provide a valid input text');
  });
});
