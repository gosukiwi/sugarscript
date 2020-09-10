# SugarScript
AppGameKit's Tier 1 on steroids, inspired by CoffeeScript and Python.

SugarScript is a language that compiles to AppGameKit's Tier 1. It enables you
to write games using AGK's interpreter, so they can run on any platform with
minimal setup.

Needless to say, you need to own AppGameKit Classic.

# Philosophy
* Expressive: If it can read like English, it's easier to understand.
* Concise: When possible, prefer the shorter syntax.
* Strict: Linting tools exist for a reason, consistency is a good thing. It makes code easier to read.
* Powerful: [Lambdas](https://en.wikipedia.org/wiki/Higher-order_function), together with lots of syntactic sugar give you enough power as to not miss mainstream languages
* Simple: It's just Tier 1 under the hood

# Syntax

```
# assign
name = "Duchess"
greeting = "Hello #{name}!" # string interpolation

# functions
def greet(name: string, age: integer, person: *Person) # pass Person by reference
  let result = age + 2
  return result

# types
type Person
  name: string

# inline types
type Person(name: string)

# lambdas (anonymous functions)
let greeter = (name): string ->
  return "Hello #{name}!"
greeter("Federico")

def another_function(greeter, name)
  greeter(name)
another_function(greeter, "Marie")

# arrays
let my_array = [1, 2, 3]
let my_nested_array = [[1], [2, 3], [4]]
```

# Usage

    $ ssc main.ss -o main.agc

That will generate a `main.agc` file as well as compile it using the privative
compiler.

# Developing
Run tests with

    npm run test

You can watch tests as you write them with

    npm run watch
