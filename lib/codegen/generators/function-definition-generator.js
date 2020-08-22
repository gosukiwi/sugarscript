const TypeGenerator = require('../type-generator')

class FunctionDefinitionGenerator {
  generate ({ node, definitions, generator, snippet }) {
    if (definitions.functions[node.name] === undefined) throw new Error(`Could not find function type info for '${node.name}'`)

    const context = definitions.functions[node.name].definitions
    const body = node.body.map((node) => generator.generateOne({ node, definitions: context, snippet })).join('\n')
    snippet.append(`function ${node.name}(`)
    generator.generateOne({ node: node.args, snippet })
    snippet
      .append(')\n')
      .append(body)
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
      const typeGenerator = new TypeGenerator()
      return `
SS_INTERNAL_UNREACHABLE_RETURN_VALUE as ${typeGenerator.generate(type)}
endfunction SS_INTERNAL_UNREACHABLE_RETURN_VALUE
      `.trim()
    }
    // TODO: Arrays

    throw new Error(`Invalid type: ${type}`)
  }
}

module.exports = FunctionDefinitionGenerator
