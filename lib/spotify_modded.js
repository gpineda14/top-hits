const request = require('request-promise');
const async = require('async');

const auth_uri = 'https://accounts.spotify.com/api/token'
const playlist_url = "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF?market=US";

require('dotenv').config();
const client_id = process.env.CLIENT_ID_SPOTIFY;
const client_secret = process.env.CLIENT_SECRET_SPOTIFY;

const authOptions = {
  url: auth_uri,
  headers: {
    'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

async function fetchSpotify() {
  // return requestTopHits(extractTopTen);
  let token = await request.post(authOptions);
  let options = {
    url: playlist_url,
    headers: {
      'Authorization': 'Bearer ' + token.access_token
    },
    json: true
  };
  let json_data = await request.get(options)
  return json_data
}

module.exports.fetchSpotify = fetchSpotify;
