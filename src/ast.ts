export interface Node {
  type: string;
}

export interface ObjectNode extends Node {
  type: "Object";
  keyValues: KeyValueNode[];
}

export interface ArrayNode extends Node {
  type: "Array";
  values: Node[];
}

export interface KeyValueNode extends Node {
  type: "KeyValue";
  key: StringNode;
  value: Node;
}

export interface LiteralNode extends Node {
  value: unknown;
}

export interface NumberNode extends LiteralNode {
  type: "Number";
  value: number;
}

export interface StringNode extends LiteralNode {
  type: "String";
  value: string;
}

export interface BooleanNode extends LiteralNode {
  type: "Boolean";
  value: boolean;
}

export interface NullNode extends Node {
  type: "Null";
}

export interface UndefinedNode extends Node {
  type: "Undefined";
}
