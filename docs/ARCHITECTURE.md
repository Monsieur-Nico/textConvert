# textConvert Architecture Overview

This document provides a high-level overview of the architecture and design principles of the textConvert library — read this first if you're new to the codebase, before diving into a specific function's source.

---

## Project Structure

```text
textConvert/
  src/
    text/
      analysis/
        statistics.ts    # Text statistics (word/char/sentence counts, reading time)
        language.ts      # Language detection
      validation/
        email.ts         # Email validation
        url.ts           # URL validation
        phoneNumber.ts   # Phone number validation
      internal/
        scan.ts          # Shared linear-scan helpers (not publicly exported) used by extract.ts and redact.ts
      conventions.ts    # Case conversion functions (camelCase, snakeCase, capitalize, titleCase, ...)
      slugify.ts        # URL-safe slug generation
      clear.ts          # Punctuation removal
      count.ts          # Counting utilities (words, sentences, letters)
      reverse.ts         # String reversal
      spread.ts          # Character array conversion
      truncate.ts        # Length-limited text truncation with ellipsis
      mask.ts            # Partial string masking for display
      redact.ts          # PII/secret detection and masking (built on mask.ts)
      extract.ts          # Email/URL extraction from free-form text
    numbers/
      numbersToWords.ts # Number to words conversion
    assets/             # Shared regex and constants
    bin/
      textconvert.ts    # CLI entry point (thin wiring, built as dist/cli.js)
    cli.ts              # CLI argument parsing and command logic (testable, no direct IO side effects on import)
    textConvert.ts      # Main entry point (exports all public functions)
  tests/                # Unit and integration tests
  docs/                 # Documentation
  ...                   # Config, build, and meta files
```

---

## Main Modules & Responsibilities

- **text/analysis/**: Text statistics, language detection, and related analysis tools.
- **text/validation/**: Validation functions (email, URL, phone number).
- **text/internal/**: Shared logic used by more than one public function but not exported from the package itself — currently the linear-scan helpers behind `extract.ts` and `redact.ts`.
- **text/conventions.ts**: Case conversion (camelCase, PascalCase, snake_case, kebab-case, capitalize, titleCase).
- **text/slugify.ts**: URL-safe slug generation with Unicode accent normalization.
- **text/clear.ts**: Remove punctuation and clean text.
- **text/count.ts**: Count words, sentences, and letters.
- **text/reverse.ts**: Reverse strings.
- **text/spread.ts**: Convert strings to character arrays.
- **text/truncate.ts**: Shorten text to a max length with an ellipsis.
- **text/mask.ts**: Partially mask a string for display (the primitive `redact.ts` is built on).
- **text/redact.ts**: Detect and mask PII (email, phone, credit card, public IPv4) and secrets (API keys, JWTs) in free-form text.
- **text/extract.ts**: Find every email/URL embedded in a block of text.
- **numbers/numbersToWords.ts**: Convert numbers to English words.
- **assets/regex.ts**: Centralized regex patterns for reuse.
- **bin/textconvert.ts** and **cli.ts**: The `npx textconvert` CLI (currently just `redact`) — `cli.ts` holds the testable argument-parsing/dispatch logic, `bin/textconvert.ts` is the thin entry point that wires it to real `process`/stdio and gets built into `dist/cli.js`. This is the one part of `src/` that legitimately depends on Node built-ins; everything else stays runtime-agnostic by design.
- **textConvert.ts**: Aggregates and exports all public functions for library consumers.

---

## Design Principles

- **Single Responsibility**: Each function/module does one thing well.
- **Pure Functions**: Most utilities are pure, with no side effects.
- **TypeScript First**: All code is written in TypeScript for safety and clarity.
- **Test Coverage**: Every logic function has corresponding tests.
- **Extensibility**: New functions can be added easily (see `docs/ADDING_FUNCTION.md`).
- **No External Dependencies**: The library is dependency-free for maximum portability.
- **ReDoS-Safe Scanning**: Functions that scan free-form text for candidate matches (`extract.ts`, `redact.ts`, `countSentences`) use linear character-by-character scans instead of backtracking-prone regexes, so they can't be driven into quadratic-time behavior by adversarial input. `text/internal/scan.ts` centralizes this pattern where more than one function needs it.

---

## Extension Points

- **Adding New Functions**: Follow the guide in `docs/ADDING_FUNCTION.md`.
- **Adding New Validators**: Place in `text/validation/`, export via `textConvert.ts`, and document.
- **Adding New Analysis Tools**: Place in `text/analysis/`, export and document as above.
- **Adding New Text Scanners**: If it scans free-form text for candidate substrings (like `extract.ts`/`redact.ts` do), check `text/internal/scan.ts` first — reuse its helpers instead of writing another backtracking regex.

---

## Build & Distribution

- **Bundling**: Uses Rollup to bundle for CommonJS and ESM.
- **Type Declarations**: TypeScript generates `.d.ts` files for consumers.
- **Testing**: Uses Vitest for fast, modern testing.
- **Registries**: Published to npm, with a mirror publish to [JSR](https://jsr.io) on the same release.

---

## Future Directions

- Expanding `detectLanguage`'s supported language set beyond the current seven.
- IPv6 support for `redact`'s `'ip'` type -- deferred from #363, since its textual representation (zero-compression, embedded IPv4-mapped forms, zone IDs) is a materially larger parsing problem than IPv4.
- More CLI commands beyond `redact`, if there's demand.

---

For more details, see the README and other docs. Contributions and suggestions are welcome!
