import { camelCase, kebabCase, pascalCase, snakeCase } from './text/conventions';

import { detectLanguage, Language, LanguageDetectionResult } from './text/analysis/language';
import { getTextStats } from './text/analysis/statistics';
import { clear } from './text/clear';
import { count, countSentences, countWords } from './text/count';
import { reverse } from './text/reverse';
import { spread } from './text/spread';
import { isEmail } from './text/validation/email';
import { isUrl } from './text/validation/url';
import { numbersToWords } from './numbers/numbersToWords';

export {
  camelCase,
  clear,
  count,
  countSentences,
  countWords,
  detectLanguage,
  getTextStats,
  isEmail,
  isUrl,
  kebabCase,
  Language,
  LanguageDetectionResult,
  numbersToWords,
  pascalCase,
  reverse,
  snakeCase,
  spread,
};
