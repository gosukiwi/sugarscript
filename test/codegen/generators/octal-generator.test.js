const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/octal', function () {
  it('generates an octal number', function () {
    expect(generate('let a = 0c1237')).to.contain('a = 0c1237')
  })
})
