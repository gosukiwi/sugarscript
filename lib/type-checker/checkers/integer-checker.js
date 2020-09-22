const Type = require('../types/type')

class IntegerChecker {
  check () {
    return new Type('INTEGER')
  }
}

module.exports = IntegerChecker
