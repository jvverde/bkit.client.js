const { get } = require('../lib/rest')

exports.command = 'get <url>'
exports.desc = 'Get a url'
exports.handler = async ({url}) => console.log(await get(url))