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

- ### Clear

  ```js
  convert.clear("Hello,world");
  // Returns => ["hello", "world"]

  convert.clear("Hello, world", false);
  // Returns => "hello world"
  ```

- ### Reverse

  ```js
  convert.reverse("Hello, world!");
  // Returns => "!dlrow ,olleH"
  ```

- ### Pascal Case

  ```js
  convert.pascalCase("hello world");
  // Returns => "HelloWorld"
  ```

- ### Camel Case

  ```js
  convert.camelCase("hello world");
  // Returns => "helloWorld"
  ```

- ### Snake Case

  ```js
  convert.snakeCase("hello world");
  // Returns => "hello_world"
  convert.snakeCase("hello-world");
  // Returns => "hello_world"
  ```

- ### Kebab Case
  ```js
  convert.kebabCase("hello world");
  // Returns => "hello-world"
  convert.kebabCase("helloWorld");
  // Returns => "hello-world"
  ```
