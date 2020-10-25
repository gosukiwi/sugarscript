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

      if (options.clearRemoteCache) this.remoteIncluder.clear()

      this.included = []
      this.parse(options.entry).then(async (ast) => {
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

  async parse (file, remote = null) {
    this.included.push(file)
    const data = await fs.promises.readFile(file)
    let ast = []

    try {
      ast = parse(data.toString())
    } catch (err) {
      throw new Error(`${err.message} (${file})`)
    }

    const { nodes, includes } = await this.parseIncludes(ast, remote, file)
    const includesASTs = await Promise.all(includes)
    let finalAST = [{ type: 'FILE', path: file }].concat(nodes)
    for (let i = 0, len = includesASTs.length; i < len; i++) {
      finalAST = includesASTs[i].concat(finalAST)
    }

    return finalAST
  }

  async parseIncludes (ast, remote, file) {
    const includes = []
    const nodes = await async.filter(ast, async (node) => {
      if (node.type !== 'REQUIRE') return true

      let filepath = null
      if (this.remoteIncluder.isRemote(node.file)) {
        filepath = await this.remoteIncluder.include(node.file)
        if (filepath === null) throw new Error(`Could not find file: ${node.file} (${file})`)

        if (!this.included.includes(filepath)) includes.push(this.parse(filepath, node.file))
        return false
      }

      if (remote !== null) { // here we are including relative to a remote file
        // get the base directory from URL
        const lastDash = remote.lastIndexOf('/')
        const finalurl = `${remote.substring(0, lastDash)}/${node.file}`
        filepath = await this.remoteIncluder.include(finalurl)
        if (filepath === null) {
          filepath = await this.remoteIncluder.include(finalurl + '.ss')
          if (filepath === null) throw new Error(`Could not find file: ${node.file} (${file})`)
        }

        if (!this.included.includes(filepath)) includes.push(this.parse(filepath, node.file))
        return false
      }

      filepath = path.join(path.dirname(file), node.file)
      if (fs.existsSync(filepath + '.ss')) {
        filepath = filepath + '.ss'
      } else if (!fs.existsSync(filepath)) {
        throw new Error(`Could not find file: ${filepath} (${file})`)
      }

      if (!this.included.includes(filepath)) includes.push(this.parse(filepath, null))

      return false
    })

    return { nodes, includes }
  }
}
