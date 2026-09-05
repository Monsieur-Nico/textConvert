import { describe, expect, it } from 'vitest';
import { randomString } from '../../src/text/randomString';

describe('#randomString', () => {
  it('generates a string of the requested length', () => {
    expect(randomString(8)).toHaveLength(8);
    expect(randomString(1)).toHaveLength(1);
    expect(randomString(32)).toHaveLength(32);
  });

  it('defaults to an alphanumeric charset', () => {
    expect(randomString(200)).toMatch(/^[A-Za-z0-9]+$/);
  });

  it('only uses letters for the alpha charset', () => {
    expect(randomString(200, { charset: 'alpha' })).toMatch(/^[A-Za-z]+$/);
  });

  it('only uses digits for the numeric charset', () => {
    expect(randomString(200, { charset: 'numeric' })).toMatch(/^[0-9]+$/);
  });

  it('draws only from a custom charset', () => {
    expect(randomString(200, { charset: 'AB' })).toMatch(/^[AB]+$/);
  });

  it('produces different output across calls (not deterministic)', () => {
    const a = randomString(32);
    const b = randomString(32);
    expect(a).not.toBe(b);
  });

  it('returns an empty string for a zero length', () => {
    expect(randomString(0)).toBe('');
  });

  it('returns an empty string for a negative length', () => {
    expect(randomString(-5)).toBe('');
  });

  it('returns an empty string for a non-integer length', () => {
    expect(randomString(3.5)).toBe('');
  });

  it('returns an empty string when the custom charset is empty', () => {
    expect(randomString(5, { charset: '' })).toBe('');
  });
});
