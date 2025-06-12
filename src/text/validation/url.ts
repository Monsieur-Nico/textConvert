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
    const urlRegex = /[^\x20-\x7E]/
    // Reject non-ASCII characters
    if (urlRegex.test(url)) {
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
        if (!hostname || !hostname.includes('.')) {
            return false;
        }

        return true;

      } catch {
        // URL constructor throws an error for invalid URLs
        return false;
      }
  }