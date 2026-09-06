# Migration Guide

Upgrade notes for each major version, with concrete before/after guidance for every breaking change. See [CHANGELOG.md](CHANGELOG.md) for the full release history, including non-breaking changes.

---

## Upgrading to v3.0.0 (unreleased)

Tracked in [#328](https://github.com/Monsieur-Nico/textConvert/issues/328). Each item below is filled in with real before/after details in the PR that implements it, and checked off alongside its matching checkbox in #328 — check back here, not just the CHANGELOG, before upgrading past v2.x.

- [ ] **ISO 639-1 language codes** ([#329](https://github.com/Monsieur-Nico/textConvert/issues/329)) — `detectLanguage`'s `Language` enum will use codes (`'en'`, `'fr'`, ...) instead of English names (`'English'`, `'French'`, ...).
- [ ] **ESM-only, CJS dropped** ([#331](https://github.com/Monsieur-Nico/textConvert/issues/331)) — `require('textconvert')` will no longer work; use `import` instead.
- [ ] **`spread()`'s return type and error messages** ([#389](https://github.com/Monsieur-Nico/textConvert/issues/389)) — fixes its inconsistent return type and stale error messages.
- [ ] **Parameter style unification** ([#390](https://github.com/Monsieur-Nico/textConvert/issues/390)) — `count`, `spread`, and/or `pluralize` may move from positional flags to an options object. Still under consideration — may be closed without action, in which case this line will be removed rather than checked off.
- [ ] **`numbersToWords`'s missing "and"** ([#393](https://github.com/Monsieur-Nico/textConvert/issues/393)) — adds the same `'and'` the hundred-branch already inserts (e.g. `'one hundred and five'`) to the thousand/million branches too, for numbers whose remainder is under 100 (e.g. `'one hundred thousand and five'`, not `'one hundred thousand five'`). **Also affects `ordinalToWords`**, which ordinalizes the last word of whatever `numbersToWords` produces: `ordinalToWords(100005)` gains the same `'and'` (`'one hundred thousand and fifth'`, not `'one hundred thousand fifth'`) even though `ordinalToWords` itself isn't otherwise changing.
