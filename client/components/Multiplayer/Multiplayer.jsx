import { useEffect, useState } from 'react';

import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

export default function Gamepage() {
  const [roomNumber, setRoomNumber] = useState([]);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [rooms, setRooms] = useState({});

  //
  const submitAnswer = (answer) => {
    socket.emit('submit_answer', {
      roomNumber,
      userId: socket.id,
      answer,
    });
  };

  const joinRoom = () => {
    socket.emit('join_room');
  };

  const leaveRoom = () => {
    socket.emit('jermaine');
  };

  // socket.on('updated_rooms', (updatedRooms) => {
  //   console.log('Received rooms updated: ', updatedRooms);
  // });

  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     leaveRoom();
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  // set room Number in state
  useEffect(() => {
    const handleRoomJoined = ({ roomNumber }) => {
      setRoomNumber([roomNumber]);
    };

    socket.on('room_joined', handleRoomJoined);

    return () => {
      socket.off('room_joined', handleRoomJoined);
    };
  }, [rooms]);

  // Listen for the 'updated_rooms' event to receive updated rooms information
  useEffect(() => {
    const handleUpdatedRooms = (updatedRooms) => {
      console.log('Received rooms updated: ', updatedRooms);

      // Extract the rooms information and use it
      const { rooms } = updatedRooms;
      //Set rooms state variable
      setRooms(rooms);
      Object.keys(rooms).forEach((roomNumber) => {
        const usersInRoom = rooms[roomNumber];

        if (usersInRoom.length === 2) {
          console.log(
            `Room ${roomNumber} has two players. Emitting display_question.`
          );
          socket.emit('display_question', {
            roomNumber,
          });
        }
      });
    };

    socket.on('updated_room', handleUpdatedRooms);

    return () => {
      socket.off('updated_room', handleUpdatedRooms);
    };
  }, [rooms]);

  useEffect(() => {
    const handleQuestions = ({ roomNumber, questions }) => {
      console.log(`hello world: ${roomNumber}`);
      console.log(`battle questions: ${questions}`);

      if (roomNumber && questions) {
        const usersInRoom = rooms[roomNumber];
        console.log(usersInRoom);
        console.log('Questions received:', questions);

        if (
          usersInRoom &&
          usersInRoom.length === 2 &&
          roomNumber[0] === roomNumber
        ) {
          console.log(`Received Questions in room ${roomNumber}: `, questions);
          setFetchedQuestions((prevQuestions) => [
            ...prevQuestions,
            ...questions,
          ]);
        } else {
          console.log(
            `Not enough users in room ${roomNumber} to display questions`
          );
        }
      }
    };

    socket.on('receive_question', handleQuestions);

    return () => {
      socket.off('receive_question', handleQuestions);
    };
  }, [fetchedQuestions, rooms]);

  console.log('Fetched Questions State: ', fetchedQuestions);

  useEffect(() => {
    const handleDisplayAnswers = ({ user1Answer, user2Answer }) => {
      console.log(
        'User1Answer:',
        user1Answer.userId,
        'Answer:',
        user1Answer.answer
      );
      console.log(
        'User2Answer:',
        user2Answer.userId,
        'Answer:',
        user2Answer.answer
      );

      //Implement logic to display answers to users
    };

    socket.on('display_answers', handleDisplayAnswers);
  }, []);

  return (
    <div>
      <button onClick={joinRoom}>Play Multiplayer</button>
      <button onClick={leaveRoom}>Leave Game</button>
      <button onClick={() => submitAnswer('Submitted Answer')}>Submit</button>
      {fetchedQuestions.map((q) => (
        <div key={q.q_battle_id}>{q.question}</div>
      ))}
    </div>
  );
}
