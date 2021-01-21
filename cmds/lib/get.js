const axios = require('axios')

module.exports = url => {
  console.info('get', url)
  return axios.get(url)
    .then(response => {
      console.log(response.data)
    })
}