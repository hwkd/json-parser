type TokenType = string;

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
};

