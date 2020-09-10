const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/if', function () {
  it('checks the body', function () {
    const definitions = check(`
if 1
  let a = 1
    `)

    expect(definitions.variables.a.type.is('INTEGER')).to.eq(true)
  })

  it('checks the body and the tail', function () {
    const definitions = check(`
if 1
  let a = 1
else
  let b = 2
    `)

    expect(definitions.variables.a.type.is('INTEGER')).to.eq(true)
    expect(definitions.variables.b.type.is('INTEGER')).to.eq(true)
  })

  it('checks the body and the tail with elsif', function () {
    const definitions = check(`
if 1
  let a = 1
elif 2
  let b = 2
    `)

    expect(definitions.variables.a.type.is('INTEGER')).to.eq(true)
    expect(definitions.variables.b.type.is('INTEGER')).to.eq(true)
  })

  it('checks the body and the tail with elsif and else', function () {
    const definitions = check(`
if 1
  let a = 1
elif 2
  let b = 2
else
  let c = 3
    `)

    expect(definitions.variables.a.type.is('INTEGER')).to.eq(true)
    expect(definitions.variables.b.type.is('INTEGER')).to.eq(true)
    expect(definitions.variables.c.type.is('INTEGER')).to.eq(true)
  })

  it('can only have integers as condition', function () {
    expect(() => { check(`
if "asd"
  let a = 1
    `) }).to.throw(/can only be INTEGER/)
  })
})
