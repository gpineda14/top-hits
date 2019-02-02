const request = require('request');

const auth_uri = 'https://accounts.spotify.com/api/token'
const url = "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF?market=US";

require('dotenv').config();
const client_id = process.env.CLIENT_ID_SPOTIFY;
const client_secret = process.env.CLIENT_SECRET_SPOTIFY;

request({
  url,
  headers: {'Authorization': `Bearer ${authTokenSpotify}`},
  json: true}, (err, res, body) => {

  if (err) { console.log(err);}

  json_data = extractTopTen(body);
  // console.log(body)
})

function getAccessToken() {
  request.post({
    uri: auth_uri,
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json:true
  }, (err, res, body) => {
    if (err) { return console.log(err)};
    console.log(body.access_token);
  })
}

function extractTopTen(data) {
  // console.log(data);
}

getAccessToken();
