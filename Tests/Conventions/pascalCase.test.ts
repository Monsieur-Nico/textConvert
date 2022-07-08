import { assert } from "chai";
import { camelCase } from "../../src/Conventions/camelCase";

describe("#PascalCase", () => {
  it("should return HelloWorld for 'hello-world'", () => {
    assert.strictEqual(camelCase("hello-world"), "HelloWorld");
  });
  it("should return HelloWorld for 'Hello-world'", () => {
    assert.strictEqual(camelCase("Hello-world"), "HelloWorld");
  });
  it("should return HelloWorld for 'hello_world'", () => {
    assert.strictEqual(camelCase("hello_world"), "HelloWorld");
  });
  it("should return HelloWorld for 'Hello_world'", () => {
    assert.strictEqual(camelCase("Hello_world"), "HelloWorld");
  });
  it("should return HelloWorld for 'hello world'", () => {
    assert.strictEqual(camelCase("hello world"), "HelloWorld");
  });
  it("should return HelloWorld for 'Hello world'", () => {
    assert.strictEqual(camelCase("Hello world"), "HelloWorld");
  });
  it("should return 'Please provide a valid input text' for empty input", () => {
    assert.strictEqual(camelCase(""), "Please provide a valid input text");
  });
});
