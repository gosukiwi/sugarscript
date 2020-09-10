const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/unop', function () {
  it('works for integer', function () {
    expect(check('let a = not 1').variables.a.type.is('INTEGER')).to.eq(true)
  })

  it('fails with non-integers', function () {
    expect(() => check('let a = not "asd"')).to.throw(/Can only use 'NOT' with INTEGER/)
  })
})
