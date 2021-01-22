const axios = require('axios')

module.exports = url => {
  console.info('get', url)
  return axios.get(url, { headers: { Accept: "application/json" } })
    .then(response => {
      return response.data
    })
}