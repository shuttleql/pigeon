'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var app = (0, _express2['default'])();

app.use('/', _routes2['default']);

var server = app.listen(process.env.PORT || 9001, function () {
  var _server$address = server.address();

  var address = _server$address.address;
  var port = _server$address.port;

  console.log('Pigeon running on http://' + address + ':' + port);
});
//# sourceMappingURL=server.js.map