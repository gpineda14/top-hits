const spotify = require('./spotify');
const genius = require('./genius');
// const shazam = require('./shazam');
// let data;
async function fetchData() {
  let data = [];
  // let shazam_data = await shazam.scrapeShazam();
  let spotify_data = await spotify.scrapeSpotify();
  let genius_data = await genius.scrapeGenius();
  data.push(...spotify_data,...genius_data);
  return data;
}

function sortCoursesByFrequency(data) {
  let map = new Map();
  for (let i = 0; i < data.length; i++) {
    let key = data[i]['Track Name'];
    key.replace(/\s+$/, '');
    console.log(key);
    if (map.has(key)) {
      map.set(key, map.get(key) + 1)
    }
    else {
      map.set(key, 1);
    }
  }
  console.log(map);
}

async function processFunctions() {
  let data = await fetchData();
  console.log(data);
  sortCoursesByFrequency(data);
}
// let data = fetchData();
// console.log(data);
// sortCoursesByFrequency(data);
processFunctions();
