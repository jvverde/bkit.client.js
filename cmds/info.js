const { get } = require('../lib/rest')

exports.command = 'info'
exports.desc = 'Get Info'
exports.handler = async () => {
  try {
    const info = await get('/info')
    console.log('info:', info)
  } catch (err) {
    console.error('Error:', err)
  }
}