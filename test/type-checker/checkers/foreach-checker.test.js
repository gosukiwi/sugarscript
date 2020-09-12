const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/foreach', function () {
  it('works with an inline array', function () {
    const definitions = check(`
for i in [1, 2, 3]
  let a = i
    `)

    expect(definitions.variables.a.type.is('INTEGER')).to.eq(true)
  })

  it('works with a variable', function () {
    const definitions = check(`
let a = [1, 2, 3]
for i in a
  let b = i
    `)

    expect(definitions.variables.b.type.is('INTEGER')).to.eq(true)
  })

  it('does not work for non-arrays', function () {
    expect(() => {
      check(`
for i in 1
  let a = i
      `)
    }).to.throw(/must be an ARRAY/)
  })
})
