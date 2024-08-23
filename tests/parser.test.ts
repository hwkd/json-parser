import { describe, expect, test } from "@jest/globals";
import { newParser } from "../src/parser";

describe("Parser", () => {
  test("parse [empty object]", () => {
    const parser = newParser("{}");
    const node = parser.parse();
    expect(node).toEqual({ type: "Object", keyValues: [] });
  });

  test("parse [flat object]", () => {
    const parser = newParser(`{
      "foo": "bar",
      "baz": 42,
      "faz": 5.32,
      "qaud": 1.23e4,
      "qux": true,
      "boo": false,
      "bam": null,
      "bom": undefined,
    }`);
    const node = parser.parse();
    expect(node).toEqual({
      type: "Object",
      keyValues: [
        {
          type: "KeyValue",
          key: { type: "String", value: "foo" },
          value: { type: "String", value: "bar" },
        },
        {
          type: "KeyValue",
          key: { type: "String", value: "baz" },
          value: { type: "Number", value: 42 },
        },
        {
          type: "KeyValue",
          key: { type: "String", value: "faz" },
          value: { type: "Number", value: 5.32 },
        },
        {
          type: "KeyValue",
          key: { type: "String", value: "qaud" },
          value: { type: "Number", value: 1.23e4 },
        },
        {
          type: "KeyValue",
          key: { type: "String", value: "qux" },
          value: { type: "Boolean", value: true },
        },
        {
          type: "KeyValue",
          key: { type: "String", value: "boo" },
          value: { type: "Boolean", value: false },
        },
        {
          type: "KeyValue",
          key: { type: "String", value: "bam" },
          value: { type: "Null" },
        },
        {
          type: "KeyValue",
          key: { type: "String", value: "bom" },
          value: { type: "Undefined" },
        },
      ],
    });
  });

  test("parse [nested object]", () => {
    const parser = newParser(`{
      "foo": {
        "bar": {
          "baz": {
            "hello": ["world", "universe"]
          },
          "faz": 42,
          "qaz": "qux"
        },
        "boo": true
      }
    }`);
    const node = parser.parse();
    expect(node).toEqual({
      type: "Object",
      keyValues: [
        {
          type: "KeyValue",
          key: { type: "String", value: "foo" },
          value: {
            type: "Object",
            keyValues: [
              {
                type: "KeyValue",
                key: { type: "String", value: "bar" },
                value: {
                  type: "Object",
                  keyValues: [
                    {
                      type: "KeyValue",
                      key: { type: "String", value: "baz" },
                      value: {
                        type: "Object",
                        keyValues: [
                          {
                            type: "KeyValue",
                            key: { type: "String", value: "hello" },
                            value: {
                              type: "Array",
                              values: [
                                { type: "String", value: "world" },
                                { type: "String", value: "universe" },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: "KeyValue",
                      key: { type: "String", value: "faz" },
                      value: { type: "Number", value: 42 },
                    },
                    {
                      type: "KeyValue",
                      key: { type: "String", value: "qaz" },
                      value: { type: "String", value: "qux" },
                    },
                  ],
                },
              },
              {
                type: "KeyValue",
                key: { type: "String", value: "boo" },
                value: { type: "Boolean", value: true },
              },
            ],
          },
        },
      ],
    });
  });
});
