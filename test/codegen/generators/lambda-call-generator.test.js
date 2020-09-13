const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/lambda', function () {
  it('can call a lambda', function () {
    const result = generate(`
let foo = (a: integer, b: integer): integer ->
  return a + b

let result = foo(1, 2): integer
    `)

    expect(result).to.contain('global __LAMBDA_STACK_INTEGER as integer[-1]')
    expect(result).to.contain('__LAMBDA_STACK_INTEGER.insert(1)')
    expect(result).to.contain('__LAMBDA_STACK_INTEGER.insert(2)')
    expect(result).to.contain('__SSINTERNAL_CALL_LAMBDA(foo)')
    expect(result).to.contain('__LAMBDA_STACK_INTEGER.insert(a + b)')
    expect(result).to.match(/result = _SSINTERNAL\d+/)
  })

  it('can be passed to a function', function () {
    const result = generate(`
def greet_manager(greeter: integer, name: string): string
  return greeter("Mike"): string

let result = greet_manager((name: string): string -> "Hello #{name}!", "Mike")
    `)

    expect(result).to.match(/result = greet_manager\(_SSINTERNAL\d+, _SSINTERNAL\d+\)/)
  })
})
