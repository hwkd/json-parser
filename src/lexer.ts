import { tokenType } from "./token";

export function newLexer(input: string) {
  const state: {
    input: string;
    pos: number;
    readPos: number;
    ch: string | null;
  } = {
    input,
    pos: 0,
    readPos: 0,
    ch: "",
  };

  function readChar() {
    if (state.readPos >= state.input.length) {
      state.ch = null;
    } else {
      state.ch = state.input[state.readPos];
    }
    state.pos = state.readPos;
    state.readPos++;
  }

  function nextToken() {
    let token = { type: "", literal: "" };

    switch (state.ch) {
      case "{":
        token = { type: tokenType.LBRACE, literal: state.ch };
        break;
      case "}":
        token = { type: tokenType.RBRACE, literal: state.ch };
        break;
      case "[":
        token = { type: tokenType.LSQUARE, literal: state.ch };
        break;
      case "]":
        token = { type: tokenType.RSQUARE, literal: state.ch };
        break;
      case ",":
        token = { type: tokenType.COMMA, literal: state.ch };
        break;
      case ":":
        token = { type: tokenType.COLON, literal: state.ch };
        break;
      case '"':
        token = { type: tokenType.QUOTE, literal: state.ch };
        break;
      case null:
        token = { type: tokenType.EOF, literal: "EOF" };
        break;
    }

    readChar();
    return token;
  }

  readChar();
  return { nextToken };
}
