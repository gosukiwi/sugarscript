const namegen = require('../name-generator')
const typegen = require('../type-generator')
const Snippet = require('../snippet')

class FunctionCallGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const outer = snippet
    if (node.statement) {
      snippet = new Snippet()
    }

    const paramsSnippet = new Snippet()
    const names = []
    for (let i = 0, len = node.args.types.length; i < len; i++) {
      const value = node.args.nodes[i] || node.args.defaults[i]
      if (!value) throw new Error('Compilation error: Function has bad arguments')

      const type = node.args.types[i]
      const name = namegen()
      paramsSnippet.append(`${name} as ${typegen(type)}\n`)
      paramsSnippet.append(name).append(' = ')
      generator.generateOne({ node: value, definitions, snippet: paramsSnippet })
      paramsSnippet.append('\n')
      names.push(name)
    }
    snippet.prepend(paramsSnippet)

    if (node.statement) {
      snippet.append(`// ${generator.file}, line ${node.position.row - 1}\n`)
    }

    snippet
      .append(`${node.name}(`)
      .append(names.join(', '))
      .append(')')

    if (node.statement) {
      outer.append(snippet).append('\n')
    }
  }

  // private

  tryGenerateBuiltInFunctionCall ({ node, definitions }) {
    const func = definitions.getBuiltInFunction(node.name)
    if (func === null) return false

    console.log(node)
    console.log(func)
  }
}

module.exports = FunctionCallGenerator
