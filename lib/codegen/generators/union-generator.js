class UnionGenerator {
  generate ({ node, generator, definitions, snippet }) {
    snippet.append(`// ${generator.file}, line ~${node.position.row - 1}\n`)
    snippet.append(`type ${node.name}\n`)
    node.types.forEach((udt) => snippet.append(`__${udt.value} as ${udt.value}\n`))
    snippet.append('__type as string\n')
    snippet.append('endtype\n\n')
  }
}

module.exports = UnionGenerator
