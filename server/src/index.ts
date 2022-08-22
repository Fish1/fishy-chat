import express from 'express';
import cors from 'cors';
import http from 'http';;

import socketIO from 'socket.io';

import config from './config';
config.initialize();

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new  socketIO.Server(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', async (socket) => {
  console.log(`${socket.id} user just connected`);
  console.log(await io.allSockets());
  io.sockets.emit('connectedUsers', [...await io.allSockets()]);

  socket.on('disconnect', async () => {
    console.log(`${socket.id} user just disconnected`);
    io.sockets.emit('connectedUsers', [...await io.allSockets()]);
  });

  socket.on('message', ( data ) => {
    data.id = socket.id;
    io.sockets.emit('messageResponse', data);
  });

  socket.on('getUsers', async () => {
    io.sockets.emit('connectedUsers', await io.allSockets());
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World! 2'
  })
});

server.listen(config.getPort(), () => {
  console.log(`Server started on port ${config.getPort()}`);
});