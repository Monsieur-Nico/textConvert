# How to Add a New Function to textConvert

This guide explains the steps to add a new function to the textConvert library, ensuring it is properly implemented, exported, documented, and tested.

---

## 1. Implement the Function

- Create a new file in the appropriate directory under `src/` (e.g., `src/Text/Validation/yourFunction.ts`).
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
  import { yourFunction } from './Text/Validation/yourFunction';
  ```

- Add it to the export block:

  ```ts
  export {
    // ...other exports
    yourFunction,
  };
  ```

## 3. Add Documentation

- Add a description and example for your function in the **Features** section of `README.md`.
- Add your function to the **API Reference** table in `README.md`.

## 4. Write Tests

- Create a test file in the appropriate directory under `Tests/` (e.g., `Tests/Text/Validation/yourFunction.test.ts`).
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

By following these steps, your new function will be fully integrated, documented, and tested in the textConvert library.
