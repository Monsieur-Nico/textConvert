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
}

/**
 * Analyzes text and returns comprehensive statistics about it
 *
 * @param text The text to analyze
 * @param wordsPerMinute Reading speed in words per minute (default: 200)
 * @returns TextStatistics object with various metrics
 */
export function getTextStats(
  text: string,
  wordsPerMinute: number = 200
): TextStatistics {
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
  const paragraphCount =
    text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length || 1;

  // Calculate averages - fix for more accurate calculation
  let totalWordLength = 0;
  const words = text.split(/\s+/).filter((word) => word.length > 0);

  for (const word of words) {
    // Count only alphanumeric characters in words
    totalWordLength += word.replace(/[^a-zA-Z0-9]/g, '').length;
  }

  const averageWordLength =
    wordCount > 0 ? Math.round((totalWordLength / wordCount) * 10) / 10 : 0;

  const averageSentenceLength =
    sentenceCount > 0 ? Math.round((wordCount / sentenceCount) * 10) / 10 : 0;

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
