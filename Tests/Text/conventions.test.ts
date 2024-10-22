import { assert } from "chai";
import { it } from "mocha";
import {
  camelCase,
  pascalCase,
  snakeCase,
  kebabCase,
} from "../../src/textConvert";

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

describe("#SnakeCase", () => {
  it("should return hello_world for 'hello-world'", () => {
    assert.strictEqual(snakeCase("hello-world"), "hello_world");
  });
  it("should return hello_world for 'Hello-world'", () => {
    assert.strictEqual(snakeCase("Hello-world"), "hello_world");
  });
  it("should return hello_world for 'hello_world'", () => {
    assert.strictEqual(snakeCase("hello_world"), "hello_world");
  });
  it("should return hello_world for 'Hello_world'", () => {
    assert.strictEqual(snakeCase("Hello_world"), "hello_world");
  });
  it("should return hello_world for 'hello world'", () => {
    assert.strictEqual(snakeCase("hello world"), "hello_world");
  });
  it("should return hello_world for 'Hello world'", () => {
    assert.strictEqual(snakeCase("Hello world"), "hello_world");
  });
  it("should return hello_world for 'Hello,world'", () => {
    assert.strictEqual(snakeCase("Hello,world"), "hello_world");
  });
  it("should return hello_world for 'Hello.world'", () => {
    assert.strictEqual(snakeCase("Hello.world"), "hello_world");
  });
  it("should return hello_world for 'HelloWorld'", () => {
    assert.strictEqual(snakeCase("HelloWorld"), "hello_world");
  });
  it("should return hello_world for 'helloWorld'", () => {
    assert.strictEqual(snakeCase("helloWorld"), "hello_world");
  });
  it("should return hello_world for 'hello .World'", () => {
    assert.strictEqual(snakeCase("hello .World"), "hello_world");
  });
  it("should return 'Please provide a valid input text' for empty input", () => {
    assert.strictEqual(snakeCase(""), "Please provide a valid input text");
  });
});

describe("#KebabCase", () => {
  it("should return hello-world for 'hello-world'", () => {
    assert.strictEqual(kebabCase("hello-world"), "hello-world");
  });
  it("should return hello-world for 'Hello-world'", () => {
    assert.strictEqual(kebabCase("Hello-world"), "hello-world");
  });
  it("should return hello-world for 'hello_world'", () => {
    assert.strictEqual(kebabCase("hello_world"), "hello-world");
  });
  it("should return hello-world for 'Hello_world'", () => {
    assert.strictEqual(kebabCase("Hello_world"), "hello-world");
  });
  it("should return hello-world for 'hello world'", () => {
    assert.strictEqual(kebabCase("hello world"), "hello-world");
  });
  it("should return hello-world for 'Hello world'", () => {
    assert.strictEqual(kebabCase("Hello world"), "hello-world");
  });
  it("should return hello-world for 'Hello,world'", () => {
    assert.strictEqual(kebabCase("Hello,world"), "hello-world");
  });
  it("should return hello-world for 'Hello.world'", () => {
    assert.strictEqual(kebabCase("Hello.world"), "hello-world");
  });
  it("should return hello-world for 'HelloWorld'", () => {
    assert.strictEqual(kebabCase("HelloWorld"), "hello-world");
  });
  it("should return hello-world for 'helloWorld'", () => {
    assert.strictEqual(kebabCase("helloWorld"), "hello-world");
  });
  it("should return hello-world for 'hello .World'", () => {
    assert.strictEqual(kebabCase("hello .World"), "hello-world");
  });
  it("should return 'Please provide a valid input text' for empty input", () => {
    assert.strictEqual(kebabCase(""), "Please provide a valid input text");
  });
});
