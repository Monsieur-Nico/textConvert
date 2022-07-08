import { assert } from "chai";
import { pascalCase } from "../../src/Conventions/pascalCase";

describe("#PascalCase", () => {
  it("should return HelloWorld for 'hello-world'", () => {
    assert.strictEqual(pascalCase("hello-world"), "HelloWorld");
  });
  it("should return HelloWorld for 'Hello-world'", () => {
    assert.strictEqual(pascalCase("Hello-world"), "HelloWorld");
  });
  it("should return HelloWorld for 'hello_world'", () => {
    assert.strictEqual(pascalCase("hello_world"), "HelloWorld");
  });
  it("should return HelloWorld for 'Hello_world'", () => {
    assert.strictEqual(pascalCase("Hello_world"), "HelloWorld");
  });
  it("should return HelloWorld for 'hello world'", () => {
    assert.strictEqual(pascalCase("hello world"), "HelloWorld");
  });
  it("should return HelloWorld for 'Hello world'", () => {
    assert.strictEqual(pascalCase("Hello world"), "HelloWorld");
  });
  it("should return 'Please provide a valid input text' for empty input", () => {
    assert.strictEqual(pascalCase(""), "Please provide a valid input text");
  });
});
