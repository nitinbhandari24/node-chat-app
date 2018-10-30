var socket = io();

socket.on('connect', function () {
  console.log("Connected to server");

//   socket.emit('createEmail', {
//     to: 'test@example.com',
//     text: 'Create the email'
//   })
// })

  socket.emit('createMessage', {
    from: 'nitin',
    text: 'This is text to send as message'
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from the server');
});

// socket.on('newEmail', function (email) {
//   console.log("New Email", email);
// })

socket.on('newMessage', function (message) {
  console.log("newMessage", message);
});
