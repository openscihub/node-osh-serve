var host = require('osh-test-host');
var Path = require('osh-path');

module.exports = Path({
  host: host(), // Resolves to '' in browser, 'localhost:port' in node
  pattern: '/users/<user>',
  params: {
    user: /\w+/
  }
});
