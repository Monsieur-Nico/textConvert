import { assert } from "chai";
import { it } from "mocha";
import { clear } from "../../src/textConvert";

describe("#clear", () => {
  it("should return ['hello', 'world'] for 'hello-world'", () => {
    assert.deepStrictEqual(clear("hello-world"), ["hello", "world"]);
  });
  it("should return ['hello', 'world'] for 'Hello-world'", () => {
    assert.deepStrictEqual(clear("Hello-world"), ["hello", "world"]);
  });
  it("should return ['hello', 'world'] for 'hello_world'", () => {
    assert.deepStrictEqual(clear("hello_world"), ["hello", "world"]);
  });
  it("should return ['hello', 'world'] for 'hello world'", () => {
    assert.deepStrictEqual(clear("hello world"), ["hello", "world"]);
  });
  it("should return 'hello world' for 'Hello,world'", () => {
    assert.strictEqual(clear("Hello,world", false), "hello world");
  });
  it("should return 'hello world' for 'Hello world'", () => {
    assert.strictEqual(clear("Hello world", false), "hello world");
  });
  it("should return 'Please provide a valid input text' for empty input", () => {
    assert.strictEqual(clear(""), "Please provide a valid input text");
  });
});
