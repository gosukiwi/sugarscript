const fs = require('fs')
const path = require('path')
const async = require('async')
const Codegen = require('../codegen/codegen')
const AGKCompiler = require('./agk-compiler')
const RemoteFileIncluder = require('./remote-file-includer')
const parse = require('../parser/parser')
const DEFAULT_OPTIONS = {
  entry: 'main.ss',
  output: 'main.agc',
  compiler: 'D:\\Games\\Steam\\steamapps\\common\\App Game Kit 2\\Tier 1\\Compiler\\AGKCompiler.exe',
  generateOnly: false,
  compileAndRun: false,
  clearRemoteCache: false,
  x64: false
}

module.exports = class Compiler {
  constructor () {
    this.remoteIncluder = new RemoteFileIncluder()
  }

  async compile (options = {}) {
    return new Promise((resolve, reject) => {
      options = Object.assign({}, DEFAULT_OPTIONS, options)

      if (!fs.existsSync(options.entry)) {
        reject(new Error(`Could not find entry file: ${options.entry}`))
        return
      }

      this.parse(options.entry).then(async (ast) => {
        if (options.clearRemoteCache) await this.remoteIncluder.clear()

        const code = new Codegen(path.dirname(options.entry)).generate(ast)
        const outputfile = path.join(path.dirname(options.entry), options.output)
        await fs.promises.writeFile(outputfile, code)

        if (!options.generateOnly) {
          await new AGKCompiler(options.compiler).compile({
            file: outputfile,
            run: options.compileAndRun,
            x64: options.x64
          })
        }

        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  }

  async parse (file, included = []) {
    included.push(file)
    const data = await fs.promises.readFile(file)
    const includes = []
    let ast = []

    try {
      ast = parse(data.toString())
    } catch (err) {
      throw new Error(`${err.message} (${file})`)
    }

    const nonIncludes = await async.filter(ast, async (node) => {
      if (node.type !== 'REQUIRE') return true

      let filepath = null
      if (this.remoteIncluder.isRemote(node.file)) {
        filepath = await this.remoteIncluder.include(node.file)
      } else {
        filepath = path.join(path.dirname(file), node.file)
        if (fs.existsSync(filepath + '.ss')) {
          filepath = filepath + '.ss'
        } else if (!fs.existsSync(filepath)) {
          throw new Error(`Could not find file: ${filepath} (${fs.basename(file)})`)
        }
      }

      if (!included.includes(filepath)) includes.push(filepath)

      return false
    })

    ast = [{ type: 'FILE', path: file }].concat(nonIncludes)
    const asts = await Promise.all(includes.map((filepath) => this.parse(filepath, included)))

    for (let i = 0, len = asts.length; i < len; i++) {
      ast = ast.concat(asts[i])
    }

    return ast
  }
}
