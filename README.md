# Top Hits Informer #

Top Hits Informer is a web API that delivers fresh music to users via text message.

## Description ## 

The API allows you to send a request to the server with name, phone (to send text), and frequency (daily, weekly, or monthly). The API then schedules a text delivery based on frequency. 

The api gathers information about current music trends with the help of Shazam, Genius, and Spotify. Spotify offers an api that the server uses to search the current top ten tracks. We use Shazam and Genius to do the same, but since Genius and Shazam do not offer APIs to query top tracks, we use web scraping techniques to retrieve this information. 

After gathering data, the server ranks the tracks by frequency and chart position. After the sorting is done, we send the top ten to the user via SMS with the help of the Twilio API. 

## Installation ##

The API runs on Node.js and uses the following dependencies: Twilio (for sending SMS), Cheerio (for web scraping), Puppeteer (for web scraping sites render via Javascript), dotenv (to store client keys and secrets), node-schedule (to schedule text message), request (to retrieve data from api and html)

1. Clone this repository
2. use `npm install` to install dependencies
3. You will need to get a client id and secret to use the following apis:
  - Twilio (You will also need a phone number)
  - Spotify
4. run `node server.js` to start the server

## Usage ##

## Roadmap ##

Things I would like to add/fix 

- [ ] Take advantage of spotify's already existing playlists 
- [ ] The text message is pretty long, would like to instead package tracks as a playlist
- [ ] Take advantage of Spotify's audio features to personalize suggested tracks.
- [ ] Do data analysis of spotify playlists and categorize them.
- [ ] Genius does not have link to songs, so I would like to create a helper function to see if song exists in spotify and append that link to it.
- [ ] Integrate Spotify profiles to gather more information about a user's taste in music.
- [ ] The api fetches data from Spotify, Genius, and Shazam every time a job is scheduled, but we only need to do it once, I would like to store that information for later use.
- [ ] Jobs aren't saved, so I would like to add a database so server can store jobs so users can update them later.
