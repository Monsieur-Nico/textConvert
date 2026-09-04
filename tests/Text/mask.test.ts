import { describe, expect, it } from 'vitest';
import { maskText } from '../../src/textConvert';

describe('#maskText', () => {
  it('should show the first 2 characters by default', () => {
    expect(maskText('jordan@example.com')).toBe('jo****************');
  });

  it('should hide the start entirely when only visibleEnd is specified', () => {
    expect(maskText('4111111111111234', { visibleEnd: 4 })).toBe('************1234');
  });

  it('should support a custom mask character with both ends hidden', () => {
    expect(maskText('secret-token-value', { visibleStart: 0, visibleEnd: 0, maskChar: '#' })).toBe(
      '##################',
    );
  });

  it('should hide the end entirely when only visibleStart is specified', () => {
    expect(maskText('abcdefgh', { visibleStart: 3 })).toBe('abc*****');
  });

  it('should return the text unchanged when the visible portions cover the whole string', () => {
    expect(maskText('ab', { visibleStart: 10 })).toBe('ab');
    expect(maskText('abcdef', { visibleStart: 3, visibleEnd: 5 })).toBe('abcdef');
  });

  it('should fully mask when both visibleStart and visibleEnd are 0', () => {
    expect(maskText('ab', { visibleStart: 0, visibleEnd: 0 })).toBe('**');
  });

  it("should return 'Please provide a valid input text' for empty input", () => {
    expect(maskText('')).toBe('Please provide a valid input text');
  });
});
