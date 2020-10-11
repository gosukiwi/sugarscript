const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/function-call', function () {
  it('calls a simple function', function () {
    expect(() => check(`
def foo()
  let a = 1
foo()
    `)).not.to.throw()
  })

  it('knows the type', function () {
    expect(() => check(`
def foo(): integer
  return 1
foo()
    `)).not.to.throw()
  })

  it('validates parameters when none is passed', function () {
    expect(() => {
      check(`
def foo(name: integer): integer
  return 1
foo()
      `)
    }).to.throw(/expects to receive an argument/)
  })

  it('validates parameters when wrong type', function () {
    expect(() => {
      check(`
def foo(name: integer): integer
  return 1
foo("foo")
      `)
    }).to.throw(/expects to receive an argument/)
  })

  it('allows passing int instead of float', function () {
    expect(() => check(`
def foo(name: float): integer
  return 1
foo(1)
    `)).not.to.throw()
  })

  it('can use built-in functions in a case-insensitive way', function () {
    expect(check('let a = CreateSprite(1)').getVariable('a').type.is('INTEGER')).to.eq(true)
    expect(check('let a = createsprite(1)').getVariable('a').type.is('INTEGER')).to.eq(true)
    expect(() => check('let a = CREATESPRITE(1, 1)')).to.throw(/Cannot assign to void/)
    expect(() => check('let a = CreateSprite("foo")')).to.throw(/Invalid arguments/)
  })

  it('can use integers instead of floats', function () {
    expect(() => check('ceil(2)')).not.to.throw()
  })

  describe('primitives', function () {
    it('complains for UDTs', function () {
      expect(() => check(`
type Person(name: string)
let p: Person
let index = array_find([p], 1)
      `)).to.throw(/Expected STRING as second argument/)
    })

    it('works for UDTs', function () {
      expect(() => check(`
type Person(name: string)
let p: Person
let index = array_find([p], 'mike')
  `)).not.to.throw()
    })

    it('complains about the number of arguments', function () {
      expect(() => check('let a = array_find([1, 2, 3])')).to.throw(/Invalid number of arguments/)
    })

    it('throws cannot be called as statement', function () {
      expect(() => check('array_find([1, 2, 3])')).to.throw(/cannot be called as statement/)
    })
  })
})
