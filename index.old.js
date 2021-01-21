#!/usr/bin/env node
require('clear')()
const { hideBin } = require('yargs/helpers')
const yargs = require('yargs/yargs')(hideBin(process.argv))
const axios = require('axios')

const _default = async (argv) => {
  if (!argv._[0] && !argv.url) yargs.showHelp() && yargs.exit(1)

  const server = argv._[0]

  argv.schema = argv.schema || 'https'
  argv.port = argv.port || argv.schema === 'https' ? 8766 : 8765
  const url = argv.url || `${argv.schema}:://${server}:${argv.port}`

  return axios.get(url)
    .then(response => {
      console.log(response.data)
    })
}

const argv = yargs
  .usage('Usage: $0 [options] <address|ip>')
  .example('$0 192.168.1.1')
  .epilog('Copyright 2021')
  .option('port', {
      alias: 'p',
      description: 'Port Number',
      type: 'number',
      conflicts: 'url'
  })
  .option('url', {
      alias: 'u',
      description: 'url',
      conflicts: ['schema', 'port'],
      type: 'string'
  })
  .option('schema', {
      alias: 's',
      description: 'Schema',
      type: 'string',
      choices: ['http', 'https'],
      conflicts: 'url'
  })
  .command('$0', 'the default command', () => {}, _default)
  .help()
  .alias('help', 'h')
  .argv

// console.log(argv, url)