//*************************************
// Packages
//*************************************
var request = require('request');


// Create class about jokes for random jokes and Chuck Norris jokes
var Jokes = function() {
  this.randomJokeURL = 'http://tambal.azurewebsites.net/joke/random';
};


// TODO: Convert this function to use Promises instead.
Jokes.prototype.getRandomJoke = function(callback) {
  request(this.randomJokeURL, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var joke = JSON.parse(body).joke;

      console.log('[!] Got a random joke!!!');
      console.log(joke);

      // Call the callback function with the joke
      callback(joke);

      return;
    } else {
      // Error!
      console.log('[!] Error: ' + error + ' with a status code of: ' + 
          response.statusCode);
    }
  }); // end of request

};

module.exports = Jokes;
