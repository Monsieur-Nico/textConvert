import { assert } from "chai";
import { it } from "mocha";
import { numbersToWords } from "../../src/Numbers/numbersToWords";

describe("#numbersToWords", () => {
  it("should return 'one hundred and fifty-two' for 152", () => {
    assert.strictEqual(numbersToWords(152), "one hundred and fifty-two");
  });
  it("should return 'one thousand five hundred and fifty-two' for 1552", () => {
    assert.strictEqual(
      numbersToWords(1552),
      "one thousand five hundred and fifty-two"
    );
  });
  it("should return 'eleven thousand five hundred and fifty-two' for 11552", () => {
    assert.strictEqual(
      numbersToWords(11552),
      "eleven thousand five hundred and fifty-two"
    );
  });
  it("should return 'one hundred and eleven thousand five hundred and fifty-two' for 111552", () => {
    assert.strictEqual(
      numbersToWords(111552),
      "one hundred and eleven thousand five hundred and fifty-two"
    );
  });
  it("should return 'ten million' for 10000000", () => {
    assert.strictEqual(numbersToWords(10000000), "ten million");
  });
  it("should return 'ninety-two million' for 92000000", () => {
    assert.strictEqual(numbersToWords(92000000), "ninety-two million");
  });
  it("should return Error for 100,000,000", () => {
    assert.throws(() => {
      numbersToWords(100000000);
    }, "Please enter a number under 100 million!");
  });
});
