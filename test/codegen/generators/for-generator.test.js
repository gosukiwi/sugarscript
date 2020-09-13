const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/for', function () {
  it('works with a short for', function () {
    const result = generate(`
for i = 1 to 10
  let a = i
    `)

    expect(result).to.contain('for i = 1 to 10 step 1')
    expect(result).to.contain('a as integer')
    expect(result).to.contain('a = i')
    expect(result).to.contain('next i')
  })

  it('works with a log for', function () {
    const result = generate(`
for i = 1 to 10 step 2
  let a = i
    `)

    expect(result).to.contain('for i = 1 to 10 step 2')
    expect(result).to.contain('a as integer')
    expect(result).to.contain('a = i')
    expect(result).to.contain('next i')
  })
})