const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage, generateLocationMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

var app = express()
var server = http.createServer(app)
var io = socketIO(server)


app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected');

//TO message to a particular user
  socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'))


  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);

//TO message to all user from one user
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback('This is the acknowledgement of receiving message from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`App is up on port ${port}`);
});
