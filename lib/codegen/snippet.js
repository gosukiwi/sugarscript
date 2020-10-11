class Snippet {
  constructor () {
    this.tail = ''
    this.head = ''
  }

  toString () {
    return this.head + this.tail
  }

  append (text) {
    this.tail = this.tail + text.toString()
    return this
  }

  prepend (text) {
    this.head = this.head + text.toString()
    return this
  }
}

module.exports = Snippet
