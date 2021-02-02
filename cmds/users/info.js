const { getAuth } = require('../../lib/rest')
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
    const info = await getAuth('/user/info')
    console.log('info:', info)
  } catch (err) {
    console.error('Error:', err)
  }
}