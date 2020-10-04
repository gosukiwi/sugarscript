const Snippet = require('./snippet.js')
const lambdas = require('./lambdas')
const TypeChecker = require('../type-checker/type-checker')
const GENERATORS = require('./generators/factory')

class Codegen {
  constructor () {
    this.file = 'in-memory://'
  }

  generate (nodes) {
    lambdas.clear() // TODO: Consider this when implementing `#include`
    const definitions = this.typeCheck(nodes)
    const snippet = new Snippet()
    nodes.forEach((node) => this.generateOne({ node, definitions, snippet }))
    snippet.prepend(lambdas.generate(definitions))
    return snippet.toString()
  }

  generateOne ({ node, definitions, snippet }) {
    if (node === null) return GENERATORS.NULL.generate()

    const generator = GENERATORS[node.type]
    if (generator === undefined) throw new Error(`Could not find generator for type: ${node.type}`)

    generator.generate({ node, definitions, generator: this, snippet })
  }

  // private

  typeCheck (ast) {
    return new TypeChecker().check(ast)
  }
}

module.exports = Codegen
