# Contributing to textConvert

Thank you for your interest in contributing! 🎉

## Getting Started

1. **Fork** this repository and **clone** your fork locally.
2. Install dependencies:

   ```sh
   npm install
   ```

3. New to the codebase? Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) first — it covers the project structure, module responsibilities, and design principles behind the library.

## Development Workflow

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

- **Run every CI check at once (lint, formatting, type check, tests with coverage, build):**

  ```sh
  npm run verify
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

- In the changelog: `feat` (✨ Features), `fix` (🐛 Fixes), `perf` (⚡ Performance), `revert` (⏪ Reverts)
- Accepted but left out of the changelog: `refactor`, `docs`, `test`, `chore`, `build`, `ci`, `style`

**Example:**

```text
feat: add support for Dutch language detection
```

### How Commit Messages Drive the Version Bump

[release-please](https://github.com/googleapis/release-please) reads commit types on `main` to decide the next version — this is mechanical (it just parses your commit message), so getting the type right is what actually determines the release:

| Commit type                                                        | Version bump                                |
| ------------------------------------------------------------------ | ------------------------------------------- |
| `fix:`, `perf:`, `revert:`                                         | Patch (`1.10.0` → `1.10.1`)                 |
| `feat:`                                                            | Minor (`1.10.0` → `1.11.0`)                 |
| `feat!:` / `fix!:` or a `BREAKING CHANGE:` footer                  | Major (`1.10.0` → `2.0.0`)                  |
| `refactor:`, `docs:`, `test:`, `chore:`, `build:`, `ci:`, `style:` | None — doesn't trigger a release on its own |

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

**Also update when shipping a breaking change:** add or update its entry in [MIGRATION.md](MIGRATION.md), with concrete before/after guidance — the `BREAKING CHANGE:` footer feeds CHANGELOG.md automatically, but a terse one-paragraph footer isn't the same as an upgrade guide, especially when several breaking changes land in the same major version.

## Deprecation Policy

Before removing or renaming a public function, deprecate it first — give consumers a documented warning period rather than dropping something with zero notice in the next major release. Nothing in the library is deprecated yet; this section exists so there's a clear, agreed-on process ready for whenever that first happens.

**How to mark something deprecated:**

Add a `@deprecated` JSDoc tag noting the version it was deprecated in and what to use instead. The function's implementation doesn't change — it keeps working exactly as before, this is purely an annotation:

```ts
/**
 * @deprecated Since v3.2.0 — use {@link newFunction} instead. Will be removed in the next major version.
 */
