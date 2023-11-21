import { useEffect, useState } from 'react';

import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

export default function Gamepage({
  rooms,
  setRooms,
  setGameStarted,
  fetchedQuestions,
  setFetchedQuestions,
  roomNumber,
  setRoomNumber,

}) {
  const gameStartHandler = () => setGameStarted(true);
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
    gameStartHandler();
  };

  const leaveRoom = () => {
    // Manually leave the room
    socket.emit('jermaine');

    // Remove fetched questions for the current room
  };


  // set room Number in state
  useEffect(() => {
    const handleRoomJoined = ({ roomNumber }) => {
      setRoomNumber(roomNumber);
    };

    socket.on('room_joined', handleRoomJoined);

    return () => {
      socket.off('room_joined', handleRoomJoined);
    };
  }, [rooms]);

  // Listen for the 'player_joined' event to handle the case when a player joins
  useEffect(() => {
    const handlePlayerJoined = ({ userId }) => {
      console.log(`Player with ID ${userId} has joined the game.`);
      // Implement logic to notify the remaining player that someone joined
      // You can use state to show a notification, update UI, etc.
    };

    socket.on('player_joined', handlePlayerJoined);

    return () => {
      socket.off('player_joined', handlePlayerJoined);
    };
  }, []);

  // Listen for the 'updated_rooms' event to receive updated rooms information
  useEffect(() => {
    const handleUpdatedRooms = (updatedRooms) => {
      console.log('Received rooms updated: ', updatedRooms);

      // Extract the rooms information and use it
      const { rooms } = updatedRooms;
      //Set rooms state variable
      setRooms(rooms);
      Object.keys(rooms).forEach((roomNumber) => {
        const sentQuestions = [];
        const usersInRoom = rooms[roomNumber];
        // setCurrentAmountOfPlayers(usersInRoom.length)
        if (usersInRoom.length === 2) {
          // Check if the question has already been displayed for this room
          if (!sentQuestions[roomNumber]) {
            console.log(
              `Room ${roomNumber} has two players. Emitting display_question.`
            );
            socket.emit('display_question', {
              roomNumber,
            });

            // Mark that the question has been sent for this room
            sentQuestions[roomNumber] = true;
          }
        } else {
          // If the room is not full, reset the sentQuestions flag
          sentQuestions[roomNumber] = false;
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
      if (roomNumber && questions) {
        const usersInRoom = rooms[roomNumber];
        console.log(
          'users in room: ',
          usersInRoom,
          'room number: ',
          roomNumber
        );
        console.log('Questions received:', questions);

        if (
          usersInRoom &&
          usersInRoom.length === 2 &&
          roomNumber[0] === roomNumber
        ) {
          console.log(`Received Questions in room ${roomNumber}: `, questions);

        } else {
          console.log(
            `Not enough users in room ${roomNumber} to display questions`
          );
        }
      }
    };
},[])

    socket.once('receive_question', handleQuestions);




  useEffect(() => {
    return () => {
    };
  }, [roomNumber]);

  // Listen for the 'player_left' event to handle the case when a player leaves
  useEffect(() => {
    const handlePlayerLeft = ({ userId }) => {
      console.log(`Player with ID ${userId} has left the game.`);
      // Implement logic to notify the remaining player that someone left
      // You can use state to show a notification, update UI, etc.
    };

    socket.on('player_left', handlePlayerLeft);

    return () => {
      socket.off('player_left', handlePlayerLeft);
    };
  }, []);

  // cleanup socket connection when component unmounts
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <button onClick={joinRoom}>Play Multiplayer</button>
      <button onClick={leaveRoom}>Leave Game</button>
      <button onClick={() => submitAnswer('Submitted Answer')}>Submit</button>
    </div>
  );
}
