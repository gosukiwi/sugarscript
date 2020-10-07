const path = require('path')
const Snippet = require('./snippet.js')
const lambdas = require('./lambdas')
const TypeChecker = require('../type-checker/type-checker')
const GENERATORS = require('./generators/factory')

class Codegen {
  constructor (basepath = null) {
    this.file = 'in-memory://'
    this.basepath = basepath
  }

  generate (nodes) {
    lambdas.clear()
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

  get filename () {
    if (this.file.includes('sugarscript-remote-includes')) return 'remote://' + this.file.split('sugarscript-remote-includes\\')[1]
    if (this.basepath === null) return this.file
    if (this.file === 'in-memory://') return this.file

    return path.relative(this.basepath, this.file).replace(/\\/g, '/')
  }

  // private

  typeCheck (ast) {
    return new TypeChecker().check(ast)
  }
}

module.exports = Codegen
