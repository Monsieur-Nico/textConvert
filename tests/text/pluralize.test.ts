import { describe, expect, it } from 'vitest';
import { pluralize } from '../../src/text/pluralize';

describe('#pluralize', () => {
  it('pluralizes a regular word by default', () => {
    expect(pluralize('cat')).toBe('cats');
  });

  it('returns the singular form for count 1', () => {
    expect(pluralize('cat', 1)).toBe('cat');
  });

  it('returns the plural form for count other than 1', () => {
    expect(pluralize('cat', 5)).toBe('cats');
    expect(pluralize('cat', 0)).toBe('cats');
    expect(pluralize('cat', -3)).toBe('cats');
  });

  it('adds -es for words ending in s, x, z, ch, sh', () => {
    expect(pluralize('bus')).toBe('buses');
    expect(pluralize('box')).toBe('boxes');
    expect(pluralize('buzz')).toBe('buzzes');
    expect(pluralize('beach')).toBe('beaches');
    expect(pluralize('wish')).toBe('wishes');
  });

  it('changes consonant+y to -ies', () => {
    expect(pluralize('city')).toBe('cities');
  });

  it('keeps vowel+y and just adds -s', () => {
    expect(pluralize('boy')).toBe('boys');
    expect(pluralize('day')).toBe('days');
  });

  it('handles known irregular plurals', () => {
    expect(pluralize('child')).toBe('children');
    expect(pluralize('person')).toBe('people');
    expect(pluralize('mouse')).toBe('mice');
    expect(pluralize('tooth')).toBe('teeth');
  });

  it('handles known -f/-fe -> -ves irregulars', () => {
    expect(pluralize('leaf')).toBe('leaves');
    expect(pluralize('knife')).toBe('knives');
    expect(pluralize('wolf')).toBe('wolves');
  });

  it('handles known -o -> -oes irregulars', () => {
    expect(pluralize('potato')).toBe('potatoes');
    expect(pluralize('hero')).toBe('heroes');
  });

  it('returns uncountable nouns unchanged', () => {
    expect(pluralize('sheep')).toBe('sheep');
    expect(pluralize('fish')).toBe('fish');
    expect(pluralize('species')).toBe('species');
  });

  it('preserves leading capitalization on irregulars', () => {
    expect(pluralize('Child')).toBe('Children');
  });

  it('preserves leading capitalization on regular words', () => {
    expect(pluralize('City')).toBe('Cities');
    expect(pluralize('Box')).toBe('Boxes');
  });

  it('returns the shared invalid-input message for empty input', () => {
    expect(pluralize('')).toBe('Please provide a valid input text');
  });
});
