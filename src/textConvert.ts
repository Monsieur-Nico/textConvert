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
import { clear } from './text/clear';
import { count, countSentences, countWords } from './text/count';
import { extractEmails, extractHashtags, extractMentions, extractUrls } from './text/extract';
import { isPalindrome } from './text/isPalindrome';
import { maskText } from './text/mask';
import { redact } from './text/redact';
import { reverse } from './text/reverse';
import { spread } from './text/spread';
import { isEmail } from './text/validation/email';
import { isPhoneNumber } from './text/validation/phoneNumber';
import { isUrl } from './text/validation/url';
import { numbersToWords } from './numbers/numbersToWords';
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
  numbersToWords,
  pascalCase,
  redact,
  reverse,
  slugify,
  snakeCase,
  spread,
  TextStatistics,
  titleCase,
  truncate,
};
