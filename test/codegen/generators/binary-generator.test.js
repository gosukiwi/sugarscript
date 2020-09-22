const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/binary', function () {
  it('generates a binary number', function () {
    expect(generate('let a = 0b1001')).to.contain('a = %1001')
  })
})
