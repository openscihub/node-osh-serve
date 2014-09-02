var userPath = require('./user-path');
var Path = require('osh-path');

var users = {
  tory: {
    id: 'tory',
    name: 'Tory',
    occ: 'Nurse'
  },
  adam: {
    id: 'adam',
    name: 'Adam',
    occ: 'Professor of Physics'
  }
};


module.exports = {
  user: userPath.New({
    pattern: '/api' + userPath.pattern,
    get: function(req, res) {
      var user = users[req.params.user];
      if (user) {
        res.send(user);
      }
      else {
        res.status(404);
        res.send({
          message: 'User ' + req.params.user + ' not found.'
        });
      }
    }
  })
};
