let _socket = null;

export default {
  setSocket(socket) {
    _socket = socket;
  },
  getSocket() {
    return _socket;
  },
  emit(event, data) {
    _socket.emit(event, data);
  }
};
