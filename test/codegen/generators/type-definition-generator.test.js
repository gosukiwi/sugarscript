const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/type-definition', function () {
  it('defines simple', function () {
    const result = generate('type Person(name: string, age: integer)')
    expect(result).to.contain('type Person')
    expect(result).to.contain('name as string')
    expect(result).to.contain('age as integer')
    expect(result).to.contain('endtype')
  })

  it('defines with array', function () {
    const result = generate('type Person(name: string[])')
    expect(result).to.contain('type Person')
    expect(result).to.contain('name as string[-1]')
    expect(result).to.contain('endtype')
  })
})
