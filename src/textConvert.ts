import {
  camelCase,
  capitalize,
  kebabCase,
  pascalCase,
  snakeCase,
  titleCase,
} from './text/conventions';

import { detectLanguage, Language, LanguageDetectionResult } from './text/analysis/language';
import { getTextStats, TextStatistics } from './text/analysis/statistics';
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
import { redact, RedactOptions } from './text/redact';
import { reverse } from './text/reverse';
import { sanitize, SanitizeOptions } from './text/sanitize';
import { spread } from './text/spread';
import { isEmail } from './text/validation/email';
import { isPhoneNumber } from './text/validation/phoneNumber';
import { isUrl } from './text/validation/url';
import { numbersToWords } from './numbers/numbersToWords';
import { ordinal } from './numbers/ordinal';
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
  getTextStats,
  isEmail,
  isPalindrome,
  isPhoneNumber,
  isUrl,
  kebabCase,
  Language,
  LanguageDetectionResult,
  maskText,
  normalizeLineEndings,
  normalizeWhitespace,
  numbersToWords,
  ordinal,
  pascalCase,
  pluralize,
  randomString,
  redact,
  RedactOptions,
  removeDiacritics,
  reverse,
  sanitize,
  SanitizeOptions,
  slugify,
  snakeCase,
  spread,
  TextStatistics,
  titleCase,
  truncate,
  unescapeHtml,
  wordFrequency,
};
