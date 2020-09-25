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

  it('complains if the a param name is repeated', function () {
    expect(() => {
      check(`
def foo(bar: string, bar: integer)
  let a = 1
        `)
    }).to.throw(/Parameter 'bar' already specified/)
  })

  it('cannot define a function with the same name', function () {
    expect(() => {
      check(`
def foo()
  let a = 1

def foo()
  let a = 1
        `)
    }).to.throw(/Function 'foo' already exists/)
  })

  it('checks default arguments', function () {
    expect(() => {
      check(`
def foo(a: integer = "asd")
  let b = 1
        `)
    }).to.throw(/defined as INTEGER.+cannot.+STRING/)
  })

  it('complains if it tries to use a non-default parameter after a default one', function () {
    expect(() => {
      check(`
def greet(name: string = "Mike", age: integer)
  let a = 1
    `) }).to.throw(/provide a default value for 'age'/)
  })

  it('can return empty', function () {
    expect(() => {
      check(`
def foo()
  return
        `)
    }).not.to.throw()
  })

  it('cannot return empty if it should return something', function () {
    expect(() => {
      check(`
def foo(): string
  return
        `)
    }).to.throw(/cannot return 'VOID'/)
  })

  it('can return inside a while', function () {
    expect(() => {
      check(`
def foo()
  while 1
    return
        `)
    }).not.to.throw()
  })

  it('cannot return outside a function', function () {
    expect(() => check('return')).to.throw(/can only be called inside functions/)
  })

  it('allows returning int instead of float', function () {
    expect(() => check(`
def foo(name: float): float
  return 1
    `)).not.to.throw()
  })

  it('can call a function in a case-insensitive way', function () {
    expect(() => check(`
def foo(name: float): float
  return 1
Foo(123)
    `)).not.to.throw()
  })

  it('can access a parameter in a case-insensitive way', function () {
    expect(() => check(`
def foo(name: float): float
  return NAME
    `)).not.to.throw()
  })

  it('cannot re-define a primitive function', function () {
    expect(() => {
      check(`
def array_find(): integer
  return 1
        `)
    }).to.throw(/already exists/)
  })

  it('cannot re-define a built-in function', function () {
    expect(() => {
      check(`
def print(): integer
  return 1
        `)
    }).to.throw(/already exists/)
  })
})
