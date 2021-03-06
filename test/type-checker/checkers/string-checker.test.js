const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/string', function () {
  it('matches a double-quoted string', function () {
    const definitions = check('let a = "potato #{2 + 2}"')
    expect(definitions.variables.a.type.is('STRING')).to.eq(true)
  })
})
