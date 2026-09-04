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
});
