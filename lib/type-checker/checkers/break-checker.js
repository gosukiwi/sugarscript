const builder = require('../types/builder')
const scope = require('../scope')

class BreakChecker {
  check ({ node }) {
    if (!scope.isInside('loop')) throw new Error('Can only use "break" inside a loop')

    return builder.void()
  }
}

module.exports = BreakChecker
