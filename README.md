# SugarScript
A language that compiles to AppGameKit's Tier 1. It enables you to write games
using AGK's interpreter, so they can run on any platform with minimal setup.

Needless to say, you need to own AppGameKit Classic.

# Syntax

```
(def greet (name :string age :integer)
  (print "Hello, World!"))

(type Person
  (name string)
  (age integer))

(repeat
  (agk:sync))

// arrays
(let my-list (list 1 2.1 "foo"))
(nth my-list 0)
```

# Usage

    $ ssc main.ss -o main.agc

That will generate a `main.agc` file as well as compile it using the privative
compiler.

# Developing
The grammar uses [PEG.js](https://pegjs.org/). To re-generate the parser from
the grammar, you can run:

    npm run grammar

Run tests with

    npm run test

You can watch tests as you write them with

    npm run watch
