class PluginImportGenerator {
  generate ({ node, snippet }) {
    snippet.append(`#import_plugin ${node.name.value} as ${node.name.value}\n`)
  }
}

module.exports = PluginImportGenerator
