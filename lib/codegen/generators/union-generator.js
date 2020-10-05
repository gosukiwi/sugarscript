class UnionGenerator {
  generate ({ node, generator, definitions, snippet }) {
    snippet.append(`// ${generator.filename}, line ${node.name.position.row}\n`)
    snippet.append(`type ${node.name.value}\n`)
    node.types.forEach((udt) => snippet.append(`__${udt.value} as ${udt.value}\n`))
    snippet.append('__type as string\n')
    snippet.append('endtype\n\n')
  }
}

module.exports = UnionGenerator
