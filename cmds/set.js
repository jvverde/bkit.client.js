exports.command = 'set <what>'
exports.description = 'Allow to set variables'
exports.builder = function (yargs) {
  return yargs.commandDir('set')
}
exports.handler = function (argv) {}