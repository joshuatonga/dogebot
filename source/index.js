//*************************************
// Packages
//*************************************

var http = require('http');

// Slack SDK
var Slack = require('@slack/client');
var RTMClient = Slack.RtmClient;
var CLIENT_EVENTS = Slack.CLIENT_EVENTS;
var RTM_EVENTS = Slack.RTM_EVENTS;


//*************************************
// Global variables
//*************************************

var TOKEN = process.env.SLACK_TOKEN || '';
var PORT = Number(process.env.PORT || 8888);


// Run a web server
var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("MUCH BOT! SO WOW!");
  response.end();
});

server.listen(PORT, function() {
  console.log('[+] Web server running on port: ' + PORT);
});



// start the websocket
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
  var message = data.text;
  var channel = data.channel;

  console.log("[!] Message: " + message);

  if (message === 'test bot') {
    rtm.sendMessage('WOW!', channel);
  }

});
