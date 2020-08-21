class FunctionCallGenerator {
  generate ({ node, definitions, generator }) {
    return `
${node.name}(${this.generateArgs(node.args, definitions, generator)})
    `
  }

  // private

  generateArgs (argumentList, definitions, generator) {
    if (argumentList === null) return ''

    return argumentList.args.map((node) => generator.generateOne({ node, definitions })).join(', ')
  }
}

module.exports = FunctionCallGenerator
