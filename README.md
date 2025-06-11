<h1 align="center">📦 textConvert 📦</h1>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<div align="center">
<img src="https://img.shields.io/github/package-json/v/Monsieur-Nico/textConvert?'style'=flat-square"></img>
<img src="https://img.shields.io/github/license/Monsieur-Nico/textConvert?'style'=flat-square"></img>
<img src="https://img.shields.io/github/commit-activity/m/Monsieur-Nico/textConvert?'style'=flat-square"></img>
<img src="https://img.shields.io/github/issues-raw/Monsieur-Nico/textConvert?'style'=flat-square"></img>
<br />
<img src="https://img.shields.io/npm/v/textconvert?style=flat-square" alt="npm version" />
<img src="https://img.shields.io/npm/dm/textconvert?style=flat-square" alt="npm downloads" />
</div>

<p align="center">Public library to help a lot of developers converting text into many conventions and formats. Soon I will be adding more functions to it.</p>
<h3 align="center" style="font-weight: bold"> Stay tuned!</h3>
<div align="center">
<a href="https://codecov.io/gh/Monsieur-Nico/textConvert" target="_blank">
  <img src="https://codecov.io/gh/Monsieur-Nico/textConvert/graph/badge.svg?token=yourtoken" alt="Coverage Status" />
</a>
<img src="https://github.com/Monsieur-Nico/textConvert/actions/workflows/ci.yml/badge.svg" alt="CI Status" />
</div>

<hr />
<br />

## Installation

Easily install the package using the `npm install` command:

```
npm install textconvert
```

## Setup

```js
import * as convert from 'textconvert';
// Or
const convert = require('textconvert');
```

## Features

This package includes the following features at the moment:

<details>
  <summary><b><u>Text Related</u></b></summary>

- ### Clear

  Clear a string from punctuation and replaces it with a whitespace character or returns an array of strings.

  `@param text` String input to clear from punctuation.

  `@param arrayOutput` (Optional), boolean value to select whether to return an array of strings or a single string. Default value is true.

  ```js
  convert.clear('Hello,world');
  // Returns => ["hello", "world"]

  convert.clear('Hello, world', false);
  // Returns => "hello world"
  ```

- ### Count

  Return a boolean value number of the letters in a string.

  `@param text` String input to get letters count from.

  `@param countNumbers` Boolean value to determine if numbers should be counted as letters.

  ```js
  convert.count('Hello,world');
  // Returns => 10

  convert.count('Hello0 world', true);
  // Returns => 11
  ```

- ### Reverse

  Reverses all characters in a string.

  `@param text` A string to reverse.

  ```js
  convert.reverse('Hello, world!');
  // Returns => "!dlrow ,olleH"
  ```

- ### Spread

  Returns an array of characters from the provided string.

  `@param text` A string to spread.
  `@param clear` Whether to clear punctuation from the text. Default is `false`.

  ```js
  convert.spread('Hello, world!');
  // Returns => ['H', 'e', 'l', 'l', 'o', ',', 'w', 'o', 'r', 'l', 'd', '!']

  convert.spread('Hello, world!', true);
  // Returns => ['H', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
  ```

- ### Camel Case

  Convert a string from any convention to Camel Case convention.

  `@param text` A string to be converted to Camel Case.

  ```js
  convert.camelCase('hello world');
  // Returns => "helloWorld"
  ```

- ### Pascal Case

  Convert a string from any convention to Pascal Case convention.

  `@param text` A string to be converted to Pascal Case.

  ```js
  convert.pascalCase('hello world');
  // Returns => "HelloWorld"
  ```

- ### Snake Case

  Convert a string from any convention to Snake Case convention.

  `@param text` A string to be converted to Snake Case.

  ```js
  convert.snakeCase('hello world');
  // Returns => "hello_world"
  convert.snakeCase('hello-world');
  // Returns => "hello_world"
  ```

- ### Kebab Case

  Convert a string from any convention to Kebab Case convention.

  `@param text` A string to be converted to Kebab Case.

  ```js
  convert.kebabCase('hello world');
  // Returns => "hello-world"
  convert.kebabCase('helloWorld');
  // Returns => "hello-world"
  ```

- ### getTextStats

  Analyzes text and returns comprehensive statistics about it.

  `@param text` The text to analyze
  `@param wordsPerMinute` Reading speed in words per minute (default: 200)

  ```js
  convert.getTextStats('Hello world. This is a test.');
  /* Returns => {
    characterCount: 30,
    characterCountNoSpaces: 24,
    letterCount: 18,
    alphanumericCount: 18,
    wordCount: 6,
    sentenceCount: 2,
    paragraphCount: 1,
    averageWordLength: 4,
    averageSentenceLength: 3,
    readingTimeSeconds: 2,
    readingTimeFormatted: "2 sec"
  } */
  ```

