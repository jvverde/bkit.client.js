const get = require('../lib/get')

exports.command = 'get <url>'
exports.desc = 'Get a url'
exports.handler = async ({url}) => console.log(await get(url))