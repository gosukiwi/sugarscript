const Snippet = require ('./snippet')
let lambdas = []
const PRIMITIVE_TYPES = `
global __SSINTERNALS_LAMBDA_INTEGERS as integer[]
global __SSINTERNALS_LAMBDA_FLOATS as float[]
global __SSINTERNALS_LAMBDA_STRINGS as string[]
`.trim()

class LambdaList {
  add (lambda) {
    lambdas.push(lambda)
  }

  clear () {
    lambdas = []
  }

  generate (definitions) {
    return `${this.buildLambdaDispatcher(definitions)}\n\n${PRIMITIVE_TYPES}\n\n${lambdas.join('')}`
  }

  stackGet (type) {
    return `${this.stackFor(type)}[0]`
  }

  stackPop (type) {
    return `${this.stackFor(type)}.remove(0)`
  }

  stackFor (type) {
    if (type.is('INTEGER')) return '__SSINTERNALS_LAMBDA_INTEGERS'
    if (type.is('FLOAT')) return '__SSINTERNALS_LAMBDA_FLOAT'
    if (type.is('STRING')) return '__SSINTERNALS_LAMBDA_STRING'
    throw new Error(`Could not find stack for ${type}`)
  }

  // private

  buildLambdaDispatcher (definitions) {
    const snippet = new Snippet()
    snippet.append('function __SSINTERNAL_CALL_LAMBDA(id as integer)\n')
    definitions.lambdas.forEach((lambda) => {
      snippet.append(`if id = ${lambda.id}\n__SSINTERNAL_LAMBDA0()\nexitfunction\nendif\n\n`)
    })
    snippet.append('Message("Could not find Lambda with ID: " + Str(id))\n')
    snippet.append('endfunction\n')
    return snippet.toString()
  }
}

module.exports = new LambdaList()
