import { assert } from "chai";
import * as conventions from "../../src/Text/conventions";

const { camelCase, pascalCase } = conventions;

describe("#camelCase", () => {
  it("should return helloWorld for 'hello-world'", () => {
    assert.strictEqual(camelCase("hello-world"), "helloWorld");
  });
  it("should return helloWorld for 'Hello-world'", () => {
    assert.strictEqual(camelCase("Hello-world"), "helloWorld");
  });
  it("should return helloWorld for 'hello_world'", () => {
    assert.strictEqual(camelCase("hello_world"), "helloWorld");
  });
  it("should return helloWorld for 'Hello_world'", () => {
    assert.strictEqual(camelCase("Hello_world"), "helloWorld");
  });
  it("should return helloWorld for 'hello world'", () => {
    assert.strictEqual(camelCase("hello world"), "helloWorld");
  });
  it("should return helloWorld for 'Hello world'", () => {
    assert.strictEqual(camelCase("Hello world"), "helloWorld");
  });
  it("should return helloWorld for 'Hello,world'", () => {
    assert.strictEqual(camelCase("Hello,world"), "helloWorld");
  });
  it("should return helloWorld for 'Hello.world'", () => {
    assert.strictEqual(camelCase("Hello.world"), "helloWorld");
  });
  it("should return 'Please provide a valid input text' for empty input", () => {
    assert.strictEqual(camelCase(""), "Please provide a valid input text");
  });
});

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
  it("should return HelloWorld for 'Hello,world'", () => {
    assert.strictEqual(pascalCase("Hello,world"), "HelloWorld");
  });
  it("should return HelloWorld for 'Hello.world'", () => {
    assert.strictEqual(pascalCase("Hello.world"), "HelloWorld");
  });
  it("should return 'Please provide a valid input text' for empty input", () => {
    assert.strictEqual(pascalCase(""), "Please provide a valid input text");
  });
});
