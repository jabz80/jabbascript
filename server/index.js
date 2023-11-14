require('dotenv').config();
const { app, io, server } = require('./app');
const port = process.env.PORT;

const users = {};
const rooms = {};

let roomNumber = 1;
console.log(rooms);

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // join room

  socket.on('join_room', () => {
    while (rooms[roomNumber] && rooms[roomNumber].length >= 2) {
      roomNumber++;
    }

    socket.join(roomNumber);
    users[socket.id] = roomNumber;
    rooms[roomNumber] = rooms[roomNumber] || [];
    rooms[roomNumber].push(socket.id);
    console.log(rooms);
  });
  // Broadcast logic

  // Disconnection logic

  // Disconnection logic
  socket.on('disconnect', () => {
    console.log('User disconnected');
    
    const userRoomNumber = users[socket.id];
    if (userRoomNumber) {
      const userIndex = rooms[userRoomNumber].indexOf(socket.id);

      if (userIndex !== -1) {
        rooms[userRoomNumber].splice(userIndex, 1);
        console.log(rooms);
      }
    }

    socket.leave(userRoomNumber);

    // socket.broadcast.emit('user-disconnected', users[socket.id]); // use this same function on frontend to handle user leaving game page
    // delete users[socket.id];
  });

  // Additional logic to handle 'jermaine' event
  socket.on('jermaine', () => {
    console.log('Received jermaine event on the server');
    const userRoomNumber = users[socket.id];
    if (userRoomNumber) {
      const userIndex = rooms[userRoomNumber].indexOf(socket.id);

      if (userIndex !== -1) {
        rooms[userRoomNumber].splice(userIndex, 1);
      }
    }

    socket.leave(userRoomNumber);

    // socket.broadcast.emit('user-disconnected', users[socket.id]); // use this same function on frontend to handle user leaving game page
    // delete users[socket.id];

    console.log(rooms);
  });
});

// ! Activate server

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
