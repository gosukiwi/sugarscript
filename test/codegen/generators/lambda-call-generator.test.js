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

let result = ->(foo, 1, 2): integer
    `)

    expect(result).to.contain('global __LAMBDA_STACK_INTEGER as integer[-1]')
    expect(result).to.contain('__LAMBDA_STACK_INTEGER.insert(1)')
    expect(result).to.contain('__LAMBDA_STACK_INTEGER.insert(2)')
    expect(result).to.contain('__SSINTERNAL_CALL_LAMBDA(foo)')
    expect(result).to.contain('__LAMBDA_STACK_INTEGER.insert(a + b)')
    expect(result).to.match(/result = __SSINTERNAL\d+/)
  })

  it('can be passed to a function', function () {
    const result = generate(`
def greet_manager(greeter: integer, name: string): string
  return call(greeter, "Mike"): string

let result = greet_manager((name: string): string -> "Hello #{name}!", "Mike")
    `)

    expect(result).to.match(/result = greet_manager\(__SSINTERNAL\d+, __SSINTERNAL\d+\)/)
  })

  it('works with default arguments', function () {
    const result = generate(`
let greeter = (name: string = "Fede"): string -> "Hello, #{name}!"
let result = call(greeter): string
    `)

    expect(result).to.contain('if __LAMBDA_STACK_STRING.length = -1')
    expect(result).to.contain("name = 'Fede'")
  })

  it('can call a lambda in a type', function () {
    const result = generate(`
type Person(greet: integer)
let p: Person
p.greet = (): integer -> 1
->(p.greet): integer
    `)

    expect(result).to.contain('__SSINTERNAL_CALL_LAMBDA(p.greet)')
  })
})
