const path = require('path')

module.exports = function() {
  return path.dirname(require('callsite')()[2].getFileName())
}
