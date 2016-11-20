import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import Socket from './socket';
import cors from 'cors';

const io = require('socket.io')(9002, {
  origins: '*:*'
});

// keep a reference to io for socket
Socket.setSocket(io);

const app = express();

Socket.getSocket().on('connection', (socket) => {
  console.log(`Client ${socket.id} connected to socket server.`);

  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnected from socket server.`);
  });
});

app.use(cors());

app.use(bodyParser.text());

app.use('/', routes);

const server = app.listen(process.env.PORT || 9001, () => {
  const {address, port} = server.address();

  console.log(`Pigeon running on http://${address}:${port}`);
});
