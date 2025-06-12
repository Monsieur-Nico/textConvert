import { describe, expect, it } from 'vitest';
import { isUrl } from '../../../src/text/validation/url';

describe('#isUrl', () => {
  // Valid URLs
  it('should return true for valid URLs', () => {
    const validUrls = [
      'https://example.com',
      'http://example.com',
      'https://www.example.com',
      'http://sub.example.com',
      'https://example.com/path',
      'http://example.com/path/to/resource',
      'https://example.com/path?query=123',
      'http://example.com/path?query=123&key=value',
      'https://example.com/path?query=123#fragment',
      'http://example.co.uk',
      'https://example.io',
      'http://example.com:8080',
      'https://user:password@example.com',
      'http://123.123.123.123',
      'https://123.123.123.123/path',
      'http://sub.domain.example.co.uk/path',
      'https://example.com/path/file.html',
      'http://example.com/path/to/file.html?query=string#fragment',
      'https://example-domain.com',
      'http://example.com/path-with-dashes',
    ];

    validUrls.forEach((url) => {
      expect(isUrl(url)).toBe(true);
    });
  });

  // Invalid URLs
  it('should return false for invalid URLs', () => {
    const invalidUrls = [
      '',
      'not a url',
      'example.com', // Missing protocol
      'www.example.com', // Missing protocol
      'ftp://example.com', // Wrong protocol
      'gopher://example.com', // Wrong protocol
      'mailto:user@example.com', // Wrong protocol
      'http:/example.com', // Invalid format
      'https:example.com', // Invalid format
      'http://', // Missing domain
      'https://', // Missing domain
      'http://example', // Missing TLD
      'https://.com', // Missing domain name
      'http://example.', // Incomplete domain
      'https://example..com', // Double dot
      'http:// example.com', // Space in URL
      'https://example.com path', // Space in URL
      'http://exa mple.com', // Space in domain
      'https://example.com/pa th', // Space in path
      'http://example.com/path?q=hello world', // Unencoded space in query
      'https://ex ample.com', // Space in domain name
      'http://,' + 'x'.repeat(2000), // Too long
      'https:///path', // Missing domain
      'http://?query=123', // Missing domain
      'https://#fragment', // Missing domain
      'http://[::1]', // IPv6 (not explicitly supported)
    ];

    invalidUrls.forEach((url) => {
      if (isUrl(url)) {
        console.log('Invalid URL accepted as valid:', url);
      }
      expect(isUrl(url)).toBe(false);
    });
  });

  // Special and edge cases
  it('should handle special and edge cases correctly', () => {
    // Unicode characters (should be rejected)
    expect(isUrl('https://例子.测试')).toBe(false);
    expect(isUrl('http://üñîçøðé.com')).toBe(false);

    // IDN domains should be passed as punycode in your implementation
    expect(isUrl('http://xn--p1ai.ru')).toBe(true); // punycode for Cyrillic .рф

    // IP addresses
    expect(isUrl('http://127.0.0.1')).toBe(true);
    expect(isUrl('https://192.168.0.1/admin')).toBe(true);
    expect(isUrl('http://0.0.0.0')).toBe(true);
    expect(isUrl('https://255.255.255.255')).toBe(true);

    // Invalid IP addresses
    expect(isUrl('http://999.999.999.999')).toBe(false);
    expect(isUrl('http://256.0.0.1')).toBe(false);

    // Length limits
    expect(isUrl('http://' + 'a'.repeat(253))).toBe(false); // Domain too long
  });

  // Edge cases for various input types
  it('should handle non-string inputs correctly', () => {
    // @ts-expect-error Testing null input
    expect(isUrl(null)).toBe(false);
    // @ts-expect-error Testing undefined input
    expect(isUrl(undefined)).toBe(false);
    // @ts-expect-error Testing number input
    expect(isUrl(123)).toBe(false);
    // @ts-expect-error Testing object input
    expect(isUrl({})).toBe(false);
    // @ts-expect-error Testing array input
    expect(isUrl([])).toBe(false);
    // @ts-expect-error Testing boolean input
    expect(isUrl(true)).toBe(false);
    // @ts-expect-error Testing boolean input
    expect(isUrl(false)).toBe(false);
  });
});
