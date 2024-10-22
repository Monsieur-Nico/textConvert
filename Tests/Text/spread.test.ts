import { assert } from "chai";
import { it } from "mocha";
import { spread } from "../../src/textConvert";

describe("#spread", () => {
  it("should return ['H', 'e', 'l', 'l', 'o'] for 'Hello'", () => {
    assert.deepStrictEqual(spread("Hello"), ["H", "e", "l", "l", "o"]);
  });
  it("should return ['H', 'e', 'l', 'l', 'o', ',', 'w', 'o', 'r', 'l', 'd'] for 'Hello, world'", () => {
    assert.deepStrictEqual(spread("Hello, world"), [
      "H",
      "e",
      "l",
      "l",
      "o",
      ",",
      "w",
      "o",
      "r",
      "l",
      "d",
    ]);
  });
  it("should return ['H', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd'] for 'Hello, world'", () => {
    assert.deepStrictEqual(spread("Hello, world", true), [
      "H",
      "e",
      "l",
      "l",
      "o",
      "w",
      "o",
      "r",
      "l",
      "d",
    ]);
  });
});
