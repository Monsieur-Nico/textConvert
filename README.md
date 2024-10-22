<h1 align="center">📦 textConvert 📦</h1>

<div align="center">
<img src="https://img.shields.io/github/package-json/v/Monsieur-Nico/textConvert?'style'=flat-square"></img>
<img src="https://img.shields.io/github/license/Monsieur-Nico/textConvert?'style'=flat-square"></img>
<img src="https://img.shields.io/github/commit-activity/m/Monsieur-Nico/textConvert?'style'=flat-square"></img>
<img src="https://img.shields.io/github/issues-raw/Monsieur-Nico/textConvert?'style'=flat-square"></img>
</div>

<p align="center">Public library to help a lot of developers converting text into many conventions and formats. Soon I will be adding more functions to it.</p>
<h3 align="center" style="font-weight: bold"> Stay tuned!</h3>
<div align="center">
<img src="https://img.shields.io/badge/statements-100%25-brightgreen.svg?'style'=flat-square"></img>
<img src="https://img.shields.io/badge/branches-87.5%25-yellow.svg?'style'=flat-square"></img>
<img src="https://img.shields.io/badge/functions-100%25-brightgreen.svg?'style'=flat-square"></img>
<img src="https://img.shields.io/badge/lines-100%25-brightgreen.svg?'style'=flat-square"></img>
</div>

<hr />
<br />

## Installation

Easily install the package using the `npm install` command:

```
$ npm install textconvert
```

## Setup

```js
import * as convert from "textconvert";
// Or
const convert = require("textconvert");
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
  convert.clear("Hello,world");
  // Returns => ["hello", "world"]

  convert.clear("Hello, world", false);
  // Returns => "hello world"
  ```

- ### Count

  Return a boolean value number of the letters in a string.

  `@param text` String input to get letters count from.

  `@param countNumbers` Boolean value to determine if numbers should be counted as letters.

  ```js
  convert.count("Hello,world");
  // Returns => 10

  convert.count("Hello0 world", true);
  // Returns => 11
  ```

- ### Reverse

  Reverses all characters in a string.

  `@param text` A string to reverse.

  ```js
  convert.reverse("Hello, world!");
  // Returns => "!dlrow ,olleH"
  ```

- ### Spread

  Returns an array of characters from the provided string.

  `@param text` A string to spread.
  `@param clear` Whether to clear punctuation from the text. Default is `false`.

  ```js
  convert.spread("Hello, world!");
  // Returns => ['H', 'e', 'l', 'l', 'o', ',', 'w', 'o', 'r', 'l', 'd', '!']

  convert.spread("Hello, world!", true);
  // Returns => ['H', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
  ```

- ### Camel Case

  Convert a string from any convention to Camel Case convention.

  `@param text` A string to be converted to Camel Case.

  ```js
  convert.camelCase("hello world");
  // Returns => "helloWorld"
  ```

- ### Pascal Case

  Convert a string from any convention to Pascal Case convention.

  `@param text` A string to be converted to Pascal Case.

  ```js
  convert.pascalCase("hello world");
  // Returns => "HelloWorld"
  ```

- ### Snake Case

  Convert a string from any convention to Snake Case convention.

  `@param text` A string to be converted to Snake Case.

  ```js
  convert.snakeCase("hello world");
  // Returns => "hello_world"
  convert.snakeCase("hello-world");
  // Returns => "hello_world"
  ```

- ### Kebab Case

  Convert a string from any convention to Kebab Case convention.

  `@param text` A string to be converted to Kebab Case.

  ```js
  convert.kebabCase("hello world");
  // Returns => "hello-world"
  convert.kebabCase("helloWorld");
  // Returns => "hello-world"
  ```

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
