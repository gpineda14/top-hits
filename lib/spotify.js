const request = require('request-promise');

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

function requestTopHits() {
  request.post(authOptions, (err, res, body) => {
    // console.log(body.access_token);
    let token = body.access_token;

    let options = {
      url: playlist_url,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };

    request.get(options, (err, res, body) => {
      return body;
    })
    .then((body) => {
      json_data = extractTopTen(body);
      return json_data;
    })
    .catch((err) => {
      console.log('Error: ', err);
    })
  })
  .catch((err) => {
    console.log('Error: ', err);
  })
}

function extractTopTen(data) {
  json_data = []
  top_ten = data.tracks.items.slice(0, 10);
  for (let i = 0; i <= 9; i++) {
    json = {'Artist': null, 'Track Name': null, 'URL': null};
    json['Artist'] = top_ten[i]['track']['artists'][0]['name'];
    json['Track Name'] = top_ten[i]['track']['name'];
    json['URL'] = top_ten[i]['track']['href'];
    // console.log(json);
    json_data.push(json);
  }
  // console.log(raw_data);
  return json_data
}

// requestTopHits();
