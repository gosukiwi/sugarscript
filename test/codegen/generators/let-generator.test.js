const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/let', function () {
  it('defines simple', function () {
    const result = generate('let a: integer')
    expect(result).to.contain('a as integer')
  })

  it('defines with simple value', function () {
    const result = generate('let a: integer = 1')
    expect(result).to.contain('a as integer')
    expect(result).to.contain('a = 1')
  })

  it('defines with simple value and no typehint', function () {
    const result = generate('let a = 1')
    expect(result).to.contain('a as integer')
    expect(result).to.contain('a = 1')
  })

  it('defines an inline array', function () {
    const result = generate('let a = [1, 2, 3]')
    expect(result).to.match(/a = _SSINTERNAL/)
  })

  it('defines an inline array with typehint', function () {
    const result = generate('let a: integer[] = [1, 2, 3]')
    expect(result).to.match(/a = _SSINTERNAL/)
  })
})
