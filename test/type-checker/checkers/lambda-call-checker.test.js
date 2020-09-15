const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/lambda-call', function () {
  it('calls a simple function', function () {
    const definitions = check(`
let foo = (): integer -> 1
let a = call(foo): integer
    `)

    expect(definitions.variables.a.type.is('INTEGER')).to.eq(true)
  })

  it('cannot validate parameters', function () {
    expect(() => {
      check(`
let foo = (name: integer): integer ->
  return 1
->(foo, "foo"): integer
      `)
    }).not.to.throw()
  })

  it('cannot assing to wrong type', function () {
    expect(() => check('let foo = 1\nlet a: string = call(foo): integer')).to.throw(/Cannot assign INTEGER to STRING/)
  })

  it('cannot call a non-integer', function () {
    expect(() => check('let foo = "hi"\nlet a = ->(foo): integer')).to.throw(/Tried to call/)
  })
})
