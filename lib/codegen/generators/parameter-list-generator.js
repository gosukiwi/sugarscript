class ParameterListGenerator {
  generate ({ node }) {
    return node.params.map((parameter) => {
      const array = Array(parameter.array).fill('[]').join('')
      if (parameter.ref) {
        return `${parameter.name} ref as ${parameter.as}${array}`
      }

      return `${parameter.name} as ${parameter.as}${array}`
    }).join(', ')
  }
}

module.exports = ParameterListGenerator
