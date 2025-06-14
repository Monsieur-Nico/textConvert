# textConvert Architecture Overview

This document provides a high-level overview of the architecture and design principles of the textConvert library.

---

## Project Structure

```text
textConvert/
  src/
    text/
      analysis/         # Text analysis utilities (e.g., statistics, language detection)
      validation/       # Validation utilities (e.g., isEmail)
      conventions.ts    # Case conversion functions
      clear.ts          # Punctuation removal
      count.ts          # Counting utilities (words, sentences, letters)
      reverse.ts        # String reversal
      spread.ts         # Character array conversion
    numbers/
      numbersToWords.ts # Number to words conversion
    assets/             # Shared regex and constants
    textConvert.ts      # Main entry point (exports all public functions)
  tests/                # Unit and integration tests
  docs/                 # Documentation
  ...                   # Config, build, and meta files
```

---

## Main Modules & Responsibilities

- **text/analysis/**: Text statistics, language detection, and related analysis tools.
- **text/validation/**: Validation functions (e.g., email, future: URL, phone, etc.).
- **text/conventions.ts**: Case conversion (camelCase, PascalCase, etc.).
- **text/clear.ts**: Remove punctuation and clean text.
- **text/count.ts**: Count words, sentences, and letters.
- **text/reverse.ts**: Reverse strings.
- **text/spread.ts**: Convert strings to character arrays.
- **numbers/numbersToWords.ts**: Convert numbers to English words.
- **assets/regex.ts**: Centralized regex patterns for reuse.
- **textConvert.ts**: Aggregates and exports all public functions for library consumers.

---

## Design Principles

- **Single Responsibility**: Each function/module does one thing well.
- **Pure Functions**: Most utilities are pure, with no side effects.
- **TypeScript First**: All code is written in TypeScript for safety and clarity.
- **Test Coverage**: Every logic function has corresponding tests.
- **Extensibility**: New functions can be added easily (see `docs/ADDING_FUNCTION.md`).
- **No External Dependencies**: The library is dependency-free for maximum portability.

---

## Extension Points

- **Adding New Functions**: Follow the guide in `docs/ADDING_FUNCTION.md`.
- **Adding New Validators**: Place in `text/validation/`, export via `textConvert.ts`, and document.
- **Adding New Analysis Tools**: Place in `text/analysis/`, export and document as above.

---

## Build & Distribution

- **Bundling**: Uses Rollup to bundle for CommonJS and ESM.
- **Type Declarations**: TypeScript generates `.d.ts` files for consumers.
- **Testing**: Uses Vitest for fast, modern testing.

---

## Future Directions

- More validators (URL, phone, etc.)
- Internationalization and localization
- More advanced text analytics
- Documentation website

---

For more details, see the README and other docs. Contributions and suggestions are welcome!
