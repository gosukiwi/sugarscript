const expect = require('chai').expect
const parser = require('../lib/parser')
const Codegen = require('../lib/codegen')

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

        expect(result).to.eq(`
function greet(name as string, person ref as Person)
endfunction
        `.trim())
      })

      it('works with an array and a ref parameter', function () {
        const ast = parser.parse(`
def greet(person:ref:Person[][])
        `.trim())
        const codegen = new Codegen()
        const result = codegen.call(ast)

        expect(result).to.eq(`
function greet(person ref as Person[][])
endfunction
        `.trim())
      })

      it('works with an array parameter', function () {
        const ast = parser.parse(`
def greet(person:Person[])
        `.trim())
        const codegen = new Codegen()
        const result = codegen.call(ast)

        expect(result).to.eq(`
function greet(person as Person[])
endfunction
        `.trim())
      })

      it('can return a value', function () {
        const ast = parser.parse(`
def greet(person:Person[])
  return 2
        `.trim())
        const codegen = new Codegen()
        const result = codegen.call(ast)

        expect(result).to.eq(`
function greet(person as Person[])
  exitfunction 2
endfunction 0
        `.trim())
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
