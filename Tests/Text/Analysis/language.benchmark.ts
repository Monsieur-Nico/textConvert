/**
 * Language detection benchmark tests
 *
 * Run this file separately with:
 * npx ts-node Tests/Text/Analysis/language.benchmark.ts
 */

import { detectLanguage } from '../../../src/Text/Analysis/language';

// Sample texts for benchmarking
const textSamples = {
  english: `The quick brown fox jumps over the lazy dog. This sentence contains all the letters in the English alphabet.
    It is often used as a sample text because it contains all the letters. This is a longer text to test confidence.
    The fox jumped over the fence and ran across the field. The dog, being lazy, stayed behind and watched.`,

  french: `Bonjour tout le monde. Comment allez-vous aujourd'hui? Je suis très heureux de vous rencontrer.
    La langue française est une belle langue avec beaucoup de caractéristiques uniques.
    Les français aiment manger du pain et du fromage avec un verre de vin.
    Nous sommes allés à Paris l'été dernier pour voir la tour Eiffel et le musée du Louvre.`,

  spanish: `Hola a todos. ¿Cómo están hoy? Me alegro mucho de conocerlos. El español es un idioma muy bonito.
    Hay muchas personas que hablan español en todo el mundo. Es una lengua romance que se originó en España.
    La cultura española es muy rica, con su música, baile, arte y literatura.`,

  german: `Guten Tag allerseits. Wie geht es Ihnen heute? Ich freue mich sehr, Sie kennenzulernen.
    Die deutsche Sprache ist eine germanische Sprache, die in Deutschland, Österreich und Teilen der Schweiz gesprochen wird.
    Die deutsche Kultur ist bekannt für ihre Philosophie, Wissenschaft, Kunst und Literatur.`,

  // Generate a very large sample by repeating the text multiple times
  large: Array(50)
    .fill(
      `The quick brown fox jumps over the lazy dog. This sentence contains all the letters in the English alphabet.
    It is often used as a sample text because it contains all the letters. This is a longer text to test confidence.
    The fox jumped over the fence and ran across the field. The dog, being lazy, stayed behind and watched.`,
    )
    .join('\n'),
};

/**
 * Run a benchmark for a given function
 */
function benchmark<T>(name: string, fn: () => T, runs: number = 5): T {
  console.log(`\nRunning benchmark: ${name}`);

  const times: number[] = [];

  // Warm-up run (not measured)
  let result = fn();

  // Timed runs
  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    result = fn();
    const end = performance.now();
    times.push(end - start);
  }

  // Calculate statistics
  const average = times.reduce((sum, time) => sum + time, 0) / times.length;
  const min = Math.min(...times);
  const max = Math.max(...times);

  console.log(`  Average time: ${average.toFixed(2)}ms`);
  console.log(`  Min time: ${min.toFixed(2)}ms`);
  console.log(`  Max time: ${max.toFixed(2)}ms`);

  return result;
}

// Run the benchmarks
console.log('LANGUAGE DETECTION BENCHMARKS');
console.log('============================');

// Test regular usage
benchmark('English text detection', () => detectLanguage(textSamples.english), 20);
benchmark('French text detection', () => detectLanguage(textSamples.french), 20);
benchmark('Spanish text detection', () => detectLanguage(textSamples.spanish), 20);
benchmark('German text detection', () => detectLanguage(textSamples.german), 20);

// Test cache performance
console.log('\nTesting cache performance:');
benchmark(
  'First run (no cache)',
  () => detectLanguage(textSamples.english, 4, { useCache: true }),
  20,
);
benchmark(
  'Second run (cached)',
  () => detectLanguage(textSamples.english, 4, { useCache: true }),
  20,
);

// Test large text performance
console.log('\nTesting large text performance:');
benchmark(
  'Large text without maxCharsToAnalyze',
  () =>
    detectLanguage(textSamples.large, 4, {
      useCache: false,
      maxCharsToAnalyze: undefined,
    }),
  20,
);
benchmark(
  'Large text with maxCharsToAnalyze=500',
  () =>
    detectLanguage(textSamples.large, 4, {
      useCache: false,
      maxCharsToAnalyze: 500,
    }),
  20,
);

console.log('\nBenchmarks completed!');
