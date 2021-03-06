const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/foreach', function () {
  it('works with an inline array', function () {
    const result = generate(`
for i in [1, 2, 3]
  let a = i
    `)

    expect(result).to.match(/__SSINTERNAL\d+\[__SSINTERNAL\d+\]/)
    expect(result).to.match(/SSINTERNAL\d+ as integer\[-1\]/)
    expect(result).to.match(/for.+= 0 to .+\.length/)
    expect(result).to.match(/i as integer/)
    expect(result).to.match(/a = i/)
  })

  it('works with an inline array (one-line)', function () {
    const result = generate(`
for i in [1, 2, 3] do let a = i
    `)

    expect(result).to.match(/__SSINTERNAL\d+\[__SSINTERNAL\d+\]/)
    expect(result).to.match(/SSINTERNAL\d+ as integer\[-1\]/)
    expect(result).to.match(/for.+= 0 to .+\.length/)
    expect(result).to.match(/i as integer/)
    expect(result).to.match(/a = i/)
  })

  it('works with a nested array', function () {
    const result = generate(`
for i in [[1, 2], [3]]
  let a = i
    `)

    expect(result).to.match(/i as integer\[-1\]/)
  })

  it('adds a line comment', function () {
    const result = generate(`
let start = 1
let limit = 10
let by = 2
for i in [[1, 2], [3]]
  let a = i
    `)

    expect(result).to.contain('// in-memory://, line 4')
  })
})
