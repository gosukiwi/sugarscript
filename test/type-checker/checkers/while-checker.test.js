const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/while', function () {
  it('works', function () {
    const definitions = check(`
while 1
  let a = 1
    `)

    expect(definitions.variables.a.type.is('INTEGER')).to.eq(true)
  })

  it.only('complains if the condition isnt integer', function () {
    expect(() => check(`
while "yes"
  let a = 1
    `)).to.throw(/While condition must be INTEGER, got STRING/)
  })
})
