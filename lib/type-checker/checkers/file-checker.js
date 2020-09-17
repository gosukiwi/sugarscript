const builder = require('../types/builder')

class FileChecker {
  check ({ node, checker }) {
    checker.file = node.path
    return builder.void()
  }
}

module.exports = FileChecker
