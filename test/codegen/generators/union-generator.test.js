const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/union', function () {
  it('generates an union type', function () {
    const result = generate(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
    `)

    expect(result).to.contain('type Shape')
    expect(result).to.contain('__Circle as Circle')
    expect(result).to.contain('__Square as Square')
    expect(result).to.contain('__type as string')
  })

  it('generates when assigning', function () {
    const result = generate(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
let a: Shape
    `)

    expect(result).to.contain('a as Shape')
  })

  it('can assign shape to square', function () {
    const result = generate(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
let a: Shape
a = { sides: 2 }: Square
    `)

    expect(result).to.match(/a.__Square = __SSINTERNAL\d+/)
    expect(result).to.match(/a.__type = 'Square'/)
  })

  it('can assign shape to circle', function () {
    const result = generate(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
let a: Shape
a = { radius: 2 }: Circle
    `)

    expect(result).to.match(/a.__Circle = __SSINTERNAL\d+/)
    expect(result).to.match(/a.__type = 'Circle'/)
  })

  it.only('works', function () {
    console.log(generate(`
type Circle(area: integer)
type Square(area: integer)
type Triangle(area: integer)
type Polygon(Triangle, Square)
type Shape(Circle, Polygon)

let shape: Shape
let triangle: Polygon = { area: 3 }: Triangle
shape = triangle
let file = OpenToWrite('output.txt', 0)
with shape
  when polygon: Polygon
    with polygon
      when t: Triangle
        WriteString(file, "Area is #{t.area}")
      else
        WriteString(file, "Invalid")
  else
    WriteString(file, "Invalid")
CloseFile(file)
    `))
  })
})
