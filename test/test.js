var serve = require('..');
var expect = require('expect.js');
var host = require('osh-test-host');
var _ = require('lodash');
var request = require('superagent');
var morgan = require('morgan');
var express = require('express');

describe('osh-serve', function() {
  it('should work', function(done) {
    var api = require('./app/api');

    var app = express();

    app.use(morgan('combined'));

    serve({
      app: app,
      dir: __dirname + '/app',
      pages: [
        //'./home',
        'user-page'
      ],
      paths: _.values(api),
      scripts: {serve: true}
    });

    app.on('error', done);

    app.on('serving', function() {
      app.listen(host.port, function() {
        request.get(host() + '/users/adam')
        .end(function(err, res) {
          console.log(res.text);
          done();
        });
      });
    });
  });
});
