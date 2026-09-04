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
});
