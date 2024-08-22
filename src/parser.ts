/**
 * CFG in EBNF
 * | value = object | array | string | number | boolean | null | undefined
 * | object = "{" keyValue "}"
 * | keyValue = string ":" value | string ":" value "," keyValue
 * | array = "[" value "]"
 * | string = '"' [^"]* '"'
 * | number = [0-9]+ | [0-9]+.[0-9]+ | [0-9]+e[0-9]+
 * | boolean = "true" | "false"
 * | null = "null"
 * | undefined = "undefined"
 */

import {
  Node,
  ObjectNode,
  ArrayNode,
  KeyValueNode,
  StringNode,
  NumberNode,
  BooleanNode,
  NullNode,
  UndefinedNode,
} from "./ast";
import { TokenType, tokenType } from "./token";
import { newLexer } from "./lexer";

export function newParser(input: string) {
  const lexer = newLexer(input);
  let currentToken = lexer.nextToken();

  function nextToken() {
    currentToken = lexer.nextToken();
  }

  function parse(): Node {
    nextToken();
    return parseValue();
  }

  function parseObject(): ObjectNode {}

  function parseArray(): ArrayNode {}

  function parseKeyValue(): KeyValueNode {}

  function parseValue(): Node {}

  function parseString(): StringNode {}

  function parseNumber(): NumberNode {}

  function consume(tokenType: TokenType): boolean {
    if (currentToken.type === tokenType) {
      nextToken();
      return true;
    }
    return false;
  }

  return { parse };
}
