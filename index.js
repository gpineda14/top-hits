const request = require('request');
const schedule = require('node-schedule');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const url = 'https://spotifycharts.com/regional/global/daily/latest/download';
const accountSid = 'ACdc626fff9d55bf547dcd99095a4b7ae8';
const authToken = '544266f66c7d0ff18f54433edd9a0e49';
const sender = '+15625014703';
const numbersToMessage = ['+17149303482', '+17145887294', '+17144780423']; // Array of Recipients
const client = require('twilio')(accountSid, authToken);

app.get('/', function(req, res) {
  res.send('hello world')
})

app.post('/submit', function (req, res) {

})

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
