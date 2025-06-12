# textConvert FAQ

This FAQ answers common questions about installing, using, and contributing to the textConvert library.

---

## General

**Q: What is textConvert?**
A: textConvert is a TypeScript library for text conversion, analysis, and validation, including case conversion, word/sentence counting, email validation, and more.

**Q: Who maintains this library?**
A: textConvert is maintained by Nicolas Alkhoury and open-source contributors.

---

## Installation & Usage

**Q: How do I install textConvert?**
A: Run `npm install textconvert` in your project directory.

**Q: How do I import functions?**
A: Use ES Modules or CommonJS:

```js
import { camelCase, isEmail } from 'textconvert';
// or
const { camelCase, isEmail } = require('textconvert');
```

**Q: Does it work in the browser?**
A: Yes, textConvert works in modern browsers and Node.js.

---

## Features & API

**Q: What can textConvert do?**
A: It can convert text between cases, analyze text (count words, sentences, etc.), validate emails, convert numbers to words, and more. See the README and API Reference for details.

**Q: How do I validate an email address?**
A: Use `isEmail('user@example.com')` — returns `true` if valid, `false` otherwise.

**Q: How do I add a new function?**
A: See `docs/ADDING_FUNCTION.md` for a step-by-step guide.

---

## Compatibility & Support

**Q: What Node.js versions are supported?**
A: Node.js 22 and above.

**Q: Are there any external dependencies?**
A: No, textConvert is dependency-free.

**Q: How do I report a bug or request a feature?**
A: Open an issue on [GitHub](https://github.com/Monsieur-Nico/textConvert/issues).

---

## Contributing

**Q: How can I contribute?**
A: See `CONTRIBUTING.md` for guidelines. PRs, issues, and suggestions are welcome!

**Q: What coding style should I follow?**
A: Follow the existing code style and use ESLint/Prettier. Run `npm run lint` and `npm run format` before submitting.

---

## Troubleshooting

**Q: My function isn't working as expected. What should I do?**
A: Check the API Reference, ensure your input is valid, and review the tests for examples. If you still have issues, open a GitHub issue.

**Q: Tests are failing after my changes. How do I fix them?**
A: Run `npm test` to see which tests fail. Update your code or tests as needed, and ensure all tests pass before committing.

---

If your question isn't answered here, please open an issue or start a discussion on GitHub!
