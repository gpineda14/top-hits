const request = require('request-promise');
const $ = require('cheerio');
const url = "https://www.shazam.com/charts/top-100/united-states"

request(url)
  .then(function(html) {
    let data = captureHTML(html);
    let json_data = parseDataToJSON(data);
    return json_data;
  })
  .catch(function(err) {
    console.log('Error: ', err);
  })

function captureHTML() {

}

function parseDataToJSON() {

}
