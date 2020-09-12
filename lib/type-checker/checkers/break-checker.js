const builder = require('../types/builder')

class BreakChecker {
  check ({ node, definitions }) {
    if (!definitions.isInside('loop')) throw new Error('Can only use "break" inside a loop')

    return builder.void()
  }
}

module.exports = BreakChecker
