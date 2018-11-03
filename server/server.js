const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage} = require('./utils/message')
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

//TO message to a particular user
  socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'))


  socket.on('createMessage', (message) => {
    console.log('createMessage', message);

//TO message to all user from one user
    io.emit('newMessage', generateMessage(message.from, message.text))

  });

  socket.on('disconnect', () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`App is up on port ${port}`);
});
