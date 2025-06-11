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
- [Advanced Examples](#advanced-examples)
- [Why Use textConvert?](#why-use-textconvert)
- [API Reference](#api-reference)
- [FAQ / Troubleshooting](#faq--troubleshooting)
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

<details>
  <summary><b>Text Related</b></summary>

- <b>clear</b>: Remove punctuation and return a cleaned string or array of words.

  ```js
  convert.clear('Hello,world'); // ["hello", "world"]
  convert.clear('Hello, world', false); // "hello world"
  ```

- <b>count</b>: Count the number of letters (optionally including numbers).

  ```js
  convert.count('Hello,world'); // 10
  convert.count('Hello0 world', true); // 11
  ```

- <b>reverse</b>: Reverse all characters in a string.

  ```js
  convert.reverse('Hello, world!'); // "!dlrow ,olleH"
  ```

- <b>spread</b>: Return an array of characters (optionally removing punctuation).

  ```js
  convert.spread('Hello, world!'); // ['H', 'e', ...]
  convert.spread('Hello, world!', true); // ['H', 'e', ...]
  ```

- <b>camelCase</b>, <b>pascalCase</b>, <b>snakeCase</b>, <b>kebabCase</b>: Convert strings to various cases.

  ```js
  convert.camelCase('hello world'); // "helloWorld"
  convert.pascalCase('hello world'); // "HelloWorld"
  convert.snakeCase('hello world'); // "hello_world"
  convert.kebabCase('hello world'); // "hello-world"
  ```

- <b>getTextStats</b>: Analyze text and return statistics (characters, words, sentences, reading time, etc).

  ```js
  convert.getTextStats('Hello world. This is a test.');
  // { characterCount: 30, wordCount: 6, ... }
  ```

- <b>detectLanguage</b>: Detect the most likely language of a text.

  ```js
  import { detectLanguage, Language } from 'textconvert';
  const result = detectLanguage('Bonjour le monde');
  console.log(result.language); // "french"
  console.log(result.confidence); // 0.95
  ```

  <details>
    <summary>Advanced: Language enum and options</summary>

  ```js
  // Supported: english, french, spanish, german, italian, portuguese, dutch, unknown
  console.log(Language.English); // "english"
  // ...
  detectLanguage('Hola mundo', 4, { maxCharsToAnalyze: 300, useCache: true });
  ```

  </details>

</details>

<details>
  <summary><b>Numbers Related</b></summary>

- <b>numbersToWords</b>: Convert any number below 100 million to words.

  ```js
  convert.numbersToWords(1245); // "one thousand two hundred and forty-five"
  ```

</details>

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

## API Reference

| Function         | Description                              | Example Usage                        |
| ---------------- | ---------------------------------------- | ------------------------------------ |
| `clear`          | Remove punctuation, return string/array  | `clear('Hello, world!')`             |
| `count`          | Count letters (optionally numbers)       | `count('abc123', true)`              |
| `reverse`        | Reverse all characters in a string       | `reverse('abc')`                     |
| `spread`         | Array of characters (optionally cleaned) | `spread('abc!')`                     |
| `camelCase`      | Convert to camelCase                     | `camelCase('hello world')`           |
| `pascalCase`     | Convert to PascalCase                    | `pascalCase('hello world')`          |
| `snakeCase`      | Convert to snake_case                    | `snakeCase('hello world')`           |
| `kebabCase`      | Convert to kebab-case                    | `kebabCase('hello world')`           |
| `getTextStats`   | Analyze text, return statistics          | `getTextStats('Hello world.')`       |
| `detectLanguage` | Detect language, return result object    | `detectLanguage('Bonjour le monde')` |
| `numbersToWords` | Convert number < 100M to words           | `numbersToWords(12345)`              |

---

## FAQ / Troubleshooting

**Q: Does textConvert work in the browser?**
A: Yes, it works in modern browsers and Node.js.

**Q: How do I contribute a new feature?**
A: See the [CONTRIBUTING.md](./CONTRIBUTING.md) file for detailed instructions.

**Q: How accurate is language detection?**
A: It's optimized for short and medium texts in supported languages. For critical use, always validate results.

---

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines and workflow.

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
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
