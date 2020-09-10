# Syntax

# Variables

```
let a: integer
let a: integer = 1
let a = 1

a = 2 # ok
b = 3 # error, b was not defined
```

# If Statement

```
if true
  do_something()
elif a == 1
  do_something_else()
else
  another_function()
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
