class FunctionDefinitionGenerator {
  generate (node, definitions, generator) {
    return `
function ${node.name}(${generator.generateOne(node.args)})
  ${generator.generate(node.body, definitions)}
${this.buildEndFunction(node, definitions)}
    `.trim()
  }

  // private

  buildEndFunction (node, definitions) {
    const definition = definitions.functions[node.name]
    if (definition.type === 'VOID') return 'endfunction'

    switch (definition.type) {
      case 'STRING':
        return 'endfunction ""'
      case 'INTEGER':
        return 'endfunction 0'
      case 'FLOAT':
        return 'endfunction 0.1'
      default:
        return `
SS_INTERNAL_UNREACHABLE_RETURN_VALUE as ${definition.type}
endfunction SS_INTERNAL_UNREACHABLE_RETURN_VALUE
        `
    }
  }
}

module.exports = FunctionDefinitionGenerator
