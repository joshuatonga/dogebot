//*************************************
// Packages
//*************************************

// Slack SDK
var Slack = require('@slack/client');
var RTMClient = Slack.RtmClient;
var CLIENT_EVENTS = Slack.CLIENT_EVENTS;
var RTM_EVENTS = Slack.RTM_EVENTS;


//*************************************
// Global variables
//*************************************

var token = process.env.SLACK_TOKEN || '';






// start the websocket
var rtm = new RTMClient(token, {logLevel: 'debug'});
rtm.start();

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {
  console.log('[+] Dogebot is running... MUCH BOT! SO WOW!');
});


// Listen for messages in channel
rtm.on(RTM_EVENTS.MESSAGE, function(data) {
  console.log('[!] Logging new data........');
  console.log(data);

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
