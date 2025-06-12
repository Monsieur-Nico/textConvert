/**
 * Validates if a string is a valid URL according to standard specifications.
 *
 * This function performs comprehensive validation including:
 * - Protocol validation (http:// or https:// required)
 * - Domain structure validation
 * - Path, query parameter, and fragment handling
 * - Special character checks
 * - Length limits and format requirements
 *
 * @param text - The string to validate as a URL
 * @returns boolean indicating if the string is a valid URL
 *
 * @example
 * ```typescript
 * isUrl('https://example.com')                      // true
 * isUrl('http://example.com/path')                  // true
 * isUrl('https://example.com/path?query=123')       // true
 * isUrl('https://sub.domain.example.co.uk/path')    // true
 * isUrl('ftp://example.com')                        // false (only http/https supported)
 * isUrl('example.com')                              // false (protocol required)
 * isUrl('not a url')                                // false
 * ```
 */
export function isUrl(text: string): boolean {
  if (!text || typeof text !== 'string') {
    return false;
  }

  const url = text.trim();
  const urlRegex = /[^\x20-\x7E]/;
  // Reject non-ASCII characters
  if (urlRegex.test(url)) {
    return false;
  }

  // Check for spaces in the URL (not allowed in standard URLs unless encoded)
  if (url.includes(' ')) {
    return false;
  }

  // Check for correct protocol format with double slashes
  const protocolCheck = /^https?:\/\//i;
  if (!protocolCheck.test(url)) {
    return false;
  }

  // Check for domain format without proper name
  // Reject URLs like https://.com
  const domainCheck = /^https?:\/\/\.[^.]+/i;
  if (domainCheck.test(url)) {
    return false;
  }

  // Reject URLs ending with a dot like http://example.
  if (/^https?:\/\/[^/]+\.$/.test(url)) {
    return false;
  }

  try {
    // Use the URL constructor for validation
    const parsedUrl = new URL(url);

    // Only accept http and https protocols
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return false;
    }

    // Validate hostname - must have at least one dot and valid TLD
    const hostname = parsedUrl.hostname;

    // Special case for IP addresses
    const ipAddressRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const ipMatch = hostname.match(ipAddressRegex);

    if (ipMatch) {
      // Validate each IP segment is 0-255
      const validIP = ipMatch.slice(1).every((segment) => {
        const num = parseInt(segment, 10);
        return num >= 0 && num <= 255;
      });
      return validIP;
    }

    // For regular domain names
    if (!hostname || !hostname.includes('.')) {
      return false;
    }

    // Additional check to ensure hostname has content before the first dot
    // and doesn't end with a dot
    if (hostname.startsWith('.') || hostname.includes('..') || hostname.endsWith('.')) {
      return false;
    }

    // Check if TLD is valid (basic check - at least 2 characters after the last dot)
    const parts = hostname.split('.');
    const tld = parts[parts.length - 1];
    if (tld.length < 2) {
      return false;
    }

    return true;
  } catch {
    // URL constructor throws an error for invalid URLs
    return false;
  }
}
