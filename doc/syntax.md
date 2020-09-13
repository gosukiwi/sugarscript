# Syntax

# Variables and Types

```
# integers
let a: integer        # use `let` to define a variable
let a: integer = 1    # you can also give it a value
let a = 1             # if you do, then the type can be guessed
a = 2                 # you can then re-assign it's value
b = 3                 # ERROR, you need to define before you assign

# floats
let PI = 3.14
let number: float
number = PI / 2

# booleans - aliases for 1 and 0
let a = true    # same as `let a = 1`
a = yes         # same as above
a = on          # same as above
a = false       # same as `a = 0`
a = no          # same as above
a = off         # same as above

# strings
let name = 'Mike'                # single-quoted
let foo = "Bar"                  # double-quoted
let greeting = "Hello, #{name}!" # interpolation, only works with double-quoted strings
```

# Binary Operations

```
# booleans
result = true and true
result = true or false

# comparison
result = some_variable is "hello"     # equality comparison
result = some_variable == "hello"     # same as above
result = some_variable isnt "hello"   # not equal comparison
result = some_variable != "hello"     # same as above
result = other_variable > 1           # you can use `>`, `>=`, `<` and `<=` as usual

# arithmetics
result = 2 + 2
result = 2 - 2
result = 2 * 2
result = 2 / 2
result = 2 % 2  # modulo
result = 2 ** 2 # exponentiation, TODO
```

# If Statement

```
if some_flag is on
  do_something()
elif a == 1
  do_something_else()
else
  another_function()

# TODO
# inline if
if true then foo()

# inline if-else
if true then foo() else bar()
```

# While Statement

```
while true
  if foo() then break # exit loop
  if bar() then continue # skip this iteration
  do_something()
```

# For Statement

```
for i = 1 to 100 step 2
  print("#{i}")

# without step
for i = 1 to 100
  do_something_with(i)
```

# For..In Statement

```
for num in [1, 2, 3]
  print("#{num}")
```

# Functions

```
def greet(name: string, age: integer = 18): string
  return "Hello #{name}, you are #{age} years old"

greet("Mike")
```

# Types

```
type Person(name: string, age: integer)

# or multiline
type Person
  name: string
  age: integer

let p: Person
p.name = "Mike"
p.age = 123
```

# Arrays

```
let empty = []: integer # empty array of integers
let a = [1, 2, 3]       # non-empty array of integers
let b = [1, "foo"]      # ERROR, all elements must be of the same type
foo([1, 2, 3])          # it can be passed to a function too, it's just an expression

# nested arrays work too, they must be consistent with the types though
let a = [[1], [2, 3], [4]]      # OK
let a = [[1], []: integer, [4]] # OK
let a = [[1], ["hi"], [4]]      # ERROR
let a = [[1], 4]                # ERROR

# manipulation
array_insert(a, 2)
array_delete(a, 0)
```

# Lambdas
Lambdas are also known as "Anonymous Functions", that is, functions without a
name. They work mostly like regular functions.

```
let greeter = (name: string): string ->
  return "Hello, #{name}!"

greeter(): string
```

Note that the syntax for calling lambdas is different than regular function
calls. Lambdas need an additional _type hint_. This is because `greeter` is just
an integer, it works differently than with functions. So to type-check it, the
compiler needs a little help.

You can use the `lambda call` the same way you'd use a regular call:

```
let greeter = (name: string = 'Federico'): string ->
  return "Hello, #{name}!"

let greeting = greeter(): string
print(greeting) # the compiler knows `greeting` is a string and won't complain
```

## Inline-Lambdas
You can also define lambdas in a single line. These lambdas always return a
value, which is the result of the expression:

```
let greeter = (name: string): string -> "Hello, #{name}!"
```

These lambdas can only take a single expression. For more lines, you need to
swap to a regular lambda, and use a `return` statement.

These lambdas are particularly useful for passing them to other functions:

```
def greet_manager(greeter: integer, name: string): string
  return greeter("Mike"): string

let result = greet_manager((name: string): string -> "Hello #{name}!", "Mike")
```

In the example above, inside `greet_manager`, `greeter` is defined simply as
integer. It is then called using the special syntax.

Note that the type checker doesn't know what parameters `greeter` expects, so
it cannot check those for you.

## Limitations of Lambdas

* Because of array limitations in Tier 1, they can only receive arguments _by value_
* The type-checker can't validate arguments are valid when calling a lambda
* They are slower than regular functions, so when possible, prefer using a regular function

# Plugins
Still in development

```
use SomePlugin as p
p::someMethod()
```
