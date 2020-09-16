const builder = require('../types/builder')
const scope = require('../scope')

class ContinueChecker {
  check ({ node, checker }) {
    if (!scope.isInside('loop')) throw new Error(`Can only use "continue" inside a loop (${checker.file} at line ${node.position.row - 1})`)

    return builder.void()
  }
}

module.exports = ContinueChecker
