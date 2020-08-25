const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/let', function () {
  it('cannot define twice', function () {
    expect(() => check('let a: integer\nlet a: string')).to.throw()
  })

  it('works without a value', function () {
    const definitions = check('let a: integer')
    expect(definitions.variables.a.type.is('INTEGER')).to.eq(true)
  })

  it('works with a value', function () {
    const definitions = check('let a: integer = 1')
    expect(definitions.variables.a.type.is('INTEGER')).to.eq(true)
  })

  it('works with a value without specifying the type', function () {
    const definitions = check('let a = 1')
    expect(definitions.variables.a.type.is('INTEGER')).to.eq(true)
  })

  it('can define a type', function () {
    const definitions = check('let person: tPerson')
    expect(definitions.variables.person.type.is('UDT')).to.eq(true)
    expect(definitions.variables.person.type.value).to.eq('tPerson')
  })

  it('can define an array', function () {
    const definitions = check('let person: tPerson[]')
    expect(definitions.variables.person.type.is('ARRAY')).to.eq(true)
    expect(definitions.variables.person.type.value.type).to.eq('UDT')
    expect(definitions.variables.person.type.dimensions).to.eq(1)
  })

  it('checks array types', function () {
    expect(() => check('let a: string[] = [1, 2, 3]')).to.throw()
  })

  it('works with inline arrays', function () {
    const definitions = check('let a: integer[] = [1, 2, 3]')
    expect(definitions.variables.a.type.is('ARRAY')).to.eq(true)
  })
})
