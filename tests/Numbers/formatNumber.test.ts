import { describe, expect, it } from 'vitest';
import { formatNumber } from '../../src/textConvert';

describe('#formatNumber', () => {
  it('should add thousands separators to an integer', () => {
    expect(formatNumber(1234567)).toBe('1,234,567');
  });

  it('should preserve natural precision when decimals is omitted', () => {
    expect(formatNumber(1234567.89)).toBe('1,234,567.89');
    expect(formatNumber(1234.5)).toBe('1,234.5');
  });

  it('should round and pad to the requested number of decimals', () => {
    expect(formatNumber(1234.5, { decimals: 2 })).toBe('1,234.50');
    expect(formatNumber(1234.567, { decimals: 2 })).toBe('1,234.57');
    expect(formatNumber(1234.5, { decimals: 0 })).toBe('1,235');
  });

  it('should not add a decimal point for a whole number under 1000', () => {
    expect(formatNumber(42)).toBe('42');
  });

  it('should format a negative number with a leading minus sign', () => {
    expect(formatNumber(-1234.5)).toBe('-1,234.5');
    expect(formatNumber(-1234.567, { decimals: 2 })).toBe('-1,234.57');
  });

  it('should not show a minus sign for negative zero', () => {
    expect(formatNumber(-0)).toBe('0');
  });

  it('should format zero', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(0, { decimals: 2 })).toBe('0.00');
  });

  it('should expand a number at or beyond 1e21 to its full digit string rather than scientific notation', () => {
    expect(formatNumber(1e21)).toBe('1,000,000,000,000,000,000,000');
    expect(formatNumber(-1e21)).toBe('-1,000,000,000,000,000,000,000');
  });

  it('should zero-pad decimals for a number at or beyond 1e21, since it has no real fractional part', () => {
    expect(formatNumber(1e21, { decimals: 2 })).toBe('1,000,000,000,000,000,000,000.00');
  });

  it('should still add thousands separators just below the expansion threshold', () => {
    // A literal this large loses precision at parse time (rounding up to
    // exactly 1e21) -- built via Number() to sidestep eslint's
    // no-loss-of-precision rule while still exercising that same rounding.
    expect(formatNumber(Number('999999999999999999999'))).toBe('1,000,000,000,000,000,000,000');
    expect(formatNumber(123456789012345680000)).toBe('123,456,789,012,345,680,000');
  });

  it("should return 'Please provide a valid input text' for NaN", () => {
    expect(formatNumber(NaN)).toBe('Please provide a valid input text');
  });

  it("should return 'Please provide a valid input text' for Infinity and -Infinity", () => {
    expect(formatNumber(Infinity)).toBe('Please provide a valid input text');
    expect(formatNumber(-Infinity)).toBe('Please provide a valid input text');
  });

  it("should return 'Please provide a valid input text' for a negative or non-integer decimals option", () => {
    expect(formatNumber(1234.5, { decimals: -1 })).toBe('Please provide a valid input text');
    expect(formatNumber(1234.5, { decimals: 1.5 })).toBe('Please provide a valid input text');
  });
});
