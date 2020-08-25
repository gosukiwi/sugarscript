# Syntax

# Variables

```
let a: integer = 1
let a = 1
let a: integer

a = 2 # ok
b = 3 # error, b was not defined
```

# Tentative: Inline types

```
person = { name: "Mike" }
```

Would compile to

```
type tSS_INTERNAL_<SomeGUID>
  name as string
endtype

person as tSS_INTERNAL_<SomeGUID>
person.name = "Mike"
```
