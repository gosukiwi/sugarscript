const expect = require('chai').expect
const parser = require('../../../lib/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  const ast = parser.parse(sourcecode.trim())
  return new Codegen().generate(ast)
}

describe('codegen/generators/assignment', function () {
  it('assigns an integer', function () {
    const result = generate('a = 1')

    expect(result).to.contain('a as integer')
    expect(result).to.contain('a = 1')
  })

  it('assigns an inline array', function () {
    const result = generate('a = [1, 2, 3]')

    expect(result).to.match(/a = _SSINTERNAL/)
  })

  it('assigns an inline array that contains a function', function () {
    const result = generate(`
def foo(): integer
a = [1, 2, foo()]
    `)

    expect(result).to.match(/a = _SSINTERNAL/)
  })

  it('assigns an element from an array', function () {
    const result = generate(`
a = [1, 2, 3]
b = a[1]
    `.trim())

    expect(result).to.match(/a = _SSINTERNAL/)
  })
})
