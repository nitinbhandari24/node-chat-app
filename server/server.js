const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

var app = express()
var server = http.createServer(app)
var io = socketIO(server)


app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newEmail', {
  //   from: "nitin@example.com",
  //   text: "Mail generated",
  //   createdAt: 213
  // })
  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  // })

// TO message to a particular user
  // socket.emit('newMessage', {
  //   from: 'nitin',
  //   text: 'Message generated',
  //   createdAt: 123
  // });

  socket.on('createMessage', (message) => {
    console.log("createMessage", message);
// TO message to all user(broadcast)
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime
    })
  });

  socket.on('disconnect', () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`App is up on port ${port}`);
});
