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

    expect(result).to.match(/_SSINTERNAL\d+ as string = "Mike"/)
    expect(result).to.match(/greet\(_SSINTERNAL\d+\)/)
  })

  it('calls a function with many arguments', function () {
    const result = generate(`
def greet(name: string, age: integer)
  let a = 1
greet("Mike", 18)
    `)

    expect(result).to.match(/_SSINTERNAL\d+ as string = "Mike"/)
    expect(result).to.match(/_SSINTERNAL\d+ as integer = 18/)
    expect(result).to.match(/greet\(_SSINTERNAL\d+, _SSINTERNAL\d+\)/)
  })

  it('calls a function with a default inline array', function () {
    const result = generate(`
def greet(people: string[])
  let a = 1
greet(["Thomas O'Malley", "Duchess"])
    `)

    expect(result).to.match(/_SSINTERNAL\d+\.insert\("Thomas O'Malley"\)/)
    expect(result).to.match(/_SSINTERNAL\d+\.insert\("Duchess"\)/)
    expect(result).to.match(/greet\(_SSINTERNAL\d+\)/)
  })

  it('calls a function with many default values', function () {
    const result = generate(`
def greet(name: string = "Mike", age: integer = 18, foo: string = "bar")
  let a = 1
greet()
    `)

    expect(result).to.match(/_SSINTERNAL\d+ as string = "Mike"/)
    expect(result).to.match(/_SSINTERNAL\d+ as integer = 18/)
    expect(result).to.match(/_SSINTERNAL\d+ as string = "bar"/)
    expect(result).to.match(/greet\(_SSINTERNAL\d+, _SSINTERNAL\d+, _SSINTERNAL\d+\)/)
  })

  it('calls a function with many default parameters setting one', function () {
    const result = generate(`
def greet(name: string = "Mike", age: integer = 18, foo: string = "bar")
  let a = 1
greet("fombo")
    `)

    expect(result).to.match(/_SSINTERNAL\d+ as string = "fombo"/)
    expect(result).to.match(/_SSINTERNAL\d+ as integer = 18/)
    expect(result).to.match(/_SSINTERNAL\d+ as string = "bar"/)
    expect(result).to.match(/greet\(_SSINTERNAL\d+, _SSINTERNAL\d+, _SSINTERNAL\d+\)/)
  })

  it('calls a function with overriding all default parameters', function () {
    const result = generate(`
def greet(name: string = "Mike", age: integer = 18, foo: string = "bar")
  let a = 1
greet("fombo", 22, "potato")
    `)

    expect(result).to.match(/_SSINTERNAL\d+ as string = "fombo"/)
    expect(result).to.match(/_SSINTERNAL\d+ as integer = 22/)
    expect(result).to.match(/_SSINTERNAL\d+ as string = "potato"/)
    expect(result).to.match(/greet\(_SSINTERNAL\d+, _SSINTERNAL\d+, _SSINTERNAL\d+\)/)
  })

  it('calls a function with a non-default parameter many default parameters', function () {
    const result = generate(`
def greet(gender: string, name: string = "Mike", age: integer = 18, foo: string = "bar")
  let a = 1
greet("fombo")
    `)

    expect(result).to.match(/_SSINTERNAL\d+ as string = "fombo"/)
    expect(result).to.match(/_SSINTERNAL\d+ as string = "Mike"/)
    expect(result).to.match(/_SSINTERNAL\d+ as integer = 18/)
    expect(result).to.match(/_SSINTERNAL\d+ as string = "bar"/)
    expect(result).to.match(/greet\(_SSINTERNAL\d+, _SSINTERNAL\d+, _SSINTERNAL\d+, _SSINTERNAL\d+\)/)
  })
})
