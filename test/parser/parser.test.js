const expect = require('chai').expect
const parse = require('../../lib/parser/parser')

function parseOne (input) {
  return parse(input)[0]
}

describe('parser/parser', function () {
  it('parses multiple statements', function () {
    const node = parse('a = b\nb = c')

    expect(node[0].lhs.parts[0].value).to.eq('a')
    expect(node[0].rhs.parts[0].value).to.eq('b')
    expect(node[1].lhs.parts[0].value).to.eq('b')
    expect(node[1].rhs.parts[0].value).to.eq('c')
  })

  describe('assignment', function () {
    it('parses assignment', function () {
      const node = parseOne('a = b')

      expect(node.lhs.type).to.eq('QUERY')
      expect(node.lhs.parts[0].value).to.eq('a')
      expect(node.rhs.type).to.eq('QUERY')
      expect(node.rhs.parts[0].value).to.eq('b')
    })

    it('parses a query', function () {
      const node = parseOne('a.b.c = d')

      expect(node.type).to.eq('ASSIGNMENT')
      expect(node.lhs.type).to.eq('QUERY')
      expect(node.lhs.parts[0].value).to.eq('a')
      expect(node.lhs.parts[1].value).to.eq('b')
      expect(node.lhs.parts[2].value).to.eq('c')
      expect(node.rhs.parts[0].value).to.eq('d')
    })
  })

  describe('query', function () {
    it('works with one-dimensional arrays', function () {
      const node = parseOne('a[1] = b')

      expect(node.lhs.parts[0].type).to.eq('ARRAY_ACCESS')
      expect(node.lhs.parts[0].identifier).to.eq('a')
    })

    it('can mix with one-dimensional arrays', function () {
      const node = parseOne('a.b[1].c.d[2] = b')

      expect(node.lhs.parts[0].type).to.eq('IDENTIFIER')
      expect(node.lhs.parts[0].value).to.eq('a')
      expect(node.lhs.parts[1].type).to.eq('ARRAY_ACCESS')
      expect(node.lhs.parts[1].identifier).to.eq('b')
      expect(node.lhs.parts[1].index[0].value).to.eq(1)
      expect(node.lhs.parts[2].type).to.eq('IDENTIFIER')
      expect(node.lhs.parts[2].value).to.eq('c')
      expect(node.lhs.parts[3].type).to.eq('ARRAY_ACCESS')
      expect(node.lhs.parts[3].identifier).to.eq('d')
      expect(node.lhs.parts[3].index[0].value).to.eq(2)
    })

    it('can mix with multi-dimensional arrays', function () {
      const node = parseOne('a.b[1, 2].c.d[2] = b')

      expect(node.lhs.parts[0].type).to.eq('IDENTIFIER')
      expect(node.lhs.parts[0].value).to.eq('a')
      expect(node.lhs.parts[1].type).to.eq('ARRAY_ACCESS')
      expect(node.lhs.parts[1].identifier).to.eq('b')
      expect(node.lhs.parts[1].index[0].value).to.eq(1)
      expect(node.lhs.parts[1].index[1].value).to.eq(2)
      expect(node.lhs.parts[2].type).to.eq('IDENTIFIER')
      expect(node.lhs.parts[2].value).to.eq('c')
      expect(node.lhs.parts[3].type).to.eq('ARRAY_ACCESS')
      expect(node.lhs.parts[3].identifier).to.eq('d')
      expect(node.lhs.parts[3].index[0].value).to.eq(2)
    })
  })

  describe('function definition', function () {
    it('fails with an empty function', function () {
      expect(() => parseOne('def greet()')).to.throw()
    })

    it('parses function definition', function () {
      const node = parseOne(`
def foo()
  a = b
  c = d
      `)

      expect(node.type).to.eq('FUNCTION_DEFINITION')
      expect(node.name).to.eq('foo')
      expect(node.body.length).to.eq(2)
    })

    it('parses function deinition with params', function () {
      const node = parseOne(`
def foo(a: integer)
  b = a
      `)

      expect(node.name).to.eq('foo')
      expect(node.params.length).to.eq(1)
      expect(node.params[0].name).to.eq('a')
      expect(node.params[0].typehint.is('INTEGER')).to.eq(true)
    })

    it('parses by reference params', function () {
      const node = parseOne(`
def foo(a: *integer)
  b = a
      `)

      expect(node.name).to.eq('foo')
      expect(node.params.length).to.eq(1)
      expect(node.params[0].name).to.eq('a')
      expect(node.params[0].ref).to.eq(true)
      expect(node.params[0].typehint.is('INTEGER')).to.eq(true)
    })

    it('can return a value', function () {
      const node = parseOne(`
def foo()
  return 2
      `)

      expect(node.body[0].type).to.eq('RETURN')
      expect(node.body[0].value.type).to.eq('NUMBER')
      expect(node.body[0].value.value).to.eq(2)
    })

    it('parses the return type', function () {
      const node = parseOne(`
def foo(): integer
  return 2
      `)

      expect(node.returnType.is('INTEGER')).to.eq(true)
    })

    it('parses the return type when it has parameters', function () {
      const node = parseOne(`
def foo(a: integer): integer
  return 2
      `)

      expect(node.returnType.is('INTEGER')).to.eq(true)
    })

    it('parses with spaces', function () {
      expect(() => {
        parseOne(`
def foo(a: integer): integer
  a = 1

  return 2
        `)}).not.to.throw()
    })

    it('parses two', function () {
      expect(() => {
        parseOne(`
def foo()
  a = 1

def greet(b: integer[])
  b = 1
        `)}).not.to.throw()
    })

    it('parses returning a UDT', function () {
      const node = parseOne(`
def greet(person: Person): Person
  return person
      `)

      expect(node.body[0].value.parts[0].value).to.eq('person')
    })

    it('parses default arguments', function () {
      const node = parseOne(`
def greet(person: integer = 1): Person
  return person
      `)

      expect(node.params[0].default.value).to.eq(1)
    })

    it('parses default arguments - short way')
  })

  describe('function call', function () {
    it('parses a call with no parameters', function () {
      const node = parseOne('foo()')

      expect(node.type).to.eq('FUNCTION_CALL')
      expect(node.name).to.eq('foo')
      expect(node.args).to.eql([])
    })

    it('parses a call with a single argument', function () {
      const node = parseOne('foo(bar)')

      expect(node.name).to.eq('foo')
      expect(node.args[0].parts[0].value).to.eq('bar')
    })

    it('parses a call with many arguments', function () {
      const node = parseOne('foo(bar, baz)')

      expect(node.name).to.eq('foo')
      expect(node.args[0].parts[0].value).to.eq('bar')
      expect(node.args[1].parts[0].value).to.eq('baz')
    })
  })

  describe('plugin call', function () {
    it('parses a call with no parameters', function () {
      const node = parseOne('p::foo(): integer')

      expect(node.type).to.eq('PLUGIN_CALL')
      expect(node.plugin).to.eq('p')
      expect(node.func).to.eq('foo')
      expect(node.typehint.is('INTEGER')).to.eq(true)
      expect(node.args).to.eql([])
    })

    it('parses a call with a single argument', function () {
      const node = parseOne('p::foo(bar): integer')

      expect(node.plugin).to.eq('p')
      expect(node.func).to.eq('foo')
      expect(node.args[0].parts[0].value).to.eq('bar')
    })

    it('parses a call with many arguments', function () {
      const node = parseOne('p::foo(bar, baz): integer')

      expect(node.plugin).to.eq('p')
      expect(node.func).to.eq('foo')
      expect(node.args[0].parts[0].value).to.eq('bar')
      expect(node.args[1].parts[0].value).to.eq('baz')
    })
  })

  describe('literals', function () {
    it('matches an integer number', function () {
      expect(parseOne('a = 1').rhs.value).to.eq(1)
    })

    it('matches a float number', function () {
      expect(parseOne('a = 1.3').rhs.value).to.eq(1.3)
    })

    it('matches a negative float number', function () {
      expect(parseOne('a = -3.14').rhs.value).to.eq(-3.14)
    })

    it('matches a string as SQSTRING when not interpolating', function () {
      const node = parseOne('a = "potato"')

      expect(node.rhs.type).to.eq('SQSTRING')
      expect(node.rhs.value).to.eq('potato')
    })

    it('matches a string as STRING with interpolating', function () {
      const node = parseOne('a = "potato #{1}"')

      expect(node.rhs.type).to.eq('STRING')
      expect(node.rhs.value).to.eq('potato $1')
    })

    it('interpolates a string', function () {
      const node = parseOne('a = "potato #{2 + 2}"')
      expect(node.rhs.interpolations[0]).to.eq('2 + 2')
    })

    it('matches a single-quoted string', function () {
      const node = parseOne("a = 'potato'")

      expect(node.rhs.type).to.eq('SQSTRING')
      expect(node.rhs.value).to.eq('potato')
    })
  })

  describe('let', function () {
    it('parses with integer', function () {
      const node = parseOne('let a: integer')

      expect(node.type).to.eq('LET')
      expect(node.name.value).to.eq('a')
      expect(node.typehint.is('INTEGER')).to.eq(true)
    })

    it('parses with integer and allows to assign value', function () {
      const node = parseOne('let a: integer = 1')

      expect(node.type).to.eq('LET')
      expect(node.name.value).to.eq('a')
      expect(node.typehint.is('INTEGER')).to.eq(true)
      expect(node.value.type).to.eq('NUMBER')
    })

    it('allows to guess value', function () {
      const node = parseOne('let a = 1')

      expect(node.type).to.eq('LET')
      expect(node.name.value).to.eq('a')
      expect(node.typehint).to.eq(null)
      expect(node.value.type).to.eq('NUMBER')
    })

    it('parses globals', function () {
      const node = parseOne('let global a = 1')

      expect(node.type).to.eq('LET')
      expect(node.name.value).to.eq('a')
      expect(node.global).to.eq(true)
      expect(node.typehint).to.eq(null)
      expect(node.value.type).to.eq('NUMBER')
    })
  })

  describe('typehint', function () {
    it('matches arrays', function () {
      const node = parseOne('let a: integer[]')
      expect(node.typehint.is('ARRAY')).to.eq(true)
      expect(node.typehint.value.is('INTEGER')).to.eq(true)
    })

    it('matches UDTs', function () {
      const node = parseOne('let a: Person[]')
      expect(node.typehint.is('ARRAY')).to.eq(true)
      expect(node.typehint.value.is('UDT')).to.eq(true)
      expect(node.typehint.value.value).to.eq('Person')
    })
  })

  describe('inline array', function () {
    it('matches with simple values', function () {
      const node = parseOne('a = [1, 2, 3]')

      expect(node.rhs.elements[0].value).to.eq(1)
      expect(node.rhs.elements[1].value).to.eq(2)
      expect(node.rhs.elements[2].value).to.eq(3)
    })

    it('matches other expressions', function () {
      const node = parseOne('a = [foo(), bar(1), baz::taz(3, 4): integer]')

      expect(node.rhs.elements[0].type).to.eq('FUNCTION_CALL')
      expect(node.rhs.elements[1].type).to.eq('FUNCTION_CALL')
      expect(node.rhs.elements[2].type).to.eq('PLUGIN_CALL')
    })

    it('can nest arrays', function () {
      expect(() => parseOne('a = [1, 2, [3]]')).not.to.throw()
    })

    it('can use inside calls', function () {
      expect(parseOne('foo([1, 2])').args[0].type).to.eq('INLINE_ARRAY')
    })
  })

  describe('expressions', function () {
    it('matches a parenthesized expression', function () {
      expect(parseOne('a = (foo())').rhs.type).to.eq('PARENTHESIZED_EXPRESSION')
    })
  })

  describe('types', function () {
    it('matches a multiline type', function () {
      const node = parseOne('type Person\n  name: string\n  age: integer')

      expect(node.type).to.eq('TYPE_DEFINITION')
      expect(node.name).to.eq('Person')
      expect(node.fields[0].name).to.eq('name')
      expect(node.fields[0].typehint.is('STRING')).to.eq(true)
      expect(node.fields[1].name).to.eq('age')
      expect(node.fields[1].typehint.is('INTEGER')).to.eq(true)
    })

    it('matches a single-line type', function () {
      const node = parseOne('type Person(name: string, age: integer)')

      expect(node.type).to.eq('TYPE_DEFINITION')
      expect(node.name).to.eq('Person')
      expect(node.fields[0].name).to.eq('name')
      expect(node.fields[0].typehint.is('STRING')).to.eq(true)
      expect(node.fields[1].name).to.eq('age')
      expect(node.fields[1].typehint.is('INTEGER')).to.eq(true)
    })

    it('matches an union type', function () {
      const node = parseOne('type Shape(Rectangle | Circle)')
      expect(node.type).to.eq('UNION_DEFINITION')
      expect(node.types[0].value).to.eq('Rectangle')
      expect(node.types[1].value).to.eq('Circle')
    })

    it('can use with', function () {
      const node = parseOne(`
with shape
  when rect: Rectangle
    return rect.foo
  when cir: Circle
    return cir.bar
  else
    return 0
      `)

      expect(node.type).to.eq('WITH')
      expect(node.name.type).to.eq('QUERY')
      expect(node.clauses.length).to.eq(3)
      expect(node.clauses[0].type).to.eq('WITH_CLAUSE')
      expect(node.clauses[0].name.value).to.eq('rect')
      expect(node.clauses[0].typehint.is('UDT')).to.eq(true)
      expect(node.clauses[0].body[0].type).to.eq('RETURN')
      expect(node.clauses[1].type).to.eq('WITH_CLAUSE')
      expect(node.clauses[1].name.value).to.eq('cir')
      expect(node.clauses[1].typehint.is('UDT')).to.eq(true)
      expect(node.clauses[1].body[0].type).to.eq('RETURN')
    })

    it('can use with multiple clause', function () {
      const node = parseOne(`
with shape
  when s: (Rectangle | Circle)
    return s.foo
  else
    return 0
      `)

      expect(node.type).to.eq('WITH')
      expect(node.name.type).to.eq('QUERY')
      expect(node.clauses.length).to.eq(3)
    })
  })

  describe('if statement', function () {
    it('parses a simple if', function () {
      const node = parseOne(`
if 1
  let a = 1
      `)

      expect(node.type).to.eq('IF')
      expect(node.condition.value).to.eq(1)
      expect(node.body[0].type).to.eq('LET')
    })

    it('parses a one-line if')

    it('parses a if-else', function () {
      const node = parseOne(`
if 1
  let a = 1
else
  let a = 2
      `)

      expect(node.type).to.eq('IF')
      expect(node.condition.value).to.eq(1)
      expect(node.body[0].type).to.eq('LET')
      expect(node.tail.condition).to.eq(null)
      expect(node.tail.body[0].type).to.eq('LET')
    })

    it('parses a one-line if-else')

    it('parses a if-elseif', function () {
      const node = parseOne(`
if 1
  let a = 1
elif 2
  let a = 2
      `)

      expect(node.type).to.eq('IF')
      expect(node.condition.value).to.eq(1)
      expect(node.body[0].type).to.eq('LET')
      expect(node.tail.condition.value).to.eq(2)
      expect(node.tail.body[0].type).to.eq('LET')
    })

    it('parses a if-elseif-else', function () {
      const node = parseOne(`
if 1
  let a = 1
elif 2
  let a = 2
else
  let a = 3
      `)

      expect(node.type).to.eq('IF')
      expect(node.condition.value).to.eq(1)
      expect(node.body[0].type).to.eq('LET')
      expect(node.tail.condition.value).to.eq(2)
      expect(node.tail.body[0].type).to.eq('LET')
      expect(node.tail.tail.condition).to.eq(null)
      expect(node.tail.tail.body[0].type).to.eq('LET')
    })

    it('parses a if-elseif-elseif', function () {
      const node = parseOne(`
if 1
  let a = 1
elif 2
  let a = 2
elif 3
  let a = 3
      `)

      expect(node.type).to.eq('IF')
      expect(node.condition.value).to.eq(1)
      expect(node.body[0].type).to.eq('LET')
      expect(node.tail.condition.value).to.eq(2)
      expect(node.tail.body[0].type).to.eq('LET')
      expect(node.tail.tail.condition.value).to.eq(3)
      expect(node.tail.tail.body[0].type).to.eq('LET')
    })

    it('parses a if-elseif-elseif-else', function () {
      const node = parseOne(`
if 1
  let a = 1
elif 2
  let a = 2
elif 3
  let a = 3
else
  let a = 4
      `)

      expect(node.type).to.eq('IF')
      expect(node.condition.value).to.eq(1)
      expect(node.body[0].type).to.eq('LET')
    })
  })

  it('parses comments', function () {
    const node = parseOne(`
# foo
# bar
let a = 1 # this is a comment
# baz
    `)

    expect(node.type).to.eq('LET')
  })

  it('shows line info in errors', function () {
    expect(() => parseOne(`
let a = 1
let b = let
    `)).to.throw(/Syntax error in line 2, column 11/)
  })

  it('shows tokenizer errors', function () {
    expect(() => parseOne(`
let a = @
    `)).to.throw(/Invalid token '@' in line 1, column 9/)
  })

  describe('binary operations', function () {
    it('works simple', function () {
      const binop = parseOne('a = 1 + b').rhs
      expect(binop.lhs.type).to.eq('NUMBER')
      expect(binop.rhs.type).to.eq('QUERY')
    })

    it('defines == operator', function () {
      expect(parseOne('a = 1 == b').rhs.name).to.eq('EQ')
      expect(parseOne('a = 1 is b').rhs.name).to.eq('EQ')
    })

    it('defines != operator', function () {
      expect(parseOne('a = 1 != b').rhs.name).to.eq('NEQ')
      expect(parseOne('a = 1 isnt b').rhs.name).to.eq('NEQ')
    })

    it('defines > operator', function () {
      const binop = parseOne('a = 1 > b').rhs
      expect(binop.name).to.eq('GT')
    })

    it('defines >= operator', function () {
      const binop = parseOne('a = 1 >= b').rhs
      expect(binop.name).to.eq('GTEQ')
    })

    it('defines < operator', function () {
      const binop = parseOne('a = 1 < b').rhs
      expect(binop.name).to.eq('LT')
    })

    it('defines <= operator', function () {
      const binop = parseOne('a = 1 <= b').rhs
      expect(binop.name).to.eq('LTEQ')
    })

    it('defines + operator', function () {
      const binop = parseOne('a = 1 + b').rhs
      expect(binop.name).to.eq('PLUS')
    })

    it('defines - operator', function () {
      const binop = parseOne('a = 1 - b').rhs
      expect(binop.name).to.eq('MINUS')
    })

    it('defines * operator', function () {
      const binop = parseOne('a = 1 * b').rhs
      expect(binop.name).to.eq('TIMES')
    })

    it('defines / operator', function () {
      const binop = parseOne('a = 1 / b').rhs
      expect(binop.name).to.eq('DIVISION')
    })

    it('defines % operator', function () {
      const binop = parseOne('a = 1 % b').rhs
      expect(binop.name).to.eq('MODULO')
    })

    it('defines and operator', function () {
      const binop = parseOne('a = 1 and b').rhs
      expect(binop.name).to.eq('AND')
    })

    it('defines or operator', function () {
      const binop = parseOne('a = 1 or b').rhs
      expect(binop.name).to.eq('OR')
    })

    it('works with precedence', function () {
      const binop = parseOne('a = 1 * 2 + 3').rhs
      expect(binop.lhs.type).to.eq('BINOP')
      expect(binop.rhs.type).to.eq('NUMBER')

      const and = parseOne('a = 1 and 1 > 1 * 2 + 3').rhs
      expect(and.name).to.eq('AND')
      expect(and.rhs.name).to.eq('GT')
    })
  })

  describe('unary operator', function () {
    it('works with not', function () {
      const node = parseOne('a = not 1').rhs
      expect(node.type).to.eq('UNOP')
    })

    it('has proper precedence', function () {
      const node = parseOne('a = not 1 > 2').rhs
      expect(node.type).to.eq('BINOP')
    })

    it('can use parens to customize precedence', function () {
      const node = parseOne('a = not (1 > 2)').rhs
      expect(node.type).to.eq('UNOP')
    })
  })

  describe('while', function () {
    it('parses while', function () {
      const node = parseOne('while foo()\n  bar()')
      expect(node.type).to.eq('WHILE')
      expect(node.condition.type).to.eq('FUNCTION_CALL')
      expect(node.body.length).to.eq(1)
    })
  })

  describe('for', function () {
    it('parses a full for', function () {
      const node = parseOne('for i = 1 to 10 step 2\n  bar()')
      expect(node.type).to.eq('FOR')
      expect(node.variable).to.eq('i')
      expect(node.from.type).to.eq('NUMBER')
      expect(node.to.type).to.eq('NUMBER')
      expect(node.step.type).to.eq('NUMBER')
      expect(node.body.length).to.eq(1)
    })

    it('parses a short for', function () {
      const node = parseOne('for i = 1 to 10\n  bar()')
      expect(node.type).to.eq('FOR')
      expect(node.variable).to.eq('i')
      expect(node.from.type).to.eq('NUMBER')
      expect(node.to.type).to.eq('NUMBER')
      expect(node.step).to.eq(null)
      expect(node.body.length).to.eq(1)
    })

    it('parses a single-line for..to', function () {
      const node = parseOne('for i = 1 to 10 do bar()')
      expect(node.type).to.eq('FOR')
      expect(node.variable).to.eq('i')
      expect(node.from.type).to.eq('NUMBER')
      expect(node.to.type).to.eq('NUMBER')
      expect(node.step).to.eq(null)
      expect(node.body.length).to.eq(1)
    })

    it('parses a single-line for..in', function () {
      const node = parseOne('for i in [1, 2, 3] do bar(i)')
      expect(node.type).to.eq('FOREACH')
      expect(node.variable).to.eq('i')
      expect(node.body.length).to.eq(1)
    })
  })

  describe('break and continue', function () {
    it('can use break inside a loop', function () {
      const node = parseOne(`
for i = 1 to 10
  bar()
  break
      `)

      expect(node.type).to.eq('FOR')
      expect(node.body[1].type).to.eq('BREAK')
    })

    it('can use continue inside a loop', function () {
      const node = parseOne(`
while 1
  bar()
  continue
      `)

      expect(node.type).to.eq('WHILE')
      expect(node.body[1].type).to.eq('CONTINUE')
    })
  })

  describe('foreach', function () {
    it('works', function () {
      const node = parseOne(`
for i in [1, 2, 3]
  bar(i)
      `)

      expect(node.type).to.eq('FOREACH')
      expect(node.variable).to.eq('i')
      expect(node.expression.type).to.eq('INLINE_ARRAY')
      expect(node.body.length).to.eq(1)
    })
  })

  describe('booleans', function () {
    it('can parse booleans', function () {
      expect(parseOne('a = true').rhs.value).to.eq(1)
      expect(parseOne('a = yes').rhs.value).to.eq(1)
      expect(parseOne('a = on').rhs.value).to.eq(1)
      expect(parseOne('a = false').rhs.value).to.eq(0)
      expect(parseOne('a = no').rhs.value).to.eq(0)
      expect(parseOne('a = off').rhs.value).to.eq(0)
    })
  })

  describe('lambdas', function () {
    it('can parse a simple lambda', function () {
      const node = parseOne(`
let a = () ->
  return
      `).value

      expect(node.type).to.eq('LAMBDA')
      expect(node.typehint.is('VOID')).to.eq(true)
      expect(node.parameters).to.eql([])
      expect(node.body.length).to.eq(1)
    })

    it('can parse a simple lambda with typehint', function () {
      const node = parseOne(`
let a = (): string ->
  return
      `).value

      expect(node.type).to.eq('LAMBDA')
      expect(node.typehint.is('STRING')).to.eq(true)
      expect(node.parameters).to.eql([])
      expect(node.body.length).to.eq(1)
    })

    it('can parse a lambda with params', function () {
      const node = parseOne(`
let a = (a: *integer, b: string = 2): string ->
  return
      `).value

      expect(node.type).to.eq('LAMBDA')
      expect(node.typehint.is('STRING')).to.eq(true)
      expect(node.parameters.length).to.eq(2)
      expect(node.parameters[0].name).to.eq('a')
      expect(node.parameters[0].ref).to.eq(true)
      expect(node.parameters[0].typehint.is('INTEGER')).to.eq(true)
      expect(node.parameters[1].name).to.eq('b')
      expect(node.parameters[1].ref).to.eq(false)
      expect(node.parameters[1].default.value).to.eq(2)
      expect(node.parameters[1].typehint.is('STRING')).to.eq(true)
      expect(node.body.length).to.eq(1)
    })

    it('can use it in assign', function () {
      const node = parseOne(`
a = () ->
  return
      `).rhs

      expect(node.type).to.eq('LAMBDA')
    })

    it('can use it in function call', function () {
      const node = parseOne(`
foo(() ->
    return
)
      `)

      expect(node.args[0].type).to.eq('LAMBDA')
    })

    it('can use a single-line lambda', function () {
      const node = parseOne('a = (): integer -> 1')
      expect(node.rhs.type).to.eq('LAMBDA')
    })

    it('can use a single-line with params', function () {
      const node = parseOne('a = (foo: integer): integer -> 1')
      expect(node.rhs.type).to.eq('LAMBDA')
    })

    it('can use a single-line with params inside function call', function () {
      const node = parseOne('foo((bar: integer): integer -> bar)')
      expect(node.args[0].type).to.eq('LAMBDA')
    })
  })

  describe('lambda-call', function () {
    it('can call simple as statement', function () {
      const node = parseOne('call(foo): integer')
      expect(node.type).to.eq('LAMBDA_CALL')
      expect(node.typehint.is('INTEGER')).to.eq(true)
    })

    it('can call simple as statement with short syntax', function () {
      const node = parseOne('->(foo): integer')
      expect(node.type).to.eq('LAMBDA_CALL')
      expect(node.typehint.is('INTEGER')).to.eq(true)
    })

    it('can call with params as statement', function () {
      const node = parseOne('call(foo, 1, 2): integer')
      expect(node.type).to.eq('LAMBDA_CALL')
      expect(node.typehint.is('INTEGER')).to.eq(true)
      expect(node.args.length).to.eq(2)
    })

    it('can call simple as expression', function () {
      const node = parseOne('a = ->(foo, 1, 2): integer').rhs
      expect(node.type).to.eq('LAMBDA_CALL')
      expect(node.typehint.is('INTEGER')).to.eq(true)
      expect(node.args.length).to.eq(2)
    })
  })

  describe('require', function () {
    it('parses a require', function () {
      const result = parseOne("require 'foo'")

      expect(result.type).to.eq('REQUIRE')
      expect(result.file).to.eq('foo')
    })
  })

  describe('inline types', function () {
    it('works', function () {
      const result = parseOne('a = { name: "Foo", age: 128 }: Person').rhs

      expect(result.type).to.eq('INLINE_TYPE')
      expect(result.fields[0].name.value).to.eq('name')
      expect(result.fields[0].value.value).to.eq('Foo')
      expect(result.fields[1].name.value).to.eq('age')
      expect(result.fields[1].value.value).to.eq(128)
    })
  })

  describe('non-decimal numeric bases', function () {
    it('works with binaries', function () {
      expect(parseOne('a = 0b1001').rhs.type).to.eq('BINARY_INTEGER')
    })

    it('works with octals', function () {
      expect(parseOne('a = 0c70112').rhs.type).to.eq('OCTAL_INTEGER')
    })

    it('works with hex', function () {
      expect(parseOne('a = 0xF11A90').rhs.type).to.eq('HEX_INTEGER')
    })
  })

  describe('list comprehension', function () {
    it('works full', function () {
      const result = parseOne('a = [print(i) for i in [1, 2, 3] when i % 2 == 0]').rhs
      expect(result.type).to.eq('LIST_COMPREHENSION')
    })
  })

  describe('plugin import', function () {
    it('works', function () {
      const result = parseOne('import_plugin Foo as Bar')
      expect(result.type).to.eq('PLUGIN_IMPORT')
      expect(result.name.value).to.eq('Foo')
      expect(result.alias.value).to.eq('Bar')
    })

    it('works without alias', function () {
      const result = parseOne('import_plugin Foo')
      expect(result.type).to.eq('PLUGIN_IMPORT')
      expect(result.name.value).to.eq('Foo')
      expect(result.alias.value).to.eq('Foo')
    })
  })

  describe('halt', function () {
    it('works', function () {
      const result = parseOne('halt "no way jose"')
      expect(result.type).to.eq('HALT')
      expect(result.message.type).to.eq('SQSTRING')
    })
  })
})
