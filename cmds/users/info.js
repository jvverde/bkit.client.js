const get = require('../../lib/get')
const config = require('../../lib/config')
const inquirer = require('inquirer')
// const keytar = require('keytar')

const ask = {
  pass: () => inquirer.prompt({ type: 'password', name:'pass', message: 'Password:', mask: '*' })
}
exports.command = 'info'
exports.desc = 'Get Current User Info'
exports.handler = async () => {
  try {
    const conf = config.load()
    const baseurl = conf.BKITAPI_BASEURL
    if (!/^https?:\/\//.test(baseurl)) throw new Error(`baseurl=${baseurl}`)
    const info = await get(`${baseurl}/user/info`, {
      headers: { Authorization: `Bearer ${conf.TOKEN}` }
    })
    console.log(info)
  } catch (err) {
    console.error('Error:', err)
  }
}