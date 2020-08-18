class FunctionDefinitionGenerator {
  generate (node, generator) {
    return `
function ${node.name}(${generator.generate(node.args)})
  ${generator.call(node.body)}
endfunction
    `.trim()
  }
}

class ParameterListGenerator {
  generate (node, generator) {
    return node.params.map((parameter) => {
      const array = Array(parameter.array).fill('[]').join('')
      if (parameter.ref) {
        return `${parameter.name} ref as ${parameter.as}${array}`
      }

      return `${parameter.name} as ${parameter.as}${array}`
    }).join(', ')
  }
}

class EmptyLineGenerator {
  generate () {
    return ''
  }
}

class ReturnGenerator {
  generate (node, generator) {
    return `exitfunction ${generator.generate(node.value)}`
  }
}

class IntegerGenerator {
  generate (node) {
    return `${node.value}`
  }
}

const GENERATORS = {
  FUNCTION_DEFINITION: new FunctionDefinitionGenerator(),
  PARAMETER_LIST: new ParameterListGenerator(),
  EMPTY_LINE: new EmptyLineGenerator(),
  RETURN: new ReturnGenerator(),
  INTEGER: new IntegerGenerator()
}

class Codegen {
  call (ast) {
    return ast.map((expression) => this.generate(expression)).join('\n')
  }

  generate (expression) {
    const generator = GENERATORS[expression.type]
    if (generator === undefined) throw new Error(`Invalid type: ${expression.type}`)

    return generator.generate(expression, this)
  }

  generateFunctionDefinition (node) {
    console.log(node)
  }

  get (type, node) {
    if (node.type !== type) throw new Error(`Expected ${type}, got ${node.type}`)

    return node
  }
}

module.exports = Codegen
