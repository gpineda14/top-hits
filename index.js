const request = require('request');
const schedule = require('node-schedule');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const url = process.env.URL;
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN_TWILIO;
const sender = process.env.SENDER;
const client = require('twilio')(accountSid, authToken);

app.get('/', function(req, res) {
  res.send('hello world')
})

app.post('/submit', function (req, res) {
  let name = req.query.name;
  let phoneNum = req.query.phoneNum;
  let frequency = req.query.frequency;
  let rule = new schedule.RecurrenceRule();
  setFrequency(rule, frequency);
  createJob(rule, phoneNum);
  console.log(`Job Scheduled for ` + rule);
})

function createJob(rule, phoneNum) {
  schedule.scheduleJob(rule, function() {
    fetchAndSend(phoneNum);
  });
}

function fetchAndSend(phoneNum) {
  request(url, function(err, response, body) {
    if (err) {
      console.log('error: ', err);
    }
    else {
      // console.log(phoneNum);
      let csv = body;
      let hits = parseCSV(csv)
      let msg = orderInfoToText(hits);
      sendTextMessage(msg, phoneNum);
    }
  })
}

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

function sendTextMessage(msg, phoneNum) {
  client.messages.create({
    body: msg,
    from: sender,
    to: phoneNum,
  })
  .then(message => console.log(message.sid))
  .done();
}

function setFrequency(rule, setting) {
  let date = new Date();
  rule.hour = date.getHours() + 1;
  if (setting == 'weekly') {
    rule.dayOfWeek = [date.getDay()];
  }
  else if (setting == 'monthly') {
    rule.date = date.getMonth();
  }
  else {
    rule.dayOfWeek = new schedule.Range(0, 6);
  }
}

app.listen(4000);
