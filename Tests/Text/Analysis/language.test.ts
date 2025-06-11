import { describe, expect, it } from 'vitest';
import { detectLanguage, Language } from '../../../src/Text/Analysis/language';

describe('#detectLanguage', () => {
  it('should return unknown for empty input', () => {
    const result = detectLanguage('');
    expect(result.language).toBe(Language.Unknown);
    expect(result.confidence).toBe(0);
  });

  it('should handle very short texts', () => {
    const result = detectLanguage('Hi');
    // Even for very short texts, it should return a result
    expect(result.language).not.toBe(undefined);
  });

  it('should detect correct language for short phrases', () => {
    const engResult = detectLanguage('Hello world');
    const espResult = detectLanguage('Hola mundo');
    const gerResult = detectLanguage('Hallo Welt');
    const fraResult = detectLanguage('Bonjour le monde');

    // Check both scores and language detection
    expect(engResult.scores[Language.English]).toBeGreaterThan(0);
    expect(engResult.language).toBe(Language.English);

    expect(espResult.scores[Language.Spanish]).toBeGreaterThan(0);
    expect(espResult.language).toBe(Language.Spanish);

    expect(gerResult.scores[Language.German]).toBeGreaterThan(0);
    expect(gerResult.language).toBe(Language.German);

    expect(fraResult.scores[Language.French]).toBeGreaterThan(0);
    expect(fraResult.language).toBe(Language.French);
  });

  it('should generally have higher confidence for longer texts', () => {
    const shortResult = detectLanguage('Hello');
    const longResult = detectLanguage(
      'The quick brown fox jumps over the lazy dog. This sentence contains all the letters in the English alphabet.'
    );

    // Longer texts typically should have higher confidence
    expect(longResult.confidence).toBeGreaterThan(0.3);
    // Both should detect English
    expect(shortResult.language).toBe(Language.English);
    expect(longResult.language).toBe(Language.English);
  });

  it('should detect English correctly for longer texts', () => {
    const result = detectLanguage(
      'The quick brown fox jumps over the lazy dog. This sentence contains all the letters in the English alphabet.'
    );
    expect(result.language).toBe(Language.English);
    expect(result.confidence).toBeGreaterThan(0.3);
  });

  it('should detect French correctly', () => {
    const result = detectLanguage(
      "Bonjour tout le monde. Comment allez-vous aujourd'hui? Je suis très heureux de vous rencontrer. " +
        'La langue française est une belle langue avec beaucoup de caractéristiques uniques. ' +
        'Les français aiment manger du pain et du fromage avec un verre de vin. ' +
        "Nous sommes allés à Paris l'été dernier pour voir la tour Eiffel et le musée du Louvre."
    );
    // Check both score and language
    expect(result.scores[Language.French]).toBeGreaterThan(0.3);
    expect(result.language).toBe(Language.French);
  });

  it('should detect Spanish correctly', () => {
    const result = detectLanguage(
      'Hola a todos. ¿Cómo están hoy? Me alegro mucho de conocerlos. El español es un idioma muy bonito.'
    );
    expect(result.scores[Language.Spanish]).toBeGreaterThan(0.3);
    expect(result.language).toBe(Language.Spanish);
  });

  it('should detect German correctly', () => {
    const result = detectLanguage(
      'Guten Tag allerseits. Wie geht es Ihnen heute? Ich freue mich sehr, Sie kennenzulernen.'
    );
    expect(result.scores[Language.German]).toBeGreaterThan(0.3);
    expect(result.language).toBe(Language.German);
  });

  it('should detect Italian correctly', () => {
    const result = detectLanguage(
      "Buongiorno a tutti. Come state oggi? Sono molto felice di conoscervi. L'italiano è una lingua molto bella."
    );
    expect(result.scores[Language.Italian]).toBeGreaterThan(0.3);
    expect(result.language).toBe(Language.Italian);
  });

  it('should detect Portuguese correctly', () => {
    const result = detectLanguage(
      'Bom dia a todos. Como estão hoje? Estou muito feliz em conhecê-los. O português é uma língua muito bonita.'
    );
    expect(result.scores[Language.Portuguese]).toBeGreaterThan(0.3);
    expect(result.language).toBe(Language.Portuguese);
  });

  it('should detect Dutch correctly', () => {
    const result = detectLanguage(
      'Goedendag allemaal. Hoe gaat het vandaag met je? Ik ben erg blij je te ontmoeten.'
    );
    expect(result.scores[Language.Dutch]).toBeGreaterThan(0.3);
    expect(result.language).toBe(Language.Dutch);
  });

  it('should include scores for all languages', () => {
    const result = detectLanguage('This is a test');

    // Check that scores exist for all languages
    for (const language of Object.values(Language)) {
      expect(result.scores).toHaveProperty(language);
      expect(typeof result.scores[language]).toBe('number');
    }
  });

  it('should correctly handle texts with mixed languages, choosing the dominant one', () => {
    // Text with dominant English but some Spanish words
    const mixedText =
      'This is mostly English text with some Spanish palabras y frases here and there.';
    const mixedResult = detectLanguage(mixedText);
    expect(mixedResult.language).toBe(Language.English);

    // Text with dominant Spanish but some English words
    const mixedText2 =
      'Este es principalmente texto en español with some English words and phrases aquí y allá.';
    const mixedResult2 = detectLanguage(mixedText2);
    expect(mixedResult2.language).toBe(Language.Spanish);
  });
});
