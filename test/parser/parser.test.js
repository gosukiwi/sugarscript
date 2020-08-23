const expect = require('chai').expect
const parse = require('../../lib/parser/parser')

function parseOne (input) {
  return parse(input)[0]
}

describe.only('parser/parser', function () {
  it('parses assignment', function () {
    const node = parseOne('a = b')

    expect(node.lhs.type).to.eq('IDENTIFIER')
    expect(node.lhs.value).to.eq('a')
    expect(node.rhs.type).to.eq('IDENTIFIER')
    expect(node.rhs.value).to.eq('b')
  })

  it('parses multiple statements', function () {
    const node = parse('a = b\nb = c')

    expect(node[0].lhs.value).to.eq('a')
    expect(node[0].rhs.value).to.eq('b')
    expect(node[1].lhs.value).to.eq('b')
    expect(node[1].rhs.value).to.eq('c')
  })

  describe('function definition', function () {
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
      expect(node.params[0].typehint.name).to.eq('INTEGER')
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
      expect(node.args[0].value).to.eq('bar')
    })

    it('parses a call with many arguments', function () {
      const node = parseOne('foo(bar, baz)')

      expect(node.name).to.eq('foo')
      expect(node.args[0].value).to.eq('bar')
      expect(node.args[1].value).to.eq('baz')
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
      expect(node.args[0].value).to.eq('bar')
    })

    it('parses a call with many arguments', function () {
      const node = parseOne('p::foo(bar, baz)')

      expect(node.plugin).to.eq('p')
      expect(node.func).to.eq('foo')
      expect(node.args[0].value).to.eq('bar')
      expect(node.args[1].value).to.eq('baz')
    })
  })

  describe('literals', function () {
    it('matches an integer number', function () {
      const node = parseOne('a = 1')

      expect(node.rhs.value).to.eq(1)
    })

    it('matches a float number', function () {
      const node = parseOne('a = 1.3')

      expect(node.rhs.value).to.eq(1.3)
    })

    it('matches a negative float number', function () {
      const node = parseOne('a = -3.14')

      expect(node.rhs.value).to.eq(-3.14)
    })

    it('matches a string', function () {
      const node = parseOne('a = "potato"')

      expect(node.rhs.type).to.eq('STRING')
      expect(node.rhs.value).to.eq('potato')
    })
  })

  describe('LET', function () {
    it('parses with integer', function () {
      const node = parseOne('let a: integer')

      expect(node.type).to.eq('LET')
      expect(node.name).to.eq('a')
      expect(node.typehint.name).to.eq('INTEGER')
    })
  })
})
