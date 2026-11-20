import { describe, expect, it, vi } from 'vitest';
import { isValidJson } from '../../../src/textConvert';

describe('#isValidJson', () => {
  it.each([
    '{}',
    '[]',
    '{"a":1,"nested":[true,null,"text"]}',
    '"hello"',
    '""',
    '0',
    '-1.5e+2',
    'true',
    'false',
    'null',
    ' \t\r\n{"a":1}\n',
    '{"a":1,"a":2}',
    '1e400',
  ])('accepts valid JSON: %s', (text) => expect(isValidJson(text)).toBe(true));

  it.each([
    '',
    '   ',
    '{a:1}',
    "{'a':1}",
    '{"a":1,}',
    '[1,]',
    'undefined',
    'NaN',
    'Infinity',
    '01',
    '+1',
    '// comment\n{}',
    '{} {}',
    '"unterminated',
    '"line\nbreak"',
    '\uFEFF{}',
    '\u00a0{}',
  ])('rejects invalid JSON: %s', (text) => expect(isValidJson(text)).toBe(false));

  it.each(
    [undefined, null, 123, true, {}, ['null'], new String('null')].map((input) => ({ input })),
  )('rejects non-string input without coercion: $input', ({ input }) =>
    expect(isValidJson(input as unknown as string)).toBe(false),
  );

  it('does not call user-defined string coercion', () => {
    const toString = vi.fn(() => 'null');
    expect(isValidJson({ toString } as unknown as string)).toBe(false);
    expect(toString).not.toHaveBeenCalled();
  });
});
