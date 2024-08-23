import fs from "fs";
import { Node, ObjectNode, ArrayNode, LiteralNode } from "./ast";
import { newParser } from "./parser";

// Convert AST to JavaScript object
function toJS(ast: Node): unknown {
  switch (ast.type) {
    case "Object":
      return (ast as ObjectNode).keyValues.reduce(
        (acc: { [key: string]: unknown }, keyValue) => {
          acc[keyValue.key.value] = toJS(keyValue.value);
          return acc;
        },
        {},
      );
    case "Array":
      return (ast as ArrayNode).values.map(toJS);
    case "String":
    case "Number":
    case "Boolean":
      return (ast as LiteralNode).value;
    case "Null":
      return null;
    case "Undefined":
      return undefined;
  }
}

// Performance test
function perf(name: string, fn: () => any) {
  let totalTime = 0;
  const iterations = 10000;

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    fn();
    const end = performance.now();
    totalTime += end - start;
  }

  console.log(`${[name]}: Average execution time: ${totalTime / iterations} ms`);
}

function main() {
  const jsonFile = fs.readFileSync("package.json", "utf-8");
  const parser = newParser(jsonFile);
  const ast = parser.parse();

  //Print AST
  console.log(JSON.stringify(ast, null, 2));

  //Print JavaScript object
  console.log(toJS(ast));

  perf("Handwritten", () => {
    const parser = newParser(jsonFile);
    const ast = parser.parse();
    toJS(ast);
  })

  perf("JSON.parse", () => {
    JSON.parse(jsonFile);
  })
}

main();
