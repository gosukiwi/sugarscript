const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/inline-array', function () {
  it('defines arrays in the correct order', function () {
    const result = generate(`
let a = [1]
let b = [2]
let c = [a, b]
    `)

    expect(result.indexOf('a as integer[-1]')).to.be.below(result.indexOf('b as integer[-1]'))
    expect(result.indexOf('b as integer[-1]')).to.be.below(result.indexOf('c as integer[-1, -1]'))
  })
})
