const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/function-call', function () {
  it('calls a function with no arguments', function () {
    const result = generate(`
def greet()
  let a = 1
greet()
    `)

    expect(result).to.contain('greet()')
  })

  it('can define the function afterwards', function () {
    const result = generate(`
greet()
def greet()
  let a = 1
    `)

    expect(result).to.contain('greet()')
  })

  it('calls a function with an argument', function () {
    const result = generate(`
def greet(name: string)
  let a = 1
greet("Mike")
    `)

    expect(result).to.match(/greet\('Mike'\)/)
  })

  it('calls a function with an argument (sqstring)', function () {
    const result = generate(`
def greet(name: string)
  let a = 1
greet('Mike')
    `)

    expect(result).to.match(/greet\('Mike'\)/)
  })

  it('calls a function with many arguments', function () {
    const result = generate(`
def greet(name: string, age: integer)
  let a = 1
greet("Mike", 18)
    `)

    expect(result).to.match(/greet\('Mike', 18\)/)
  })

  describe('default parameters', function () {
    it('calls a function with a default inline array', function () {
      const result = generate(`
def greet(people: string[])
  let a = 1
greet(["Thomas O'Malley", "Duchess"])
      `)

      expect(result).to.match(/__SSINTERNAL\d+\.insert\('Thomas O\\'Malley'\)/)
      expect(result).to.match(/__SSINTERNAL\d+\.insert\('Duchess'\)/)
      expect(result).to.match(/greet\(__SSINTERNAL\d+\)/)
    })

    it('calls a function with many default values', function () {
      const result = generate(`
def greet(name: string = "Mike", age: integer = 18, foo: string = "bar")
  let a = 1
greet()
      `)

      expect(result).to.match(/greet\('Mike', 18, 'bar'\)/)
    })

    it('calls a function with many default parameters setting one', function () {
      const result = generate(`
def greet(name: string = "Mike", age: integer = 18, foo: string = "bar")
  let a = 1
greet("fombo")
      `)

      expect(result).to.match(/greet\('fombo', 18, 'bar'\)/)
    })

    it('calls a function with overriding all default parameters', function () {
      const result = generate(`
def greet(name: string = "Mike", age: integer = 18, foo: string = "bar")
  let a = 1
greet("fombo", 22, "potato")
      `)

      expect(result).to.match(/greet\('fombo', 22, 'potato'\)/)
    })

    it('calls a function with a non-default parameter many default parameters', function () {
      const result = generate(`
def greet(gender: string, name: string = "Mike", age: integer = 18, foo: string = "bar")
  let a = 1
greet("fombo")
      `)

      expect(result).to.match(/greet\('fombo', 'Mike', 18, 'bar'\)/)
    })

    it('can use inline types as defaults', function () {
      const result = generate(`
type Person(name: string)
def greet(person: Person = { name: "Mike" }: Person): Person
  return person
greet()
      `)

      expect(result.indexOf('function greet(person as Person)')).to.be.below(result.indexOf(".name = 'Mike'"))
      expect(result).to.match(/greet\(__SSINTERNAL\d+\)/)
    })
  })

  it('adds a line comment', function () {
    const result = generate(`
def greet(gender: string, name: string = "Mike", age: integer = 18, foo: string = "bar")
  let a = 1
greet("fombo")
    `)

    expect(result).to.contain('// in-memory://, line 3')
  })

  describe('primitives', function () {
    it('works for array_length', function () {
      const result = generate(`
let len = array_length([1, 2, 3])
      `)

      expect(result).to.match(/len = __SSINTERNAL\d+\.length \+ 1/)
    })

    it('works for array_find', function () {
      const result = generate(`
let index = array_find([1, 2, 3], 1)
      `)

      expect(result).to.match(/index = __SSINTERNAL\d+\.find\(1\)/)
    })

    it('works for to_json', function () {
      const result = generate(`
let json = to_json([1, 2, 3])
      `)

      expect(result).to.match(/__SSINTERNAL\d+\.toJSON\(\)/)
    })

    it('works for from_json', function () {
      const result = generate(`
type Person(name: string)
let p: Person
from_json(p, '{ "name": "Federico" }')
      `)

      expect(result).to.match(/p.fromJSON\('.*?'\)/)
    })
  })

  it('optimizes function call when using an identifier', function () {
    const result = generate(`
def greet(name: string): string
  return "Hello #{name}!"
let name = 'potato'
greet(name)
    `)
    expect(result).to.contain('greet(name)')
  })
})
