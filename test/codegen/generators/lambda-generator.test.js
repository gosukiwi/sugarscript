const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/lambda', function () {
  it('generates a void lambda', function () {
    const result = generate(`
type Person(name: string)
let func = (a: integer, b: *Person): integer ->
  return a
    `)

    expect(result).to.match(/function __SSINTERNAL_LAMBDA\d+\(\)/)
    expect(result).to.match(/__LAMBDA_STACK_INTEGER.insert\(a\)/)
    expect(result).to.match(/func = \d+/)
  })
})
