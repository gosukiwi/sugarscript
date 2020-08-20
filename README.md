# SugarScript
A language that compiles to AppGameKit's Tier 1. It enables you to write games
using AGK's interpreter, so they can run on any platform with minimal setup.

Needless to say, you need to own AppGameKit Classic.

# Philosophy
* Expressive: If it can read like English, it's easier to understand.
* Concise: When possible, prefer the shorter syntax.
* Strict: Linting tools exist for a reason, consistency is a good thing. It makes code easier to read.
* Simple: It's just Tier 1.

# Syntax

```
# assign
name = "Duchess"
greeting = "Hello #{name}"! # string interpolation

# functions
def greet(name:string, age:integer, person:ref:Person)
  result = age + 2
  return result

# types
type Person
  name:string

# inline types
type Person(name: string)

a = () ->
  Log("A lambda!")

# arrays
a = [1, 2, 3]

# operators
a = "hi" * 4 # => "hihihihi"
```

# Usage

    $ ssc main.ss -o main.agc

That will generate a `main.agc` file as well as compile it using the privative
compiler.

# Developing
The grammar uses [PEG.js](https://pegjs.org/). To re-generate the parser from
the grammar, you can run:

    npm run grammar

__IMPORTANT__: Because the indentation rules, the grammar cannot use cache.

Run tests with

    npm run test

You can watch tests as you write them with

    npm run watch
