# Top 10 Hits Messenger #

**I love to listen to music and I also like keeping up to date with the latest music. I created a Node.js application that will fetch data from Spotify Charts. After the app fetches the information, it parses the data and retrieves the top ten songs. Using Twilio's SMS API, the app then sends a text message containing the top 10 hits to the recipients.**

## To run the app ##


1. Clone this repository
2. use `npm install` to install dependencies
3. Be sure to get the following information from your Twilio Account:
  - Account SID
  - Auth Token
  - Twilio Phone Number
4. Be sure to fill numbersToMessage array with string of phone numbers you want to send the list to. 
