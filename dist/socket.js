"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _socket = null;

exports["default"] = {
  setSocket: function setSocket(socket) {
    _socket = socket;
  },
  getSocket: function getSocket() {
    return _socket;
  },
  emit: function emit(event, data) {
    _socket.emit(event, data);
  }
};
module.exports = exports["default"];
//# sourceMappingURL=socket.js.map