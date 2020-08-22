const expect = require('chai').expect
const parser = require('../../../lib/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  const ast = parser.parse(sourcecode.trim())
  return new Codegen().generate(ast)
}

describe('codegen/generators/function-call', function () {
  it('calls a function with no arguments', function () {
    const result = generate(`
def greet()
greet()
    `)

    expect(result).to.contain('greet()')
  })

  it('calls a function with an argument', function () {
    const result = generate(`
def greet(name: string)
greet("Mike")
    `)

    expect(result).to.contain('greet("Mike")')
  })

  it('calls a function with many arguments', function () {
    const result = generate(`
def greet(name: string, age: integer)
greet("Mike", 18)
    `)

    expect(result).to.contain('greet("Mike", 18)')
  })

  it.only('calls a function with an inline array', function () {
    const result = generate(`
def greet(people: string[])
greet(["Thomas O'Malley", "Duchess"])
    `)

    console.log(result)

    expect(result).to.contain('greet("Mike", 18)')
  })
})
