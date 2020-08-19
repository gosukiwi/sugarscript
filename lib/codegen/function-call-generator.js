class FunctionCallGenerator {
  generate (node, definitions, generator) {
    return `
${node.name}(${this.generateArgs(node.args, definitions, generator)})
    `
  }

  // private

  generateArgs (argumentList, definitions, generator) {
    if (argumentList === null) return ''
    return generator.generate(argumentList.args)
  }
}

module.exports = FunctionCallGenerator
