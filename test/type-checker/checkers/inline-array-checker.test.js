const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/inline-array', function () {
  it('can define and assign to a multidimensional array', function () {
    const definitions = check(`
let foo: integer[][]
let arr = foo[0]
let num = foo[0, 0]
    `)

    expect(definitions.variables.arr.type.is('ARRAY')).to.eq(true)
    expect(definitions.variables.num.type.is('INTEGER')).to.eq(true)
  })

  it('can assign a multidimensional array inside a type', function () {
    expect(() => {
      check(`
type Person(friends: integer[][])
let p: Person
p.friends[0] = [1, 2, 3]
p.friends[1, 1] = 2
      `)}).not.to.throw()
  })

  it('complains also in multidimensional arrays', function () {
    expect(() => {
      check(`
type Person(friends: integer[][])
let p: Person
p.friends[1, 1] = "asd"
      `)}).to.throw(/Cannot assign STRING to INTEGER/)
  })

  it('checks arrays types in multidimensional arrays', function () {
    expect(() => {
      check(`
type Person(friends: integer[][])
let p: Person
p.friends[1] = ["asd"]
      `)}).to.throw(/Cannot assign/)
  })

  it('checks nested arrays', function () {
    const definitions = check('let p = [[1], [2, 3]]')
    expect(definitions.variables.p.type.is('ARRAY')).to.eq(true)
    expect(definitions.variables.p.type.value.is('ARRAY')).to.eq(true)
    expect(definitions.variables.p.type.value.value.is('INTEGER')).to.eq(true)
  })

  it('complains when invalid nested arrays', function () {
    expect(() => check('let p = [[1], ["foo"]]')).to.throw(/All elements in an array must be the same type/)
  })

  it('complains when invalid nested arrays, more levels', function () {
    expect(() => check('let p = [[1], [[1]]]')).to.throw(/All elements in an array must be the same type/)
  })
})
