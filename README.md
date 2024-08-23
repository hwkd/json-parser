# JSON Parser (TypeScript)

This is a simple JSON parser written in TypeScript for educational purposes. It is a recursive descent parser that can parse JSON strings into an AST. With the generated AST, it's trivial to convert it into a JavaScript object.

It checks for syntax errors and provides the most basic error feedback to the user. It does not report the column number or the row number of the location of the error, which mean's it's difficult to track down the syntax error in the JSON document. This was intentionally left out to keep the code simple. This feature, however, would not be a difficult task to implement.

## Learning Outcomes

The techniques applied to this parser can be used in other projects. For example, you can use the same techniques to parse other semi-structured formats like XML, HTML, or even programming languages like JavaScript, Python, etc. I've previously written a parser for a subset of a C programming language in Java and I applied essentially the same techniques. It's not only fun, but it's also a great way to learn how interpreters, compilers, and generally, how programming languages work.

## Benchmarks

I've run a simple benchmark to compare the performance of this parser with the built-in `JSON.parse` function in JavaScript and it showed that this parser was roughly 6 times slower than the built-in function when I use the `package.json` file as the input. The performance gap is likely to be larger with larger files. This is expected because the built-in function is written in C++ and is highly optimized. This parser written in JavaScript/TypeScript is not optimized for performance at all. The purpose of this parser is to demonstrate how a JSON parser works and not to be used in production.
