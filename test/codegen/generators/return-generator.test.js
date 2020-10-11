const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/return', function () {
  it('compiles using the correct order', function () {
    const result = generate(`
type Vector(x: float, y: float)
type Ball(radius: float, position: Vector, direction: Vector, speed: float)

def ball_create(): Ball
  let position = { x: 4, y: 10 }: Vector
  let direction = { x: 1, y: 1 }: Vector
  return { radius: 4, position: position, direction: direction, speed: 50 }: Ball
    `)

    expect(result.indexOf('position as Vector')).to.be.below(result.indexOf('direction as Vector'))
    expect(result.indexOf('direction as Vector')).to.be.below(result.indexOf('as Ball'))
  })
})
