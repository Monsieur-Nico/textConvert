import { assert } from "chai";
import { describe } from "mocha";
import { reverse } from "../../src/textConvert";

describe("#reverse", () => {
  it("it should return 'dlrow olleh' for 'hello world'", () => {
    assert.deepStrictEqual(reverse("hello world"), "dlrow olleh");
  });
  it("it should return '!dlrow ,olleh' for 'hello, world!'", () => {
    assert.deepStrictEqual(reverse("hello world"), "dlrow olleh");
  });
  it("it should return 'racecar' from 'racecar'", () => {
    assert.deepStrictEqual(reverse("racecar"), "racecar");
  });
  it("it should return 'This text is about to be reversed!' from '!desrever eb ot tuoba si txet sihT'", () => {
    assert.deepStrictEqual(
      reverse("This text is about to be reversed!"),
      "!desrever eb ot tuoba si txet sihT"
    );
  });
  it("should return 'Please provide a valid input text' for empty input", () => {
    assert.strictEqual(reverse(""), "Please provide a valid input text");
  });
});
