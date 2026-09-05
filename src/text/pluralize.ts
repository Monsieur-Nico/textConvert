// Common irregular plurals -- not exhaustive, just frequent enough in
// everyday English to be worth a lookup rather than silently producing a
// wrong regular-rule guess (e.g. "childs", "mouses"). Keys are lowercase;
// the input's leading capitalization is reapplied to the result.
const irregulars: Record<string, string> = {
  child: 'children',
  person: 'people',
  man: 'men',
  woman: 'women',
  mouse: 'mice',
  goose: 'geese',
  tooth: 'teeth',
  foot: 'feet',
  ox: 'oxen',
  cactus: 'cacti',
  focus: 'foci',
  fungus: 'fungi',
  analysis: 'analyses',
  crisis: 'crises',
  criterion: 'criteria',
  phenomenon: 'phenomena',
  datum: 'data',
  leaf: 'leaves',
  knife: 'knives',
  wife: 'wives',
  life: 'lives',
  half: 'halves',
  calf: 'calves',
  shelf: 'shelves',
  wolf: 'wolves',
  loaf: 'loaves',
  thief: 'thieves',
  self: 'selves',
  elf: 'elves',
  potato: 'potatoes',
  tomato: 'tomatoes',
  hero: 'heroes',
  echo: 'echoes',
};

// Uncountable nouns: the same word is both singular and plural.
const uncountables = new Set([
  'sheep',
  'fish',
  'deer',
  'moose',
  'series',
  'species',
  'aircraft',
  'salmon',
  'trout',
  'swine',
  'bison',
  'buffalo',
]);

const vowels = new Set('aeiouAEIOU');

// Recapitalizes `target` to match whether `source`'s first character was
// uppercase -- e.g. matchCase('Child', 'children') -> 'Children'. Does not
// attempt to preserve all-caps or any casing beyond the first letter.
function matchCase(source: string, target: string): string {
  if (/[A-Z]/.test(source[0])) return target[0].toUpperCase() + target.slice(1);
  return target;
}

function pluralizeRegular(word: string): string {
  const lower = word.toLowerCase();

  if (/(?:s|x|z|ch|sh)$/.test(lower)) return `${word}es`;

  if (lower.endsWith('y') && word.length > 1 && !vowels.has(word[word.length - 2])) {
    return `${word.slice(0, -1)}ies`;
  }

  return `${word}s`;
}

/**
 * Returns the plural form of an English word. Useful for UI copy like
 * `` `${count} ${pluralize('item', count)}` ``.
 *
 * This is a documented, honest subset of English pluralization, not a
 * complete linguistic solution — regular suffix rules (-s, -es, -ies)
 * plus a maintained list of the most common irregulars and uncountable
 * nouns. It does not cover every irregular (e.g. Greek-derived "-ch"
 * words pronounced /k/ like "stomach" → "stomachs", not "stomaches"), or
 * consonant-doubling irregulars (e.g. "quiz" → "quizzes", not "quizes").
 *
 * @param word The singular word to pluralize.
 * @param count If provided, returns `word` unchanged when `count === 1`;
 * any other value (including `0`, negative, or omitted) returns the
 * plural form, matching standard English usage ("0 items", "1 item").
 * @returns The pluralized (or singular, if `count === 1`) form of `word`.
 * @example
 * pluralize('cat'); // 'cats'
 * pluralize('cat', 1); // 'cat'
 * pluralize('cat', 5); // 'cats'
 * pluralize('child'); // 'children'
 * pluralize('box'); // 'boxes'
 */
export function pluralize(word: string, count?: number): string {
  if (!word) return 'Please provide a valid input text';
  if (count === 1) return word;

  const lower = word.toLowerCase();
  if (uncountables.has(lower)) return word;

  const irregular = irregulars[lower];
  if (irregular) return matchCase(word, irregular);

  return pluralizeRegular(word);
}
