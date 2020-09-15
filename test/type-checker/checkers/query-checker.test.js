const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/query', function () {
  it('is case-insensitive', function () {
    expect(() => check(`
type Person(name: string[])
let p: person
let name: string = p.NAME[0]
    `)).not.to.throw()
  })
})
