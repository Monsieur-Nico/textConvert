import { assert } from "chai";
import { it } from "mocha";
import { spread } from "../../src/textConvert";

describe("#spread", () => {
  it("should return ['H', 'e', 'l', 'l', 'o'] for 'Hello'", () => {
    assert.strictEqual(spread("Hello,world"), "hello world");
  });
  it("should return 'hello world' for 'Hello world'", () => {
    assert.strictEqual(spread("Hello"), ["H", "e", "l", "l", "o"]);
  });
  it("should return 'Please provide a valid input text' for empty input", () => {
    assert.strictEqual(spread(""), "Please provide a valid input text");
  });
});
