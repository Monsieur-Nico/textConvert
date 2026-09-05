import { count, countSentences, countWords } from '../count';

/**
 * Text statistics interface containing various metrics about text
 */
export interface TextStatistics {
  /**
   * Total character count including whitespace and punctuation
   */
  characterCount: number;

  /**
   * Character count excluding whitespace
   */
  characterCountNoSpaces: number;

  /**
   * Letter count (only alphabetic characters)
   */
  letterCount: number;

  /**
   * Letter and number count (alphanumeric characters)
   */
  alphanumericCount: number;

  /**
   * Word count in the text
   */
  wordCount: number;

  /**
   * Sentence count in the text
   */
  sentenceCount: number;

  /**
   * Paragraph count in the text (separated by 2+ newlines)
   */
  paragraphCount: number;

  /**
   * Average word length in characters
   */
  averageWordLength: number;

  /**
   * Average sentence length in words
   */
  averageSentenceLength: number;

  /**
   * Estimated reading time in seconds (based on average reading speed)
   */
  readingTimeSeconds: number;

  /**
   * Estimated reading time as formatted string (e.g., "2 min 30 sec")
   */
  readingTimeFormatted: string;

  /**
   * Flesch Reading Ease score (higher is easier to read; roughly 0-100,
   * though the formula can produce values outside that range for unusual
   * text). Estimated from word/sentence counts and a syllable-count
   * heuristic -- see {@link estimateSyllables}'s documentation for its
   * known accuracy limits.
   */
  fleschReadingEase: number;

  /**
   * Flesch-Kincaid Grade Level score (approximate U.S. school grade level
   * needed to understand the text). Subject to the same syllable-estimate
   * accuracy limits as {@link fleschReadingEase}.
   */
  fleschKincaidGrade: number;
}

// Estimates a word's syllable count by counting vowel groups (a run of
// consecutive vowels counts as one syllable), adjusting for a silent
// trailing 'e' (e.g. "like" is one syllable, not two). This is a cheap
// heuristic, not a dictionary lookup -- it gets simple, common words right
// ("cat" -> 1, "table" -> 2, "beautiful" -> 3) but is known to
// misestimate real irregulars (e.g. "rhythm", which has no written vowel
// in its second syllable). Readability scores computed from it should be
// read as estimates, not precise measurements, for exactly that reason.
function estimateSyllables(word: string): number {
  const lower = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!lower) return 0;

  const vowelGroups = lower.match(/[aeiouy]+/g) ?? [];
  let syllables = vowelGroups.length;

  // "table" ends in "le" after a consonant, which counts as its own
  // syllable ("ta-ble"), so only drop a trailing silent 'e' when it's NOT
  // part of that pattern.
  if (lower.endsWith('e') && !lower.endsWith('le') && syllables > 1) {
    syllables--;
  }

  return Math.max(syllables, 1);
}

/**
 * Analyzes text and returns comprehensive statistics about it
 *
 * @param text The text to analyze
 * @param wordsPerMinute Reading speed in words per minute (default: 200)
 * @returns TextStatistics object with various metrics
 * @example
 * getTextStats('Hello world! This is a test.');
 * // {
 * //   characterCount: 28,
 * //   characterCountNoSpaces: 23,
 * //   letterCount: 21,
 * //   alphanumericCount: 21,
 * //   wordCount: 6,
 * //   sentenceCount: 2,
 * //   paragraphCount: 1,
 * //   averageWordLength: 3.5,
 * //   averageSentenceLength: 3,
 * //   readingTimeSeconds: 2,
 * //   readingTimeFormatted: '2 sec',
 * //   fleschReadingEase: 105.1,
 * //   fleschKincaidGrade: -0.7
 * // }
 */
export function getTextStats(text: string, wordsPerMinute: number = 200): TextStatistics {
  // Handle empty input
  if (!text || !text.trim()) {
    return {
      characterCount: 0,
      characterCountNoSpaces: 0,
      letterCount: 0,
      alphanumericCount: 0,
      wordCount: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      averageWordLength: 0,
      averageSentenceLength: 0,
      readingTimeSeconds: 0,
      readingTimeFormatted: '0 sec',
      fleschReadingEase: 0,
      fleschKincaidGrade: 0,
    };
  }

  // Basic counts
  const characterCount = text.length;
  const characterCountNoSpaces = text.replace(/\s/g, '').length;
  const letterCount = count(text);
  const alphanumericCount = count(text, true);
  const wordCount = countWords(text);
  const sentenceCount = countSentences(text);

  // Paragraph count (separated by 2+ newlines)
  const paragraphCount = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length || 1;

  // Calculate averages - fix for more accurate calculation
  let totalWordLength = 0;
  const words = text.split(/\s+/).filter((word) => word.length > 0);

  for (const word of words) {
    // Count only alphanumeric characters in words
    totalWordLength += word.replace(/[^a-zA-Z0-9]/g, '').length;
  }

  const averageWordLength = wordCount > 0 ? Math.round((totalWordLength / wordCount) * 10) / 10 : 0;

  const averageSentenceLength =
    sentenceCount > 0 ? Math.round((wordCount / sentenceCount) * 10) / 10 : 0;

  // Readability scores (Flesch Reading Ease / Flesch-Kincaid Grade Level),
  // both needing a total syllable count across the same word list used
  // for averageWordLength above.
  let totalSyllables = 0;
  for (const word of words) {
    const cleaned = word.replace(/[^a-zA-Z]/g, '');
    if (cleaned) totalSyllables += estimateSyllables(cleaned);
  }

  const canScore = wordCount > 0 && sentenceCount > 0;
  const wordsPerSentence = canScore ? wordCount / sentenceCount : 0;
  const syllablesPerWord = canScore ? totalSyllables / wordCount : 0;

  const fleschReadingEase = canScore
    ? Math.round((206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord) * 10) / 10
    : 0;

  const fleschKincaidGrade = canScore
    ? Math.round((0.39 * wordsPerSentence + 11.8 * syllablesPerWord - 15.59) * 10) / 10
    : 0;

  // Calculate reading time
  const wordsPerSecond = wordsPerMinute / 60;
  const readingTimeSeconds = Math.round(wordCount / wordsPerSecond);

  // Format reading time
  const readingTimeFormatted = formatReadingTime(readingTimeSeconds);

  return {
    characterCount,
    characterCountNoSpaces,
    letterCount,
    alphanumericCount,
    wordCount,
    sentenceCount,
    paragraphCount,
    averageWordLength,
    averageSentenceLength,
    readingTimeSeconds,
    readingTimeFormatted,
    fleschReadingEase,
    fleschKincaidGrade,
  };
}

/**
 * Formats reading time in seconds to a readable string
 *
 * @param seconds Total seconds
 * @returns Formatted string (e.g., "2 min 30 sec")
 */
function formatReadingTime(seconds: number): string {
  if (seconds === 0) return '0 sec';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds} sec`;
  } else if (remainingSeconds === 0) {
    return `${minutes} min`;
  } else {
    return `${minutes} min ${remainingSeconds} sec`;
  }
}
