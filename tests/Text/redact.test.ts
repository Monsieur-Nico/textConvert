import { describe, expect, it } from 'vitest';
import { redact } from '../../src/textConvert';

describe('#redact', () => {
  it('should mask both an email and a phone number by default', () => {
    expect(redact('Contact me at jordan@example.com or 555-123-4567')).toBe(
      'Contact me at jo**************** or 55**********',
    );
  });

  it('should redact only the requested type', () => {
    expect(redact('Email: jordan@example.com', { types: ['email'] })).toBe(
      'Email: jo****************',
    );
    expect(redact('Call 555-123-4567', { types: ['phone'] })).toBe('Call 55**********');
  });

  it('should leave text unchanged when types is an empty array', () => {
    expect(redact('jordan@example.com', { types: [] })).toBe('jordan@example.com');
  });

  it('should support a custom mask character', () => {
    expect(redact('jordan@example.com', { maskChar: '#' })).toBe('jo################');
  });

  it('should mask every occurrence of a repeated match', () => {
    expect(redact('jordan@example.com appears twice: jordan@example.com')).toBe(
      'jo**************** appears twice: jo****************',
    );
  });

  it('should not swallow a trailing sentence period into a phone match', () => {
    expect(redact('Call (202) 555-0173.', { types: ['phone'] })).toBe('Call (2************.');
  });

  it('should reject a bare local number without an area code (matches isPhoneNumber)', () => {
    expect(redact('Room 202, call 555-0173.', { types: ['phone'] })).toBe(
      'Room 202, call 555-0173.',
    );
  });

  it('should not false-positive on unrelated numeric text', () => {
    expect(redact('Version 2024.03.15 build 10', { types: ['phone'] })).toBe(
      'Version 2024.03.15 build 10',
    );
  });

  it('should handle dotted and international phone formats', () => {
    expect(redact('555.123.4567 is my number.', { types: ['phone'] })).toBe(
      '55********** is my number.',
    );
    expect(redact('+1-202-555-0173 works too.', { types: ['phone'] })).toBe(
      '+1************* works too.',
    );
  });

  it('should return text unchanged when there is no PII', () => {
    expect(redact('No PII here.')).toBe('No PII here.');
  });

  it("should return 'Please provide a valid input text' for empty input", () => {
    expect(redact('')).toBe('Please provide a valid input text');
  });

  it('should mask a Luhn-valid credit card number, keeping the last 4 visible', () => {
    expect(redact('Card: 4111 1111 1111 1111', { types: ['creditCard'] })).toBe(
      'Card: ***************1111',
    );
    expect(redact('Card: 4111111111111111', { types: ['creditCard'] })).toBe(
      'Card: ************1111',
    );
    expect(redact('Card: 4111-1111-1111-1111', { types: ['creditCard'] })).toBe(
      'Card: ***************1111',
    );
  });

  it('should not redact a digit sequence that fails the Luhn checksum', () => {
    expect(redact('Order: 1234 5678 9012 3456', { types: ['creditCard'] })).toBe(
      'Order: 1234 5678 9012 3456',
    );
  });

  it('should include creditCard in the default types', () => {
    expect(redact('Card: 4111 1111 1111 1111')).toBe('Card: ***************1111');
  });

  it('should mask known API key/token formats when apiKey is requested', () => {
    // Built by concatenation, not as string literals: GitHub's push
    // protection flags any string matching these providers' key *format*
    // (prefix + length), real or not, so a literal fixture here would
    // itself get blocked as a "leaked secret" on push.
    const fakeAwsKey = 'AKIA' + 'IOSFODNN7EXAMPLE';
    const fakeGithubToken = 'ghp_' + 'X'.repeat(36);
    const fakeStripeKey = 'sk_live_' + 'X'.repeat(24);

    expect(redact(`Key: ${fakeAwsKey} leaked`, { types: ['apiKey'] })).toBe(
      'Key: ******************** leaked',
    );
    expect(redact(`Token: ${fakeGithubToken} leaked`, { types: ['apiKey'] })).toBe(
      'Token: **************************************** leaked',
    );
    expect(redact(`Stripe: ${fakeStripeKey} leaked`, { types: ['apiKey'] })).toBe(
      'Stripe: ******************************** leaked',
    );
  });

  it('should not match a bare/too-short prefix as an API key', () => {
    expect(redact('AKIA is short', { types: ['apiKey'] })).toBe('AKIA is short');
  });

  it('should not include apiKey in the default types (opt-in only)', () => {
    expect(redact('Key: AKIAIOSFODNN7EXAMPLE and card 4111 1111 1111 1111')).toBe(
      'Key: AKIAIOSFODNN7EXAMPLE and card ***************1111',
    );
  });

  it('should mask a public IPv4 address when ip is requested', () => {
    expect(redact('Server 10.0.0.5 hit by 203.0.113.42', { types: ['ip'] })).toBe(
      'Server 10.0.0.5 hit by ************',
    );
  });

  it('should not mask private, loopback, or link-local IPv4 addresses', () => {
    expect(
      redact('Private: 172.16.5.4 172.32.1.1 192.168.1.1 127.0.0.1 169.254.1.1', {
        types: ['ip'],
      }),
    ).toBe('Private: 172.16.5.4 ********** 192.168.1.1 127.0.0.1 169.254.1.1');
  });

  it('should not match an out-of-range octet or a leading-zero octet as an IP', () => {
    expect(redact('Bad: 999.1.1.1 and 192.168.001.1', { types: ['ip'] })).toBe(
      'Bad: 999.1.1.1 and 192.168.001.1',
    );
  });

  it('should not match a dotted number with the wrong segment count as an IP', () => {
    expect(redact('Version 1.2.3 released', { types: ['ip'] })).toBe('Version 1.2.3 released');
    expect(redact('Odd 1.2.3.4.5 here', { types: ['ip'] })).toBe('Odd 1.2.3.4.5 here');
  });

  it('should not match an octet that is empty or longer than 3 digits as an IP', () => {
    expect(redact('Bad 1..2.3 here', { types: ['ip'] })).toBe('Bad 1..2.3 here');
    expect(redact('Bad 1234.1.1.1 here', { types: ['ip'] })).toBe('Bad 1234.1.1.1 here');
  });

  it('should not include ip in the default types (opt-in only)', () => {
    expect(redact('Public 203.0.113.42')).toBe('Public 203.0.113.42');
  });

  it('should fully mask a structurally-valid JWT when jwt is requested', () => {
    // Built from real base64url-encoded segments, not a hardcoded token
    // literal -- makes the test's intent clear and sidesteps looking like
    // a pasted-in real secret.
    const encodeSegment = (payload: unknown) =>
      Buffer.from(JSON.stringify(payload), 'utf8')
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    const header = encodeSegment({ alg: 'HS256', typ: 'JWT' });
    const payload = encodeSegment({ sub: '1234567890', name: 'Jordan' });
    const signature = 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const jwt = `${header}.${payload}.${signature}`;

    expect(redact(`Authorization: Bearer ${jwt}`, { types: ['jwt'] })).toBe(
      `Authorization: Bearer ${'*'.repeat(jwt.length)}`,
    );
  });

  it('should not match a 3-segment string whose header is not valid JSON', () => {
    expect(redact('not.a.jwt', { types: ['jwt'] })).toBe('not.a.jwt');
  });

  it('should not crash and should reject a header segment that is not validly-padded base64', () => {
    // A 1-character header pads to 3 '=' signs, which is structurally
    // invalid base64 no matter how it's padded -- atob() throws on this
    // rather than silently decoding garbage, so this exercises
    // base64UrlDecode's own catch branch, not just JSON.parse's.
    const text = 'token A.eyJhbGciOiJIUzI1NiJ9.sig here';
    expect(redact(text, { types: ['jwt'] })).toBe(text);
  });

  it('should not include jwt in the default types (opt-in only)', () => {
    const encodeSegment = (payload: unknown) =>
      Buffer.from(JSON.stringify(payload), 'utf8')
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    const header = encodeSegment({ alg: 'HS256' });
    const payload = encodeSegment({ sub: '1234567890' });
    const jwt = `${header}.${payload}.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;

    expect(redact(`Bearer ${jwt}`)).toBe(`Bearer ${jwt}`);
  });
});
