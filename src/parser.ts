/**
 * CFG in EBNF
 * | value = object | array | string | number | boolean | null | undefined
 * | object = "{" keyValue "}"
 * | keyValue = string ":" value ("," keyValue)?
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
    return parseValue();
  }

  function parseObject(): ObjectNode {
    const node: ObjectNode = {
      type: "Object",
      keyValues: [],
    };

    if (!consume(tokenType.LBRACE)) {
      throw new Error("Expected LBRACE");
    }

    while (!consume(tokenType.RBRACE)) {
      const keyValue = parseKeyValue();
      node.keyValues.push(keyValue);
      consume(tokenType.COMMA);
    }

    return node;
  }

  function parseArray(): ArrayNode {
    const node: ArrayNode = {
      type: "Array",
      values: [],
    };

    if (!consume(tokenType.LSQUARE)) {
      throw new Error("Expected LBRACKET");
    }

    while (!consume(tokenType.RSQUARE)) {
      const value = parseValue();
      node.values.push(value);
      if (consume(tokenType.COMMA) && currentToken.type === tokenType.RSQUARE) {
        throw new Error("Unexpected COMMA before RSQUARE");
      }
    }

    return node;
  }

  function parseKeyValue(): KeyValueNode {
    const key = parseString();

    if (!consume(tokenType.COLON)) {
      throw new Error("Expected COLON");
    }

    const value = parseValue();

    return {
      type: "KeyValue",
      key,
      value,
    };
  }

  function parseValue(): Node {
    switch (currentToken.type) {
      case tokenType.LBRACE:
        return parseObject();
      case tokenType.LSQUARE:
        return parseArray();
      case tokenType.QUOTE:
        return parseString();
      case tokenType.NUMBER:
        return parseNumber();
      case tokenType.TRUE:
      case tokenType.FALSE:
        return parseBoolean();
      case tokenType.NULL:
        return parseNull();
      case tokenType.UNDEFINED:
        return parseUndefined();
      default:
        throw new Error(`Unexpected token: ${currentToken.type}`);
    }
  }

  function parseString(): StringNode {
    if (!consume(tokenType.QUOTE)) {
      throw new Error("Expected QUOTE");
    }

    const value = currentToken.literal;
    nextToken();

    if (!consume(tokenType.QUOTE)) {
      throw new Error("Expected QUOTE");
    }

    return {
      type: "String",
      value,
    };
  }

  function parseNumber(): NumberNode {
    const value = parseFloat(currentToken.literal);
    nextToken();
    return {
      type: "Number",
      value,
    };
  }

  function parseBoolean(): BooleanNode {
    if (
      currentToken.type !== tokenType.TRUE &&
      currentToken.type !== tokenType.FALSE
    ) {
      throw new Error("Expected TRUE or FALSE");
    }
    const value = currentToken.type === tokenType.TRUE;
    nextToken();
    return {
      type: "Boolean",
      value,
    };
  }

  function parseNull(): NullNode {
    if (!consume(tokenType.NULL)) {
      throw new Error("Expected NULL");
    }
    return { type: "Null" };
  }

  function parseUndefined(): UndefinedNode {
    if (!consume(tokenType.UNDEFINED)) {
      throw new Error("Expected UNDEFINED");
    }
    return { type: "Undefined" };
  }

  function consume(tokenType: TokenType): boolean {
    if (currentToken.type === tokenType) {
      nextToken();
      return true;
    }
    return false;
  }

  return { parse };
}
