/** 
 * 
 * A helper class for extracting strings, data
 *
 * */


var Regex = function() {
  this.urlRegex = new RegExp("(https?:\/\/(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,3})(?=.*down\?)");
};

Regex.prototype.isAskingWebsiteDown = function(string) {
  return this.urlRegex.test(string);
};

Regex.prototype.getURL = function(string) {
  var url = this.urlRegex.exec(string);
  console.log('[!] URL: ' + url[0]);
  return url[0];
};


module.exports = Regex;
