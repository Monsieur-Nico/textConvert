import { describe, expect, it } from 'vitest';
import {
  extractEmails,
  extractHashtags,
  extractMentions,
  extractUrls,
} from '../../src/textConvert';

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

describe('#extractMentions', () => {
  it('should extract multiple mentions from a sentence', () => {
    expect(extractMentions('Thanks @jordan and @alex_dev for the review!')).toEqual([
      '@jordan',
      '@alex_dev',
    ]);
  });

  it('should keep the leading @ symbol', () => {
    expect(extractMentions('cc @octocat')).toEqual(['@octocat']);
  });

  it('should not match an email address as a mention', () => {
    expect(extractMentions('Contact user@example.com for help')).toEqual([]);
  });

  it('should extract a real mention even when an email is present too', () => {
    expect(extractMentions('email me at hello@example.com or ping @jordan')).toEqual(['@jordan']);
  });

  it('should include digits and underscores in the mention body', () => {
    expect(extractMentions('shoutout to @user_123')).toEqual(['@user_123']);
  });

  it('should stop a mention at punctuation, without needing separate stripping', () => {
    expect(extractMentions('Thanks, @jordan!')).toEqual(['@jordan']);
  });

  it('should return an empty array when there are no mentions', () => {
    expect(extractMentions('No mentions here.')).toEqual([]);
  });

  it('should return an empty array for empty input', () => {
    expect(extractMentions('')).toEqual([]);
  });
});

describe('#extractHashtags', () => {
  it('should extract multiple hashtags from a sentence', () => {
    expect(extractHashtags('Just shipped v2! #typescript #opensource #buildinpublic')).toEqual([
      '#typescript',
      '#opensource',
      '#buildinpublic',
    ]);
  });

  it('should keep the leading # symbol', () => {
    expect(extractHashtags('so much #hype')).toEqual(['#hype']);
  });

  it('should not match "C#" as a hashtag', () => {
    expect(extractHashtags('Written in C#')).toEqual([]);
  });

  it('should include digits and underscores in the hashtag body', () => {
    expect(extractHashtags('#web3 #the_best')).toEqual(['#web3', '#the_best']);
  });

  it('should return an empty array when there are no hashtags', () => {
    expect(extractHashtags('No hashtags here.')).toEqual([]);
  });

  it('should return an empty array for empty input', () => {
    expect(extractHashtags('')).toEqual([]);
  });
});
