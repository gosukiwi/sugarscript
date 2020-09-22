const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/binary', function () {
  it('works', function () {
    expect(check('let a = 0b1001').variables.a.type.is('INTEGER')).to.eq(true)
  })
})
