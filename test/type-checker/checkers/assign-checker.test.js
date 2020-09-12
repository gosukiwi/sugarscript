const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/assign', function () {
  it('can assign when defining', function () {
    const definitions = check(`
let a: integer
a = 1
    `)

    expect(definitions.variables.a.type.type).to.eq('INTEGER')
  })

  it('cant assign without defining', function () {
    expect(() => check('a = 1')).to.throw()
  })

  it('can define and assign in one go using typehint', function () {
    const definitions = check('let a:integer = 1')
    expect(definitions.variables.a.type.type).to.eq('INTEGER')
  })

  it('can define and assign in one go', function () {
    const definitions = check('let a = 1')
    expect(definitions.variables.a.type.type).to.eq('INTEGER')
  })

  it('checks the type', function () {
    expect(() => check('let a:integer = "asd"')).to.throw()
  })

  it('complains when the field is invalid', function () {
    expect(() => check(`
type Person(name: string, age: integer)
let a: Person
a.name = 12
    `)).to.throw(/Cannot assign INTEGER to STRING/)
  })

  it('checks the field', function () {
    expect(() => check(`
type Person(name: string, age: integer)
let a: Person
a.name = "Mike"
    `)).not.to.throw()
  })

  it('checks many levels', function () {
    expect(() => check(`
type Baz(name: string)
type Bar(baz: Baz)
type Foo(bar: Bar)
let a: Foo
a.bar.baz.name = "Mike"
    `)).not.to.throw()
  })

  it('checks many levels and fails', function () {
    expect(() => check(`
type Baz(name: string)
type Bar(baz: Baz)
type Foo(bar: Bar)
let a: Foo
a.bar.baz.name = 12
    `)).to.throw(/Cannot assign INTEGER to STRING/)
  })

  it('checks arrays and complain', function () {
    expect(() => check(`
let a: integer[]
a[1] = "potato"
    `)).to.throw()
  })

  it('checks arrays and works', function () {
    expect(() => check(`
let a: integer[]
a[1] = 12
    `)).not.to.throw()
  })

  it('checks an array inside a type and complains', function () {
    expect(() => check(`
type Person(likes: string[])
let a: Person
a.likes[1] = 121
    `)).to.throw()
  })

  it('checks a type inside an array and complains', function () {
    expect(() => check(`
type Person(likes: string[])
type People(list: Person[])
let a: People
a.list[1].likes[1] = 121
    `)).to.throw(/Cannot assign INTEGER to STRING/)
  })

  it('cannot reassign a variable to a value of a different type', function () {
    expect(() => check(`
let a: integer
a = 1
a = "foo"
    `)).to.throw(/Cannot assign STRING to INTEGER/)
  })

  it('checks multidimensional array', function () {
    expect(() => check(`
type Person(likes: string[])
type People(list: Person[][])
let a: People
a.list[1, 2].likes[1] = 121
    `)).to.throw(/Cannot assign INTEGER to STRING/)
  })
})
