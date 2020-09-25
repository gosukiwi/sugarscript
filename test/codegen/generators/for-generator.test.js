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

  it('works with a short for (one-line)', function () {
    const result = generate(`
for i = 1 to 10 do let a = i
    `)

    expect(result).to.contain('for i = 1 to 10 step 1')
    expect(result).to.contain('a as integer')
    expect(result).to.contain('a = i')
    expect(result).to.contain('next i')
  })

  it('works with a long for', function () {
    const result = generate(`
for i = 1 to 10 step 2
  let a = i
    `)

    expect(result).to.contain('for i = 1 to 10 step 2')
    expect(result).to.contain('a as integer')
    expect(result).to.contain('a = i')
    expect(result).to.contain('next i')
  })

  it('works with a long for (one-line)', function () {
    const result = generate(`
for i = 1 to 10 step 2 do let a = i
    `)

    expect(result).to.contain('for i = 1 to 10 step 2')
    expect(result).to.contain('a as integer')
    expect(result).to.contain('a = i')
    expect(result).to.contain('next i')
  })

  it('can use an expresion in "to", "from" and "step"', function () {
    const result = generate(`
let start = 1
let limit = 10
let by = 2
for i = start to limit step by
  let a = i
    `)

    expect(result).to.contain('for i = start to limit step by')
  })

  it('adds a line comment', function () {
    const result = generate(`
let start = 1
let limit = 10
let by = 2
for i = start to limit step by
  let a = i
    `)

    expect(result).to.contain('// in-memory://, line 4')
  })
})
