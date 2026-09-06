import { describe, expect, it } from 'vitest';
import { scan } from '../../src/textConvert';

describe('#scan', () => {
  it('should return each default-type match with its position', () => {
    expect(scan('Contact jordan@example.com, card 4111 1111 1111 1111')).toEqual([
      { type: 'email', value: 'jordan@example.com', start: 8, end: 26 },
      { type: 'creditCard', value: '4111 1111 1111 1111', start: 33, end: 52 },
    ]);
  });

  it('should return a separate entry for each repeated occurrence of the same value', () => {
    expect(scan('jordan@example.com appears twice: jordan@example.com')).toEqual([
      { type: 'email', value: 'jordan@example.com', start: 0, end: 18 },
      { type: 'email', value: 'jordan@example.com', start: 34, end: 52 },
    ]);
  });

  it('should sort matches by position regardless of which type found them', () => {
    const matches = scan(
      'Card 4111 1111 1111 1111 then email jordan@example.com then 555-123-4567',
      { types: ['email', 'phone', 'creditCard'] },
    );

    expect(matches.map((match) => match.type)).toEqual(['creditCard', 'email', 'phone']);
    expect(matches).toEqual([
      { type: 'creditCard', value: '4111 1111 1111 1111', start: 5, end: 24 },
      { type: 'email', value: 'jordan@example.com', start: 36, end: 54 },
      { type: 'phone', value: '555-123-4567', start: 60, end: 72 },
    ]);
  });

  it('should return an empty array for empty input', () => {
    expect(scan('')).toEqual([]);
  });

  it('should return an empty array when there is nothing to find', () => {
    expect(scan('No PII here.')).toEqual([]);
  });

  it('should not include apiKey, ip, or jwt in the default types', () => {
    const fakeAwsKey = 'AKIA' + 'IOSFODNN7EXAMPLE';
    expect(scan(`Key: ${fakeAwsKey} and card 4111 1111 1111 1111`)).toEqual([
      { type: 'creditCard', value: '4111 1111 1111 1111', start: 35, end: 54 },
    ]);
  });

  it('should find an API key match with its position when apiKey is requested', () => {
    const fakeAwsKey = 'AKIA' + 'IOSFODNN7EXAMPLE';
    expect(scan(`Key: ${fakeAwsKey} leaked`, { types: ['apiKey'] })).toEqual([
      { type: 'apiKey', value: fakeAwsKey, start: 5, end: 25 },
    ]);
  });

  it('should only match a public IPv4 address when ip is requested', () => {
    expect(scan('Server 10.0.0.5 hit by 203.0.113.42', { types: ['ip'] })).toEqual([
      { type: 'ip', value: '203.0.113.42', start: 23, end: 35 },
    ]);
  });

  it('should find a structurally-valid JWT match with its position when jwt is requested', () => {
    // Built from real base64url-encoded segments, not a hardcoded token
    // literal -- mirrors the same precaution redact.test.ts takes.
    const encodeSegment = (payload: unknown) =>
      Buffer.from(JSON.stringify(payload), 'utf8')
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    const header = encodeSegment({ alg: 'HS256', typ: 'JWT' });
    const payload = encodeSegment({ sub: '1234567890' });
    const signature = 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const jwt = `${header}.${payload}.${signature}`;

    expect(scan(`Bearer ${jwt}`, { types: ['jwt'] })).toEqual([
      { type: 'jwt', value: jwt, start: 7, end: 7 + jwt.length },
    ]);
  });

  it('should return no matches for an empty types array', () => {
    expect(scan('jordan@example.com', { types: [] })).toEqual([]);
  });
});
