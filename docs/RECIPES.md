# textConvert Recipes & Advanced Usage

This guide provides practical examples and advanced usage patterns for the textConvert library. Use these recipes to solve common text processing tasks and to combine multiple functions for powerful workflows.

---

## Table of Contents

- [Basic Validation](#basic-validation)
- [Case Conversion](#case-conversion)
- [Text Analysis](#text-analysis)
- [Text Utilities](#text-utilities)
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

### Extract Email Addresses from a Block of Text

```js
import { extractEmails } from 'textconvert';

const message = 'Reach the team at hello@example.com or support@example.org.';
extractEmails(message); // ['hello@example.com', 'support@example.org']
```

### Validate a URL

```js
import { isUrl } from 'textconvert';

isUrl('https://example.com/path?query=123'); // true
isUrl('ftp://fileserver'); // false
isUrl('not a url'); // false
```

### Extract URLs from a Block of Text

```js
import { extractUrls } from 'textconvert';

const notes = 'Docs at https://example.com/docs, repo at https://example.com/repo.';
extractUrls(notes); // ['https://example.com/docs', 'https://example.com/repo']
```

### Validate a Phone Number

```js
import { isPhoneNumber } from 'textconvert';

isPhoneNumber('+1-202-555-0173'); // true (international, explicit country code)
isPhoneNumber('(202) 555 0173'); // true (local, includes area code)
isPhoneNumber('5550173'); // false (too short, no area code)
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

### Generate a URL Slug for a Blog Post Title

```js
import { slugify } from 'textconvert';

function buildPostUrl(title) {
  return `/blog/${slugify(title)}`;
}

buildPostUrl('10 Tips for Better Résumés!'); // '/blog/10-tips-for-better-resumes'
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

## Text Utilities

### Truncate a Preview for a Card or List Item

```js
import { truncate } from 'textconvert';

const summary = 'The quick brown fox jumps over the lazy dog';
truncate(summary, 20); // 'The quick brown f...'
truncate(summary, 20, { byWords: true }); // 'The quick brown...'
```

### Mask Sensitive Data for Display

```js
import { maskText, isEmail } from 'textconvert';

function maskEmail(email) {
  return isEmail(email) ? maskText(email) : email;
}

maskEmail('jordan@example.com'); // 'jo****************'
maskText('4111111111111234', { visibleEnd: 4 }); // '************1234' (card number, last 4 visible)
```

### Redact PII Before Logging User Input

```js
import { redact } from 'textconvert';

function safeLog(message) {
  console.log(redact(message));
}

safeLog('Contact me at jordan@example.com or 555-123-4567');
// 'Contact me at jo**************** or 55**********'
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
