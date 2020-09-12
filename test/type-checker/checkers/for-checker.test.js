const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/for', function () {
  it('works with a short for', function () {
    const definitions = check(`
for i = 1 to 10
  let a = i
    `)

    expect(definitions.variables.a.type.is('INTEGER')).to.eq(true)
  })

  it('works with a long for', function () {
    const definitions = check(`
for i = 1 to 10 step 2
  let a = i
    `)

    expect(definitions.variables.a.type.is('INTEGER')).to.eq(true)
  })

  it('complains when from is not integer', function () {
    expect(() => {
      check(`
for i = 1.1 to 10 step 2
  let a = i
      `)
    }).to.throw(/For "from" value must be INTEGER/)
  })

  it('complains when to is not integer', function () {
    expect(() => {
      check(`
for i = 1 to 10.1 step 2
  let a = i
      `)
    }).to.throw(/For "to" value must be INTEGER/)
  })

  it('complains when step is not integer', function () {
    expect(() => {
      check(`
for i = 1 to 10 step 2.1
  let a = i
      `)
    }).to.throw(/For "step" value must be INTEGER/)
  })
})
