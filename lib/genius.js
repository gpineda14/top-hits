const request = require('request-promise');
const url = "https://genius.com/";

request(url)
  .then(function(html) {
    console.log(html)
  })
  .catch(function(err) {
    console.log('Error: ', err);
  })
