// import React, { useContext, useEffect, useState } from 'react';
// import { AnswerForm, AnswerFormOutput } from '../index';
// import { AuthContext } from '../../contexts/Auth';
// import { Link } from 'react-router-dom';
// import LoseImage from '../../assets/img/lose-image.png';
// import io from 'socket.io-client';

// const socket = io.connect('http://localhost:3000');
// function MultiplayerFightCodeSection({
//   setPythonCode,
//   pythonCode,
//   checkTheAnswer,
//   fetchedQuestions,
//   // setFetchedQuestions,
//   currentQuestionIndex,
//   setCurrentQuestionIndex,
//   fightResult,
//   roomNumber,
//   setRoomNumber,
//   rooms,
//   setRooms,
//   currentAmountOfPlayers,
//   setCurrentAmountOfPlayers,
//   currentRoomQuestion,
//   setCurrentRoomQuestion,
// }) {

//   const { authToken } = useContext(AuthContext) || {};


//   const submitAnswer = (answer) => {
//     const currentQuestion = currentRoomQuestion[currentQuestionIndex];
//     socket.emit('submit_answer', {
//       roomNumber,
//       userId: socket.id,
//       answer,
//       question: currentQuestion,
//       currentRoomQuestion,
//       setCurrentQuestionIndex,
//     });
//   };

//   const joinRoom = () => {
//     socket.emit('join_room');
//     // setCurrentRoomQuestion([]);
//   };

//   // const leaveRoom = () => {
//   //   // Manually leave the room
//   //   socket.emit('jermaine');
//   //   // Remove fetched questions for the current room
//   //   setFetchedQuestions((prevQuestions) =>
//   //     prevQuestions.filter((q) => q.roomNumber !== roomNumber)
//   //   );
//   // };

//   // socket.on('updated_rooms', (updatedRooms) => {
//   //   console.log('Received rooms updated: ', updatedRooms);
//   // });

//   // useEffect(() => {
//   //   const handleBeforeUnload = () => {
//   //     leaveRoom();
//   //   };

//   //   window.addEventListener('beforeunload', handleBeforeUnload);

//   //   return () => {
//   //     window.removeEventListener('beforeunload', handleBeforeUnload);
//   //   };
//   // }, []);

//   // set room Number in state
//   useEffect(() => {
//     const handleRoomJoined = ({ roomNumber }) => {
//       setRoomNumber(roomNumber);
//     };

//     socket.on('room_joined', handleRoomJoined);

//     return () => {
//       socket.off('room_joined', handleRoomJoined);
//     };
//   }, [rooms]);

//   // Listen for the 'player_joined' event to handle the case when a player joins
//   useEffect(() => {
//     const handlePlayerJoined = ({ userId }) => {
//       console.log(`Player with ID ${userId} has joined the game.`);
//       // Implement logic to notify the remaining player that someone joined
//       // You can use state to show a notification, update UI, etc.
//     };

//     socket.on('player_joined', handlePlayerJoined);

//     return () => {
//       socket.off('player_joined', handlePlayerJoined);
//     };
//   }, []);

//   // Listen for the 'updated_rooms' event to receive updated rooms information
//   useEffect(() => {
//     const handleUpdatedRooms = (updatedRooms) => {
//       console.log('Received rooms updated: ', updatedRooms);

//       // Extract the rooms information and use it
//       const { rooms } = updatedRooms;
//       //Set rooms state variable
//       setRooms(rooms);
//       Object.keys(rooms).forEach((roomNumber) => {
//         const sentQuestions = [];
//         const usersInRoom = rooms[roomNumber];
//         // setCurrentAmountOfPlayers(usersInRoom.length)
//         if (usersInRoom.length === 2) {
//           // Check if the question has already been displayed for this room
//           if (!sentQuestions[roomNumber]) {
//             console.log(
//               `Room ${roomNumber} has two players. Emitting display_question.`
//             );
//             socket.emit('display_question', {
//               roomNumber,
//             });

//             // Mark that the question has been sent for this room
//             sentQuestions[roomNumber] = true;
//           }
//         } else {
//           // If the room is not full, reset the sentQuestions flag
//           sentQuestions[roomNumber] = false;
//         }
//       });
//     };

//     socket.on('updated_room', handleUpdatedRooms);

//     return () => {
//       socket.off('updated_room', handleUpdatedRooms);
//     };
//   }, [rooms]);


//   useEffect(() => {
//     const handleQuestions = ({ roomNumber, questions }) => {
//       if (roomNumber && questions) {
//         const usersInRoom = rooms[roomNumber];
//         console.log(
//           'users in room: ',
//           usersInRoom,
//           'room number: ',
//           roomNumber
//         );
//         console.log('Questions received:', questions);

