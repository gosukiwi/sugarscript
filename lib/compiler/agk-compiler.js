const { spawn } = require('child_process')
const { Emitter } = require('event-kit')
const path = require('path')
const fs = require('fs')

// Most of this code is taken from: https://github.com/gosukiwi/atom-agk/blob/master/lib/compiler.js
class Process {
  constructor (spawner) {
    this.running = false
    this.process = null
    this.emitter = new Emitter()
    this.spawner = spawner || spawn
  }

  start (path, args, opts) {
    if (this.running) return

    this.process = this.spawner(path, args || [], opts || {})
    this.running = this.process.pid !== undefined

    if (this.running) {
      this.process.stdout.on('data', (data) => this.emitter.emit('stdout', data))
      this.process.on('close', (data) => {
        this.running = false
        this.emitter.emit('close', data)
      })
    }

    return this.running
  }

  stop () {
    if (!this.running) return
    this.process.kill()
    this.running = false
  }

  writeStdin (line) {
    if (!this.running) throw new Error('Cannot write to stopped process.')
    this.process.stdin.write(`${line}\r\n`)
  }

  onStdout (cb) {
    this.emitter.on('stdout', cb)
  }

  onClose (cb) {
    this.emitter.on('close', cb)
  }
}

module.exports = class AGKCompiler {
  constructor (compilerPath) {
    if (!fs.lstatSync(compilerPath).isFile()) throw new Error(`Could not find AppGameKit compiler at ${compilerPath}`)

    this.process = new Process()
    this.emitter = new Emitter()
    this.compilerPath = compilerPath

    this.process.onStdout((data) => {
      this.emitter.emit('failed', data.toString())
    })

    this.process.onClose((res) => {
      if (res === 0) this.emitter.emit('succeeded')
    })
  }

  onFailed (cb) {
    this.emitter.on('failed', cb)
  }

  onSucceeded (cb) {
    this.emitter.on('succeeded', cb)
  }

  compile (options) {
    const { file, x64, run } = options
    if (!fs.existsSync(file)) throw new Error(`File ${file} does not exist`)

    const args = [run ? '-run' : '-agk']
    if (x64) args.push('-64')
    args.push(file)

    return new Promise((resolve, reject) => {
      this.process.start(this.compilerPath, args, { cwd: path.dirname(file) })
      this.onFailed((err) => reject(new Error(err)))
      this.onSucceeded(() => resolve())
    })
  }
}
