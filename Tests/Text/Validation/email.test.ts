import { describe, expect, it } from 'vitest';
import { isEmail } from '../../../src/Text/Validation/email';

describe('#isEmail', () => {
  // Valid email addresses
  it('should return true for valid email addresses', () => {
    const validEmails = [
      'user@example.com',
      'user.name@example.com',
      'user+tag@example.com',
      'user@subdomain.example.com',
      'user@example.co.uk',
      'user@example.io',
      'user@example-domain.com',
      '123@example.com',
      'user@123.com',
      'user.name+tag@example.com',
      'user-name@example.com',
      'user_name@example.com',
      'user.name@sub-domain.example.com',
      'user@example-domain.com',
      'user@example.com',
      'user@example.co.uk',
      'user@example.io',
      'user@example.com',
      'user@example.co.uk',
      'user@example.io',
    ];

    validEmails.forEach((email) => {
      expect(isEmail(email)).toBe(true);
    });
  });

  // Invalid email addresses
  it('should return false for invalid email addresses', () => {
    const invalidEmails = [
      '',
      'plainaddress',
      '@example.com',
      'user@',
      'user@example',
      'user@.com',
      'user@example.',
      'user@example..com',
      'user@-example.com',
      'user@example.com-',
      'user@example.com_',
      'user@example.com.',
      'user@example.com-',
      'user@example.com_',
      'user name@example.com',
      'user@example com',
      'user@example,com',
      'user@example;com',
      'user@example:com',
      'user@example/com',
      'user@example\\com',
      'user@example[com',
      'user@example]com',
      'user@example{com',
      'user@example}com',
      'user@example|com',
      'user@example~com',
      'user@example`com',
      "user@example'com",
      'user@example"com',
      'user@example<com',
      'user@example>com',
      'user@example=com',
      'user@example+com',
      'user@example*com',
      'user@example&com',
      'user@example^com',
      'user@example%com',
      'user@example$com',
      'user@example#com',
      'user@example@com',
      'user@example!com',
      'user@example?com',
      'user@example/com',
      'user@example\\com',
      'user@example[com',
      'user@example]com',
      'user@example{com',
      'user@example}com',
      'user@example|com',
      'user@example~com',
      'user@example`com',
      "user@example'com",
      'user@example"com',
      'user@example<com',
      'user@example>com',
      'user@example=com',
      'user@example+com',
      'user@example*com',
      'user@example&com',
      'user@example^com',
      'user@example%com',
      'user@example$com',
      'user@example#com',
      'user@example@com',
      'user@example!com',
      'user@example?com',
    ];

    invalidEmails.forEach((email) => {
      if (isEmail(email)) {
        console.log('Invalid email accepted as valid:', email);
      }
      expect(isEmail(email)).toBe(false);
    });
  });

  // Edge cases
  it('should handle edge cases correctly', () => {
    // @ts-expect-error Testing null input
    expect(isEmail(null)).toBe(false);
    // @ts-expect-error Testing undefined input
    expect(isEmail(undefined)).toBe(false);
    // @ts-expect-error Testing number input
    expect(isEmail(123)).toBe(false);
    // @ts-expect-error Testing object input
    expect(isEmail({})).toBe(false);
    // @ts-expect-error Testing array input
    expect(isEmail([])).toBe(false);
    // @ts-expect-error Testing boolean input
    expect(isEmail(true)).toBe(false);
    // @ts-expect-error Testing boolean input
    expect(isEmail(false)).toBe(false);
  });
});
