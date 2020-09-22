const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/inline-type', function () {
  it('works', function () {
    expect(check('type Person(name: string, age: float)\nlet a = { name: "Nidalee", age: 18 }: Person').variables.a.type.is('UDT')).to.eq(true)
  })

  it('doesnt need all fields', function () {
    expect(() => check('type Person(name: string, age: float)\nlet a = { name: "Nidalee" }: Person')).not.to.throw()
  })

  it('complains when invalid type', function () {
    expect(() => check('type Person(name: string, age: integer)\nlet a = { name: "Nidalee", age: 3.14 }: Person')).to.throw(/'age' must be INTEGER/)
  })
})
