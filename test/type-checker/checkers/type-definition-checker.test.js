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

    expect(definitions.getType('Person').fields.name.is('STRING')).to.eq(true)
    expect(definitions.getType('Person').fields.age.is('INTEGER')).to.eq(true)
  })

  it('throws error when repeating field names', function () {
    expect(() => check('type Person(name: string, Name: integer)')).to.throw(/already set/)
  })

  it('throws error when repeating field names (case insensitive)', function () {
    expect(() => check('type Person(name: string, Name: integer)')).to.throw(/already set/)
  })

  it('checks typehints are valid', function () {
    expect(() => check('type Person(name: string, age: unexistant)')).to.throw(/Could not find type/)
  })

  it('throws error if typehint type is not defined', function () {
    expect(() => check('type Person(pet: Cat)')).to.throw(/Could not find type/)
  })

  it('typehints can be types', function () {
    expect(() => check('type Cat(name: string)\ntype Person(pet: Cat)')).not.to.throw()
  })

  it('is case insensitive when setting', function () {
    expect(() => check('type Cat(name: string)\nlet cat: cat')).not.to.throw()
    expect(() => check('type cat(name: string)\nlet cat: CAT')).not.to.throw()
  })

  it('is case insensitive when accessing fields', function () {
    expect(() => check('type Cat(name: string)\nlet cat: cat\ncat.NAME = "Snowball III"')).not.to.throw()
  })
})
