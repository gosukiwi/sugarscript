const typegen = require('../type-generator')

class TypeDefinitionGenerator {
  generate ({ node, generator, definitions, snippet }) {
    snippet.append(`// ${generator.file}, line ${node.fields[0].position.row - 2}\n`)
    snippet.append(`type ${node.name}\n`)
    node.fields.forEach((field) => snippet.append(`${field.name} as ${typegen(field.typehint)}\n`))
    snippet.append('endtype\n')
  }
}

module.exports = TypeDefinitionGenerator
