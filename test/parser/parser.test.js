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
      expect(node.lhs.parts[1].index.value).to.eq(1)
      expect(node.lhs.parts[2].type).to.eq('IDENTIFIER')
      expect(node.lhs.parts[2].value).to.eq('c')
      expect(node.lhs.parts[3].type).to.eq('ARRAY_ACCESS')
      expect(node.lhs.parts[3].identifier).to.eq('d')
      expect(node.lhs.parts[3].index.value).to.eq(2)
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
      const node = parseOne('p::foo()')

      expect(node.type).to.eq('PLUGIN_CALL')
      expect(node.plugin).to.eq('p')
      expect(node.func).to.eq('foo')
      expect(node.args).to.eql([])
    })

    it('parses a call with a single argument', function () {
      const node = parseOne('p::foo(bar)')

      expect(node.plugin).to.eq('p')
      expect(node.func).to.eq('foo')
      expect(node.args[0].parts[0].value).to.eq('bar')
    })

    it('parses a call with many arguments', function () {
      const node = parseOne('p::foo(bar, baz)')

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

    it('matches a string', function () {
      const node = parseOne('a = "potato"')

      expect(node.rhs.type).to.eq('STRING')
      expect(node.rhs.value).to.eq('potato')
    })
  })

  describe('let', function () {
    it('parses with integer', function () {
      const node = parseOne('let a: integer')

      expect(node.type).to.eq('LET')
      expect(node.name).to.eq('a')
      expect(node.typehint.is('INTEGER')).to.eq(true)
    })

    it('parses with integer and allows to assign value', function () {
      const node = parseOne('let a: integer = 1')

      expect(node.type).to.eq('LET')
      expect(node.name).to.eq('a')
      expect(node.typehint.is('INTEGER')).to.eq(true)
      expect(node.value.type).to.eq('NUMBER')
    })

    it('allows to guess value', function () {
      const node = parseOne('let a = 1')

      expect(node.type).to.eq('LET')
      expect(node.name).to.eq('a')
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
      const node = parseOne('a = [foo(), bar(1), baz::taz(3, 4)]')

      expect(node.rhs.elements[0].type).to.eq('FUNCTION_CALL')
      expect(node.rhs.elements[1].type).to.eq('FUNCTION_CALL')
      expect(node.rhs.elements[2].type).to.eq('PLUGIN_CALL')
    })

    it('cannot nest arrays', function () {
      expect(() => parseOne('a = [1, 2, [3]]')).to.throw()
    })

    it('can use inside calls', function () {
      expect(parseOne('foo([1, 2])').args[0].type).to.eq('INLINE_ARRAY')
    })
  })

  describe('expressions', function () {
    it('matches a parenthesized expression', function () {
      expect(parseOne('a = (foo())').rhs.type).to.eq('FUNCTION_CALL')
    })
  })
})
