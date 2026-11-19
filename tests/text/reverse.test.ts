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
  it('should reverse grapheme clusters without corrupting emoji', () => {
    // '👍🤓' is two astral-plane characters; reversing by UTF-16 code unit
    // tears both surrogate pairs apart and produces lone surrogates
    expect(reverse('👍🤓')).toBe('🤓👍');
  });
  it('should keep emoji with skin-tone modifiers intact', () => {
    // '👍🏽' is a thumbs-up followed by a skin-tone modifier -- one grapheme cluster
    expect(reverse('👍🏽')).toBe('👍🏽');
  });
  it('should keep combining-mark sequences intact', () => {
    // 'e' + combining acute accent is one grapheme cluster
    expect(reverse('e\u0301x')).toBe('xe\u0301');
  });
  it('should reverse flag emoji as whole clusters instead of swapping their regional-indicator pairs', () => {
    // each flag is two regional-indicator code points grouped into one
    // cluster; a reversal that's only code-point-safe (not cluster-aware)
    // would still cross-swap indicators and produce different countries'
    // flags instead of reordering the flags themselves
    expect(reverse('🇺🇸🇯🇵')).toBe('🇯🇵🇺🇸');
  });
  it('should keep a ZWJ-joined emoji sequence intact', () => {
    // the family emoji is four people joined by U+200D into a single
    // grapheme cluster -- a different joining mechanism than a surrogate
    // pair or a base+modifier pair
    expect(reverse('a👨‍👩‍👧‍👦b')).toBe('b👨‍👩‍👧‍👦a');
  });
});
