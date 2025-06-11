import { describe, expect, it } from 'vitest';
import {
  detectLanguage,
  Language,
  LanguageDetectionResult,
} from '../../../src/Text/Analysis/language';

// Helper to assert dominant language with safer confidence check
function expectDominantLanguage(
  result: LanguageDetectionResult,
  expected: Language
) {
  expect(result.language).toBe(expected);
  expect(result.confidence).toBeGreaterThanOrEqual(0.6);
  for (const [lang, score] of Object.entries(result.scores)) {
    if (lang !== expected) {
      expect(score).toBeLessThan(result.scores[expected]);
    }
  }
}

describe('#detectLanguage', () => {
  it('should return unknown for empty input', () => {
    const result = detectLanguage('');
    expect(result.language).toBe(Language.Unknown);
    expect(result.confidence).toBe(0);
  });

  it('should handle very short texts', () => {
    const result = detectLanguage('Hi');
    expect(result.language).not.toBeUndefined();
  });

  it('should correctly detect multiple languages for short phrases', () => {
    const testCases: [string, Language][] = [
      ['Hello world', Language.English],
      ['Hola mundo', Language.Spanish],
      ['Hallo Welt', Language.German],
      ['Bonjour le monde', Language.French],
      ['Ciao mondo', Language.Italian],
      ['Olá mundo', Language.Portuguese],
      ['Hallo wereld', Language.Dutch],
    ];

    testCases.forEach(([input, expectedLanguage]) => {
      const result = detectLanguage(input);
      expectDominantLanguage(result, expectedLanguage);
    });
  });

  it('should have higher confidence for longer texts', () => {
    const shortResult = detectLanguage('Hello');
    const longResult = detectLanguage(
      'The quick brown fox jumps over the lazy dog multiple times during every morning.'
    );

    expect(longResult.confidence).toBeGreaterThanOrEqual(
      shortResult.confidence
    );
    expectDominantLanguage(longResult, Language.English);
  });

  it('should correctly detect long texts for each language', () => {
    const longSamples: [string, Language][] = [
      [
        "Bonjour tout le monde. Comment allez-vous aujourd'hui? Nous sommes allés à Paris l'été dernier pour voir la tour Eiffel.",
        Language.French,
      ],
      [
        'Hola a todos. ¿Cómo están hoy? Me alegro mucho de conocerlos. Este es un texto de prueba en español.',
        Language.Spanish,
      ],
      [
        'Guten Tag allerseits. Wie geht es Ihnen heute? Ich freue mich sehr, Sie kennenzulernen.',
        Language.German,
      ],
      [
        'Buongiorno a tutti. Come state oggi? Sono molto felice di conoscervi. Questo è un testo di esempio in italiano.',
        Language.Italian,
      ],
      [
        'Bom dia a todos. Como estão hoje? Estou muito feliz em conhecê-los. Este é um texto de teste em português.',
        Language.Portuguese,
      ],
      [
        'Goedendag allemaal. Hoe gaat het vandaag met je? Ik ben erg blij je te ontmoeten.',
        Language.Dutch,
      ],
    ];

    longSamples.forEach(([input, expectedLanguage]) => {
      const result = detectLanguage(input);
      expectDominantLanguage(result, expectedLanguage);
    });
  });

  it('should return unknown for gibberish', () => {
    const result = detectLanguage('asdf qwerty hjkl zxcvbnm');
    expect(result.language).toBe(Language.Unknown);
  });

  it('should handle extremely short text safely', () => {
    const result = detectLanguage('a');
    expect(result.language).toBe(Language.Unknown);
  });

  it('should include scores for all languages', () => {
    const result = detectLanguage('Hello world');
    Object.values(Language).forEach((language) => {
      expect(result.scores).toHaveProperty(language);
      expect(typeof result.scores[language]).toBe('number');
    });
  });

  it('should correctly detect dominant language in mixed texts', () => {
    const mixedCases: [string, Language][] = [
      [
        'This is mostly English text with algunas palabras en español.',
        Language.English,
      ],
      [
        'Este es principalmente español with some random English words.',
        Language.Spanish,
      ],
    ];

    mixedCases.forEach(([input, expectedLanguage]) => {
      const result = detectLanguage(input);
      expectDominantLanguage(result, expectedLanguage);
    });
  });

  it('should limit analysis length when configured', () => {
    const longText = 'English '.repeat(500);
    const result = detectLanguage(longText, 4, { maxCharsToAnalyze: 100 });
    expect(result.language).toBe(Language.English);
  });

  it('should support disabling cache without breaking detection', () => {
    const text = 'Another test for cache disabling.';
    const result1 = detectLanguage(text);
    const result2 = detectLanguage(text, 4, { useCache: false });

    expect(result2.language).toBe(result1.language);
    expect(result2.confidence).toBeCloseTo(result1.confidence, 2);
  });
});
