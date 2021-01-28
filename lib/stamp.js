const jsrp = require('jsrp')

module.exports = (username, password) => new Promise((resolve, reject) => {
  try {
    const client = new jsrp.client()
    client.init({ username, password }, () => {
      client.createVerifier( (err, result) => {
        if (err) reject(err)
        else resolve( { client, ...result } ) // Resolves to {s, v}
      })
    })
  } catch (e) {
    reject (e)
  }
})
