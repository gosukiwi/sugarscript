const builder = require('../types/builder')
const scope = require('../scope')

class ContinueChecker {
  check ({ node }) {
    if (!scope.isInside('loop')) throw new Error('Can only use "continue" inside a loop')

    return builder.void()
  }
}

module.exports = ContinueChecker
