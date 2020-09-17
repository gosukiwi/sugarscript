const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/while', function () {
  it('works', function () {
    const result = generate(`
while 1 == 1
  let a = 1
    `)

    expect(result).to.contain('while 1 = 1')
    expect(result).to.contain('a as integer')
    expect(result).to.contain('a = 1')
    expect(result).to.contain('endwhile')
  })

  it('adds a line comment', function () {
    const result = generate(`
let a = 1
while a < 10
  a = a - 1
    `)
    expect(result).to.contain('// in-memory://, line 2')
  })
})
