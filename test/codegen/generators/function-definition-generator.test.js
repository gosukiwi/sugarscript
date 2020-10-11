const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/function-definition', function () {
  it('works with a function with no parameters', function () {
    const result = generate(`
def greet()
  let a = 1
    `)

    expect(result).to.contain('function greet()')
  })

  it('works with a simple function', function () {
    const result = generate(`
type Person(name: string)
def greet(name: string, person: *Person)
  let a = 1
    `)

    expect(result).to.contain('function greet(name as string, person ref as Person)')
    expect(result).to.contain('endfunction')
  })

  it('works with an array and a ref parameter', function () {
    const result = generate(`
def greet(person: *integer[])
  let a = 1
    `)

    expect(result).to.contain('function greet(person ref as integer[])')
    expect(result).to.contain('endfunction')
  })

  it('works with an array parameter', function () {
    const result = generate(`
def greet(person:integer[])
  let a = 1
    `)

    expect(result).to.contain('function greet(person as integer[])')
  })

  it('can return a primitive value', function () {
    const result = generate(`
def greet(): integer
  return 2
    `)

    expect(result).to.match(/__SSINTERNAL\d+ = 2/)
    expect(result).to.match(/exitfunction __SSINTERNAL\d+/)
    expect(result).to.contain('endfunction 0')
  })

  it('can return a UDT', function () {
    const result = generate(`
type Person(name: string)
def greet(person: Person): Person
  return person
    `)

    expect(result).to.match(/__SSINTERNAL\d+ = person/)
    expect(result).to.match(/exitfunction __SSINTERNAL\d+/)
    expect(result).to.contain('SS_INTERNAL_UNREACHABLE_RETURN_VALUE as Person')
    expect(result).to.contain('endfunction SS_INTERNAL_UNREACHABLE_RETURN_VALUE')
  })

  it('can return an array', function () {
    const result = generate(`
type Person(name: string)
def greet(person: Person[]): Person[]
  return person
    `)

    expect(result).to.match(/__SSINTERNAL\d+ = person/)
    expect(result).to.match(/exitfunction __SSINTERNAL\d+/)
    expect(result).to.contain('SS_INTERNAL_UNREACHABLE_RETURN_VALUE as Person[-1]')
    expect(result).to.contain('endfunction SS_INTERNAL_UNREACHABLE_RETURN_VALUE')
  })

  it('can define default parameters', function () {
    const result = generate(`
def greet(name: string = "Potatomike"): string
  return name
greet()
    `)

    expect(result).to.match(/greet\('Potatomike'\)/)
  })

  it('can use an array default parameters', function () {
    const result = generate(`
def greet(name: integer[] = [1, 2, 3]): string
  return "hi"
greet()
    `)

    expect(result).to.match(/__SSINTERNAL\d+ as integer\[-1\]/)
    expect(result).to.match(/__SSINTERNAL\d+ = __SSINTERNAL\d+/)
    expect(result).to.match(/greet\(__SSINTERNAL\d+\)/)
  })

  it('can mix non-defaults and defaults', function () {
    const result = generate(`
def greet(name: string, age: integer = 18): string
  return "hi"
greet("Mike")
    `)

    expect(result).to.match(/greet\('Mike', 18\)/)
  })

  it('adds a line comment', function () {
    const result = generate(`
let a = 1
let b = 2
def foo()
  let a = 1
    `)

    expect(result).to.contain('// in-memory://, line 3')
  })
})
