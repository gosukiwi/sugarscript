const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/string', function () {
  it('can interpolate trivial', function () {
    const result = generate('let a = "#{1}!"')
    expect(result).to.match(/a = '' \+ __SSINTERNAL\d+ \+ '!'/)
  })

  it('can interpolate simple', function () {
    const result = generate('let a = "foo #{2 + 2}!"')
    expect(result).to.match(/a = 'foo ' \+ __SSINTERNAL\d+ \+ '!'/)
  })

  it('can interpolate two', function () {
    const result = generate('let a = "foo #{1} #{2}!"')
    expect(result).to.match(/a = 'foo ' \+ __SSINTERNAL\d+ \+ ' ' \+ __SSINTERNAL\d+ \+ '!'/)
  })

  it('can interpolate using variables', function () {
    const result = generate('let a = 1\nlet b = "foo #{a + 2}!"')
    expect(result).to.match(/__SSINTERNAL\d+ = Str\(a \+ 2\)/)
    expect(result).to.match(/b = 'foo ' \+ __SSINTERNAL\d+ \+ '!'/)
  })

  it('can interpolate function call', function () {
    const result = generate(`
def one(): integer
  return 1
let b = "foo #{one()}!"
`)
    expect(result).to.match(/__SSINTERNAL\d+ = Str\(one\(\)\)/)
    expect(result).to.match(/b = 'foo ' \+ __SSINTERNAL\d+ \+ '!'/)
  })

  it('can interpolate a primitive function call', function () {
    const result = generate(`
def show(str: string)
  print(str)

show("Double is #{Ceil(1.1)}!")
`)
    expect(result).to.match(/'Double is ' \+ __SSINTERNAL\d+ \+ '!'/)
  })

  it('complains when interpolating invalid variables', function () {
    expect(() => generate('let a = "foo #{b + 2}!"')).to.throw(/Could not find/)
  })

  it('complains when interpolating UDTs', function () {
    expect(() => generate('type Person(name: string)\nlet person: Person\nlet a = "foo #{person}!"')).to.throw(/Can only interpolate/)
  })

  it('works with double quotes', function () {
    const result = generate('let a = "fo\\"o!"')
    expect(result).to.include(`a = 'fo"o!'`)
  })

  it('works with single quotes', function () {
    const result = generate(`let a = "fo'o!"`)
    expect(result).to.include("a = 'fo\\'o!'")
  })
})
