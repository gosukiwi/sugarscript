const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/list-comprehension', function () {
  it('works with a full comprehension', function () {
    const result = generate('let numbers = (ceil(i) for i in [1, 2, 3, 4] when i % 2 == 0)')

    expect(result).to.match(/for __SSINTERNAL\d+ = 0 to __SSINTERNAL\d+\.length/)
    expect(result).to.contain('if Mod(i, 2) = 0')
    expect(result).to.match(/__SSINTERNAL\d+\.insert\(ceil\(i\)\)/)
  })

  it('works with a short comprehension', function () {
    const result = generate('let numbers = (ceil(i) for i in [1, 2, 3, 4])')

    expect(result).to.match(/for __SSINTERNAL\d+ = 0 to __SSINTERNAL\d+\.length/)
    expect(result).not.to.contain('if')
    expect(result).to.match(/__SSINTERNAL\d+\.insert\(ceil\(i\)\)/)
  })
})
