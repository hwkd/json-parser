export interface Node {}

export interface ObjectNode extends Node {
  type: "Object";
  keyValues: KeyValueNode[];
}

export interface ArrayNode extends Node {
  type: "Array";
  elements: Node[];
}

export interface KeyValueNode extends Node {
  type: "KeyValue";
  key: StringNode;
  value: Node;
}

export interface NumberNode extends Node {
  type: "Number";
  value: number;
}

export interface StringNode extends Node {
  type: "String";
  value: string;
}

export interface BooleanNode extends Node {
  type: "Boolean";
  value: boolean;
}

export interface NullNode extends Node {
  type: "Null";
}

export interface UndefinedNode extends Node {
  type: "Undefined";
}
