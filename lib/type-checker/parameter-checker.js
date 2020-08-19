class ParameterChecker {
  check (node) {
    let as = this.parseAs(node.as)
    if (node.array > 0) as = `ARRAY(${as}, ${node.array})`
    return {
      name: 'PARAMETER',
      value: node.name,
      type: as,
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
