# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.5.1](https://github.com/Monsieur-Nico/textConvert/compare/v1.5.0...v1.5.1) (2025-06-12)


### 🧼 Refactors

* streamline import statements in textConvert.ts for improved readability and consistency ([d621916](https://github.com/Monsieur-Nico/textConvert/commit/d6219167e5038bce2eb4b477027148eac546bf2a))


### ✅ Tests

* add comprehensive unit tests for email validation functionality, covering valid, invalid, and edge case scenarios ([21410ca](https://github.com/Monsieur-Nico/textConvert/commit/21410cafcfbc5c7909e04f81a6a890da41e0186a))


### ✨ Features

* add isEmail function to textConvert.ts for email validation integration ([b363b32](https://github.com/Monsieur-Nico/textConvert/commit/b363b32e66a51db6676e03fdbb71d8e378989190))
* implement email validation function adhering to RFC 5322 standards, including comprehensive checks for structure, character validity, and length limits ([4f7fd7b](https://github.com/Monsieur-Nico/textConvert/commit/4f7fd7bd0a809adb908b5fec6beb863638a056ab))


### 🔧 Chores

* format all the files ([5fcc904](https://github.com/Monsieur-Nico/textConvert/commit/5fcc904bb33fd9f1bcc84229f683f4993d9311d6))
* remove outdated documentation files and assets from the repository ([97a7fc3](https://github.com/Monsieur-Nico/textConvert/commit/97a7fc3599d927a07b5397cf7551ad7ead3caaef))


### 📚 Documentation

* add architecture overview for textConvert library, detailing project structure, main modules, design principles, and future directions ([0a110b7](https://github.com/Monsieur-Nico/textConvert/commit/0a110b705c37ec2c26c065a6612582de7c7ab649))
* add comprehensive API reference for textConvert library, detailing all public functions, parameters, return values, examples, and edge cases ([5b43b72](https://github.com/Monsieur-Nico/textConvert/commit/5b43b7244a6e638640a943a9940a44051511f007))
* add example usage for getTextStats function to enhance documentation clarity ([e2ed14d](https://github.com/Monsieur-Nico/textConvert/commit/e2ed14d5d86afe4464feb93e0ca09699b7cfb278))
* add examples to various text processing functions for improved clarity and usage guidance ([bcd4f2a](https://github.com/Monsieur-Nico/textConvert/commit/bcd4f2a7f3d8beaa20aee6dbc6fdeedb2c10ad3c))
* add FAQ section for textConvert library, covering installation, usage, features, compatibility, contributing, and troubleshooting ([0f5845e](https://github.com/Monsieur-Nico/textConvert/commit/0f5845ed1a4ca73bc63609efe802199ee031ab40))
* add guide for adding new functions to textConvert library ([109761d](https://github.com/Monsieur-Nico/textConvert/commit/109761d1ced7df68c9a2d33f0440a15d0483ac06))
* add recipes and advanced usage guide for textConvert library ([bb5d493](https://github.com/Monsieur-Nico/textConvert/commit/bb5d493413a6a93e8fe6aa4dd58cbf86927bba16))
* enhance contributing guidelines with detailed development workflow and documentation requirements ([0e190f8](https://github.com/Monsieur-Nico/textConvert/commit/0e190f8116cabcac887bbabe13acec4b8d82a649))
* update architecture document to specify code block formatting for project structure ([d073101](https://github.com/Monsieur-Nico/textConvert/commit/d073101cc612978141b55aa7b1b9d455a46c739e))
* update function addition guide to include detailed documentation requirements for README.md, API.md, and RECIPES.md ([05eac9f](https://github.com/Monsieur-Nico/textConvert/commit/05eac9fdab834d230545b2c4512ba2938e70d4c2))
* update pull request template to improve formatting and clarity ([445377d](https://github.com/Monsieur-Nico/textConvert/commit/445377d6cad08985d57b60be7598533bc81d5541))
* update README to include isEmail function details and usage examples ([ac441aa](https://github.com/Monsieur-Nico/textConvert/commit/ac441aa836f7e6ca65ccc4da07366423daf19be5))
* update README.md to include quick examples and API documentation links for enhanced usability ([7dcb8f4](https://github.com/Monsieur-Nico/textConvert/commit/7dcb8f443a79937e3d3a197892583a15ba18a953))

## [1.5.0](https://github.com/Monsieur-Nico/textConvert/compare/v1.4.0...v1.5.0) (2025-06-11)

### 📚 Documentation

- Add @Monsieur-Nico as a contributor ([b25ac5e](https://github.com/Monsieur-Nico/textConvert/commit/b25ac5eb771e58ab47372803820cab0484088c5b))
- Add @Monsieur-Nico as a contributor ([1bdb491](https://github.com/Monsieur-Nico/textConvert/commit/1bdb491cf6342531b8eb73fdc3bbaf68ab816dc0))
- add CONTRIBUTING.md to outline contribution guidelines and development workflow ([7948f03](https://github.com/Monsieur-Nico/textConvert/commit/7948f036d89884562cbd94382629ebbbd1935fbe))
- update README to improve structure, add new features, and enhance usage examples ([fac3e0a](https://github.com/Monsieur-Nico/textConvert/commit/fac3e0a8311eb96be7c5d73a3064c301994fb259))
- update README to reference CONTRIBUTING.md for contribution guidelines and streamline the contributing section ([a85b5c3](https://github.com/Monsieur-Nico/textConvert/commit/a85b5c39223fc32c3d783e79e8a2bdd1f2005c57))

### 🔧 Chores

- add commitlint configuration and update CI workflow to include linting, formatting checks, and type checking ([fe06971](https://github.com/Monsieur-Nico/textConvert/commit/fe06971dfa9f22d8e082328c885d6f4fb3bd88b0))
- add ESLint configuration and TypeScript support by creating eslint.config.js, tsconfig.eslint.json, and vitest.config.js, while removing .eslintignore ([2647750](https://github.com/Monsieur-Nico/textConvert/commit/264775096bfc9a10cc16b3eaa74193eccfbc8628))
- add Rollup configuration for building textConvert module with CommonJS and ESM outputs ([38ed5ce](https://github.com/Monsieur-Nico/textConvert/commit/38ed5ce165e7af181751e68615127db150da3c37))
- add security audit step to CI workflow for moderate vulnerabilities ([4f02b91](https://github.com/Monsieur-Nico/textConvert/commit/4f02b91c32085d2603755952bfd39d3cad59caed))
- enhance ESLint and Prettier integration by adding Prettier to ESLint config, creating .prettierrc, and updating package.json with linting scripts ([1a2b6b4](https://github.com/Monsieur-Nico/textConvert/commit/1a2b6b426da16e398070f9f966dfd57068784d15))
- reorganize package.json scripts for clarity and consistency by removing duplicates and adding formatting and linting commands ([d886669](https://github.com/Monsieur-Nico/textConvert/commit/d886669bf4e6b98be12ebc5b5edd68b70e968143))
- update CI workflow to support multiple Node.js versions (18.x, 20.x, 22.x) ([9371060](https://github.com/Monsieur-Nico/textConvert/commit/93710601f5a62775535393f047a9644e007cf875))
- update package configuration with Rollup plugins, add funding information, and enhance export settings ([02e7be0](https://github.com/Monsieur-Nico/textConvert/commit/02e7be080f9f8ecde7fb3d5f5d72c53201a46291))
- update TypeScript configuration to use ESNext module and enable node module resolution ([b916000](https://github.com/Monsieur-Nico/textConvert/commit/b9160002d1ca725cf30519af90cf860e251fdcfa))

### 🧼 Refactors

- clean up language.ts by improving code formatting and consistency, including normalization logic and unique character handling ([ab15e9e](https://github.com/Monsieur-Nico/textConvert/commit/ab15e9e9e8f5d1b70ee7cca7e5d26d2cb8ae14a3))

## [1.4.0](https://github.com/Monsieur-Nico/textConvert/compare/v1.3.0...v1.4.0) (2025-06-11)

### 🔧 Chores

- add package-lock.json for consistent dependency management and update .gitignore to ensure it is tracked ([eff22ba](https://github.com/Monsieur-Nico/textConvert/commit/eff22baecb786d8866fb776333c503be6ac8712f))
- enhance CI workflow to ensure dependency installation succeeds with fallback ([b2ecbc3](https://github.com/Monsieur-Nico/textConvert/commit/b2ecbc34d550732ace498ee6387dd590a852679d))
- update coverage configuration in package.json to use Vitest with new reporters and include/exclude patterns ([db957a9](https://github.com/Monsieur-Nico/textConvert/commit/db957a9d54d9bb7e9ca15b6782c211c80b10a8ba))
- update README and Vitest configuration for improved documentation and coverage settings ([75529b2](https://github.com/Monsieur-Nico/textConvert/commit/75529b26ff2bf2a426f765848c1dc13b650749d1))

### ✅ Tests

- add additional test cases for count function to enhance coverage ([68a8397](https://github.com/Monsieur-Nico/textConvert/commit/68a8397b910cd89848bd97b0289b5bee6d1f1522))
- add additional test cases for getTextStats function to handle edge cases in text analysis ([f6c8f47](https://github.com/Monsieur-Nico/textConvert/commit/f6c8f479b62bc32f1cbe11c73f3cd0cb8fb2104d))
- add additional test cases for numbersToWords function to improve coverage ([ffd0a0b](https://github.com/Monsieur-Nico/textConvert/commit/ffd0a0b3edd19f355d1c31965b5fd65c675d65f2))
- add countWords and countSentences functions with corresponding test cases for improved text analysis ([4ed7856](https://github.com/Monsieur-Nico/textConvert/commit/4ed78569a65a8c91c6bf42c8e37a26a10225f673))
- add more test cases for spread function to enhance coverage ([93fb1da](https://github.com/Monsieur-Nico/textConvert/commit/93fb1dae15c3634c987e3bd5a5df5fc8d76083ef))

### ✨ Features

- add detectLanguage function and update README with usage examples and language support details ([79da25d](https://github.com/Monsieur-Nico/textConvert/commit/79da25d4adec92ec85250b9cbdf739f46a558916))
- add getTextStats function for comprehensive text analysis and corresponding tests ([c9b28d8](https://github.com/Monsieur-Nico/textConvert/commit/c9b28d8e0de96570fa17fa39fd8b3ad7493dfbf5))
- enhance language detection with unique character handling and improved scoring for accuracy ([ddf3282](https://github.com/Monsieur-Nico/textConvert/commit/ddf32825d9f42c136135a55daf3f11c2117d794b))
- enhance numbersToWords function to support numbers up to 99,999 and add corresponding test case ([2d025e6](https://github.com/Monsieur-Nico/textConvert/commit/2d025e6eb13004458acd5675b0ed80cc7c705226))

## [1.3.0](https://github.com/Monsieur-Nico/textConvert/compare/v1.1.9...v1.3.0) (2025-06-10)

### ✨ Features

- add Vitest configuration for testing with coverage reporting ([a1fb6ca](https://github.com/Monsieur-Nico/textConvert/commit/a1fb6cae7664f5ede792163399302c765eefa0a7))

### 🧼 Refactors

- convert tests to use Vitest assertions for text conversion functions ([87d0c9c](https://github.com/Monsieur-Nico/textConvert/commit/87d0c9c0b6f960a6636b4bda101657d448065fe2))
- migrate reverse tests to use Vitest assertions ([59fe717](https://github.com/Monsieur-Nico/textConvert/commit/59fe717f6496993de9740370c41521e1c15109e5))
- migrate tests from Mocha/Chai to Vitest for numbersToWords functionality ([2d03a93](https://github.com/Monsieur-Nico/textConvert/commit/2d03a930638d456a84904ad19c0f2ca0832763d8))
- update clear tests to use Vitest assertions ([c8006b6](https://github.com/Monsieur-Nico/textConvert/commit/c8006b64ab36506fb348a3bd2915fe733fdc7caf))
- update count tests to use Vitest assertions ([9565457](https://github.com/Monsieur-Nico/textConvert/commit/95654578abb55425c777468b2530b8ca9e30111a))
- update spread tests to use Vitest assertions ([a128b69](https://github.com/Monsieur-Nico/textConvert/commit/a128b697e3a8fc0598f763454893761fede4e5b4))

### 🔧 Chores

- add .versionrc.json for versioning configuration ([a922f93](https://github.com/Monsieur-Nico/textConvert/commit/a922f935242b8c3ad932fd5b57da7dd4fd9baaff))
- expand .gitignore to include additional files and directories for better project management ([15a2cec](https://github.com/Monsieur-Nico/textConvert/commit/15a2cec043644f1ec196908057df620f6e728b00))
- remove deprecated deps and add mocha ([08f5e17](https://github.com/Monsieur-Nico/textConvert/commit/08f5e17d57c8d393150d3718fca4132d838fd866))
- update scripts and dependencies for improved development workflow ([02ffce7](https://github.com/Monsieur-Nico/textConvert/commit/02ffce7bfd3b7f7fd9f710cbd1a001c91cdf784d))
