const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/assignment', function () {
  it('assigns an integer', function () {
    const result = generate('let a: integer\na = 1')

    expect(result).to.contain('a = 1')
  })

  it('assigns an inline array', function () {
    const result = generate('let a: integer[]\na = [1, 2, 3]')
    expect(result).to.match(/a = _SSINTERNAL/)
  })

  it('assigns an inline array that contains a function', function () {
    const result = generate(`
def foo(): integer
  return 1
let a: integer[]
a = [1, 2, foo()]
    `)

    expect(result).to.match(/a = _SSINTERNAL/)
  })

  it('assigns an element from an array', function () {
    const result = generate(`
let a: integer[]
let b: integer
a = [1, 2, 3]
b = a[1]
    `.trim())

    expect(result).to.match(/a = _SSINTERNAL/)
    expect(result).to.match(/b = a\[1\]/)
  })

  it('assigns an element from a multidimensional array', function () {
    const result = generate(`
let a: integer[][]
a[0] = [1, 2, 3]
    `.trim())

    expect(result).to.match(/a\[0\] = _SSINTERNAL/)
  })
})
