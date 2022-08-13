'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');

const INTERVAL = 1000;
const PORT = process.env.PORT;

const horses = [
  {
    name: 'Princess Diana',
    distance: 0,
  },
  {
    name: 'Cricket',
    distance: 0,
  },
  {
    name: 'Rebel',
    distance: 0,
  },
  {
    name: 'Lucy',
    distance: 0,
  },
  {
    name: 'Lacey',
    distance: 0,
  },
  {
    name: 'Ginger',
    distance: 0,
  },
];

const maxDistance = 1000;
const maxStep = 50;

function randomValue() {
  return Math.round(Math.random() * maxStep);
}

function getRound(socket) {
  const round = horses.map((horse) => {
    const currentDistance = (horse.distance += randomValue());

    return {
      name: horse.name,
      distance: maxDistance < currentDistance ? maxDistance : currentDistance,
    };
  });

  socket.emit('ticker', round);
}

function trackTickers(socket) {
  getRound(socket);

  const timer = setInterval(function () {
    getRound(socket);
  }, INTERVAL);

  socket.on('disconnect', function () {
    clearInterval(timer);
    horses.map((horse) => (horse.distance = 0));
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: '*',
  },
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

socketServer.on('connection', (socket) => {
  socket.on('start', () => {
    horses.map((horse) => (horse.distance = 0));
    trackTickers(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
