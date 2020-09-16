const builder = require('../types/builder')
const scope = require('../scope')

class BreakChecker {
  check ({ node, checker }) {
    if (!scope.isInside('loop')) throw new Error(`Can only use "break" inside a loop (${checker.file} at line ${node.position.row - 1})`)

    return builder.void()
  }
}

module.exports = BreakChecker
