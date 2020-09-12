let stack = ['global']
module.exports = {
  enter (name) {
    stack.unshift(name)
  },

  isInside (name) {
    for (let i = 0, len = stack.length; i < len; i++) {
      if (name === stack[i]) return true
    }

    return false
  },

  leave () {
    if (stack[0] === 'global') throw new Error('Cannot leave global scope')
    stack.shift()
  },

  clear () {
    stack = ['global']
  }
}
