const spotify = require('./spotify');
const genius = require('./genius');
const shazam = require('./shazam');

let data = [];

async function fetchData(data) {
  let shazam_data = await shazam.scrapeShazam();
  let spotify_data = await spotify.scrapeSpotify();
  let genius_data = await genius.scrapeGenius();
  data.push(...shazam_data,...spotify_data,...genius_data);
  console.log(data);
}

fetchData(data);
