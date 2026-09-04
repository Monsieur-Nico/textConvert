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

- **Build the API reference site locally:**

  ```sh
  npm run docs:build
  ```

  Generates a static site from JSDoc comments into `typedoc-site/` (gitignored, not committed). The live version is published automatically to [GitHub Pages](https://monsieur-nico.github.io/textConvert/) on every push to `main`.

## Commit Message Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) for all commits. This is enforced by pre-commit hooks and CI.

**Format:**

```text
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

```text
feat: add support for Dutch language detection
```

### How Commit Messages Drive the Version Bump

[release-please](https://github.com/googleapis/release-please) reads commit types on `main` to decide the next version — this is mechanical (it just parses your commit message), so getting the type right is what actually determines the release:

| Commit type                                       | Version bump                                |
| ------------------------------------------------- | ------------------------------------------- |
| `fix:`                                            | Patch (`1.10.0` → `1.10.1`)                 |
| `feat:`                                           | Minor (`1.10.0` → `1.11.0`)                 |
| `feat!:` / `fix!:` or a `BREAKING CHANGE:` footer | Major (`1.10.0` → `2.0.0`)                  |
| `docs:`, `chore:`, `test:`, `refactor:`           | None — doesn't trigger a release on its own |

This is entirely up to whoever writes the commit — nothing checks whether a change is _actually_ breaking, it only trusts what the message says. Mark something `feat:` when it should've been `feat!:` and it ships as a minor bump with no warning.

**Marking a breaking change:**

```text
feat!: change truncate's maxLength to exclude the ellipsis

BREAKING CHANGE: maxLength previously included the ellipsis in the count; it is now added on top, so truncated strings may be up to `ellipsis.length` characters longer than before.
```

For this project, that includes:

- Removing or renaming an exported function or type (e.g. `slugify`, `Language`, `TextStatistics`).
- Changing a function's parameters — order, removing one, or optional → required.
- Changing a function's return shape.
- Changing a function's output for previously-valid inputs, even with the signature unchanged (e.g. tightening a validator's rules).
- Changing the shared "invalid input" convention most functions follow (returning `'Please provide a valid input text'` instead of throwing) — since it's used across most of the library, changing it is breaking everywhere at once, not just for one function.
- Raising the minimum Node version in `engines.node`, or changing the build output (e.g. dropping CJS support).

## Pre-commit & Pre-push Hooks

- **Pre-commit:** Only staged files are linted and formatted automatically.
- **Pre-push:** Tests are run before every push.
- **Commit message:** Must follow Conventional Commits (checked automatically).

## Proposing Changes

- Open an [issue](https://github.com/Monsieur-Nico/textConvert/issues) for bugs or feature requests.
- Fork and create a feature branch for your changes.
- Ensure all tests pass and code is linted/formatted before opening a pull request.
- Use the provided PR template and follow the commit message guidelines.

## Documentation Requirements

When adding or changing any **public function**:

- Follow the step-by-step instructions in [docs/ADDING_FUNCTION.md](docs/ADDING_FUNCTION.md).
- Update [README.md](README.md) (Features section and API Reference table).
- Add a detailed entry (description, parameters, return type, example, edge cases) to the matching category file under [docs/api/](docs/api/) — e.g. a new validation function goes in `docs/api/validation.md`. If it doesn't fit an existing category, add a new `docs/api/<category>.md` file and link it from `docs/API.md`'s index. Do **not** add a separate example to a second file — the category file's own example is the only one, by design (see #340).
- Add or update `@example` tags in JSDoc comments for all public functions to ensure TypeDoc generates accurate usage examples.
- Ensure all documentation is clear, accurate, and up to date.

## Recognizing Contributors

This project follows the [all-contributors](https://allcontributors.org/) specification, but the CLI is intentionally **not** a devDependency (its dependency chain carries unresolved security advisories). To add a contributor, either:

- Run it as a one-off, without installing it: `npx all-contributors-cli add <username> <contribution-type>[,<contribution-type>...]`, or
- Edit [.all-contributorsrc](.all-contributorsrc) and the contributors table in [README.md](README.md) by hand — the format is straightforward and changes are infrequent.

## Release & Publishing

- Releases are managed automatically by [release-please](https://github.com/googleapis/release-please), driven by Conventional Commits on `main`. There's nothing to run manually.
- Every push to `main` that contains releasable commits (`feat`, `fix`, etc.) opens or updates a release PR with the version bump and CHANGELOG.md entry. Merging that PR creates the GitHub Release and tag.
- See [How Commit Messages Drive the Version Bump](#how-commit-messages-drive-the-version-bump) above for exactly which commit type produces which bump, and what counts as a breaking change for this project.
- When that release is published, the package is automatically published to npm via GitHub Actions.
- The package is also mirrored to [JSR](https://jsr.io/@monsieur-nico/textconvert) as a fallback registry, published from the same workflow right after npm. `jsr.json`'s `version` field is synced from `package.json` automatically in CI — it doesn't need to be updated by hand. The JSR publish step is best-effort (`continue-on-error`), so a JSR-side hiccup doesn't fail the whole release after npm has already succeeded.

## Code of Conduct

Please be respectful and follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

---

Thank you for helping make textConvert better! 🚀