//         if (
//           usersInRoom &&
//           usersInRoom.length === 2 &&
//           roomNumber[0] === roomNumber
//         ) {
//           console.log(`Received Questions in room ${roomNumber}: `, questions);

//           // Check if the roomNumber already exists in fetchedQuestions
//           const roomExists = fetchedQuestions.some(
//             (q) => q.roomNumber === roomNumber
//           );

//           // If the room doesn't exist, update the state
//           // if (!roomExists) {
//           //   setFetchedQuestions((prevQuestions) => [
//           //     ...prevQuestions,
//           //     { roomNumber, questions },
//           //   ]);
//           // }
//           console.log('fetched questions: ', fetchedQuestions);
//         } else {
//           console.log(
//             `Not enough users in room ${roomNumber} to display questions`
//           );
//         }
//       }
//     };

//     socket.once('receive_question', handleQuestions);

//     return () => {
//       socket.off('receive_question', handleQuestions);
//     };
//   }, [roomNumber, rooms, fetchedQuestions]);

//   useEffect(() => {
//     const handleDisplayAnswers = ({ user1Answer, user2Answer }) => {
//       console.log(
//         'User1Answer:',
//         user1Answer.userId,
//         'Answer:',
//         user1Answer.answer
//       );
//       console.log(
//         'User2Answer:',
//         user2Answer.userId,
//         'Answer:',
//         user2Answer.answer
//       );
//       if (user1Answer.answer === user1Answer.answer) {
//         console.log('wow');
//       }

  

//       //Implement logic to display answers to users
//     };

//     socket.on('display_answers', handleDisplayAnswers);
//   }, []);

//   // useEffect(() => {
//   //   return () => {
//   //     // Remove fetched questions for the current room when leaving
//   //     setFetchedQuestions((prevQuestions) =>
//   //       prevQuestions.filter((q) => q.roomNumber !== roomNumber)
//   //     );
//   //   };
//   // }, [roomNumber]);

//   // Listen for the 'player_left' event to handle the case when a player leaves
//   useEffect(() => {
//     const handlePlayerLeft = ({ userId }) => {
//       console.log(`Player with ID ${userId} has left the game.`);
//       // Implement logic to notify the remaining player that someone left
//       // You can use state to show a notification, update UI, etc.
//     };

//     socket.on('player_left', handlePlayerLeft);

//     return () => {
//       socket.off('player_left', handlePlayerLeft);
//     };
//   }, []);

//   // cleanup socket connection when component unmounts
//   useEffect(() => {
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     const tempQuestions = [];

//     fetchedQuestions.forEach((q) => {
//       q.questions.forEach((questionObj) => {
//         tempQuestions.push(questionObj);
//       });
//     });
//     setCurrentRoomQuestion(tempQuestions);
//   }, [fetchedQuestions]);

//   const clickCheckTheAnswer = () => {
//     submitAnswer();
//   };
//   return (
//     <>
//       <div>
//         <button onClick={joinRoom}>Play Multiplayer</button>
//         <button onClick={leaveRoom}>Leave Game</button>
//         <button onClick={() => submitAnswer('Submitted Answer')}>Submit</button>
//       </div>
//       <div className="container my-3" id="fightCodeSection">
//         {fightResult ? (
//           <div className="d-flex flex-column justify-content-center align-items-center">
//             <h1>{fightResult}</h1>
//             {!authToken && (
//               <>
//                 <img src={LoseImage} />
//                 <div className="lead mt-5 mb-3">Join and practice more!</div>
//                 <Link to="/register" className="btn btn-info">
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         ) : (
//           <div className="row">
//             <div className="col-4">
//               <h4>
//                 (Room number {roomNumber}) (users: {currentAmountOfPlayers})
//               </h4>
//               <h3 id="fightRoundNumber">
//                 Round {currentQuestionIndex + 1}/{currentRoomQuestion.length}
//               </h3>
//               <p id="fightRoundDescription">
//                 {currentRoomQuestion[currentQuestionIndex]?.question}
//               </p>
//               <p id="answer">
//                 {currentRoomQuestion[currentQuestionIndex]?.answer}
//               </p>
//             </div>
//             <div className="col-8 d-flex align-items-center justify-content-center">
//               <div className="row">
//                 <div className="col-6">
//                   <AnswerForm
//                     setPythonCode={setPythonCode}
//                     pythonCode={pythonCode}
//                   />
//                 </div>
//                 <div className="col-6">
//                   <AnswerFormOutput pythonCode={pythonCode} />
//                   <button
//                     onClick={() => {
//                       clickCheckTheAnswer();
//                     }}
//                     className={`btn btn-outline-primary btn-lg ${
//                       currentRoomQuestion.length + 1 == currentQuestionIndex
//                         ? 'disabled'
//                         : ''
//                     }`}
//                   >
//                     Check
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default MultiplayerFightCodeSection;
