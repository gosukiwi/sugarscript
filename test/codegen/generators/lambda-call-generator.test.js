const expect = require('chai').expect
const parse = require('../../../lib/parser/parser')
const Codegen = require('../../../lib/codegen/codegen')

function generate (sourcecode) {
  return new Codegen().generate(parse(sourcecode))
}

describe('codegen/generators/lambda', function () {
  it.only('can call a lambda', function () {
    const result = generate(`
let foo = (a: integer, b: integer): integer ->
  return a + b

let result = foo(1, 2): integer
    `)

    console.log(result)
  })
})
