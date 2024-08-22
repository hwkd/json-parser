import { describe, expect, test } from "@jest/globals";
import { tokenType } from "../src/token";
import { newLexer } from "../src/lexer";

describe("Lexer", () => {
  test("nextToken [symbols]", () => {
    const input = '{}[],:"';
    const lexer = newLexer(input);

    const expected = [
      { type: tokenType.LBRACE, literal: "{" },
      { type: tokenType.RBRACE, literal: "}" },
      { type: tokenType.LSQUARE, literal: "[" },
      { type: tokenType.RSQUARE, literal: "]" },
      { type: tokenType.COMMA, literal: "," },
      { type: tokenType.COLON, literal: ":" },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.EOF, literal: "EOF" },
    ];

    expected.forEach((e) => {
      const token = lexer.nextToken();
      expect(token).toEqual(e);
    });
  });

  test("nextToken [keywords]", () => {
    const input = "null undefined true false";
    const lexer = newLexer(input);

    const expected = [
      { type: tokenType.NULL, literal: "null" },
      { type: tokenType.UNDEFINED, literal: "undefined" },
      { type: tokenType.TRUE, literal: "true" },
      { type: tokenType.FALSE, literal: "false" },
      { type: tokenType.EOF, literal: "EOF" },
    ];

    expected.forEach((e) => {
      const token = lexer.nextToken();
      expect(token).toEqual(e);
    });
  });

  test("nextToken [identifiers]", () => {
    const input = "foo bar baz";
    const lexer = newLexer(input);

    const expected = [
      { type: tokenType.IDENT, literal: "foo" },
      { type: tokenType.IDENT, literal: "bar" },
      { type: tokenType.IDENT, literal: "baz" },
      { type: tokenType.EOF, literal: "EOF" },
    ];

    expected.forEach((e) => {
      const token = lexer.nextToken();
      expect(token).toEqual(e);
    });
  });

  test("nextToken [mixed]", () => {
    const input = `{
      "foo": null,
      "bar": true,
      "baz": false,
      "qux": undefined,
      "hello": "world",
      "number": 42,
      "array": [1, 2, 3],
      "object": {
        "foo": "bar"
      }
    }`;
    const lexer = newLexer(input);

    const expected = [
      { type: tokenType.LBRACE, literal: "{" },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.IDENT, literal: "foo" },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.COLON, literal: ":" },
      { type: tokenType.NULL, literal: "null" },
      { type: tokenType.COMMA, literal: "," },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.IDENT, literal: "bar" },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.COLON, literal: ":" },
      { type: tokenType.TRUE, literal: "true" },
      { type: tokenType.COMMA, literal: "," },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.IDENT, literal: "baz" },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.COLON, literal: ":" },
      { type: tokenType.FALSE, literal: "false" },
      { type: tokenType.COMMA, literal: "," },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.IDENT, literal: "qux" },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.COLON, literal: ":" },
      { type: tokenType.UNDEFINED, literal: "undefined" },
      { type: tokenType.COMMA, literal: "," },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.IDENT, literal: "hello" },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.COLON, literal: ":" },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.IDENT, literal: "world" },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.COMMA, literal: "," },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.IDENT, literal: "number" },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.COLON, literal: ":" },
      { type: tokenType.NUMBER, literal: "42" },
      { type: tokenType.COMMA, literal: "," },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.IDENT, literal: "array" },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.COLON, literal: ":" },
      { type: tokenType.LSQUARE, literal: "[" },
      { type: tokenType.NUMBER, literal: "1" },
      { type: tokenType.COMMA, literal: "," },
      { type: tokenType.NUMBER, literal: "2" },
      { type: tokenType.COMMA, literal: "," },
      { type: tokenType.NUMBER, literal: "3" },
      { type: tokenType.RSQUARE, literal: "]" },
      { type: tokenType.COMMA, literal: "," },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.IDENT, literal: "object" },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.COLON, literal: ":" },
      { type: tokenType.LBRACE, literal: "{" },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.IDENT, literal: "foo" },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.COLON, literal: ":" },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.IDENT, literal: "bar" },
      { type: tokenType.QUOTE, literal: '"' },
      { type: tokenType.RBRACE, literal: "}" },
      { type: tokenType.RBRACE, literal: "}" },
      { type: tokenType.EOF, literal: "EOF" },
    ];

    expected.forEach((e) => {
      const token = lexer.nextToken();
      expect(token).toEqual(e);
    });
  });
});
