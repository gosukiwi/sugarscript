const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/parenthesized-expression', function () {
  it('works', function () {
    const result = generate('let a = (1)')
    expect(result).to.contain('a as integer\na = (1)')
  })
})
