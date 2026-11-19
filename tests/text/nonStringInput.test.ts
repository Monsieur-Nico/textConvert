import { describe, expect, it } from 'vitest';
import {
  camelCase,
  capitalize,
  clear,
  countSentences,
  countWords,
  detectLanguage,
  escapeHtml,
  getTextStats,
  isPalindrome,
  kebabCase,
  maskText,
  normalizeLineEndings,
  normalizeWhitespace,
  pascalCase,
  pluralize,
  redact,
  removeDiacritics,
  reverse,
  sanitize,
  slugify,
  snakeCase,
  titleCase,
  truncate,
  unescapeHtml,
  wordFrequency,
} from '../../src/textConvert';

// JavaScript callers can pass values outside the TypeScript signatures. Every
// text function should answer them with the same sentinel it uses for empty
// input instead of throwing or coercing the value to a string.
const nonStrings: unknown[] = [123, true, {}, ['ab']];

type TextFn = (text: string) => unknown;

const INVALID_TEXT = 'Please provide a valid input text';

const cases: [string, TextFn, unknown][] = [
  ['camelCase', camelCase, INVALID_TEXT],
  ['capitalize', capitalize, INVALID_TEXT],
  ['kebabCase', kebabCase, INVALID_TEXT],
  ['pascalCase', pascalCase, INVALID_TEXT],
  ['snakeCase', snakeCase, INVALID_TEXT],
  ['titleCase', titleCase, INVALID_TEXT],
  ['clear', clear, INVALID_TEXT],
  ['escapeHtml', escapeHtml, INVALID_TEXT],
  ['unescapeHtml', unescapeHtml, INVALID_TEXT],
  ['normalizeLineEndings', normalizeLineEndings, INVALID_TEXT],
  ['normalizeWhitespace', normalizeWhitespace, INVALID_TEXT],
  ['removeDiacritics', removeDiacritics, INVALID_TEXT],
  ['pluralize', pluralize, INVALID_TEXT],
  ['slugify', slugify, INVALID_TEXT],
  ['maskText', maskText, INVALID_TEXT],
  ['redact', redact, INVALID_TEXT],
  ['reverse', reverse, INVALID_TEXT],
  ['sanitize', sanitize, INVALID_TEXT],
  ['truncate', truncate, INVALID_TEXT],
  ['countWords', countWords, 0],
  ['countSentences', countSentences, 0],
  ['isPalindrome', isPalindrome, false],
  ['wordFrequency', wordFrequency, {}],
  // Compared against each function's own empty-input result, so the zeroed
  // shape isn't duplicated here.
  ['getTextStats', getTextStats, getTextStats('')],
  ['detectLanguage', detectLanguage, detectLanguage('')],
];

describe('non-string input', () => {
  describe.each(cases)('#%s', (_name, fn, sentinel) => {
    it.each(nonStrings.map((input) => ({ input })))(
      'should return its empty-input sentinel for $input',
      ({ input }) => {
        expect(fn(input as unknown as string)).toEqual(sentinel);
      },
    );
  });

  it('#pluralize should not hand back a non-string word when count is 1', () => {
    expect(pluralize(123 as unknown as string, 1)).toBe(INVALID_TEXT);
  });
});
