require('dotenv').config();
const fetch = require('node-fetch');
const { app, io, server } = require('./app');
const port = process.env.PORT;

const users = {};
const rooms = {};
const sentQuestions = {};
const userAnswers = {};
let roomNumber = 1;

const getQuestions = async () => {
  try {
    const res = await fetch(`https://jabbascript-api.onrender.com/battle`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // join room

  socket.on('join_room', () => {
    let joinedRoomNumber = roomNumber;

    while (rooms[joinedRoomNumber] && rooms[joinedRoomNumber].length >= 2) {
      joinedRoomNumber++;
    }

    socket.join(joinedRoomNumber);
    users[socket.id] = joinedRoomNumber;
    rooms[joinedRoomNumber] = rooms[joinedRoomNumber] || [];
    rooms[joinedRoomNumber].push(socket.id);
    console.log(`User ${socket.id} joined room: ${joinedRoomNumber}`);

    socket.emit('room_joined', { roomNumber: joinedRoomNumber });
    console.log(joinedRoomNumber);
    console.log(rooms);

    io.emit('updated_room', { users, rooms }); // passes rooms
  });

  // Broadcast questions logic
  socket.on('display_question', async ({ roomNumber }) => {
    try {
      console.log('Room number from display q func', roomNumber);
      if (rooms[roomNumber] && !sentQuestions[roomNumber]) {
        const questions = await getQuestions();
        io.to(parseInt(roomNumber)).emit('receive_question', {
          roomNumber: roomNumber,
          questions: questions,
        });

        // console.log(
        //   `Questions emitted to room ${roomNumber}: `,
        //   battleQuestions
        // );

        // Mark that questions have been sent for this room
        sentQuestions[roomNumber] = true;
      } else {
        console.error('User is not in a valid room');
      }
    } catch (err) {
      console.log(err);
    }
  });

  // Log the received receive_question event
  socket.on('receive_question', ({ roomNumber, questions }) => {
    console.log(
      `Received receive_question event for room ${roomNumber}: `,
      questions
    );
  });

  // User answers logic
  socket.on('submit_answer', ({ roomNumber, userId, answer }) => {
    // Store users answers in the room along with user information
    userAnswers[roomNumber] = userAnswers[roomNumber] || [];
    userAnswers[roomNumber].push({ userId, answer });

    // Check if both users answered
    const answersInRoom = userAnswers[roomNumber];
    if (answersInRoom.length === 2) {
      // Both users have answered, emit the answers to both users
      const user1Answer = answersInRoom[0];
      const user2Answer = answersInRoom[1];

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
