var Regex = function() {
  this.urlRegex = new RegExp("([a-zA-Z0-9]+\.[a-zA-Z]{2,3}(?=>))(?=.*down\?)");
};

Regex.prototype.isAskingWebsiteDown = function(string) {
  return this.urlRegex.test(string);
};

Regex.prototype.getURL = function(string) {
  var url = this.urlRegex.exec(string);
  return url[0];
};

module.exports = Regex;
