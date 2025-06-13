<!-- markdownlint-disable MD033 -->

<h1 align="center">📦 textConvert 📦</h1>

<div align="center">
  <a href="#contributors-">
    <img src="https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square" alt="All Contributors" />
  </a>
  <img src="https://img.shields.io/github/package-json/v/Monsieur-Nico/textConvert?style=flat-square" alt="GitHub package version" />
  <img src="https://img.shields.io/github/license/Monsieur-Nico/textConvert?style=flat-square" alt="GitHub license" />
  <img src="https://img.shields.io/github/commit-activity/m/Monsieur-Nico/textConvert?style=flat-square" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/issues-raw/Monsieur-Nico/textConvert?style=flat-square" alt="GitHub open issues" />
  <img src="https://img.shields.io/npm/v/textconvert?style=flat-square" alt="npm version" />
  <img src="https://img.shields.io/npm/dm/textconvert?style=flat-square" alt="npm downloads" />
  <a href="https://codecov.io/gh/Monsieur-Nico/textConvert" target="_blank">
    <img src="https://codecov.io/gh/Monsieur-Nico/textConvert/graph/badge.svg?token=yourtoken" alt="Coverage Status" />
  </a>
  <img src="https://github.com/Monsieur-Nico/textConvert/actions/workflows/ci.yml/badge.svg" alt="CI Status" />
</div>

---

<p align="center">
  <b>textConvert</b> is a lightweight, dependency-free library for converting and analyzing text in many formats and conventions.<br />
  <i>More features coming soon. Stay tuned!</i>
</p>

---

## 📚 Table of Contents

- [📚 Table of Contents](#-table-of-contents)
- [🚀 Getting Started](#-getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [✨ Features](#-features)
- [Quick Examples](#quick-examples)
- [API Docs](#api-docs)
- [Advanced Examples](#advanced-examples)
- [Why Use textConvert?](#why-use-textconvert)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)
- [Contributors ✨](#contributors-)

---

## 🚀 Getting Started

### Installation

```sh
npm install textconvert
```

### Usage

```js
// ES Module
import * as convert from 'textconvert';
// or CommonJS
const convert = require('textconvert');
```

---

## ✨ Features

- Case conversion: camelCase, PascalCase, snake_case, kebab-case
- Text analysis: word/letter/sentence/paragraph counting, reading time, etc.
- Language detection: English, French, Spanish, German, Italian, Portuguese, Dutch
- Number to words: Converts numbers < 100 million to English words
- Pure, dependency-free, and TypeScript-ready

---

## Quick Examples

```js
import { camelCase, count, isEmail, isUrl } from 'textconvert';

camelCase('hello world'); // 'helloWorld'
count('Hello, world!'); // 10
isEmail('user@example.com'); // true
isUrl('https://example.com/path?query=123'); // true
```

See more usage examples in [docs/RECIPES.md](docs/RECIPES.md).

---

## API Docs

See the [full API documentation](docs/API.md) for all functions, parameters, and return types.

---

## Advanced Examples

```js
// Detect language with options
import { detectLanguage, Language } from 'textconvert';
const result = detectLanguage('Hola mundo', 4, { maxCharsToAnalyze: 300 });
if (result.language === Language.Spanish) {
  console.log('Spanish detected!');
}

// Get detailed text statistics
const stats = convert.getTextStats('Hello world. This is a test.');
console.log(stats.wordCount, stats.readingTimeFormatted);

// Convert numbers to words
console.log(convert.numbersToWords(987654));
// "nine hundred eighty-seven thousand six hundred and fifty-four"
```

---

## Why Use textConvert?

- **Lightweight & Dependency-Free:** No external dependencies, fast and easy to use.
- **Comprehensive Text Utilities:** Covers case conversion, text analysis, language detection, and more.
- **TypeScript Support:** Fully typed for safe and productive development.
- **Modern API:** Designed for clarity, performance, and extensibility.
- **Actively Maintained:** Open to contributions and new features.

---

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines and workflow.

If you are adding a new function, follow the step-by-step instructions in [docs/ADDING_FUNCTION.md](docs/ADDING_FUNCTION.md).

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history and updates.

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

## Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://nicoscripting.com/"><img src="https://avatars.githubusercontent.com/u/74289847?v=4?s=75" width="75px;" alt="Nicolas Alkhoury"/><br /><sub><b>Nicolas Alkhoury</b></sub></a><br /><a href="#question-Monsieur-Nico" title="Answering Questions">💬</a> <a href="https://github.com/Monsieur-Nico/textConvert/issues?q=author%3AMonsieur-Nico" title="Bug reports">🐛</a> <a href="#business-Monsieur-Nico" title="Business development">💼</a> <a href="https://github.com/Monsieur-Nico/textConvert/commits?author=Monsieur-Nico" title="Code">💻</a> <a href="#data-Monsieur-Nico" title="Data">🔣</a> <a href="#design-Monsieur-Nico" title="Design">🎨</a> <a href="https://github.com/Monsieur-Nico/textConvert/commits?author=Monsieur-Nico" title="Documentation">📖</a> <a href="#ideas-Monsieur-Nico" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-Monsieur-Nico" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-Monsieur-Nico" title="Maintenance">🚧</a> <a href="#mentoring-Monsieur-Nico" title="Mentoring">🧑‍🏫</a> <a href="#platform-Monsieur-Nico" title="Packaging/porting to new platform">📦</a> <a href="#plugin-Monsieur-Nico" title="Plugin/utility libraries">🔌</a> <a href="#projectManagement-Monsieur-Nico" title="Project Management">📆</a> <a href="#research-Monsieur-Nico" title="Research">🔬</a> <a href="https://github.com/Monsieur-Nico/textConvert/pulls?q=is%3Apr+reviewed-by%3AMonsieur-Nico" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/Monsieur-Nico/textConvert/commits?author=Monsieur-Nico" title="Tests">⚠️</a> <a href="#tool-Monsieur-Nico" title="Tools">🔧</a> <a href="#userTesting-Monsieur-Nico" title="User Testing">📓</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/madesh02104"><img src="https://avatars.githubusercontent.com/u/173074134?v=4?s=75" width="75px;" alt="Madesh"/><br /><sub><b>Madesh</b></sub></a><br /><a href="https://github.com/Monsieur-Nico/textConvert/commits?author=madesh02104" title="Code">💻</a> <a href="https://github.com/Monsieur-Nico/textConvert/commits?author=madesh02104" title="Documentation">📖</a> <a href="#example-madesh02104" title="Examples">💡</a> <a href="https://github.com/Monsieur-Nico/textConvert/commits?author=madesh02104" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Kuba429"><img src="https://avatars.githubusercontent.com/u/67023529?v=4?s=75" width="75px;" alt="Kuba"/><br /><sub><b>Kuba</b></sub></a><br /><a href="https://github.com/Monsieur-Nico/textConvert/commits?author=Kuba429" title="Code">💻</a> <a href="https://github.com/Monsieur-Nico/textConvert/commits?author=Kuba429" title="Documentation">📖</a> <a href="#example-Kuba429" title="Examples">💡</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
