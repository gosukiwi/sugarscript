class PluginCallGenerator {
  generate ({ node, snippet, generator, definitions }) {
    snippet.append(`${node.plugin}.${node.func}(`)
    const len = node.args.length
    node.args.forEach((node, index) => {
      generator.generateOne({ node, definitions, snippet })
      if (index < len - 1) snippet.append(', ')
    })
    snippet.append(')\n')
  }
}

module.exports = PluginCallGenerator
