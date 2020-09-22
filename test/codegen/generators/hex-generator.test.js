const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/hex', function () {
  it('generates an hex number', function () {
    expect(generate('let a = 0xAF1091')).to.contain('a = 0xAF1091')
  })
})
