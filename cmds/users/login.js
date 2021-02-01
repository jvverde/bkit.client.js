const post = require('../../lib/post')
const config = require('../../lib/config')
const { encrypt, decrypt, hmac } = require('../../lib/crypto')
const stamp = require('../../lib/stamp')
const inquirer = require('inquirer')
const chalk = require('chalk')

const ask = {
  pass: () => inquirer.prompt({ type: 'password', name:'pass', message: 'Password:', mask: '*' })
}
exports.command = 'login <username>'
exports.desc = 'Login User'
exports.handler = async ({ username, password }) => {
  password = password || (await ask.pass()).pass
  try {
    const baseurl = config.load().BKITAPI_BASEURL
    if (!/^https?:\/\//.test(baseurl)) throw new Error(`baseurl=${baseurl}`)
    const { client } = await stamp(username, password)
    const pubkey = client.getPublicKey()
    const session = await post(`${baseurl}/auth/pubKey`, { username, pubkey })
    console.log(session)
    client.setSalt(session.salt)
    client.setServerPublicKey(session.pubkey)
    const proof = client.getProof()
    const answer = await post(`${baseurl}/auth/login`, { proof, username, uuid: session.uuid })
    console.log(answer)
  } catch (err) {
    console.error('Error:', err)
  }
}