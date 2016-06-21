/**
 *
 * Wrapper class for the jokes API
 *
 * */



//*************************************
// Packages
//*************************************
var request = require('request');



var Jokes = function() {
  this.randomJokeURL = 'http://tambal.azurewebsites.net/joke/random';
  this.chuckNorrisFactURL = 'https://api.chucknorris.io/jokes/random';
};


Jokes.prototype.getRandomJoke = function(callback) {

  // Support callback for backward compatibility
  callback = callback || function() {}

  return new Promise((resolve, reject) => {
    request(this.randomJokeURL, function(error, response, body) {
      if (error && response.statusCode !== 200) {
        console.log('[!] Error: ' + error + ' with a status code of: ' + 
            response.statusCode);

        reject(error);
        return callback(error);
      }


      var joke = JSON.parse(body).joke;

      resolve(joke);
      return callback(null, joke);
    }); // end of request
  }); // end of Promise
}; // end of getRandomJoke


Jokes.prototype.getNorrisFact = function(callback) {

  // Support callback for backward compatibility
  callback = callback || function() {}

  return new Promise((resolve, reject) => {
    request(this.chuckNorrisFactURL, function(error, response, body) {
      if (error && response.statusCode !== 200) {
        console.log('[!] Error: ' + error + ' with a status code of: ' + 
            response.statusCode);

        reject(error);
        return callback(error);
      }


      var fact = JSON.parse(body).value;

      resolve(fact);
      return callback(null, fact);
    }); // end of request
  }); // end of Promise
}; // end of getNorrisFact

module.exports = Jokes;
