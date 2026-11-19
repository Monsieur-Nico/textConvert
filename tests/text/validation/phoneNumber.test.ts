import { describe, expect, it } from 'vitest';
import { isPhoneNumber } from '../../../src/text/validation/phoneNumber';

describe('#isPhoneNumber', () => {
  // Valid international numbers (leading '+', 7-15 digits)
  it('should return true for valid international (E.164-style) numbers', () => {
    const validInternational = [
      '+1-202-555-0173',
      '+1 202 555 0173',
      '+12025550173',
      '+44 20 7946 0958',
      '+33 1 42 68 53 00',
      '+683 4001', // Niue - one of the shortest real E.164 numbers
      '+61 2 9374 4000',
    ];

    validInternational.forEach((phone) => {
      expect(isPhoneNumber(phone)).toBe(true);
    });
  });

  // Valid local numbers (no '+', 10-15 digits)
  it('should return true for valid local numbers with an area code', () => {
    const validLocal = [
      '(202) 555 0173',
      '(202) 555-0173',
      '202-555-0173',
      '202.555.0173',
      '2025550173',
      '020 7946 0958', // UK-style with leading trunk digit
    ];

    validLocal.forEach((phone) => {
      expect(isPhoneNumber(phone)).toBe(true);
    });
  });

  // Invalid numbers
  it('should return false for invalid or too-short numbers', () => {
    const invalidNumbers = [
      '',
      'not a phone number',
      '5550173', // Too short, no area code
      '123456789', // 9 digits, still too short without a country code
      '+123456', // 6 digits, below the 7-digit international floor
      '+1234567890123456', // 16 digits, above E.164's max
      '12345678901234567', // Way too long
      '+1-202-555-01AB', // Letters
      '202 555 CALL', // Vanity letters not supported
      '++1 202 555 0173', // Double plus
      '1+202+555+0173', // Plus not at the start
    ];

    invalidNumbers.forEach((phone) => {
      expect(isPhoneNumber(phone)).toBe(false);
    });
  });

  // Edge cases for various input types
  it('should handle non-string inputs correctly', () => {
    // @ts-expect-error Testing null input
    expect(isPhoneNumber(null)).toBe(false);
    // @ts-expect-error Testing undefined input
    expect(isPhoneNumber(undefined)).toBe(false);
    // @ts-expect-error Testing number input
    expect(isPhoneNumber(2025550173)).toBe(false);
    // @ts-expect-error Testing object input
    expect(isPhoneNumber({})).toBe(false);
    // @ts-expect-error Testing array input
    expect(isPhoneNumber([])).toBe(false);
    // @ts-expect-error Testing boolean input
    expect(isPhoneNumber(true)).toBe(false);
    // @ts-expect-error Testing boolean input
    expect(isPhoneNumber(false)).toBe(false);
  });
});
