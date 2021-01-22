const axios = require('axios')

module.exports = url => {
  console.info('get', url)
  return axios.get(url, { headers: { Accept: "application/json" } })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.error('Error:', err)
      if (err.response) {
        console.warn('Response status: ', err.response.status, err.response.statusText)
        console.warn('Response data: ', err.response.data)
      }
    })
}