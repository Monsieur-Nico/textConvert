# Contributing to textConvert

Thank you for your interest in contributing! 🎉

## Getting Started

1. **Fork** this repository and **clone** your fork locally.
2. Install dependencies:
   ```sh
   npm install
   ```

## Development Workflow

- **Start development:**
  ```sh
  npm run dev
  ```
- **Build the project:**
  ```sh
  npm run build
  ```
- **Run tests:**
  ```sh
  npm test
  ```
- **Watch tests:**
  ```sh
  npm run test:watch
  ```
- **Check coverage:**
  ```sh
  npm run coverage
  ```
- **Lint code:**
  ```sh
  npm run lint
  ```
- **Auto-fix lint issues:**
  ```sh
  npm run lint:fix
  ```
- **Format code:**
  ```sh
  npm run format
  ```

## Commit Message Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) for all commits. This is enforced by pre-commit hooks and CI.

**Format:**

```
<type>: <short summary>
```

**Allowed types:**

- feat: ✨ Features
- fix: 🐛 Fixes
- refactor: 🧼 Refactors
- docs: 📚 Documentation
- test: ✅ Tests
- chore: 🔧 Chores

**Example:**

```
feat: add support for Dutch language detection
```

## Pre-commit & Pre-push Hooks

- **Pre-commit:** Only staged files are linted and formatted automatically.
- **Pre-push:** Tests are run before every push.
- **Commit message:** Must follow Conventional Commits (checked automatically).

## Proposing Changes

- Open an [issue](https://github.com/Monsieur-Nico/textConvert/issues) for bugs or feature requests.
- Fork and create a feature branch for your changes.
- Ensure all tests pass and code is linted/formatted before opening a pull request.
- Use the provided PR template and follow the commit message guidelines.

## Release & Publishing

- Releases are managed with `standard-version` and follow Conventional Commits.
- When a release is published on GitHub, the package is automatically published to npm via GitHub Actions.

## Code of Conduct

Please be respectful and follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

---

Thank you for helping make textConvert better! 🚀
