import {
  camelCase,
  capitalize,
  kebabCase,
  pascalCase,
  snakeCase,
  titleCase,
} from './text/conventions';

import { detectLanguage, Language, type LanguageDetectionResult } from './text/analysis/language';
import { getTextStats, type TextStatistics } from './text/analysis/statistics';
import { wordFrequency } from './text/analysis/wordFrequency';
import { clear } from './text/clear';
import { count, countSentences, countWords } from './text/count';
import { extractEmails, extractHashtags, extractMentions, extractUrls } from './text/extract';
import { escapeHtml, unescapeHtml } from './text/html';
import { isPalindrome } from './text/isPalindrome';
import { maskText } from './text/mask';
import { normalizeLineEndings, normalizeWhitespace, removeDiacritics } from './text/normalize';
import { pluralize } from './text/pluralize';
import { randomString } from './text/randomString';
import { redact, type RedactOptions } from './text/redact';
import { reverse } from './text/reverse';
import { sanitize, type SanitizeOptions } from './text/sanitize';
import { scan, type ScanMatch, type ScanOptions } from './text/scan';
import { spread } from './text/spread';
import { isValidJson } from './text/validation/json';
import { isEmail } from './text/validation/email';
import { isPhoneNumber } from './text/validation/phoneNumber';
import { isUrl } from './text/validation/url';
import { formatNumber, type FormatNumberOptions } from './numbers/formatNumber';
import { numbersToWords } from './numbers/numbersToWords';
import { ordinal } from './numbers/ordinal';
import { ordinalToWords } from './numbers/ordinalToWords';
import { parseNumber } from './numbers/parseNumber';
import { wordsToNumber } from './numbers/wordsToNumber';
import { slugify } from './text/slugify';
import { truncate } from './text/truncate';

export {
  camelCase,
  capitalize,
  clear,
  count,
  countSentences,
  countWords,
  detectLanguage,
  escapeHtml,
  extractEmails,
  extractHashtags,
  extractMentions,
  extractUrls,
  formatNumber,
  type FormatNumberOptions,
  getTextStats,
  isEmail,
  isPalindrome,
  isPhoneNumber,
  isUrl,
  isValidJson,
  kebabCase,
  Language,
  type LanguageDetectionResult,
  maskText,
  normalizeLineEndings,
  normalizeWhitespace,
  numbersToWords,
  ordinal,
  ordinalToWords,
  parseNumber,
  pascalCase,
  pluralize,
  randomString,
  redact,
  type RedactOptions,
  removeDiacritics,
  reverse,
  sanitize,
  type SanitizeOptions,
  scan,
  type ScanMatch,
  type ScanOptions,
  slugify,
  snakeCase,
  spread,
  type TextStatistics,
  titleCase,
  truncate,
  unescapeHtml,
  wordFrequency,
  wordsToNumber,
};
