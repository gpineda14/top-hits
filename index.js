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
const authToken = process.env.AUTH_TOKEN;
const sender = process.env.SENDER;
const client = require('twilio')(accountSid, authToken);

app.get('/', function(req, res) {
  res.send('hello world')
})

app.post('/submit', function (req, res) {
  const name = req.body.name;
  const phoneNum = req.body.phoneNum;
  const occurrenceSetting = req.body.schedule;
  const rule = new schedule.RecurrenceRule();
  rule.hour = getTime(occurrenceSetting) + 1;
  rule.dayOfWeek = [0, 6];
  createJob(rule, phoneNum);
  console.log(`Job Scheduled for ` + rule.hour);
})

function createJob(rule, phoneNum) {
  schedule.scheduleJob(rule, function(){
    request(url, function(err, response, body) {
      if (err) {
        console.log('error:', err);
      }
      else {
        let csv = body;
        let hits = parseCSV(csv)
        let msg = orderInfoToText(hits);
        sendTextMessage(msg, phoneNum);
      }
    })
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
  client.messages
    .create({
      body: msg,
      from: sender,
      to: phoneNum
    })
    .then(message => console.log(messsage.sid))
    .done();
}

function getTime(setting) {
  if (setting === 'daily') {
    return (new Date().getHours());
  }
}

app.listen(4000);
