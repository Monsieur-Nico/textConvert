import { camelCase, kebabCase, pascalCase, snakeCase } from './Text/conventions';

import { detectLanguage, Language, LanguageDetectionResult } from './Text/analysis/language';
import { getTextStats } from './Text/analysis/statistics';
import { clear } from './Text/clear';
import { count, countSentences, countWords } from './Text/count';
import { reverse } from './Text/reverse';
import { spread } from './Text/spread';
import { isEmail } from './Text/Validation/email';

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
  kebabCase,
  Language,
  LanguageDetectionResult,
  numbersToWords,
  pascalCase,
  reverse,
  snakeCase,
  spread,
};
