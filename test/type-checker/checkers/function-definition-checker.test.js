const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/function', function () {
  it('checks a function definition', function () {
    const definitions = check(`
type Person(name: string)
def greet(person: Person[]): integer
  return 2
    `)

    expect(definitions.functions.greet.type.type).to.eq('INTEGER')
    expect(definitions.functions.greet.functionName).to.eq('greet')
    expect(definitions.functions.greet.definitions.parameters.person.type.type).to.eq('ARRAY')
    expect(definitions.functions.greet.definitions.parameters.person.type.value.type).to.eq('UDT')
    expect(definitions.functions.greet.definitions.parameters.person.type.value.value).to.eq('Person')
    expect(definitions.functions.greet.definitions.parameters.person.type.dimensions).to.eq(1)
    expect(definitions.functions.greet.definitions.returns[0].type.type).to.eq('INTEGER')
  })

  it('checks a nested assignment', function () {
    const definitions = check(`
def greet(person: integer[])
  let a = 2
    `)

    expect(definitions.functions.greet.type.type).to.eq('VOID')
    expect(definitions.functions.greet.functionName).to.eq('greet')
    expect(definitions.functions.greet.definitions.parameters.person.type.type).to.eq('ARRAY')
    expect(definitions.functions.greet.definitions.parameters.person.type.value.type).to.eq('INTEGER')
    expect(definitions.functions.greet.definitions.parameters.person.type.dimensions).to.eq(1)
    expect(definitions.functions.greet.definitions.variables.a.type.type).to.eq('INTEGER')
  })

  it('checks a nested function call', function () {
    const definitions = check(`
def foo()
  let a = 1

def greet(person: integer[])
  foo()
    `)

    expect(definitions.functions.greet.type.type).to.eq('VOID')
    expect(definitions.functions.greet.functionName).to.eq('greet')
    expect(definitions.functions.greet.definitions.parameters.person.type.type).to.eq('ARRAY')
    expect(definitions.functions.greet.definitions.parameters.person.type.value.type).to.eq('INTEGER')
    expect(definitions.functions.greet.definitions.parameters.person.type.dimensions).to.eq(1)
  })

  it('complains if it returns an invalid type', function () {
    expect(() => {
      check(`
type Person(name: string)
def greet(person: Person): integer
  return person
        `)
    }).to.throw(/Function was defined as 'INTEGER'/)
  })

  it('complains if it returns an invalid UDT', function () {
    expect(() => {
      check(`
type Person(name: string)
type Cat(name: string)
def greet(person: Person): Cat
  return person
        `)
    }).to.throw(/Function was defined as '<UDT: Cat>'/)
  })

  it('returns a UDT', function () {
    expect(() => {
      check(`
def greet(person: Person): Person
  return person
        `)
    }).not.to.throw(/Function was defined as 'INTEGER'/)
  })

  it('complains if the return type is nonexistant', function () {
    expect(() => {
      check(`
def greet(person: Person): Person
  return person
        `)
    }).to.throw(/Could not find type/)
  })

  it('complains if the a param type is nonexistant', function () {
    expect(() => {
      check(`
def greet(person: Person)
  let a = 1
        `)
    }).to.throw(/Could not find type/)
  })
})