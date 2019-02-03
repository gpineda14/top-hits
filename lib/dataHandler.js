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
  return [data, spotify_data, genius_data];
}

function sortCoursesByFrequency(data) {
  let map = new Map();
  for (let i = 0; i < data.length; i++) {
    let key = data[i]['Track Name'];
    key.replace(/\s+$/, '');
    if (map.has(key)) {
      map.set(key, map.get(key) + 1);
    }
    else {
      map.set(key, 1);
    }
  }
  // console.log(songs)
  let objects = [...map];
  // console.log(objects);
  return objects.sort(function(a, b) {
    return a[1] > b[1];
  });
}

function extractGroups(data) {
  let index = 0;
  let frequency = 1;
  let groups = [];
  while (index < data.length) {
    let curr_group = [];
    while (index < data.length && data[index][1] === frequency) {
      curr_group.push(data[index]);
      index += 1
    }
    groups.push(curr_group);
    frequency += 1
  }
  // console.log(groups);
  return groups;
}

function sortByRank(data, ranking1, ranking2) {

}

async function processFunctions() {
  let data = await fetchData();
  // console.log(data);
  let sortedFrequency = sortCoursesByFrequency(data[0]);
  // console.log(sortedFrequency);
  let groups = extractGroups(sortedFrequency);
  sortByRank(groups, data[1], data[2]);
}
// let data = fetchData();
// console.log(data);
// sortCoursesByFrequency(data);
processFunctions();
