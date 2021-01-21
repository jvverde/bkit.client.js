exports.command = 'clean'
exports.desc = 'Clean screen'
exports.handler = function (argv) {
  require('clear')()
}