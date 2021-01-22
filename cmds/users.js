exports.command = 'user <action>'
exports.description = 'Perform users acrtions'
exports.builder = function (yargs) {
  return yargs.commandDir('users')
}
exports.handler = function (argv) {}