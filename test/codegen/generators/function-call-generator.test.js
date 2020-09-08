const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/function-call', function () {
  it('calls a function with no arguments', function () {
    const result = generate(`
def greet()
  let a = 1
greet()
    `)

    expect(result).to.contain('greet()')
  })

  it('can define the function afterwards', function () {
    const result = generate(`
greet()
def greet()
  let a = 1
    `)

    expect(result).to.contain('greet()')
  })

  it('calls a function with an argument', function () {
    const result = generate(`
def greet(name: string)
  let a = 1
greet("Mike")
    `)

    expect(result).to.contain('greet("Mike")')
  })

  it('calls a function with many arguments', function () {
    const result = generate(`
def greet(name: string, age: integer)
  let a = 1
greet("Mike", 18)
    `)

    expect(result).to.contain('greet("Mike", 18)')
  })

  it('calls a function with an inline array', function () {
    const result = generate(`
def greet(people: string[])
  let a = 1
greet(["Thomas O'Malley", "Duchess"])
    `)

    expect(result).to.match(/_SSINTERNAL\d+\.insert\("Thomas O'Malley"\)/)
    expect(result).to.match(/_SSINTERNAL\d+\.insert\("Duchess"\)/)
    expect(result).to.match(/greet\(_SSINTERNAL\d+\)/)
  })
})
