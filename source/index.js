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




//*************************************
// Global variables
//*************************************

var TOKEN = process.env.SLACK_TOKEN || '';
var PORT = Number(process.env.PORT || 8888);

var jokes = new Jokes();




// Run a web server
var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("MUCH BOT! SO WOW!");
  response.end();
});

server.listen(PORT, function() {
  console.log('[+] Web server running on port: ' + PORT);
});



// Start the websocket
var rtm = new RTMClient(TOKEN, {logLevel: 'debug'});
rtm.start();

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {
  console.log('[+] Dogebot is running... MUCH BOT! SO WOW!');
});




// Listen for messages in channel
rtm.on(RTM_EVENTS.MESSAGE, function(data) {
  // Perform validation of the data
  if (!data.text || data.subtype === 'bot_message')
    return;

  // Extract data from data
  var message = data.text.toLowerCase();
  var channel = data.channel;

  console.log("[!] Message: " + message);


  // If it hears 'tell a joke', it returns a random joke 
  // (preferrably from a public API, and not statically coded)
  if (message === 'tell a joke') {
    jokes.getRandomJoke(function(joke) {
      rtm.sendMessage(joke, channel);
    });
  }

});
