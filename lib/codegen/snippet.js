class Snippet {
  constructor () {
    this.snippet = ''
  }

  toString () {
    return this.snippet
  }

  append (text) {
    this.snippet = this.snippet + text
    return this
  }

  prepend (text) {
    this.snippet = text + this.snippet
    return this
  }
}

module.exports = Snippet
