import { describe, expect, it } from 'vitest';
import { clear } from '../../src/textConvert';

describe('#clear', () => {
  it("should return 'hello world' for 'Hello,world'", () => {
    expect(clear('Hello,world')).toBe('hello world');
  });
  it("should return 'hello world' for 'Hello world'", () => {
    expect(clear('Hello world')).toBe('hello world');
  });
  it("should return 'Please provide a valid input text' for empty input", () => {
    expect(clear('')).toBe('Please provide a valid input text');
  });

  describe('keycap emoji', () => {
    it('should keep # and * keycaps intact', () => {
      expect(clear('#\uFE0F\u20E3 and *\uFE0F\u20E3 x')).toBe('#\uFE0F\u20E3 and *\uFE0F\u20E3 x');
    });
    it('should keep a keycap written without U+FE0F', () => {
      expect(clear('#\u20E3 x')).toBe('#\u20E3 x');
    });
    it('should keep digit keycaps intact', () => {
      expect(clear('1\uFE0F\u20E3 x')).toBe('1\uFE0F\u20E3 x');
    });
    it('should still strip a bare # or *', () => {
      expect(clear('a#b*c')).toBe('a b c');
    });
    it('should strip a bare # that precedes a keycap', () => {
      // The first # is punctuation, the second starts a keycap
      expect(clear('##\uFE0F\u20E3')).toBe(' #\uFE0F\u20E3');
    });
    it('should never leave U+20E3 without a base in front of it', () => {
      const orphan = /(?<![#*0-9]\uFE0F?)\u20E3/;
      expect(clear('#\uFE0F\u20E3 and *\uFE0F\u20E3 x')).not.toMatch(orphan);
      expect(clear('a#\uFE0F\u20E3b*\u20E3')).not.toMatch(orphan);
    });
  });
});
