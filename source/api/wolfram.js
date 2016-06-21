//*************************************
// Packages
//*************************************
//
var Client = require('node-wolfram');



/** 
 *
 * A wrapper class for making calls on the api of Wolfram Alpha
 *
 * */
var Wolfram = function(wolfram_token) {
  this.wolfram = new Client(wolfram_token);
};

Wolfram.prototype.define = function(word, callback) {
  var query = 'define ' + word;

  // Support callback for backward compatibility
  callback = callback || function() {};

  return new Promise((resolve, reject) => {
    this.wolfram.query(query, function(error, result) {
      if (error) {
        console.log('[!] Error: ' + error);

        reject(error);
        return callback(error);
      } 

      // Extract the result
      for(var a=0; a < result.queryresult.pod.length; a++) {
        var pod = result.queryresult.pod[a];
        console.log(pod.$.title,": ");

        for(var b=0; b < pod.subpod.length; b++) {
          var subpod = pod.subpod[b];

          for(var c=0; c < subpod.plaintext.length; c++) {
            var text = subpod.plaintext[c];

            // Got the result. Resolve or call the callback
            resolve(text);
            return callback(null, text);
          } // end of c loop
        } // end of b loop
      } // end of a loop

    }); // end of wolfram query
  }); // end of Promise
}; // end of define

module.exports = Wolfram;
