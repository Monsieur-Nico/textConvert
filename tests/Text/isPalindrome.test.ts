import { describe, expect, it } from 'vitest';
import { isPalindrome } from '../../src/textConvert';

describe('#isPalindrome', () => {
  it("should return true for 'racecar'", () => {
    expect(isPalindrome('racecar')).toBe(true);
  });

  it("should return true for 'A man a plan a canal Panama', ignoring case and spaces", () => {
    expect(isPalindrome('A man a plan a canal Panama')).toBe(true);
  });

  it("should return true for 'Was it a car or a cat I saw?', ignoring punctuation", () => {
    expect(isPalindrome('Was it a car or a cat I saw?')).toBe(true);
  });

  it("should return false for 'hello world'", () => {
    expect(isPalindrome('hello world')).toBe(false);
  });

  it('should return true for a numeric palindrome', () => {
    expect(isPalindrome('12321')).toBe(true);
  });

  it('should return false for a non-palindromic number', () => {
    expect(isPalindrome('12345')).toBe(false);
  });

  it('should return true for a single character', () => {
    expect(isPalindrome('a')).toBe(true);
  });

  it('should return false for empty input', () => {
    expect(isPalindrome('')).toBe(false);
  });

  it('should return true for punctuation-only input, which normalizes to an empty string', () => {
    expect(isPalindrome('!!!')).toBe(true);
  });

  it('should be case-insensitive', () => {
    expect(isPalindrome('RaceCar')).toBe(true);
  });
});
