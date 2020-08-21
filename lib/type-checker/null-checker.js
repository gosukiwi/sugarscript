const builder = require('./types/builder')

class NullChecker {
  check () {
    return builder.void()
  }
}

module.exports = NullChecker
