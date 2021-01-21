#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

yargs(hideBin(process.argv))
  .option('p', {
    type: 'number',
    default: 9,
    global: true
  })
  .command('serve [port]', 'start the server', (yargs) => {
    yargs
      .positional('port', {
        describe: 'port to bind on',
        default: 5000
      })
      .option('priv', {
        type: 'string',
        default: 'pppppppppppppp'
      })
      .global('p')
  }, (argv) => {
    console.log('argv', argv)
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .help()
  .argv