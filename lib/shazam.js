const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = "https://www.shazam.com/charts/top-100/united-states"

function scrapeShazam() {
  fetchHTML()
    .then((html) => {
    // console.log(html);
    let data = captureHTMLAndTurnToJSON(html);
    // console.log(data);
    return json_data;
  }).catch(function(err) {
      console.log('Error: ', err);
  })
}

let fetchHTML = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector(".main > div > .inner-content.modules.panel-bd.panel-bd-wide.grid.-inverse-play > .charttracks > ul > li");
  const html = await page.content()
  await browser.close();
  // console.log(html);
  return html;
}

function captureHTMLAndTurnToJSON(html) {
  let data = [];
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
