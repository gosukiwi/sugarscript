class ParameterChecker {
  check (node) {
    return {
      name: 'PARAMETER',
      value: node.name,
      type: this.parseAs(node.as),
      ref: node.ref,
      array: node.array
    }
  }

  // private

  parseAs (as) {
    switch (as) {
      case 'string':
        return 'STRING'
      case 'float':
        return 'FLOAT'
      case 'integer':
        return 'INTEGER'
      default:
        return as
    }
  }
}

module.exports = ParameterChecker
