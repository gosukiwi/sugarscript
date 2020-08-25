const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/identifier', function () {
  it('checks it exists', function () {
    expect(() => {
      check(`
def foo(name: string)
  let a = 1
foo(potato)
      `)}).to.throw(/Could not find variable 'potato'/)
  })
})
