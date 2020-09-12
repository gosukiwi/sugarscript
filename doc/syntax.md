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

# binary operations

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

# if Statement

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

# while Statement

```
while true
  if foo() then break # exit loop
  if bar() then continue # skip this iteration
  do_something()
```

# for Statement

```
for i = 1 to 100 step 2
  print("#{i}")

# without step
for i = 1 to 100
  do_something_with(i)
```

# for..in Statement

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
let a = [1, 2, 3]
foo([1, 2, 3])

# nested arrays work too, they must be consistent with the types though
let a = [[1], [2, 3], [4]]

# manual manipulation
# syntax still not final
let a = [1, 2, 3]
a << 2
# same as
array_insert(a, 2)
```

# Plugins
Still in development

```
use SomePlugin as p
p::someMethod()
```
