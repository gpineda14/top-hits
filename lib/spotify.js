const request = require('request');
const url = "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF?market=US";
require('dotenv').config();
const authTokenSpotify = process.env.AUTH_TOKEN_SPOTIFY;

request({
  url,
  headers: {'Authorization': `Bearer ${authTokenSpotify}`},
  json: true}, (err, res, body) => {

  if (err) { console.log(err);}

  console.log(body)
})
