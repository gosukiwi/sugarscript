const Snippet = require('./snippet')
const ArrayType = require('../type-checker/types/array')
const typegen = require('./type-generator')
let LAMBDAS = []
let TYPE_STACKS = []

class LambdaList {
  add (lambda) {
    LAMBDAS.push(lambda)
  }

  clear () {
    LAMBDAS = []
    TYPE_STACKS = []
  }

  generate (definitions) {
    if (LAMBDAS.length === 0) return ''

    return `${this.generateDispatcher(definitions)}\n\n${this.generateStacks()}\n\n${LAMBDAS.join('')}`
  }

  stackGet (type) {
    return `${this.stackFor(type)}[0]`
  }

  stackPop (type) {
    return `${this.stackFor(type)}.remove(0)`
  }

  stackFor (type) {
    const serializedType = type.serialize()
    if (TYPE_STACKS[serializedType] === undefined) {
      TYPE_STACKS[serializedType] = {
        name: `__LAMBDA_STACK_${serializedType}`,
        type: new ArrayType({ value: type })
      }
    }

    return TYPE_STACKS[serializedType].name
  }

  // private

  generateDispatcher (definitions) {
    const snippet = new Snippet()
    snippet.append('function __SSINTERNAL_CALL_LAMBDA(id as integer)\n')
    definitions.lambdas.forEach((lambda) => {
      snippet.append(`if id = ${lambda.id}\n__SSINTERNAL_LAMBDA0()\nexitfunction\nendif\n\n`)
    })
    snippet.append('Message("Could not find Lambda with ID: " + Str(id))\n')
    snippet.append('endfunction\n')
    return snippet.toString()
  }

  generateStacks () {
    return Object.values(TYPE_STACKS).map(({ name, type }) => `global ${name} as ${typegen(type)}`).join('\n')
  }
}

module.exports = new LambdaList()
