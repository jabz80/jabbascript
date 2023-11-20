require('dotenv').config();
const fetch = require('node-fetch');
const { app, io, server } = require('./app');
const port = process.env.PORT;

const users = {};
const rooms = {};
const sentQuestions = {};
const userAnswers = {};
let roomNumber = 1;

// Fetch Questions

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

    io.to(joinedRoomNumber).emit('player_joined', { userId: socket.id });
    io.emit('updated_room', { users, rooms }); // passes rooms
  });

  // Broadcast questions logic
  socket.on('display_question', async ({ roomNumber }) => {
    try {
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
  socket.on(
    'submit_answer',
    ({
      roomNumber,
      userId,
      answer,
      question,
      currentRoomQuestion,
      setCurrentQuestionIndex,
    }) => {
      // Store users answers in the room along with user information
      console.log(question);

      userAnswers[roomNumber] = userAnswers[roomNumber] || [];
      userAnswers[roomNumber].push({ userId, answer });

      // Check if both users answered
      const answersInRoom = userAnswers[roomNumber];
      if (answersInRoom.length === 2) {
        // Both users have answered, emit the answers to both users
        const user1Answer = answersInRoom[0];
        const user2Answer = answersInRoom[1];

        io.to(roomNumber).emit('display_answers', { user1Answer, user2Answer });

        handleRoundResult(
          user1Answer,
          user2Answer,
          roomNumber,
          question,
          currentRoomQuestion,
          setCurrentQuestionIndex
        );

        delete userAnswers[roomNumber];
      }
    }
  );

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

      // Emit a 'player_left' event to notify other players in the room
      io.to(userRoomNumber).emit('player_left', { userId: socket.id });
    }

    socket.leave(userRoomNumber);

    // socket.broadcast.emit('user-disconnected', users[socket.id]); // use this same function on frontend to handle user leaving game page
    // delete users[socket.id];
    console.log(rooms);
  });
});

function showBeam() {
  // Move the logic here to setBeamVisible on the server
  io.emit('show_beam'); // This should emit an event to the frontend to handle the beam visibility
}

function handleRoundResult(
  user1Answer,
  user2Answer,
  roomNumber,
  question,
  currentRoomQuestion,
  setCurrentQuestionIndex
) {
  // Get the current question index from the client side
  const currentQuestionIndex = currentRoomQuestion.findIndex(
    (q) => q.question === question.question
  );

  // Your existing logic for checking the answer and displaying the results
  console.log(user1Answer, user2Answer);
  console.log(question);

  if (
    question.answer === user1Answer.answer &&
    question.answer === user2Answer.answer
  ) {
    // It's a draw or handle it according to your game rules
    // Update game state accordingly
    console.log('its a draw');
  } else if (question.answer === user1Answer.answer) {
    // Player 1 wins the round
    setRoundWinner(1);
    setPointsPlayerOne((prevPoints) => prevPoints + 1);
    setHealthPlayerTwo((prevProgress) =>
      Math.round(prevProgress - 100 / currentRoomQuestion.length, 1)
    );
    addTenPointsToWinner();
  } else if (question.answer === user2Answer.answer) {
    // Player 2 wins the round
    setRoundWinner(2);
    setPointsPlayerTwo((prevPoints) => prevPoints + 1);
    setHealthPlayerOne((prevProgress) =>
      Math.round(prevProgress - 100 / currentRoomQuestion.length, 1)
    );
  }

  // Update other game state based on the round result
  showBeam();

  // Check if it's the last question
  if (currentQuestionIndex === currentRoomQuestion.length - 1) {
    setTimer(0);
    if (pointsPlayerOne > pointsPlayerTwo) {
      setFightResult('You Win!');
    } else {
      setFightResult('You Lose!');
    }
  } else {
    // Move to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }
}

// ! Activate server

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
