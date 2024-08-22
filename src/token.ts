export type TokenType = string;

export type Token = {
  type: TokenType;
  literal: string;
};

export const tokenType = {
  LBRACE: "LBRACE",
  RBRACE: "RBRACE",
  LSQUARE: "LSQUARE",
  RSQUARE: "RSQUARE",
  QUOTE: "QUOTE",
  COMMA: "COMMA",
  COLON: "COLON",
  NULL: "NULL",
  UNDEFINED: "UNDEFINED",
  TRUE: "TRUE",
  FALSE: "FALSE",
  EOF: "EOF",
  IDENT: "IDENT",
  NUMBER: "NUMBER",
};

const keywords: { [key: string]: TokenType } = {
  null: tokenType.NULL,
  undefined: tokenType.UNDEFINED,
  true: tokenType.TRUE,
  false: tokenType.FALSE,
};

export function getTokenType(literal: string): TokenType {
  return keywords[literal] || tokenType.IDENT;
}
