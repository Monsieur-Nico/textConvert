import { describe, expect, it } from 'vitest';
import { slugify } from '../../src/textConvert';

describe('#slugify', () => {
  it("should return 'hello-world-100-awesome' for 'Hello, World! 100% Awesome'", () => {
    expect(slugify('Hello, World! 100% Awesome')).toBe('hello-world-100-awesome');
  });

  it("should return 'cafe-resume-review' for 'Café Résumé Review'", () => {
    expect(slugify('Café Résumé Review')).toBe('cafe-resume-review');
  });

  it("should return 'multiple-spaces' for '  Multiple   Spaces  '", () => {
    expect(slugify('  Multiple   Spaces  ')).toBe('multiple-spaces');
  });

  it('should collapse runs of punctuation into a single separator', () => {
    expect(slugify('foo---bar___baz')).toBe('foo-bar-baz');
  });

  it('should preserve numbers', () => {
    expect(slugify('Top 10 Tips')).toBe('top-10-tips');
  });

  it("should return 'Please provide a valid input text' for empty input", () => {
    expect(slugify('')).toBe('Please provide a valid input text');
  });
});
