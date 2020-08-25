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
def greet(name:string, person:ref:Person)
  let a = 1
    `)

    expect(result).to.contain('function greet(name as string, person ref as Person)')
    expect(result).to.contain('endfunction')
  })

  it('works with an array and a ref parameter', function () {
    const result = generate(`
def greet(person:ref:Person[][])
  let a = 1
    `)

    expect(result).to.contain('function greet(person ref as Person[][])')
    expect(result).to.contain('endfunction')
  })

  it('works with an array parameter', function () {
    const result = generate(`
def greet(person:Person[])
  let a = 1
    `)

    expect(result).to.contain('function greet(person as Person[])')
  })

  it('can return a primitive value', function () {
    const result = generate(`
def greet(): integer
  return 2
    `)

    expect(result).to.contain('exitfunction 2')
    expect(result).to.contain('endfunction 0')
  })

  it('can return a UDT', function () {
    const result = generate(`
def greet(person: Person): Person
  return person
    `)

    expect(result).to.contain('exitfunction person')
    expect(result).to.contain('SS_INTERNAL_UNREACHABLE_RETURN_VALUE as Person')
    expect(result).to.contain('endfunction SS_INTERNAL_UNREACHABLE_RETURN_VALUE')
  })

  it('can return an array', function () {
    const result = generate(`
def greet(person: Person[]): Person[]
  return person
    `)

    expect(result).to.contain('exitfunction person')
    expect(result).to.contain('SS_INTERNAL_UNREACHABLE_RETURN_VALUE as Person[-1]')
    expect(result).to.contain('endfunction SS_INTERNAL_UNREACHABLE_RETURN_VALUE')
  })
})
