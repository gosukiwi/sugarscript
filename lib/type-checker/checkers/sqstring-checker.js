const Type = require('../types/type')

// Single-quoted string checker
class SQStringChecker {
  check () {
    return new Type('STRING')
  }
}

module.exports = SQStringChecker
