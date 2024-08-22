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
});
