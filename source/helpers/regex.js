var Regex = function() {
  this.urlRegex = new RegExp("is ([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)? down\?");
};

Regex.prototype.isAskingWebsiteDown = function(string) {
  if (this.urlRegex.test(string))
    return true;
  else
    return false;
};

Regex.prototype.getURL = function(string) {
  var resultURL = this.urlRegex.exec(string);
  var domain = resultURL[1];
  var tld = resultURL[2];

  var url = domain + tld;

  return url;
};

module.exports = Regex;
