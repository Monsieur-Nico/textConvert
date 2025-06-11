import { describe, expect, it } from 'vitest';
import { getTextStats } from '../../../src/Text/Analysis/statistics';

describe('#getTextStats', () => {
  it('should return empty stats for empty input', () => {
    const stats = getTextStats('');
    expect(stats.characterCount).toBe(0);
    expect(stats.letterCount).toBe(0);
    expect(stats.alphanumericCount).toBe(0);
    expect(stats.wordCount).toBe(0);
    expect(stats.sentenceCount).toBe(0);
  });

  it('should correctly count characters with spaces', () => {
    const stats = getTextStats('Hello world');
    expect(stats.characterCount).toBe(11);
  });

  it('should correctly count characters without spaces', () => {
    const stats = getTextStats('Hello world');
    expect(stats.characterCountNoSpaces).toBe(10);
  });

  it('should correctly count words', () => {
    const stats = getTextStats('Hello world. This is a test.');
    expect(stats.wordCount).toBe(6);
  });

  it('should correctly count sentences', () => {
    const stats = getTextStats('Hello world. This is a test.');
    expect(stats.sentenceCount).toBe(2);
  });

  it('should correctly count paragraphs', () => {
    const text = 'This is paragraph one.\n\nThis is paragraph two.';
    const stats = getTextStats(text);
    expect(stats.paragraphCount).toBe(2);
  });

  it('should handle single paragraph case correctly', () => {
    const text = 'This is a single paragraph with no newlines.';
    const stats = getTextStats(text);
    expect(stats.paragraphCount).toBe(1);
  });

  it('should calculate average word length', () => {
    const stats = getTextStats('The quick brown fox');
    expect(stats.averageWordLength).toBe(4);
  });

  it('should calculate average sentence length', () => {
    const stats = getTextStats('Hello world. This is a test.');
    expect(stats.averageSentenceLength).toBe(3);
  });

  it('should handle zero word count when calculating average word length', () => {
    const text = '!!!...???'; // No actual words, just punctuation
    const stats = getTextStats(text);
    expect(stats.wordCount).toBe(0);
    expect(stats.averageWordLength).toBe(0);
  });
  it('should handle zero sentence count when calculating average sentence length', () => {
    // This tests handling zero division in averageSentenceLength calculation
    const text = 'no sentence ending punctuation here'; // No period, no sentence count
    const stats = getTextStats(text);
    expect(stats.sentenceCount).toBe(1);
    expect(stats.averageSentenceLength).toBe(stats.wordCount);
  });

  it('should calculate reading time', () => {
    // 200 words at 200 wpm = 1 minute
    const text = Array(200).fill('word').join(' ');
    const stats = getTextStats(text, 200);
    expect(stats.readingTimeSeconds).toBe(60);
    expect(stats.readingTimeFormatted).toBe('1 min');
  });

  it('should format reading time correctly for seconds only', () => {
    const text = Array(20).fill('word').join(' ');
    const stats = getTextStats(text, 200);
    expect(stats.readingTimeFormatted).toBe('6 sec');
  });

  it('should format reading time correctly for minutes and seconds', () => {
    const text = Array(250).fill('word').join(' ');
    const stats = getTextStats(text, 200);
    expect(stats.readingTimeFormatted).toBe('1 min 15 sec');
  });

  it('should format reading time correctly for zero seconds', () => {
    // This tests line 147 in formatReadingTime function
    const stats = getTextStats('', 200); // Empty text has 0 reading time
    expect(stats.readingTimeSeconds).toBe(0);
    expect(stats.readingTimeFormatted).toBe('0 sec');
  });

  it('should correctly count letters only', () => {
    const stats = getTextStats('Hello123 world!');
    expect(stats.letterCount).toBe(10);
  });

  it('should correctly count alphanumeric characters', () => {
    const stats = getTextStats('Hello123 world!');
    expect(stats.alphanumericCount).toBe(13);
  });
});
