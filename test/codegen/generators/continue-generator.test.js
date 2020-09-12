const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/continue', function () {
  it('generates continue', function () {
    const result = generate('while 1\n  continue')
    expect(result).to.contain('while 1')
    expect(result).to.contain('continue')
  })
})
