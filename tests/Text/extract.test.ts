import { describe, expect, it } from 'vitest';
import { extractEmails } from '../../src/textConvert';

describe('#extractEmails', () => {
  it('should extract multiple emails from a sentence', () => {
    expect(
      extractEmails('Contact us at hello@example.com or support@example.org for help.'),
    ).toEqual(['hello@example.com', 'support@example.org']);
  });

  it('should strip a trailing sentence-ending period', () => {
    expect(extractEmails('Email me at hello@example.com.')).toEqual(['hello@example.com']);
  });

  it('should strip surrounding parentheses and trailing commas', () => {
    expect(extractEmails('(hello@example.com) works, so does support@example.org,')).toEqual([
      'hello@example.com',
      'support@example.org',
    ]);
  });

  it('should ignore invalid candidates', () => {
    expect(extractEmails('Bad ones: @example.com, plainaddress, user@')).toEqual([]);
  });

  it('should return an empty array when there are no emails', () => {
    expect(extractEmails('No emails here.')).toEqual([]);
  });

  it('should return an empty array for empty input', () => {
    expect(extractEmails('')).toEqual([]);
  });
});
