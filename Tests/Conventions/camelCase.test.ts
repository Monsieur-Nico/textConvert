import { assert } from "chai";
import { camelCase } from "../../src/Conventions/camelCase";

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
});
