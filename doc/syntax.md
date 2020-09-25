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

# short-syntax
let p = { name: "Mike", age: 123 }: Person
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
array_insert_at(a, 3, 0) # array, value, index
array_delete(a, 0)

# IMPORTANT: On array length
# For the array `[1, 2, 3]`, Tier 1 returns `2` for length. SugarScript will
# return `3` instead, normalizing the language with the rest of the world:
let len = array_length([1, 2, 3]) # len will now equal `3`
```

# Lambdas
Lambdas are also known as "Anonymous Functions", that is, functions without a
name. They work mostly like regular functions.

```
let greeter = (name: string): string ->
  return "Hello, #{name}!"

call(greeter): string
```

Note that the syntax for calling lambdas is different than regular function
calls. Lambdas are called using `call` and need an additional _type hint_. This
is because `greeter` is just an integer, so to type-check it, the compiler needs
a little help.

An alternative syntax for `call` is `->`:

```
call(greeter)
# same as
->(greeter)
```

You can use `call` and `->` the same way you'd use regular function calls.
Lambdas can also take default values:

```
let greeter = (name: string = 'Federico'): string ->
  return "Hello, #{name}!"

let greeting = call(greeter): string
```

Because lambdas are just integers, you can treat it just like any other integer.
You can re-assign it:

```
let get_name = (): string -> 'Federico'
let demo = 22
# ... some more code here ...
# because `get_name` is an integer, we can assign it to demo
demo = name
# we can even call demo now
let name = call(demo): string # name is now 'Federico'
```

Pass it to a function:

```
let get_name = (): string -> 'Federico'

def example(get_name: integer)
  print("Hello #{call(get_name): string}")

example(get_name)
```

And return it from a function:

```
let get_name = (): string -> 'Federico'

def identity(lambda: integer): integer
  return lambda

let itself = identity(get_name)
let name = ->(itself): string
```

It can also be defined inside a function, if needed:

```
def get_name_getter(): integer
  return (): string -> 'Federico'

let name_getter = get_name_getter()
let name = call(name_getter): string
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
  return call(greeter, "Mike"): string

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

# Unions
Unions represent a value that can be of one of many possible types:

```
type Rectangle(x: float, y: float, width: float, height: float)
type Circle(x: float, y: float, radius: float)
type Shape(Rectangle | Circle)

# a shape can hold either a Rectangle, or a Circle
let shape: Shape
shape = { x: 100, y: 100, width: 200, height: 200 }: Rectangle
shape = { x: 100, y: 100, radius: 100 }: Circle

# to access unions, you must use the `with` statement
# it's mandatory to provide an `else` branch, as unions
# can be initialized without a type
def area(shape: Shape): float
  with shape
    when rect: Rectangle
      return rect.width * rect.height
    when circle: Circle
      return 3.14 * circle.radius * circle.radius
    else
      return 0

# a rectangle's area
shape = { x: 100, y: 100, width: 200, height: 200 }: Rectangle
let result = area(shape)

# a circle's area
shape = { x: 100, y: 100, radius: 100 }: Circle
let result = area(shape)

# trying to access a property directly will raise an error
shape.x # ERROR

# when types share common properties, you can group them as such:
type Car(wheels: integer)
type Bike(wheels: integer)
type Vehicle(Car | Bike)

let vehicle: Vehicle
vehicle = { wheels: 2 }: Bike

with vehicle
  when v: (Bike | Car)
    print("I have #{v.wheels} wheels")
  else
    print("I haven't been initialized yet")
```

# Numerical Bases
You can use binary, octal and hexadecimal bases as such:

```
let binary = 0b1001
let octal = 0c1732
let hex = 0xFF1A9
```

# Primitive Functions
Because SugarScript is purely functional, it needs to add new functions to replace
existing oop-like calls in Tier 1. Those functions are:

 * `array_length(arr): integer`
 * `array_insert(arr, value)`
 * `array_insert_at(arr, value, index)`
 * `array_insert_sorted(arr, value)`
 * `array_remove(arr)`
 * `array_remove_at(arr, index)`
 * `array_sort(arr)`
 * `array_find(arr, value): integer`
 * `array_save(arr, filename)`
 * `array_load(arr, filename)`
 * `to_json(arr_or_udt): string`
 * `from_json(arr_or_udt, json_string)`

__IMPORTANT__ `array_length` will behave like it does in most programming
languages. That is, it will report the actual numbers of elements inside the
array. So for `array_lengt([1, 2, 3])`, it will return 3, unlike Tier 1, that
would return `2`.

# List Comprehensions

```
let pairs = [i for i in [0, 1, 2, 3, 4] when i % 2 is 0]
let doubles = [i * 2 for i in [0, 1, 2, 3, 4]]
```

# Plugins
Still in development

```
use SomePlugin as p
p::someMethod()
```
