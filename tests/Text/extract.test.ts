import { describe, expect, it } from 'vitest';
import { extractEmails, extractUrls } from '../../src/textConvert';

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

describe('#extractUrls', () => {
  it('should extract multiple URLs from a sentence', () => {
    expect(
      extractUrls('Check out https://example.com and http://another.example.org/path for details.'),
    ).toEqual(['https://example.com', 'http://another.example.org/path']);
  });

  it('should strip a trailing sentence-ending period', () => {
    expect(extractUrls('Visit https://example.com.')).toEqual(['https://example.com']);
  });

  it('should exclude surrounding parentheses, quotes, and angle brackets', () => {
    expect(extractUrls('(see https://example.com/path) for more')).toEqual([
      'https://example.com/path',
    ]);
    expect(extractUrls('Quoted: "https://example.com" and <https://example.org>')).toEqual([
      'https://example.com',
      'https://example.org',
    ]);
  });

  it('should ignore non-http(s) protocols', () => {
    expect(extractUrls('Bad ones: ftp://example.com, not a url')).toEqual([]);
  });

  it('should return an empty array when there are no URLs', () => {
    expect(extractUrls('No urls here.')).toEqual([]);
  });

  it('should return an empty array for empty input', () => {
    expect(extractUrls('')).toEqual([]);
  });
});
