import { assert } from "chai";
import { it } from "mocha";
import { count } from "../../src/textConvert";

describe("#count", () => {
  it("should return 10 for 'Hello,world'", () => {
    assert.strictEqual(count("Hello,world"), 10);
  });
  it("should return 10 for 'Hello world'", () => {
    assert.strictEqual(count("Hello world"), 10);
  });
  it("should return 0 for empty input", () => {
    assert.strictEqual(count(""), 0);
  });
});
