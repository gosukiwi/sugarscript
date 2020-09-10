const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/function-call', function () {
  it('calls a simple function', function () {
    const definitions = check(`
def foo()
  let a = 1
foo()
    `)

    expect(definitions.calls.foo.type.type).to.eq('VOID')
  })

  it('knows the type', function () {
    const definitions = check(`
def foo(): integer
  return 1
foo()
    `)

    expect(definitions.calls.foo.type.type).to.eq('INTEGER')
  })

  it('validates parameters when none is passed', function () {
    expect(() => {
      check(`
def foo(name: integer): integer
  return 1
foo()
      `) }).to.throw(/expects to receive an argument/)
  })

  it('validates parameters when wrong type', function () {
    expect(() => {
      check(`
def foo(name: integer): integer
  return 1
foo("foo")
      `) }).to.throw(/expects to receive an argument/)
  })
})
