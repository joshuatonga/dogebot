/** 
 * 
 * A helper class for extracting strings, data
 *
 * */


var Regex = function() {
  this.urlRegex = new RegExp("(https?:\/\/(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,3})(?=.*down\?)");
  this.whatIsRegex = new RegExp("(?:what is ([a-zA-Z]+)\?)");
};

Regex.prototype.isAskingWebsiteDown = function(string) {
  return this.urlRegex.test(string);
};

Regex.prototype.isAskingWord = function(string) {
  return this.whatIsRegex.test(string);
};


Regex.prototype.getURL = function(string) {
  var url = this.urlRegex.exec(string);
  return url[0];
};

Regex.prototype.getWord = function(string) {
  var word = this.whatIsRegex.exec(string);
  console.log(word);
  return word[1];
};


module.exports = Regex;
