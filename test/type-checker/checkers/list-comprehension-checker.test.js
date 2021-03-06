const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/list-comprehension', function () {
  it('works', function () {
    const definitions = check('let numbers = [ceil(i) for i in [1, 2, 3, 4] when i % 2 == 0]')
    expect(definitions.getVariable('numbers').type.is('ARRAY')).to.eq(true)
    expect(definitions.getVariable('numbers').type.value.is('INTEGER')).to.eq(true)
  })

  it('has proper return type', function () {
    const definitions = check('let strings = ["#{i}" for i in [1, 2, 3, 4] when i % 2 == 0]')
    expect(definitions.getVariable('strings').type.value.is('STRING')).to.eq(true)
  })

  it('cannot re-define', function () {
    expect(() => check(`
let strings = ["#{i}" for i in [1, 2, 3, 4] when i % 2 == 0]
strings = ["#{i}" for i in [1, 2, 3, 4] when i % 2 == 0]
    `)).to.throw('already defined')
  })
})
