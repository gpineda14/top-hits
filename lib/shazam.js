const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = "https://www.shazam.com/charts/top-100/united-states"

async function scrapeShazam() {
  let result = await fetchHTML();
  let json_data = [];
  captureHTMLAndTurnToJSON(result, json_data);
  console.log(json_data);
  return json_data;
}

async function fetchHTML() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector(".main > div > .inner-content.modules.panel-bd.panel-bd-wide.grid.-inverse-play > .charttracks > ul > li");
  const html = await page.content()
  await browser.close();
  return html;
}

function captureHTMLAndTurnToJSON(html, data) {
  let loose_data = $('.main > div > .inner-content.modules.panel-bd.panel-bd-wide.grid.-inverse-play > .charttracks > ul > li', html);
  for (let i = 0; i <= 9; i++) {
    let json = {'Artist': null, 'Track Name': null, 'URL': null};
    let temp = $('article > div > .details.details.grid.grid-vertical.grid-space-between', loose_data[i]);
    json['Track Name'] = $('.title > .ellip', temp).text().trim();
    json['Artist'] = $('.artist > .ellip', temp).text().trim()
    // console.log(json);
    data.push(temp);
  }
  return data;
}

scrapeShazam();
module.exports.scrapeShazam = scrapeShazam;
