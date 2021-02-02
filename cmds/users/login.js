const post = require('../../lib/post')
const config = require('../../lib/config')
const stamp = require('../../lib/stamp')
const { hmac } = require('../../lib/crypto')
const inquirer = require('inquirer')
// const keytar = require('keytar')

const ask = {
  pass: () => inquirer.prompt({ type: 'password', name:'pass', message: 'Password:', mask: '*' })
}
exports.command = 'login <username>'
exports.desc = 'Login User'
exports.handler = async ({ username, password }) => {
  password = password || (await ask.pass()).pass
  try {
    const conf = config.load()
    const baseurl = conf.BKITAPI_BASEURL
    if (!/^https?:\/\//.test(baseurl)) throw new Error(`baseurl=${baseurl}`)
    const { client } = await stamp(username, password)
    const pubkey = client.getPublicKey()
    const session = await post(`${baseurl}/auth/pubKey`, { username, pubkey })
    // console.log(session)
    client.setSalt(session.salt)
    client.setServerPublicKey(session.pubkey)
    const proof = client.getProof()
    const answer = await post(`${baseurl}/auth/login`, { proof, username, uuid: session.uuid })
    const isValid = client.checkServerProof(answer.proof)
    const key = client.getSharedKey()
    const id = hmac(answer.token, key)
    conf.TOKEN = `${id}:${answer.token}`
    config.save(conf)
  } catch (err) {
    console.error('Error:', err)
  }
}