var moniker = require('moniker');
var username = moniker.choose();

console.log(username);
module.exports = (obj) => {
  var str = '<b>';
  str += obj.username;
  str += '</b>';
}
