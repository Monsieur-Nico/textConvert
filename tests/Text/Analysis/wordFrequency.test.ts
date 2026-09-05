import { describe, expect, it } from 'vitest';
import { wordFrequency } from '../../../src/text/analysis/wordFrequency';

describe('#wordFrequency', () => {
  it('counts repeated words', () => {
    expect(wordFrequency('the cat sat on the mat')).toEqual({
      the: 2,
      cat: 1,
      sat: 1,
      on: 1,
      mat: 1,
    });
  });

  it('is case-insensitive', () => {
    expect(wordFrequency('The cat and the CAT')).toEqual({
      the: 2,
      cat: 2,
      and: 1,
    });
  });

  it('strips punctuation before counting', () => {
    expect(wordFrequency('Hello, world! Hello?')).toEqual({
      hello: 2,
      world: 1,
    });
  });

  it('returns an empty object for empty input', () => {
    expect(wordFrequency('')).toEqual({});
  });

  it('returns an empty object for whitespace-only input', () => {
    expect(wordFrequency('   ')).toEqual({});
  });

  it('returns an empty object for punctuation-only input', () => {
    expect(wordFrequency('...!?')).toEqual({});
  });

  it('preserves first-appearance order of keys', () => {
    expect(Object.keys(wordFrequency('banana apple banana cherry apple'))).toEqual([
      'banana',
      'apple',
      'cherry',
    ]);
  });
});
