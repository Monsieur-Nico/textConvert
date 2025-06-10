import { describe, expect, it } from 'vitest';
import { numbersToWords } from '../../src/textConvert';

describe('#numbersToWords', () => {
  it("should return 'one hundred and fifty-two' for 152", () => {
    expect(numbersToWords(152)).toBe('one hundred and fifty-two');
  });
  it("should return 'one thousand five hundred and fifty-two' for 1552", () => {
    expect(numbersToWords(1552)).toBe(
      'one thousand five hundred and fifty-two'
    );
  });
  it("should return 'eleven thousand five hundred and fifty-two' for 11552", () => {
    expect(numbersToWords(11552)).toBe(
      'eleven thousand five hundred and fifty-two'
    );
  });
  it("should return 'one hundred and eleven thousand five hundred and fifty-two' for 111552", () => {
    expect(numbersToWords(111552)).toBe(
      'one hundred and eleven thousand five hundred and fifty-two'
    );
  });
  it("should return 'ten million' for 10000000", () => {
    expect(numbersToWords(10000000)).toBe('ten million');
  });
  it("should return 'ninety-two million' for 92000000", () => {
    expect(numbersToWords(92000000)).toBe('ninety-two million');
  });
  it('should return Error for 100,000,000', () => {
    expect(() => numbersToWords(100000000)).toThrow(
      'Please enter a number under 100 million!'
    );
  });

  // Adding more test cases to improve coverage
  it("should return 'five' for 5", () => {
    expect(numbersToWords(5)).toBe('five');
  });
  it("should return 'nineteen' for 19", () => {
    expect(numbersToWords(19)).toBe('nineteen');
  });
  it("should return 'twenty' for 20", () => {
    expect(numbersToWords(20)).toBe('twenty');
  });
  it("should return 'forty-two' for 42", () => {
    expect(numbersToWords(42)).toBe('forty-two');
  });
  it("should return 'one hundred' for 100", () => {
    expect(numbersToWords(100)).toBe('one hundred');
  });
  it("should return 'one thousand' for 1000", () => {
    expect(numbersToWords(1000)).toBe('one thousand');
  });
  it("should return 'one million' for 1000000", () => {
    expect(numbersToWords(1000000)).toBe('one million');
  });
});
