const fs = require('fs')
const path = require('path')
const os = require('os')
const crypto = require('crypto')
const fetch = require('node-fetch')
const rimraf = require('rimraf')
const CACHE_PATH = path.join(os.tmpdir(), 'sugarscript-remote-includes')

function sha1 (text) {
  return crypto.createHash('sha1').update(text).digest('hex')
}

module.exports = class RemoteFileIncluder {
  constructor () {
    if (!fs.existsSync(CACHE_PATH)) fs.mkdirSync(CACHE_PATH)
  }

  isRemote (name) {
    return /^https?:\/\//.test(name)
  }

  async include (url, included = {}) {
    const filepath = this.urlToFilepath(url)
    if (!fs.existsSync(filepath)) {
      const text = await this.fetch(url)
      fs.writeFileSync(filepath, text)
    }

    return filepath
  }

  clear () {
    rimraf.sync(CACHE_PATH)
    fs.mkdirSync(CACHE_PATH)
  }

  // private

  urlToFilepath (url) {
    return path.join(CACHE_PATH, sha1(url))
  }

  async fetch (url) {
    const res = await fetch(url)
    return await res.text()
  }
}
