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
});
