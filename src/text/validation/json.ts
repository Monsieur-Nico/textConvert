/**
 * Checks whether a string is syntactically valid JSON.
 *
 * @param text - The JSON text to validate.
 * @returns `true` for valid JSON text, otherwise `false`.
 * @remarks
 * Accepts every JSON value, including arrays, strings, numbers, booleans, and
 * `null`, not just objects. Syntax is determined by `JSON.parse`: surrounding
 * JSON whitespace and duplicate object keys are accepted; comments, trailing
 * commas, and a leading byte-order mark are rejected. This checks syntax only,
 * not a schema, numeric precision, or whether parsed data is safe to use.
 * Empty, whitespace-only, and non-string inputs return `false` without coercion.
 *
 * @example
 * ```ts
 * isValidJson('{"a":1}'); // true
 * isValidJson('null'); // true
 * isValidJson('{a:1}'); // false
 * ```
 */
export function isValidJson(text: string): boolean {
  if (typeof text !== 'string') return false;

  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
}