export function oldFunction(text: string): string {
  // unchanged
}
```

This is enough on its own — TypeScript-aware editors render a strikethrough with the deprecation note on hover, and TypeDoc surfaces `@deprecated` distinctly on the generated docs site. There's deliberately no runtime `console.warn`: a per-call warning is a real cost for perf-sensitive callers, and isn't justified while the library has this few real, known consumers to protect — revisit only if that changes.

**Commit type:** `docs:` for the deprecation itself, since only documentation changes, not behavior. This won't trigger a version bump on its own, but shows up in the next release's CHANGELOG under Documentation regardless.

**Timing:** a deprecated function must keep working, unchanged, for at least one full minor-version release cycle before it can actually be removed. Removal itself is unchanged from the [breaking-change policy above](#how-commit-messages-drive-the-version-bump) (`feat!:`/`BREAKING CHANGE:`, major version bump) — deprecation doesn't replace that, it just guarantees advance notice happens first.

**Also update when deprecating something:**

- Its entry in the README's API Reference table and Features section — note that it's deprecated and point to the replacement.
- Its entry in the matching `docs/api/<category>.md` file — same note, at the top of its section.
- Leave both in place until the function is actually removed in a later major version — don't delete the docs entry just because it's deprecated.

## Pre-commit & Pre-push Hooks

- **Pre-commit:** Only staged files are linted and formatted automatically.
- **Pre-push:** Tests are run before every push.
- **Commit message:** Must follow Conventional Commits (checked automatically).

## Proposing Changes

- Open an [issue](https://github.com/Monsieur-Nico/textConvert/issues) for bugs or feature requests.
- Fork and create a feature branch for your changes.
- Run `npm run verify` before opening a pull request. It runs the same checks as CI.
- Use the provided PR template and follow the commit message guidelines.
- PRs are rebase-merged, so every commit on your branch lands on `main` as written. Give each one a conventional message, since each becomes its own changelog entry.

## Documentation Requirements

When adding or changing any **public function**:

- Follow the step-by-step instructions in [docs/ADDING_FUNCTION.md](docs/ADDING_FUNCTION.md).
- Update [README.md](README.md) (Features section and API Reference table).
- Add a detailed entry (description, parameters, return type, example, edge cases) to the matching category file under [docs/api/](docs/api/) — e.g. a new validation function goes in `docs/api/validation.md`. If it doesn't fit an existing category, add a new `docs/api/<category>.md` file and link it from `docs/API.md`'s index. Do **not** add a separate example to a second file — the category file's own example is the only one, by design (see #340).
- Add the new file to [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)'s "Project Structure" tree and "Main Modules & Responsibilities" list — easy to forget since nothing else enforces it, but it's the "read this first" doc and drifts fast if skipped.
- Add or update `@example` tags in JSDoc comments for all public functions to ensure TypeDoc generates accurate usage examples.
- Ensure all documentation is clear, accurate, and up to date.
- Deprecating rather than removing a function? See the [Deprecation Policy](#deprecation-policy) instead — different process, different commit type.

## Recognizing Contributors

This project follows the [all-contributors](https://allcontributors.org/) specification, but the CLI is intentionally **not** a devDependency (its dependency chain carries unresolved security advisories). To add a contributor, either:

- Run it as a one-off, without installing it: `npx all-contributors-cli add <username> <contribution-type>[,<contribution-type>...]`, or
- Edit [.all-contributorsrc](.all-contributorsrc) and the contributors table in [README.md](README.md) by hand — the format is straightforward and changes are infrequent.

## Release & Publishing

- Releases are managed automatically by [release-please](https://github.com/googleapis/release-please), driven by Conventional Commits on `main`. There's nothing to run manually.
- Every push to `main` that contains releasable commits (`feat`, `fix`, etc.) opens or updates a release PR with the version bump and CHANGELOG.md entry. Merging that PR creates the GitHub Release and tag.
- See [How Commit Messages Drive the Version Bump](#how-commit-messages-drive-the-version-bump) above for exactly which commit type produces which bump, and what counts as a breaking change for this project.
- PRs are merged with **Rebase and merge** only; merge commits and squash merging are turned off in the repository settings. A merge commit carries the PR title, which release-please reads as a second changelog entry for the same change, and squash merging would collapse a PR's per-concern commits into one.
- When that release is published, the package is automatically published to npm via GitHub Actions.
- npm publishing uses [trusted publishing](https://docs.npmjs.com/trusted-publishers) (OIDC), with no npm token stored in the repository. `release-please.yml` and `publish-next.yml` are each registered as a trusted publisher in the package's settings on npmjs.com, and a workflow file that isn't registered there can't publish.
- Trusted publishing can't change dist-tags, so `next` doesn't follow a stable release on its own. After a stable release, a maintainer moves it by hand (npm asks for a 2FA code), unless `next` already points at a newer prerelease line such as `4.0.0-next.N`:

  ```sh
  npm dist-tag add textconvert@<version> next
  ```

- The package is also mirrored to [JSR](https://jsr.io/@monsieur-nico/textconvert) as a fallback registry, published from the same workflow right after npm. release-please bumps `jsr.json`'s `version` in the release PR alongside `package.json` (`extra-files` in `release-please-config.json`), so it never needs updating by hand. The JSR publish step is best-effort (`continue-on-error`), so a JSR-side hiccup doesn't fail the whole release after npm has already succeeded.

## Maintaining a Prior Major Version

`main` is always the trunk, and while it only holds changes for the current major, it is also the maintenance line: fixes go to `main` and ship as normal patch releases (see the versioning guide above).

A maintenance branch is only needed once a breaking change is about to merge to `main`. From then on, every later commit, even an unrelated one-line bugfix, rides along in the unreleased next-major bundle and can't ship as a patch to the _currently published_ major until the bundle is ready.

**Before the first breaking change merges to `main`,** a maintainer cuts `N.x` (the current major, e.g. `3.x`) from that major's latest release tag:

- Run `git switch -c 3.x v3.0.7` (substituting the real latest tag), then push the branch and give it the same branch protection as `main`.
- On the new branch, replace `release-please.yml` with an `N.x` release workflow. Commit [`68909c4`](https://github.com/Monsieur-Nico/textConvert/commit/68909c4) shows the pattern for v3. Compared with `release-please.yml`, it triggers on pushes to `N.x`, passes `target-branch: N.x` to the release-please action, and publishes with `npm publish --tag vN`. npm points `latest` at whatever was published most recently, so an untagged publish from an old major's branch would take over `npm install textconvert`.
- Register the new workflow file (`release-please-N.x.yml` in that pattern) as a trusted publisher in the package's settings on npmjs.com before the branch's first release, and don't give it an npm token. Without that registration, its publish step fails.
- The branch inherits `.release-please-manifest.json` already set to that major's last version, so no manifest change is needed.
- `ci.yml` already runs on `'*.x'` branches, so PRs into any `N.x` branch get tested with no further changes there.

**Once `N.x` exists,** urgent fixes for the published major go there:

1. Open your PR against `N.x`, not `main`.
2. Once merged, release-please cuts a normal patch release from that branch on its own schedule, independent of `main`.
3. If the bug also affects `main`, cherry-pick the same fix commit onto `main` too. A fix landing on `N.x` doesn't automatically appear on `main`, since they're independent branches from that point on.

## Code of Conduct

Please be respectful and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

---

Thank you for helping make textConvert better! 🚀
