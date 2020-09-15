const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/let', function () {
  it('cannot define twice', function () {
    expect(() => check('let a: integer\nlet a: string')).to.throw()
  })

  it('works without a value', function () {
    const definitions = check('let a: integer')
    expect(definitions.variables.a.type.is('INTEGER')).to.eq(true)
  })

  it('works with a value', function () {
    const definitions = check('let a: integer = 1')
    expect(definitions.variables.a.type.is('INTEGER')).to.eq(true)
  })

  it('works with a value without specifying the type', function () {
    const definitions = check('let a = 1')
    expect(definitions.variables.a.type.is('INTEGER')).to.eq(true)
  })

  it('can define a type', function () {
    const definitions = check('type tPerson(name: string)\nlet person: tPerson')
    expect(definitions.variables.person.type.is('UDT')).to.eq(true)
    expect(definitions.variables.person.type.value).to.eq('tPerson')
  })

  it('can define an array', function () {
    const definitions = check('type tPerson(name: string)\nlet person: tPerson[]')
    expect(definitions.variables.person.type.is('ARRAY')).to.eq(true)
    expect(definitions.variables.person.type.value.type).to.eq('UDT')
  })

  it('checks array types', function () {
    expect(() => check('let a: string[] = [1, 2, 3]')).to.throw()
  })

  it('works with inline arrays', function () {
    const definitions = check('let a: integer[] = [1, 2, 3]')
    expect(definitions.variables.a.type.is('ARRAY')).to.eq(true)
  })

  it('complains if the type is not defined', function () {
    expect(() => check('let person: tPerson')).to.throw(/Could not find type/)
  })

  it('complains if the array type is not defined', function () {
    expect(() => check('let person: tPerson[]')).to.throw(/Could not find type/)
  })

  it('cannot override global inside a function', function () {
    expect(() => check(`
let global a = 1
def foo()
  let global a = 1
    `)).to.throw(/Already defined "a" in global scope/)
  })

  it('cannot override defined inside function', function () {
    expect(() => check(`
def foo()
  let global a = 1
let global a = 1
    `)).to.throw(/Already defined "a" in global scope/)
  })

  it('cannot override non-global', function () {
    expect(() => check(`
let a = 1
def foo()
  let global a = 1
    `)).to.throw(/Already defined "a" in global scope/)
  })

  it('cannot guess void', function () {
    expect(() => check(`
def foo()
  let a = 1
let a = foo()
    `)).to.throw('Cannot assign to void')
  })

  it('allows assigning ints to floats', function () {
    expect(() => check(`
let a: float
a = 1
    `)).not.to.throw()
  })
})
