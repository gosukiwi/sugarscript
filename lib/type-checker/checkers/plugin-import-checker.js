const builder = require('../types/builder')
const Definition = require('../definitions/definition')

class PluginImportChecker {
  check ({ node, checker, definitions }) {
    definitions.addPlugin(new Definition({ name: node.alias.value, type: builder.void() }))
    return builder.void()
  }
}

module.exports = PluginImportChecker
