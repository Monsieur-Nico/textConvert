# How to Add a New Function to textConvert

This guide explains the steps to add a new function to the textConvert library, ensuring it is properly implemented, exported, documented, and tested.

---

## 1. Implement the Function

- Create a new file in the appropriate directory under `src/` (e.g., `src/text/validation/yourFunction.ts`).
- Write your function as a named export:

  ```ts
  export function yourFunction(args: Type): ReturnType {
    // Implementation
  }
  ```

- Follow the project's code style and add a JSDoc comment explaining the function, parameters, return value, and examples.

## 2. Export the Function in textConvert.ts

- Import your function in `src/textConvert.ts`:

  ```ts
  import { yourFunction } from './text/validation/yourFunction';
  ```

- Add it to the export block:

  ```ts
  export {
    // ...other exports
    yourFunction,
  };
  ```

## 3. Update Documentation (Required)

- **README.md**
  - Add a description and example for your function in the **Features** section.
  - Add your function to the **API Reference** table.
- **docs/API.md**
  - Add a detailed entry for your function: description, parameters, return type, example, and edge cases.
- **docs/RECIPES.md**
  - Add at least one practical usage example or recipe for your function if applicable.

## 4. Write Tests

- Create a test file in the appropriate directory under `tests/` (e.g., `tests/text/validation/yourFunction.test.ts`).
- Use the `vitest` framework for writing tests.
- Cover normal, edge, and invalid input cases.

## 5. Lint and Format

- Run the linter and formatter to ensure code quality:

  ```sh
  npm run lint
  npm run format
  ```

## 6. Build and Test

- Run the build and test scripts to verify everything works:

  ```sh
  npm run build
  npm test
  ```

## 7. Commit and Document Changes

- Use a Conventional Commit message (e.g., `feat: add yourFunction for ...`).
- Update the changelog if needed.

---

By following these steps, your new function will be fully integrated, documented, and tested in the textConvert library. Keeping all documentation up to date ensures a great experience for all users and contributors.
