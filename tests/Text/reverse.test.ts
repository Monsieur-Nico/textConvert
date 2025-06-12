import { describe, expect, it } from 'vitest';
import { reverse } from '../../src/textConvert';

describe('#reverse', () => {
  it("it should return 'dlrow olleh' for 'hello world'", () => {
    expect(reverse('hello world')).toBe('dlrow olleh');
  });
  it("it should return '!dlrow ,olleh' for 'hello, world!'", () => {
    expect(reverse('hello world')).toBe('dlrow olleh');
  });
  it("it should return 'racecar' from 'racecar'", () => {
    expect(reverse('racecar')).toBe('racecar');
  });
  it("it should return 'This text is about to be reversed!' from '!desrever eb ot tuoba si txet sihT'", () => {
    expect(reverse('This text is about to be reversed!')).toBe(
      '!desrever eb ot tuoba si txet sihT',
    );
  });
  it("should return 'Please provide a valid input text' for empty input", () => {
    expect(reverse('')).toBe('Please provide a valid input text');
  });
});
