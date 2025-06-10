import { describe, expect, it } from 'vitest';
import {
  camelCase,
  kebabCase,
  pascalCase,
  snakeCase,
} from '../../src/textConvert';

describe('#camelCase', () => {
  it("should return helloWorld for 'hello-world'", () => {
    expect(camelCase('hello-world')).toBe('helloWorld');
  });
  it("should return helloWorld for 'Hello-world'", () => {
    expect(camelCase('Hello-world')).toBe('helloWorld');
  });
  it("should return helloWorld for 'hello_world'", () => {
    expect(camelCase('hello_world')).toBe('helloWorld');
  });
  it("should return helloWorld for 'Hello_world'", () => {
    expect(camelCase('Hello_world')).toBe('helloWorld');
  });
  it("should return helloWorld for 'hello world'", () => {
    expect(camelCase('hello world')).toBe('helloWorld');
  });
  it("should return helloWorld for 'Hello world'", () => {
    expect(camelCase('Hello world')).toBe('helloWorld');
  });
  it("should return helloWorld for 'Hello,world'", () => {
    expect(camelCase('Hello,world')).toBe('helloWorld');
  });
  it("should return helloWorld for 'Hello.world'", () => {
    expect(camelCase('Hello.world')).toBe('helloWorld');
  });
  it("should return 'Please provide a valid input text' for empty input", () => {
    expect(camelCase('')).toBe('Please provide a valid input text');
  });
});

describe('#PascalCase', () => {
  it("should return HelloWorld for 'hello-world'", () => {
    expect(pascalCase('hello-world')).toBe('HelloWorld');
  });
  it("should return HelloWorld for 'Hello-world'", () => {
    expect(pascalCase('Hello-world')).toBe('HelloWorld');
  });
  it("should return HelloWorld for 'hello_world'", () => {
    expect(pascalCase('hello_world')).toBe('HelloWorld');
  });
  it("should return HelloWorld for 'Hello_world'", () => {
    expect(pascalCase('Hello_world')).toBe('HelloWorld');
  });
  it("should return HelloWorld for 'hello world'", () => {
    expect(pascalCase('hello world')).toBe('HelloWorld');
  });
  it("should return HelloWorld for 'Hello world'", () => {
    expect(pascalCase('Hello world')).toBe('HelloWorld');
  });
  it("should return HelloWorld for 'Hello,world'", () => {
    expect(pascalCase('Hello,world')).toBe('HelloWorld');
  });
  it("should return HelloWorld for 'Hello.world'", () => {
    expect(pascalCase('Hello.world')).toBe('HelloWorld');
  });
  it("should return 'Please provide a valid input text' for empty input", () => {
    expect(pascalCase('')).toBe('Please provide a valid input text');
  });
});

describe('#SnakeCase', () => {
  it("should return hello_world for 'hello-world'", () => {
    expect(snakeCase('hello-world')).toBe('hello_world');
  });
  it("should return hello_world for 'Hello-world'", () => {
    expect(snakeCase('Hello-world')).toBe('hello_world');
  });
  it("should return hello_world for 'hello_world'", () => {
    expect(snakeCase('hello_world')).toBe('hello_world');
  });
  it("should return hello_world for 'Hello_world'", () => {
    expect(snakeCase('Hello_world')).toBe('hello_world');
  });
  it("should return hello_world for 'hello world'", () => {
    expect(snakeCase('hello world')).toBe('hello_world');
  });
  it("should return hello_world for 'Hello world'", () => {
    expect(snakeCase('Hello world')).toBe('hello_world');
  });
  it("should return hello_world for 'Hello,world'", () => {
    expect(snakeCase('Hello,world')).toBe('hello_world');
  });
  it("should return hello_world for 'Hello.world'", () => {
    expect(snakeCase('Hello.world')).toBe('hello_world');
  });
  it("should return hello_world for 'HelloWorld'", () => {
    expect(snakeCase('HelloWorld')).toBe('hello_world');
  });
  it("should return hello_world for 'helloWorld'", () => {
    expect(snakeCase('helloWorld')).toBe('hello_world');
  });
  it("should return hello_world for 'hello .World'", () => {
    expect(snakeCase('hello .World')).toBe('hello_world');
  });
  it("should return 'Please provide a valid input text' for empty input", () => {
    expect(snakeCase('')).toBe('Please provide a valid input text');
  });
});

describe('#KebabCase', () => {
  it("should return hello-world for 'hello-world'", () => {
    expect(kebabCase('hello-world')).toBe('hello-world');
  });
  it("should return hello-world for 'Hello-world'", () => {
    expect(kebabCase('Hello-world')).toBe('hello-world');
  });
  it("should return hello-world for 'hello_world'", () => {
    expect(kebabCase('hello_world')).toBe('hello-world');
  });
  it("should return hello-world for 'Hello_world'", () => {
    expect(kebabCase('Hello_world')).toBe('hello-world');
  });
  it("should return hello-world for 'hello world'", () => {
    expect(kebabCase('hello world')).toBe('hello-world');
  });
  it("should return hello-world for 'Hello world'", () => {
    expect(kebabCase('Hello world')).toBe('hello-world');
  });
  it("should return hello-world for 'Hello,world'", () => {
    expect(kebabCase('Hello,world')).toBe('hello-world');
  });
  it("should return hello-world for 'Hello.world'", () => {
    expect(kebabCase('Hello.world')).toBe('hello-world');
  });
  it("should return hello-world for 'HelloWorld'", () => {
    expect(kebabCase('HelloWorld')).toBe('hello-world');
  });
  it("should return hello-world for 'helloWorld'", () => {
    expect(kebabCase('helloWorld')).toBe('hello-world');
  });
  it("should return hello-world for 'hello .World'", () => {
    expect(kebabCase('hello .World')).toBe('hello-world');
  });
  it("should return 'Please provide a valid input text' for empty input", () => {
    expect(kebabCase('')).toBe('Please provide a valid input text');
  });
});
