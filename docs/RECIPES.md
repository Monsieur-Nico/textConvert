# textConvert Recipes & Advanced Usage

This guide provides practical examples and advanced usage patterns for the textConvert library. Use these recipes to solve common text processing tasks and to combine multiple functions for powerful workflows.

---

## Table of Contents

- [Basic Validation](#basic-validation)
- [Case Conversion](#case-conversion)
- [Text Analysis](#text-analysis)
- [Combining Functions](#combining-functions)
- [Custom Utilities](#custom-utilities)

---

## Basic Validation

### Validate an Email Address

```js
import { isEmail } from 'textconvert';

isEmail('user@example.com'); // true
isEmail('not-an-email'); // false
```

### Validate a URL

```js
import { isUrl } from 'textconvert';

isUrl('https://example.com/path?query=123'); // true
isUrl('ftp://fileserver'); // false
isUrl('not a url'); // false
```

---

## Case Conversion

### Convert to camelCase, PascalCase, snake_case, and kebab-case

```js
import { camelCase, pascalCase, snakeCase, kebabCase } from 'textconvert';

camelCase('hello world'); // 'helloWorld'
pascalCase('hello world'); // 'HelloWorld'
snakeCase('hello world'); // 'hello_world'
kebabCase('hello world'); // 'hello-world'
```

---

## Text Analysis

### Get Text Statistics

```js
import { getTextStats } from 'textconvert';

const stats = getTextStats('Hello world! This is a test.');
// stats = {
//   characterCount: 28,
//   wordCount: 6,
//   sentenceCount: 2,
//   ...
// }
```

---

## Combining Functions

### Clean, Count, and Analyze

```js
import { clear, countWords, getTextStats } from 'textconvert';

const raw = 'Hello, world! Welcome to textConvert.';
const cleaned = clear(raw); // 'hello world welcome to textconvert'
const wordCount = countWords(cleaned); // 5
const stats = getTextStats(cleaned);
```

### Validate and Format User Input

```js
import { isEmail, camelCase } from 'textconvert';

function processUserInput(input) {
  if (isEmail(input)) {
    return camelCase(input.split('@')[0]);
  }
  return 'Invalid email!';
}

processUserInput('John.Doe@example.com'); // 'john.Doe'
processUserInput('not-an-email'); // 'Invalid email!'
```

---

## Custom Utilities

### Create a Function to Check for Valid Emails in a List

```js
import { isEmail } from 'textconvert';

function filterValidEmails(list) {
  return list.filter(isEmail);
}

const emails = ['user@example.com', 'bad-email', 'test@domain.org'];
filterValidEmails(emails); // ['user@example.com', 'test@domain.org']
```

---

Feel free to contribute your own recipes by submitting a pull request!
