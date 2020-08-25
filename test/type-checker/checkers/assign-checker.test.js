const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/assign', function () {
  it('can assign when defining', function () {
    const definitions = check(`
let a: integer
a = 1
    `)

    expect(definitions.variables.a.type.type).to.eq('INTEGER')
  })

  it('cant assign without defining', function () {
    expect(() => check('a = 1')).to.throw()
  })

  it('can define and assign in one go using typehint', function () {
    const definitions = check('let a:integer = 1')
    expect(definitions.variables.a.type.type).to.eq('INTEGER')
  })

  it('can define and assign in one go', function () {
    const definitions = check('let a = 1')
    expect(definitions.variables.a.type.type).to.eq('INTEGER')
  })

  it('checks the type', function () {
    expect(() => check('let a:integer = "asd"')).to.throw()
  })
})
