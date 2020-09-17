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
    expect(result).to.match(/a = __SSINTERNAL/)
  })

  it('defines an inline array with typehint', function () {
    const result = generate('let a: integer[] = [1, 2, 3]')
    expect(result).to.match(/a = __SSINTERNAL/)
  })

  it('defines a nested array', function () {
    const result = generate('let p = [[1], [2, 3]]')
    expect(result).to.match(/__SSINTERNAL\d+ as integer\[-1\]/)
    expect(result).to.match(/__SSINTERNAL\d+ as integer\[-1, -1\]/)
    expect(result).to.match(/p = __SSINTERNAL\d+/)
  })

  it('defines a global', function () {
    const result = generate('let global a = 1')
    expect(result).to.contain('global a as integer\na = 1\n')
  })

  it('adds a line comment', function () {
    const result = generate('let a = 1')
    expect(result).to.contain('// in-memory://, line 1')
  })
})
