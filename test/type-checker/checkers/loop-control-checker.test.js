const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/loop-control', function () {
  it('works with break', function () {
    expect(() => check('while 1\n  break')).not.to.throw()
  })

  it('can use continue inside an if inside a loop', function () {
    expect(() => {
      check(`
while 1
  if 1
    continue
      `)
    }).not.to.throw()
  })

  it('cannot use continue outside a loop', function () {
    expect(() => check('continue')).to.throw()
  })

  it('works with continue', function () {
    expect(() => check('while 1\n  continue')).not.to.throw()
  })

  it('cannot use break outside a loop', function () {
    expect(() => check('break')).to.throw()
  })
})
