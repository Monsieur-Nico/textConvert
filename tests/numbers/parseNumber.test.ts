import { describe, expect, it } from 'vitest';
import { formatNumber, parseNumber } from '../../src/textConvert';

describe('#parseNumber', () => {
  it('should parse a comma-grouped integer', () => {
    expect(parseNumber('1,234,567')).toBe(1234567);
  });

  it('should parse a comma-grouped decimal', () => {
    expect(parseNumber('1,234.56')).toBe(1234.56);
  });

  it('should parse a negative number with a leading minus sign', () => {
    expect(parseNumber('-1,234.5')).toBe(-1234.5);
  });

  it('should parse a number with no thousands separators', () => {
    expect(parseNumber('1234567')).toBe(1234567);
    expect(parseNumber('42')).toBe(42);
  });

  it('should trim surrounding whitespace', () => {
    expect(parseNumber(' 1,234.56 ')).toBe(1234.56);
    expect(parseNumber('\t-42\n')).toBe(-42);
  });

  it('should parse zero', () => {
    expect(parseNumber('0')).toBe(0);
    expect(parseNumber('0.00')).toBe(0);
  });

  it('should round-trip every formatNumber output back to the original value', () => {
    const values = [0, 42, 999, 1000, 1234567, 1234567.89, -1234.5, 1e21, -1e21];

    for (const value of values) {
      expect(parseNumber(formatNumber(value))).toBe(value);
      expect(parseNumber(formatNumber(value, { decimals: 2 }))).toBe(value);
    }
  });

  it('should reject incorrectly-grouped thousands separators', () => {
    expect(Number.isNaN(parseNumber('1,23,456'))).toBe(true);
    expect(Number.isNaN(parseNumber('12,3456'))).toBe(true);
  });

  it('should reject a leading currency symbol', () => {
    expect(Number.isNaN(parseNumber('$1,234.56'))).toBe(true);
  });

  it('should reject malformed input', () => {
    expect(Number.isNaN(parseNumber(''))).toBe(true);
    expect(Number.isNaN(parseNumber('   '))).toBe(true);
    expect(Number.isNaN(parseNumber('-'))).toBe(true);
    expect(Number.isNaN(parseNumber('1.'))).toBe(true);
    expect(Number.isNaN(parseNumber('1,234.56.78'))).toBe(true);
    expect(Number.isNaN(parseNumber('not a number'))).toBe(true);
  });

  it('should return NaN for non-string input', () => {
    expect(Number.isNaN(parseNumber(null as unknown as string))).toBe(true);
    expect(Number.isNaN(parseNumber(undefined as unknown as string))).toBe(true);
    expect(Number.isNaN(parseNumber(1234 as unknown as string))).toBe(true);
  });
});
