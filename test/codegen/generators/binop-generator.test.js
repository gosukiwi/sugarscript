const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/binop', function () {
  it('generates binops', function () {
    expect(generate('let a = 1 and 1')).to.contain('a = 1 and 1')
    expect(generate('let a = 1 or 1')).to.contain('a = 1 or 1')
    expect(generate('let a = 1 > 1')).to.contain('a = 1 > 1')
    expect(generate('let a = 1 >= 1')).to.contain('a = 1 >= 1')
    expect(generate('let a = 1 < 1')).to.contain('a = 1 < 1')
    expect(generate('let a = 1 <= 1')).to.contain('a = 1 <= 1')
    expect(generate('let a = 1 == 1')).to.contain('a = 1 = 1')
    expect(generate('let a = 1 != 1')).to.contain('a = 1 <> 1')
    expect(generate('let a = 1 + 1')).to.contain('a = 1 + 1')
    expect(generate('let a = 1 - 1')).to.contain('a = 1 - 1')
    expect(generate('let a = 1 * 1')).to.contain('a = 1 * 1')
    expect(generate('let a = 1 / 1')).to.contain('a = 1 / 1')
    expect(generate('let a = 1 % 1')).to.contain('a = Mod(1, 1)')
  })

  it('generates with parens', function () {
    expect(generate('let a = 1 * (1 + 1)')).to.contain('a = 1 * (1 + 1)')
    expect(generate('let a = (1 * 1) + 1')).to.contain('a = (1 * 1) + 1')
  })
})
