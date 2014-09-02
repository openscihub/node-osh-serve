var Page = require('osh-page');
var userPath = require('./user-path');
var api = require('./api');

module.exports = Page({
  title: function(props) {
    return props.data.user.name + '\'s page!';
  },
  path: userPath,
  data: {
    user: {
      path: api.user
    }
  },
  body: function(props) {
    var user = props.data.user;
    return (
      '<ul>' +
        '<li>Name: ' + user.name + '</li>' +
        '<li>Occupation: ' + user.occ + '</li>' +
      '</ul>'
    );
  }
  //React.createClass({
  //  render: function() {
  //    var user = this.props.data.user;
  //    return React.DOM.ul(null,
  //      React.DOM.li(null, 'Name: ' + user.name),
  //      React.DOM.li(null, 'Occupation: ' + user.occ)
  //    );
  //  }
  //})
});
