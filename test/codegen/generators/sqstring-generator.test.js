const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/sqstring', function () {
  it('uses single quotes', function () {
    const result = generate("let a = 'foo!'")
    expect(result).to.include("a = 'foo!'")
  })

  it('escapes single quotes', function () {
    const result = generate("let a = 'fo\\'o!'")
    console.log(result)
    expect(result).to.include("a = 'fo\\'o!'")
  })
})
