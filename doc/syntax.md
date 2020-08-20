# Syntax

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
