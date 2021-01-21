#!/usr/bin/env ts-node
const { program } = require('@caporal/core')
const path = require('path')

program
  .name("bkit")
  .version("0.0.1")
  .description("bKit CLI")
  .option('-s, --server <server>', 'Server', {
    global: true,
    default: 'localhost'
  })
  .discover(path.join(__dirname, 'commands'))

program.run()