class FunctionDefinitionGenerator {
  generate ({ node, definitions, generator }) {
    if (definitions.functions[node.name] === undefined) throw new Error(`Could not find function type info for '${node.name}'`)

    const context = definitions.functions[node.name].definitions
    const body = node.body.map((node) => generator.generateOne({ node, definitions: context })).join('\n')
    return `
function ${node.name}(${generator.generateOne({ node: node.args })})
  ${body}
${this.buildEndFunction(node, definitions)}
    `.trim()
  }

  // private

  buildEndFunction (node, definitions) {
    const type = definitions.functions[node.name].type
    if (type.is('VOID')) return 'endfunction'
    if (type.is('STRING')) return 'endfunction ""'
    if (type.is('INTEGER')) return 'endfunction 0'
    if (type.is('FLOAT')) return 'endfunction 0.1'
    if (type.is('UDT')) {
      return `
SS_INTERNAL_UNREACHABLE_RETURN_VALUE as ${type.value}
endfunction SS_INTERNAL_UNREACHABLE_RETURN_VALUE
      `
    }
    // TODO: Arrays

    throw new Error(`Invalid type: ${type}`)
  }
}

module.exports = FunctionDefinitionGenerator