- ### detectLanguage

  Detects the most likely language of a text.

  `@param text` The text to analyze
  `@param minLength` Minimum text length for reliable detection (default: 4)
  `@param options` Additional options for detection:

  - `maxCharsToAnalyze` Maximum number of characters to analyze (default: 500)
  - `useCache` Whether to use caching for repeated calls (default: true)

  ```js
  // Basic usage
  import { detectLanguage } from 'textconvert';

  const result = detectLanguage('Hello world');
  console.log(result.language); // "english"
  console.log(result.confidence); // 0.95

  // Using with Language enum (recommended for type safety)
  import { detectLanguage, Language } from 'textconvert';

  // The Language enum contains all supported languages
  console.log(Language.English); // "english"
  console.log(Language.Spanish); // "spanish"
  console.log(Language.French); // "french"
  console.log(Language.German); // "german"
  console.log(Language.Italian); // "italian"
  console.log(Language.Portuguese); // "portuguese"
  console.log(Language.Dutch); // "dutch"
  console.log(Language.Unknown); // "unknown"

  // Using Language enum with detection results
  const text = 'Hola mundo';
  const result = detectLanguage(text);

  if (result.language === Language.Spanish) {
    console.log(`"${text}" is in Spanish with ${result.confidence} confidence`);
  }

  // Check specific language scores
  console.log(`English score: ${result.scores[Language.English]}`);
  console.log(`Spanish score: ${result.scores[Language.Spanish]}`);

  // Creating language maps or configurations
  const languageNames = {
    [Language.English]: 'English language',
    [Language.Spanish]: 'Spanish language',
    [Language.French]: 'French language',
    // etc.
  };

  console.log(languageNames[result.language]); // Get language name based on result

  // With options
  const longText = '...very long text...';
  detectLanguage(longText, 4, {
    maxCharsToAnalyze: 300,
    useCache: true,
  });
  ```

  The language detection can identify the following languages:

  - English
  - French
  - Spanish
  - German
  - Italian
  - Portuguese
  - Dutch

  ### Using with Language Enum (Type-Safe Approach)

  ```typescript
  // Import both the function and the Language enum
  import { detectLanguage, Language } from 'textconvert';

  // The Language enum provides all supported languages
  console.log(Object.values(Language));
  // ["english", "french", "spanish", "german", "italian", "portuguese", "dutch", "unknown"]

  // Type-safe language operations
  const result = detectLanguage('Bonjour le monde');

  // Compare with enum values
  if (result.language === Language.French) {
    console.log('The text is in French');
  }
  ```

  Features:

  - Works with texts of any length (improved confidence with longer texts)
  - Special character recognition for better accuracy
  - Confidence scores for all analyzed languages
  - Common phrase recognition for reliable short text detection
  - Stopword detection to improve short text analysis
  - Performance optimizations:
    - Cosine similarity for more accurate language comparison
    - Efficient caching system for repeated detection calls
    - Optimized processing for large texts
    - High-performance data structures (Map instead of objects)
    - Sliding window technique for efficient character and bigram analysis

  The detection algorithm uses multiple techniques including character frequency analysis, language-specific character recognition, bigram analysis, stopword detection, and common phrase recognition—all while remaining lightweight and dependency-free.

</details>

<details>
  <summary><b><u>Numbers Related</u></b></summary>

- ### numbersToWords

  Get any number below 100 million converted to words.

  `@param number` Integer input to turn into text.

  ```js
  convert.numbersToWords(1245);
  // Returns => "one thousand two hundred and forty-five"
  ```

  </details>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://nicoscripting.com/"><img src="https://avatars.githubusercontent.com/u/74289847?v=4?s=100" width="100px;" alt="Nicolas Alkhoury"/><br /><sub><b>Nicolas Alkhoury</b></sub></a><br /><a href="https://github.com/Monsieur-Nico/textConvert/issues?q=author%3AMonsieur-Nico" title="Bug reports">🐛</a> <a href="https://github.com/Monsieur-Nico/textConvert/commits?author=Monsieur-Nico" title="Code">💻</a> <a href="#data-Monsieur-Nico" title="Data">🔣</a> <a href="#design-Monsieur-Nico" title="Design">🎨</a> <a href="https://github.com/Monsieur-Nico/textConvert/commits?author=Monsieur-Nico" title="Documentation">📖</a> <a href="#ideas-Monsieur-Nico" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-Monsieur-Nico" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-Monsieur-Nico" title="Maintenance">🚧</a> <a href="#mentoring-Monsieur-Nico" title="Mentoring">🧑‍🏫</a> <a href="#platform-Monsieur-Nico" title="Packaging/porting to new platform">📦</a> <a href="#plugin-Monsieur-Nico" title="Plugin/utility libraries">🔌</a> <a href="#projectManagement-Monsieur-Nico" title="Project Management">📆</a> <a href="#research-Monsieur-Nico" title="Research">🔬</a> <a href="https://github.com/Monsieur-Nico/textConvert/commits?author=Monsieur-Nico" title="Tests">⚠️</a> <a href="#tool-Monsieur-Nico" title="Tools">🔧</a> <a href="#userTesting-Monsieur-Nico" title="User Testing">📓</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!