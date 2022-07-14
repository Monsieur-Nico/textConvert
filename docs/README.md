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
<br />
<div class="social-icons" align="center">
<a href="https://github.com/Monsieur-Nico/textConvert" margin="0" padding="0">
<img src="/assets/GitHub.png" width="5%" margin="0" padding="0"/>
</a>
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
