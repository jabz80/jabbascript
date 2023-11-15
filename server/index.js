require('dotenv').config();
const fetch = require('node-fetch');
const { app, io, server } = require('./app');
const port = process.env.PORT;

const users = {};
const rooms = {};
const sentQuestions = {};
const userAnswers = {};

const getQuestions = async () => {
  try {
    const res = await fetch(`https://jabbascript-api.onrender.com/battle`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

let roomNumber = 1;

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

    io.emit('updated_room', { users, rooms }); // passes rooms
  });

  // Broadcast logic
  socket.on('display_question', async ({ roomNumber }) => {
    try {
      if (rooms[roomNumber] && !sentQuestions[roomNumber]) {
        const questions = await getQuestions();
        // console.log(`Questions emitted to room ${roomNumber}: `, questions);
        io.to(roomNumber).emit('receive_question', { roomNumber, questions });

        // Mark that questions have been sent for this room
        sentQuestions[roomNumber] = true;
      } else {
        console.error('User is not in a valid room');
      }
    } catch (err) {
      console.log(err);
    }
  });

  // User answers logic

  socket.on('submit_answer', ({ roomNumber, userId, answer }) => {
    // Store users answers in the room
    userAnswers[roomNumber] = userAnswers[roomNumber] || {};
    userAnswers[roomNumber][userId] = answer;

    //Check if both users answered
    const answersInRoom = userAnswers[roomNumber];
    const userIds = Object.keys(answersInRoom);
    if (userIds.length === 2) {
      //Both users have answered, emit the answers to both users
      const user1Answer = answersInRoom[userIds[0]];
      const user2Answer = answersInRoom[userIds[1]];

      io.to(roomNumber).emit('display_answers', { user1Answer, user2Answer });

      delete userAnswers[roomNumber];
    }
  });

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

      sentQuestions[roomNumber] = false;
      delete users[socket.id];
    }

    socket.leave(userRoomNumber);

    // socket.broadcast.emit('user-disconnected', users[socket.id]);
    // delete users[socket.id];

    // socket.broadcast.emit('user-disconnected', users[socket.id]); // use this same function on frontend to handle user leaving game page
    // delete users[socket.id];
  });

  // Manual disconnection logic
  socket.on('jermaine', () => {
    console.log('Received jermaine event on the server');
    const userRoomNumber = users[socket.id];
    if (userRoomNumber) {
      const userIndex = rooms[userRoomNumber].indexOf(socket.id);

      if (userIndex !== -1) {
        rooms[userRoomNumber].splice(userIndex, 1);
      }

      sentQuestions[roomNumber] = false;
      delete users[socket.id];
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
