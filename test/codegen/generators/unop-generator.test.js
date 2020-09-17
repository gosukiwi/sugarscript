const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/unop', function () {
  it('generates binops', function () {
    expect(generate('let a = not 1')).to.contain('a as integer')
    expect(generate('let a = not 1')).to.contain('a = not 1')
  })
})
