//import { createCommand } from "@caporal/core"

module.exports = ({ createCommand }) => {
  return createCommand('init bKit')
    .option('-u, --url <URL>', 'Server URL')
    .action(({ options, logger }) => {
      logger.info('Options', options)
      logger.info('Options.u %s', options.u)
      logger.info('Options.url %s', options.url)
      logger.info('Options.s %s', options.s)
      logger.info('Options.server %s', options.server)
    })
}