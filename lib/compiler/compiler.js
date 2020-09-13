const fs = require('fs')
const path = require('path')
const Codegen = require('../codegen/codegen')
const parse = require('../parser/parser')
const DEFAULT_OPTIONS = {
  entry: 'main.ss',
  output: 'main.agc'
}

module.exports = class Compiler {
  constructor () {
    this.generator = new Codegen()
  }

  async compile (options = {}) {
    options = Object.assign({}, DEFAULT_OPTIONS, options)
    const ast = await this.parse(options.entry)
    try {
      const code = this.generator.generate(ast)

      const outputfile = path.join(path.dirname(options.entry), options.output)
      await fs.promises.writeFile(outputfile, code)
    } catch (err) {
      console.log(err.message)
    }
  }

  async parse (file) {
    const data = await fs.promises.readFile(file)
    const includes = []
    let ast = parse(data.toString()).filter((node) => {
      if (node.type !== 'REQUIRE') return true

      includes.push(node.file)
      return false
    })

    const asts = await Promise.all(includes.map((include) => {
      let filepath = path.join(path.dirname(file), include)
      if (fs.existsSync(filepath + '.ss')) {
        filepath = filepath + '.ss'
      } else if (!fs.existsSync(filepath)) {
        throw new Error(`Could not find file: ${filepath}`)
      }

      return this.parse(filepath)
    }))

    for (let i = 0, len = asts.length; i < len; i++) {
      ast = ast.concat(asts[i])
    }

    return ast
  }
}
