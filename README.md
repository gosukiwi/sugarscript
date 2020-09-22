# SugarScript
AppGameKit's Tier 1 on steroids, inspired by CoffeeScript and Python.

SugarScript is a **functional**, statically typed language that compiles to
AppGameKit's Tier 1. It enables you to write games using AGK's interpreter, so
they can run on any platform with minimal setup.

Needless to say, you need to own AppGameKit Classic or Studio. Note that the
compiler generates an `.agc` file, but to automatically compile it up for you,
it needs  access to the compiler, which is only exposed in the Classic version.
So Studio  users need to manually load up and compiler the generated `.agc`
file.

# Syntax

```
# assign
let name = 'Duchess'
let greeting = "Hello #{name}!" # string interpolation, only when using double-quoted strings

# names are case-insensitive
let greeting2 = GREETING # this works

# booleans
if my_variable is true # `true` alias for 1, other aliases are `yes` and `on`
  do_something()
elif something_else() isnt "hello"
  do_something_else()
else
  do_this_other_thing()

# functions
def greet(name: string = 'Federico', age: integer, person: *Person) # pass Person by reference
  let result = age + 2
  return result

# built-in functions, as usual
let sprite = CreateSprite(LoadImage('hello.png'))

# types
type Person
  name: string

# inline types
type Person(name: string)
let p = { name: "Federico" }: Person

# lambdas (anonymous functions)
let greeter = (name: string): string ->
  return "Hello #{name}!"

call(greeter, "Federico"): string

def another_function(greeter: integer, name: string): string
  return greeter(name): string

# you can use `->` instead of `call` if preferred
->(another_function, greeter, 'Marie'): string

# arrays
let my_array = [1, 2, 3]
let empty_array = []: integer
let nested_array = [[1], [2, 3], []: integer]
```

# Usage

    $ ssc main.ss -o main.agc

That will generate a `main.agc` file as well as compile it using the privative
compiler.

# Why
The AppGameKit platform is impressive. Write once, deploy everywhere, with
minimal  hassle. The API is powerful, supports 2D and 3D and has been worked on
for years, so it's quite mature.

The downside is that the Tier 1 dialect of BASIC is quite limited. It lacks most
feature modern developers expect in a programming language. There are
alternative languages, particularly Tier 2, but by using C++ or any other
alternative language, you lose the portability.

SugarScript is a _transpiler_. It compiles directly to Tier 1, and in turn, it
can use AppGameKit's Classic compiler to generate bytecode, just like you'd
normally do with Tier 1. You can also load up and compile the generated `.agc`
file in Studio yourself if you want.

This allows developers to use a more powerful and overall _sweet_ programming
language  without losing the flexibility of _write once, deploy everywhere_.

SugarScript is a functional language, using [lambdas](doc/syntax.md#lambdas) (a
special kind of function pointers) you can write functions which receive
functions, as well as returning functions.

This opens up a whole new level of abstraction, much needed in Tier 1.

# Philosophy
* Expressive: If it can read like English, it's easier to understand.
* Concise: When possible, prefer the shorter syntax.
* Strict: Linting tools exist for a reason, consistency is a good thing. It makes code easier to read.
* Powerful: [Lambdas](https://en.wikipedia.org/wiki/Higher-order_function), together with lots of syntactic sugar give you enough power as to not miss mainstream languages
* Simple: It's just Tier 1 under the hood

# Developing
Run tests with

    npm run test

You can watch tests as you write them with

    npm run watch

To run integration tests (slow) use

    npm run integration
