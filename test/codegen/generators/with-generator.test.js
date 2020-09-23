const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/with', function () {
  it('saves the definition', function () {
    const result = generate(`
type Circle(radius: integer)
type Square(sides: integer)
type Shape(Circle, Square)
let shape: Shape(Circle, Square)
shape = { sides: 2 }: Square
let size: integer

with shape
  when square: Square
    size = square.sides
  when circle: Circle
    size = circle.radius

Log("#{size}")
    `)

    expect(result).to.match(/shape.__Square = __SSINTERNAL\d+/)
    expect(result).to.match(/shape.__type = 'Square'/)
    expect(result).to.match(/if __SSINTERNAL\d+\.__type = 'Square'/)
    expect(result).to.match(/if __SSINTERNAL\d+\.__type = 'Circle'/)
  })

//   it.only('can prepend', function () {
//     const result = generate(`
// type Circle(radius: integer)
// type Square(sides: integer)
// type Shape(Circle, Square)
//
// def area(shape: Shape(Circle, Square)): integer
//   with shape
//     when square: Square
//       return square.sides * square.sides
//     when circle: Circle
//       return 3.14 * circle.radius * circle.radius
//
// let shape: Shape(Circle, Square)
// shape = { sides: 2 }: Square
// let file = OpenToWrite('output.txt', 0)
// WriteString(file, "Area is #{area(shape)}")
// CloseFile(file)
//     `)
//
//     console.log(result)
//   })
})
