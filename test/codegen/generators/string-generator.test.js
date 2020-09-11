const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/string', function () {
  it('can interpolate simple', function () {
    const result = generate('let a = "foo #{2 + 2}!"')
    expect(result).to.include('a = "foo " + Str(2 + 2) + "!"')
  })

  it('can interpolate using variables', function () {
    const result = generate('let a = 1\nlet b = "foo #{a + 2}!"')
    expect(result).to.include('b = "foo " + Str(a + 2) + "!"')
  })

  it('complains when interpolating invalid variables', function () {
    expect(() => generate('let a = "foo #{b + 2}!"')).to.throw(/Could not find/)
  })

  it('complains when interpolating UDTs', function () {
    expect(() => generate('type Person(name: string)\nlet person: Person\nlet a = "foo #{person}!"')).to.throw(/Can only interpolate/)
  })
})
