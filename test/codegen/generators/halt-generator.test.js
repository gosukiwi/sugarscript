const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/halt', function () {
  it('works', function () {
    const result = generate('halt "oops, something blew up!"')
    expect(result).to.contain("Message('oops, something blew up!')")
    expect(result).to.contain('end')
  })

  it('works with a concatenated string', function () {
    const result = generate('let a = 1\nhalt "#{1}"')
    expect(result).to.match(/Message\('' \+ __SSINTERNAL\d+ \+ ''\)/)
    expect(result).to.contain('end')
  })
})
