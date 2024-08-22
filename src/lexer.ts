import { Token, getTokenType, tokenType } from "./token";

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

  function peekChar() {
    if (state.readPos >= state.input.length) {
      return null;
    }
    return state.input[state.readPos];
  }

  function eatWhitespace() {
    while (
      state.ch === " " ||
      state.ch === "\t" ||
      state.ch === "\n" ||
      state.ch === "\r"
    ) {
      readChar();
    }
  }

  function readIdentifier() {
    const pos = state.pos;
    while (isLetter(state.ch)) {
      readChar();
    }
    return state.input.slice(pos, state.pos);
  }

  function readNumber() {
    const pos = state.pos;
    if (state.ch === "-") {
      readChar();
    }
    while (isDigit(state.ch)) {
      readChar();
    }
    if (state.ch === ".") {
      readChar();
      while (isDigit(state.ch)) {
        readChar();
      }
    }
    if (state.ch === "e" || state.ch === "E") {
      readChar();
      // @ts-ignore
      if (state.ch === "+" || state.ch === "-") {
        readChar();
      }
      while (isDigit(state.ch)) {
        readChar();
      }
    }
    return state.input.slice(pos, state.pos);
  }

  function nextToken() {
    let token: Token = { type: "", literal: "" };

    eatWhitespace();

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
      case "-":
        if (isDigit(peekChar())) {
          const literal = readNumber();
          token = { type: tokenType.NUMBER, literal };
          return token;
        }
      default:
        if (isLetter(state.ch)) {
          const literal = readIdentifier();
          const type = getTokenType(literal);
          token = { type, literal };
          return token;
        } else if (isDigit(state.ch)) {
          const literal = readNumber();
          token = { type: tokenType.NUMBER, literal };
          return token;
        }
    }

    readChar();
    return token;
  }

  readChar();
  return { nextToken };
}

function isLetter(ch: string | null) {
  if (ch === null) {
    return false;
  }
  return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z") || ch === "_";
}

function isDigit(ch: string | null) {
  if (ch === null) {
    return false;
  }
  return ch >= "0" && ch <= "9";
}
