import { describe, expect, it } from 'vitest';
import { count } from '../../src/textConvert';

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
});
