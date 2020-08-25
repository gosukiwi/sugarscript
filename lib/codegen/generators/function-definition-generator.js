const typegen = require('../type-generator')
const Snippet = require('../snippet')

class FunctionDefinitionGenerator {
  generate ({ node, definitions, generator, snippet }) {
    if (definitions.functions[node.name] === undefined) throw new Error(`Could not find function type info for '${node.name}'`)

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

    const context = definitions.functions[node.name].definitions
    node.body.forEach((node) => {
      generator.generateOne({ node, definitions: context, snippet })
      snippet.append('\n')
    })

    snippet
      .append(this.buildEndFunction(definitions.functions[node.name].type))
      .append('\n')
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
    // TODO: Arrays

    throw new Error(`Invalid type: ${type}`)
  }
}

module.exports = FunctionDefinitionGenerator
