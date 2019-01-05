const request = require('request');
const schedule = require('node-schedule');

const url = 'https://spotifycharts.com/regional/global/daily/latest/download';
const accountSid = 'ENTER ACCOUNT SID HERE';
const authToken = 'ENTER AUTH TOKEN HERE';
const sender = 'ENTER TWILIO NUMBER HERE';
const numbersToMessage = []; // Array of Recipients
const client = require('twilio')(accountSid, authToken);

let job = schedule.scheduleJob('* 21 * * *', function(){
  request(url, function(err, response, body) {
    if (err) {
      console.log('error:', err);
    }
    else {
      let csv = body;
      let hits = parseCSV(csv)
      let msg = orderInfoToText(hits);
      sendTextMessage(msg);
    }
  })
});

function parseCSV(csv) {
  // console.log(csv);
  let arr = csv.split("\n");
  let songs = []
  for (let i = 2; i < 12; i++) {
    let curr = arr[i].split(',');
    let song = {'Artist': curr[2], 'Track Name': curr[1], 'URL': curr[4]};
    songs.push(song);
  }
  return songs
}

function orderInfoToText(arr) {
  let msg = 'Top 10 Hits Today:\n';
  let counter = 1;
  for (let song of arr) {
    let str = `${counter}. ${song['Track Name']} by ${song['Artist']}, ${song['URL']}\n`;
    msg += str;
    counter++;
  }
  return msg;
}

function sendTextMessage(msg) {
  numbersToMessage.forEach(function (number) {
    let messages = client.messages
    .create({
      body: msg,
      from: sender,
      to: number
    })
    .then(message => console.log(message.sid))
    .done();
  });
}
