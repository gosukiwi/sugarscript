const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/union', function () {
  it('saves the definition', function () {
    const definitions = check(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
    `)

    const union = definitions.getType('shape')
    expect(union.name).to.eq('Shape')
    expect(union.udts[0]).to.eq('Circle')
    expect(union.udts[1]).to.eq('Square')
  })

  it('returns an union type', function () {
    const definitions = check(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
let a: Shape
    `)

    expect(definitions.getVariable('a').type.is('UDT')).to.eq(true)
  })

  it('complains if cant find udts', function () {
    expect(() => check(`
type Square(sides: integer)
type Shape(Circle, Square)
let a: Shape
    `)).to.throw(/Could not find UDT 'Circle'/)
  })

  it('can assign shape to square', function () {
    const definitions = check(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
let a: Shape
a = { sides: 2 }: Square
    `)

    expect(definitions.getVariable('a').type.is('UDT')).to.eq(true)
  })

  it('can assign shape to circle', function () {
    const definitions = check(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
let a: Shape
a = { radius: 2 }: Circle
    `)

    expect(definitions.getVariable('a').type.is('UDT')).to.eq(true)
  })

  it('cannot assign to something not included', function () {
    expect(() => check(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Square)
let a: Shape
a = { radius: 2 }: Circle
    `)).to.throw(/Cannot assign/)
  })

  it('can re-assign shape', function () {
    const definitions = check(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
let a: Shape
a = { radius: 2 }: Circle
a = { sides: 2 }: Square
    `)

    expect(definitions.getVariable('a').type.is('UDT')).to.eq(true)
  })

  it('cannot access using query', function () {
    expect(() => check(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
let a: Shape
a = { radius: 2 }: Circle
let b = a.foo
    `)).to.throw(/Could not find field 'foo'/)
  })

  it('can be nested in a type', function () {
    const definitions = check(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
type Geom(shape: Shape)

let g: Geom
let shape = g.shape
    `)

    expect(definitions.getVariable('shape').type.is('UDT')).to.eq(true)
  })

  it('can have unions inside', function () {
    const definitions = check(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
type AnotherShape(Shape, Square)

let another: AnotherShape
let circle: Circle
with another
  when s: Shape
    with s
      when c: Circle
        circle = c
      else
        print("yo, wasup")
  else
    print("yo, wasup")
    `)

    expect(definitions.getVariable('another').type.is('UDT')).to.eq(true)
    expect(definitions.getVariable('circle').type.is('UDT')).to.eq(true)
  })
})
