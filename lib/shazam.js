const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = "https://www.shazam.com/charts/top-100/united-states"

let fetchHTML = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  // await page.waitFor(1000);
  const html = await page.content()
  await browser.close();
  // console.log(html);
  return html;
}
// fetchHTML();
fetchHTML().then((html) => {
  // console.log(html);
  let data = captureHTML(html);
  console.log(data);
  // let json_data = parseDataToJSON();
})
//
function captureHTML(html) {
  return $('#\2f charts\2f top-100\2f united-states > div.inner-content.modules.panel-bd.panel-bd-wide.grid.-inverse-play > div > ul', html)
}
//
// function parseDataToJSON() {
//
// }
