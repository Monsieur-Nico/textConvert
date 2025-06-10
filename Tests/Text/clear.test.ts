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
});
