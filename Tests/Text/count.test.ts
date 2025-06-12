import { describe, expect, it } from 'vitest';
import { count, countSentences, countWords } from '../../src/textConvert';

describe('#count', () => {
  it("should return 10 for 'Hello,world'", () => {
    expect(count('Hello,world')).toBe(10);
  });
  it("should return 10 for 'Hello world'", () => {
    expect(count('Hello world')).toBe(10);
  });
  it('should return 0 for empty input', () => {
    expect(count('')).toBe(0);
  });

  // Adding more test cases to improve coverage
  it("should return 11 when counting numbers for 'Hello123'", () => {
    expect(count('Hello123', true)).toBe(8);
  });
  it("should return 5 when not counting numbers for 'Hello123'", () => {
    expect(count('Hello123')).toBe(5);
  });
  it('should return 0 for a string with only symbols', () => {
    expect(count('!@#$%^&*()')).toBe(0);
  });
  it('should return 0 for a string with only numbers and not counting numbers', () => {
    expect(count('12345')).toBe(0);
  });
  it('should return 5 for a string with only numbers and counting numbers', () => {
    expect(count('12345', true)).toBe(5);
  });
});

describe('#countWords', () => {
  it("should return 2 for 'Hello world'", () => {
    expect(countWords('Hello world')).toBe(2);
  });

  it('should return 0 for empty input', () => {
    expect(countWords('')).toBe(0);
  });

  it('should return 0 for whitespace only', () => {
    expect(countWords('   ')).toBe(0);
  });

  it('should return 5 for multiple spaces between words', () => {
    expect(countWords('This   is  a  test  sentence')).toBe(5);
  });
});

describe('#countSentences', () => {
  it("should return 1 for 'Hello world.'", () => {
    expect(countSentences('Hello world.')).toBe(1);
  });

  it('should return 0 for empty input', () => {
    expect(countSentences('')).toBe(0);
  });

  it('should return 0 for whitespace only', () => {
    expect(countSentences('   ')).toBe(0);
  });

  it('should return 3 for text with multiple sentences', () => {
    expect(countSentences('First sentence. Second sentence! Third sentence?')).toBe(3);
  });

  it('should handle sentences without final punctuation', () => {
    expect(countSentences('Hello world')).toBe(1);
  });
});
