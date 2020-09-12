const builder = require('../types/builder')

class ContinueChecker {
  check ({ node, definitions }) {
    if (!definitions.isInside('loop')) throw new Error('Can only use "continue" inside a loop')

    return builder.void()
  }
}

module.exports = ContinueChecker
