const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/binop', function () {
  it('works for boolean operators', function () {
    expect(check('let a = 1 and 1').variables.a.type.is('INTEGER')).to.eq(true)
    expect(check('let a = 1 or 1').variables.a.type.is('INTEGER')).to.eq(true)
    expect(check('let a = 1 > 1').variables.a.type.is('INTEGER')).to.eq(true)
    expect(check('let a = 1 >= 1').variables.a.type.is('INTEGER')).to.eq(true)
    expect(check('let a = 1 < 1').variables.a.type.is('INTEGER')).to.eq(true)
    expect(check('let a = 1 <= 1').variables.a.type.is('INTEGER')).to.eq(true)
    expect(check('let a = 1 == 1').variables.a.type.is('INTEGER')).to.eq(true)
    expect(check('let a = 1 != 1').variables.a.type.is('INTEGER')).to.eq(true)
    expect(check('let a = 1 + 1').variables.a.type.is('INTEGER')).to.eq(true)
    expect(check('let a = 1 - 1').variables.a.type.is('INTEGER')).to.eq(true)
    expect(check('let a = 1 * 1').variables.a.type.is('INTEGER')).to.eq(true)
    expect(check('let a = 1 / 1').variables.a.type.is('INTEGER')).to.eq(true)
    expect(check('let a = 1 % 1').variables.a.type.is('INTEGER')).to.eq(true)
  })

  it('cannot compare >, >=, < or <= with something other than floats and integers', function () {
    expect(() => check('let a = "asd" and 1')).to.throw(/Incompatible types/)
    expect(() => check('let a = "asd" or 1')).to.throw(/Incompatible types/)
    expect(() => check('let a = "asd" > 1')).to.throw(/Incompatible types/)
    expect(() => check('let a = "asd" >= 1')).to.throw(/Incompatible types/)
    expect(() => check('let a = "asd" < 1')).to.throw(/Incompatible types/)
    expect(() => check('let a = "asd" <= 1')).to.throw(/Incompatible types/)
    expect(() => check('let a = "asd" == 1')).to.throw(/Incompatible types/)
    expect(() => check('let a = "asd" != 1')).to.throw(/Incompatible types/)
    expect(() => check('let a = "asd" + 1')).to.throw(/Incompatible types/)
    expect(() => check('let a = "asd" - 1')).to.throw(/Incompatible types/)
    expect(() => check('let a = "asd" * 1')).to.throw(/Incompatible types/)
    expect(() => check('let a = "asd" / 1')).to.throw(/Incompatible types/)
    expect(() => check('let a = "asd" % 1')).to.throw(/Incompatible types/)
  })
})
