const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const TypeChecker = require('../../../lib/type-checker/type-checker')

function check (input) {
  const checker = new TypeChecker()
  const ast = parse(input)
  return checker.check(ast)
}

describe('type-checker/checkers/lambda', function () {
  it('checks void lambda', function () {
    const definitions = check(`
let a = () ->
  return
    `)

    expect(definitions.lambdas[0].type.is('VOID')).to.eq(true)
    expect(definitions.variables.a.type.is('INTEGER')).to.eq(true)
  })

  it('checks integer lambda', function () {
    const definitions = check(`
let a = (): integer ->
  return 1
    `)

    expect(definitions.lambdas[0].type.is('INTEGER')).to.eq(true)
  })

  it('checks short integer lambda', function () {
    const definitions = check(`
let a = (): integer -> 1
    `)

    expect(definitions.lambdas[0].type.is('INTEGER')).to.eq(true)
  })

  it('checks string lambda with params', function () {
    const definitions = check(`
let a = (b: string): string ->
  return b
    `)

    expect(definitions.lambdas[0].type.is('STRING')).to.eq(true)
  })
})
