// TODO: Use promises instead of callback
// TODO: Implement user typing
// TODO: Add tests. (It should be tdd but I don't have that much time.)

//*************************************
// Packages
//*************************************

var http = require('http');

// Slack SDK
var Slack = require('@slack/client');
var RTMClient = Slack.RtmClient;
var CLIENT_EVENTS = Slack.CLIENT_EVENTS;
var RTM_EVENTS = Slack.RTM_EVENTS;

// Custom
var Jokes = require('./api/jokes');
var Wolfram = require('./api/wolfram');
var Regex = require('./helpers/regex');




//*************************************
// Variables
//*************************************

var SLACK_TOKEN = process.env.SLACK_TOKEN || '';
var WOLFRAM_TOKEN = process.env.WOLFRAM_TOKEN || '';
var PORT = Number(process.env.PORT || 8888);

var jokes = new Jokes();
var regex = new Regex();
var wolfram = new Wolfram(WOLFRAM_TOKEN);




// Run a web server.
var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("MUCH BOT! SO WOW!");
  response.end();
});

server.listen(PORT, function() {
  console.log('[+] Web server running on port: ' + PORT);
});



// Start the websocket
var rtm = new RTMClient(SLACK_TOKEN, {logLevel: 'debug'});
rtm.start();

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {
  console.log('[+] Dogebot is running... MUCH BOT! SO WOW!');
});




rtm.on(RTM_EVENTS.MESSAGE, function(data) {
  // Perform validation of the data
  if (!data.text || data.subtype === 'bot_message')
    return;

  // Extract data from data
  var message = data.text.toLowerCase();
  var channel = data.channel;

  console.log("[!] Message: " + message);


  // - if it hears 'tell a joke', it returns a random joke (preferrably from a 
  //      public API, and not statically coded).
  // - if it hears 'do you know chuck norris?' it returns a random chuck norris fact
  // - if it hears is somewebsite.com down? it should try to ping and see if 
  //      the website is actually active or not
  // - if it hears '@dogebot, what is ____' it should try to get results from 
  //      the Wolfram|Alpha public API.
  if (message === 'tell a joke') {
    jokes.getRandomJoke().then(joke => {
      rtm.sendMessage(joke, channel);
    });
  } 
  else if (message === 'do you know chuck norris?') {
    jokes.getNorrisFact().then(fact => {
      rtm.sendMessage(fact, channel);
    });
  }
  else if (regex.isAskingWebsiteDown(message)) {
    var url = regex.getURL(message);

    // Check if the website is up
    http.get(url, function(res) {
      rtm.sendMessage('Nope. The website is up.', channel);
    }).on('error', function(error) {
      rtm.sendMessage('Yup. The website is down.', channel);
    });
  }
  else if (regex.isAskingWord(message)) {
    var word = regex.getWord(message);

    // Get the definition
    wolfram.define(word).then(definition => {
      rtm.sendMessage(definition, channel);
    });
  }
}); // end of RTM_EVENTS.MESSAGE
