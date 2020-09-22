const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/inline-type', function () {
  it('generates an inline type when assigning', function () {
    const result = generate(`
type Person(name: string, age: integer)
let a = { name: "Duchess" }: Person
    `)

    expect(result).to.match(/__SSINTERNAL\d+\.name = 'Duchess'/)
    expect(result).to.match(/a = __SSINTERNAL\d+/)
  })

  it('can pass it to functions', function () {
    const result = generate(`
type Person(name: string, age: integer)
def foo(p: Person): Person
  return p

foo({ name: "Duchess" }: Person)
    `)

    expect(result).to.match(/__SSINTERNAL\d+\.name = 'Duchess'/)
    expect(result).to.match(/foo\(__SSINTERNAL\d+\)/)
  })

  it('can assign to expressions', function () {
    const result = generate(`
type Person(name: string, age: integer)
def name(): string
  return "Duchess"

let a = { name: name() }: Person
    `)

    expect(result).to.match(/__SSINTERNAL\d+\.name = name\(\)/)
    expect(result).to.match(/a = __SSINTERNAL\d+/)
  })
})
