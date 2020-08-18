const expect = require('chai').expect
const parser = require('../../lib/parser')
const Codegen = require('../../lib/codegen/codegen')

describe('Codegen', function () {
  describe('#call', function () {
    describe('DEF', function () {
      it('works with a function with no parameters')

      it('works with a simple function', function () {
        const ast = parser.parse(`
def greet(name:string, person:ref:Person)
        `.trim())
        const codegen = new Codegen()
        const result = codegen.call(ast)

        expect(result).to.contain('function greet(name as string, person ref as Person)')
        expect(result).to.contain('endfunction')
      })

      it('works with an array and a ref parameter', function () {
        const ast = parser.parse(`
def greet(person:ref:Person[][])
        `.trim())
        const codegen = new Codegen()
        const result = codegen.call(ast)

        expect(result).to.contain('function greet(person ref as Person[][])')
        expect(result).to.contain('endfunction')
      })

      it('works with an array parameter', function () {
        const ast = parser.parse(`
def greet(person:Person[])
        `.trim())
        const codegen = new Codegen()
        const result = codegen.call(ast)

        expect(result).to.contain('function greet(person as Person[])')
      })

      it('can return a value', function () {
        const ast = parser.parse(`
def greet(person:Person[])
  return 2
        `.trim())

        const result = new Codegen().call(ast)

        expect(result).to.contain('exitfunction 2')
        expect(result).to.contain('endfunction 0')
      })
    })

//     describe('Function call', function () {
//       it('compiles properly', function () {
//         const ast = parser.parse('(greet "mike")')
//         const codegen = new Codegen()
//         const result = codegen.call(ast)
//
//         // TODO: Type checker should not compile because there's no function definition
//         expect(result).to.eq(`
// SSINTERNAL__PushString("mike")
// SSINTERNAL__Call("greet")
//         `.trim())
//       })
//     })
  })
})
