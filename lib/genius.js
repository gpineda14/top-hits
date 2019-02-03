const request = require('request-promise');
const $ = require('cheerio');
const url = "https://genius.com/";

async function scrapeGenius() {
  let html = await request(url);
  let data = captureHTML(html);
  let json_data = parseDataToJSON(data);
  console.log(json_data);
  return json_data;
}

function captureHTML(html) {
  return $('routable-page > ng-non-bindable > div[id=top-songs] > div > div > a', html)
}

function parseDataToJSON(data) {
  let raw_data = []
  for (let i = 0;  i <= 2; i++) {
    let json = {'Artist': null, 'Track Name': null, 'URL': null};
    let track = $('div .chart_row-two_line_title_and_artist-title', data[i]).text()
    let artist = data[i].children[5].children[2].data.trim()
    json['Artist'] = artist;
    json['Track Name'] = track;
    raw_data.push(json);
  }
  //
  for (let i = 3; i <= 9; i++) {
    let json = {'Artist': null, 'Track Name': null, 'URL': null};
    let artist_and_track = data[i].children[5].children[0].data.trim();
    // console.log(artist_and_track);
    let fields = artist_and_track.split('by');
    json['Artist'] = fields[0].trim();
    json['Track Name'] = fields[1].trim();
    raw_data.push(json);
  }
  // console.log(raw_data);
  return raw_data;
}
scrapeGenius();
module.exports.scrapeGenius = scrapeGenius;
