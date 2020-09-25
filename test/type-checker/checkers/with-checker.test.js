const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/with', function () {
  it('saves the definition', function () {
    expect(() => check(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
let shape: Shape

with shape
  when square: Square
    square.sides = 2
  when circle: Circle
    circle.radius = 2
  else
    let a = 1
    `)).not.to.throw()
  })

  it('complains when field is invalid', function () {
    expect(() => check(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
let shape: Shape

with shape
  when square: Square
    square.foo = 2
  when circle: Circle
    circle.radius = 2
  else
    let a = 1
    `)).to.throw("Could not find field 'foo' for type 'Square'")
  })

  it('complains when clause variable is already taken', function () {
    expect(() => check(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
let shape: Shape

with shape
  when shape: Square
    shape.sides = 2
  when circle: Circle
    circle.radius = 2
  else
    let a = 1
    `)).to.throw("Variable 'shape' already exists")
  })

  it('does not need to cover all types', function () {
    expect(() => check(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
let shape: Shape

with shape
  when circle: Circle
    circle.radius = 2
  else
    let a = 1
    `)).not.to.throw()
  })

  it('complains when it tries to check an invalid type', function () {
    expect(() => check(`
type Foo(name: string)
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
let shape: Shape

with shape
  when foo: Foo
    foo.name = "asd"
  when circle: Circle
    circle.radius = 2
  else
    let a = 1
    `)).to.throw(/does not include type 'Foo'/)
  })

  it('complains when it tries to check a non-existant type', function () {
    expect(() => check(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
let shape: Shape

with shape
  when foo: Foo
    foo.name = "asd"
  when circle: Circle
    circle.radius = 2
  else
    let a = 1
    `)).to.throw(/does not include type 'Foo'/)
  })

  it('can access a variable', function () {
    expect(() => check(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)

let shape: Shape
shape = { sides: 2 }: Square
let size: integer

with shape
  when square: Square
    size = square.sides
  when circle: Circle
    size = circle.radius
  else
    size = 0
    `)).not.to.throw()
  })

  it('complains when type is non-udt', function () {
    expect(() => check(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
let shape: Shape

with shape
  when square: integer
    square.foo = 2
  when circle: Circle
    circle.radius = 2
  else
    let a = 1
    `)).to.throw(/Only UDT/)
  })

  it('validates when in multiple clause', function () {
    expect(() => check(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
type Geom(shape: Shape(Circle, Square))

let g: Geom
let a: integer
with g.shape
  when shape: (Circle, Square)
    a = shape.sides
  else
    a = 3
    `)).to.throw("Could not find field 'sides' for type 'Circle'")
  })
})
