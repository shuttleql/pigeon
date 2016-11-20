'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _socket = require('./socket');

var _socket2 = _interopRequireDefault(_socket);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var io = require('socket.io')(9002, {
  origins: '*:*'
});

// keep a reference to io for socket
_socket2['default'].setSocket(io);

var app = (0, _express2['default'])();

_socket2['default'].getSocket().on('connection', function (socket) {
  console.log('Client ' + socket.id + ' connected to socket server.');

  socket.on('disconnect', function () {
    console.log('Client ' + socket.id + ' disconnected from socket server.');
  });
});

app.use((0, _cors2['default'])());

app.use(_bodyParser2['default'].text());

app.use('/', _routes2['default']);

var server = app.listen(process.env.PORT || 9001, function () {
  var _server$address = server.address();

  var address = _server$address.address;
  var port = _server$address.port;

  console.log('Pigeon running on http://' + address + ':' + port);
});
//# sourceMappingURL=server.js.map