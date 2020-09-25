const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/if', function () {
  it('generates a single if', function () {
    const result = generate('if 1\n  let a = 1')
    expect(result).to.contain('if 1')
    expect(result).to.contain('a as integer')
    expect(result).to.contain('a = 1')
    expect(result).to.contain('endif')
  })

  it('generates a single if (one-liner)', function () {
    const result = generate('if 1 then let a = 1')
    expect(result).to.contain('if 1')
    expect(result).to.contain('a as integer')
    expect(result).to.contain('a = 1')
    expect(result).to.contain('endif')
  })

  it('generates an if-else', function () {
    const result = generate(`
let a:integer
if 1
  a = 1
else
  a = 2
    `)

    expect(result).to.contain('a as integer')
    expect(result).to.contain('if 1')
    expect(result).to.contain('a = 1')
    expect(result).to.contain('else')
    expect(result).to.contain('a = 2')
    expect(result).to.contain('endif')
  })

  it('generates an if-elif', function () {
    const result = generate(`
let a:integer
if 1
  a = 1
elif 2
  a = 2
    `)

    expect(result).to.contain('a as integer')
    expect(result).to.contain('if 1')
    expect(result).to.contain('a = 1')
    expect(result).to.contain('elseif 2')
    expect(result).to.contain('a = 2')
    expect(result).to.contain('endif')
  })

  it('generates an if-elif-else', function () {
    const result = generate(`
let a:integer
if 1
  a = 1
elif 2
  a = 2
else
  a = 3
    `)

    expect(result).to.contain('a as integer')
    expect(result).to.contain('if 1')
    expect(result).to.contain('a = 1')
    expect(result).to.contain('elseif 2')
    expect(result).to.contain('a = 2')
    expect(result).to.contain('else')
    expect(result).to.contain('a = 3')
    expect(result).to.contain('endif')
  })

  it('generates a nested if', function () {
    const result = generate(`
let a:integer
if 1
  if 1
    a = 1
  a = 2
    `)

    expect(result).to.contain('a as integer')
    expect(result).to.contain('if 1')
    expect(result).to.contain('if 1')
    expect(result).to.contain('a = 1')
    expect(result).to.contain('endif')
    expect(result).to.contain('a = 2')
    expect(result).to.contain('endif')
  })

  it('adds a line comment', function () {
    const result = generate(`
let a = 1
let b = 2
if a == 1
  let c = 1
    `)

    expect(result).to.contain('// in-memory://, line 3')
  })
})
