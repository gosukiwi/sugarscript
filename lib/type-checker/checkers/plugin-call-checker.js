class PluginCallChecker {
  check ({ node, checker, definitions }) {
    if (definitions.getPlugin(node.plugin) === null) throw new Error(`Could not find plugin: '${node.plugin}' (${checker.file} at line ${node.position.row - 1})`)

    return node.typehint
  }
}

module.exports = PluginCallChecker
