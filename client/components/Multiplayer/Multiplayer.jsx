import { useEffect, useState } from 'react';

import io from 'socket.io-client';

const socket = io.connect('https://jabbascript-api.onrender.com');

export default function Gamepage() {
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [rooms, setRooms] = useState({});

  //
  const submitAnswer = (answer) => {
    socket.emit('submit_answer', { roomNumber, userId: socket.id, answer });
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
    const handleQuestions = (data) => {
      const usersInRoom = rooms[data.roomNumber];

      if (usersInRoom && usersInRoom.length === 2) {
        console.log(
          `Received Questions in room ${data.roomNumber}: `,
          data.questions
        );
        setFetchedQuestions((prevQuestions) => [
          ...prevQuestions,
          ...data.questions,
        ]);
        console.log(fetchedQuestions);
      } else {
        console.log(
          `Not enough users in room ${data.roomNumber} to display questions`
        );
      }
      console.log(fetchedQuestions);
    };

    console.log(fetchedQuestions);

    socket.on('receive_question', handleQuestions);

    return () => {
      socket.off('receive_question', handleQuestions);
    };
  }, [rooms]);
  console.log(fetchedQuestions);

  useEffect(() => {
    const handleDisplayAnswers = ({ user1Answer, user2Answer }) => {
      console.log('User1Answer', user1Answer);
      console.log('User2Answer', user2Answer);

      //Implement logic to display answers to users
    };

    socket.on('display_answers', handleDisplayAnswers);
  }, []);

  return (
    <div>
      <button onClick={joinRoom}>Play Multiplayer</button>
      <button onClick={leaveRoom}>Leave Game</button>
    </div>
  );
}
