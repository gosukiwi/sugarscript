class Snippet {
  constructor () {
    this.snippet = ''
  }

  toString () {
    return this.snippet
  }

  append (text) {
    this.snippet = this.snippet + text.toString()
    return this
  }

  prepend (text) {
    this.snippet = text.toString() + this.snippet
    return this
  }
}

module.exports = Snippet
