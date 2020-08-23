const expect = require('chai').expect
const parse = require('../../lib/parser/parser')

describe.only('parser/parser', function () {
  it('parses assignment', function () {
    const node = parse('a = b')[0]

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
      const node = parse(`
  def foo()
    a = b
    c = d
      `)[0]

      expect(node.type).to.eq('FUNCTION_DEFINITION')
      expect(node.name).to.eq('foo')
      expect(node.body.length).to.eq(2)
    })

    it('parses function deinition with params', function () {
      const node = parse(`
  def foo(a: integer)
    b = a
      `)[0]

      expect(node.name).to.eq('foo')
      expect(node.params.length).to.eq(1)
      expect(node.params[0].name).to.eq('a')
      expect(node.params[0].typehint.name).to.eq('INTEGER')
    })
  })

  describe('function call', function () {
    it('parses a call with no parameters', function () {
      const node = parse('foo()')[0]

      expect(node.type).to.eq('FUNCTION_CALL')
      expect(node.name).to.eq('foo')
      expect(node.args).to.eql([])
    })

    it('parses a call with a single argument', function () {
      const node = parse('foo(bar)')[0]

      expect(node.name).to.eq('foo')
      expect(node.args[0].value).to.eq('bar')
    })

    it('parses a call with many arguments', function () {
      const node = parse('foo(bar, baz)')[0]

      expect(node.name).to.eq('foo')
      expect(node.args[0].value).to.eq('bar')
      expect(node.args[1].value).to.eq('baz')
    })
  })

  describe('plugin call', function () {
    it('parses a call with no parameters', function () {
      const node = parse('p::foo()')[0]

      expect(node.type).to.eq('PLUGIN_CALL')
      expect(node.plugin).to.eq('p')
      expect(node.func).to.eq('foo')
      expect(node.args).to.eql([])
    })

    it('parses a call with a single argument', function () {
      const node = parse('p::foo(bar)')[0]

      expect(node.plugin).to.eq('p')
      expect(node.func).to.eq('foo')
      expect(node.args[0].value).to.eq('bar')
    })

    it('parses a call with many arguments', function () {
      const node = parse('p::foo(bar, baz)')[0]

      expect(node.plugin).to.eq('p')
      expect(node.func).to.eq('foo')
      expect(node.args[0].value).to.eq('bar')
      expect(node.args[1].value).to.eq('baz')
    })
  })
})
