const typegen = require('../type-generator')
const Snippet = require('../snippet')

class FunctionDefinitionGenerator {
  generate ({ node, definitions, generator, snippet }) {
    const func = definitions.getFunction(node.name)
    if (func === null) throw new Error(`Could not find function type info for '${node.name}'`)

    snippet.append(`// ${generator.file}, line ${node.body[0].position.row - 2}\n`)
    snippet.append(`function ${node.name}(`)
    const len = node.params.length
    const params = new Snippet()
    node.params.forEach((param, index) => {
      generator.generateOne({ node: param, snippet: params })
      if (index < len - 1) params.append(', ')
    })
    snippet
      .append(params.toString().replace(/\[-1\]/g, '[]'))
      .append(')\n')

    const bodySnippet = new Snippet()
    const context = func.definitions
    node.body.forEach((node) => {
      generator.generateOne({ node, definitions: context, snippet: bodySnippet })
    })
    snippet.append(bodySnippet)

    snippet
      .append(this.buildEndFunction(func.type))
      .append('\n\n')
  }

  // private

  buildEndFunction (type) {
    if (type.is('VOID')) return 'endfunction'
    if (type.is('STRING')) return 'endfunction ""'
    if (type.is('INTEGER')) return 'endfunction 0'
    if (type.is('FLOAT')) return 'endfunction 0.1'
    if (type.is('UDT') || type.is('ARRAY')) {
      return `
SS_INTERNAL_UNREACHABLE_RETURN_VALUE as ${typegen(type)}
endfunction SS_INTERNAL_UNREACHABLE_RETURN_VALUE
      `.trim()
    }

    throw new Error(`Invalid type: ${type}`)
  }
}

module.exports = FunctionDefinitionGenerator
