const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/type-definition', function () {
  it('adds type to definitions', function () {
    const definitions = check('type Person(name: string, age: integer)')

    expect(definitions.types.Person.fields.name.is('STRING')).to.eq(true)
    expect(definitions.types.Person.fields.age.is('INTEGER')).to.eq(true)
  })

  it('throws error when repeating field names', function () {
    expect(() => check('type Person(name: string, name: integer)')).to.throw(/already set/)
  })

  it('checks typehints are valid', function () {
    expect(() => check('type Person(name: string, age: unexistant)')).to.throw(/Could not find type/)
  })
})
