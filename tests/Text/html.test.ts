import { describe, expect, it } from 'vitest';
import { escapeHtml, unescapeHtml } from '../../src/textConvert';

describe('#escapeHtml', () => {
  it('should escape all five special characters', () => {
    expect(escapeHtml('<script>alert("hi")</script>')).toBe(
      '&lt;script&gt;alert(&quot;hi&quot;)&lt;/script&gt;',
    );
  });

  it('should escape an ampersand', () => {
    expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
  });

  it('should escape a single quote as the hex numeric reference &#x27;', () => {
    expect(escapeHtml("It's a test")).toBe('It&#x27;s a test');
  });

  it('should not double-escape an ampersand introduced by another escape', () => {
    expect(escapeHtml('<')).toBe('&lt;');
    expect(escapeHtml('<')).not.toBe('&amp;lt;');
  });

  it('should leave text with no special characters unchanged', () => {
    expect(escapeHtml('hello world')).toBe('hello world');
  });

  it('should return an error message for empty input', () => {
    expect(escapeHtml('')).toBe('Please provide a valid input text');
  });
});

describe('#unescapeHtml', () => {
  it('should unescape all five special characters', () => {
    expect(unescapeHtml('&lt;script&gt;alert(&quot;hi&quot;)&lt;/script&gt;')).toBe(
      '<script>alert("hi")</script>',
    );
  });

  it('should unescape an ampersand entity', () => {
    expect(unescapeHtml('Tom &amp; Jerry')).toBe('Tom & Jerry');
  });

  it('should unescape both the hex and decimal apostrophe forms', () => {
    expect(unescapeHtml('It&#x27;s a test')).toBe("It's a test");
    expect(unescapeHtml('It&#39;s a test')).toBe("It's a test");
  });

  it('should unescape the named &apos; form even though escapeHtml never produces it', () => {
    expect(unescapeHtml('It&apos;s a test')).toBe("It's a test");
  });

  it('should round-trip with escapeHtml', () => {
    const original = '<div class="a">Tom & Jerry\'s "great" show</div>';
    expect(unescapeHtml(escapeHtml(original))).toBe(original);
  });

  it('should leave entities it does not recognize untouched (not a general HTML entity decoder)', () => {
    expect(unescapeHtml('Caf&eacute; &nbsp; &#65;')).toBe('Caf&eacute; &nbsp; &#65;');
  });

  it('should leave text with no entities unchanged', () => {
    expect(unescapeHtml('hello world')).toBe('hello world');
  });

  it('should return an error message for empty input', () => {
    expect(unescapeHtml('')).toBe('Please provide a valid input text');
  });
});
