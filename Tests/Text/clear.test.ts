import { assert } from "chai";
import { it } from "mocha";
import { clear } from "../../src/textConvert";

describe("#clear", () => {
  it("should return 'hello world' for 'Hello,world'", () => {
    assert.strictEqual(clear("Hello,world"), "hello world");
  });
  it("should return 'hello world' for 'Hello world'", () => {
    assert.strictEqual(clear("Hello world"), "hello world");
  });
  it("should return 'Please provide a valid input text' for empty input", () => {
    assert.strictEqual(clear(""), "Please provide a valid input text");
  });
});
