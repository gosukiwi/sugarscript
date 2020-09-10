const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/unop', function () {
  it('generates binops', function () {
    expect(generate('let a = not 1')).to.eq('a as integer\na = not 1\n')
  })
})
