const get = require('./lib/get')

exports.command = 'get <url>'
exports.desc = 'Get a url'
/*exports.builder = (yargs) => {
  return yargs.positional('url', {
      default: '.'
  })
}*/
exports.handler = ({url}) => get(url)