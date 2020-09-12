const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/break', function () {
  it('generates break', function () {
    const result = generate('while 1\n  break')
    expect(result).to.contain('while 1')
    expect(result).to.contain('exit')
  })
})
