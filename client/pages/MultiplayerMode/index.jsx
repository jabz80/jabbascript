import React, { useState, useContext, useEffect } from 'react';
import {
  
} from '../../components';
import { AuthContext } from '../../contexts/Auth';
import { UserContext } from '../../contexts/User';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

function index() {
  const [pythonCode, setPythonCode] = useState('');
  const [beamVisible, setBeamVisible] = useState(false);
  const [roomNumber, setRoomNumber] = useState([]);
  const [currentAmountOfPlayers, setCurrentAmountOfPlayers] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [roundWinner, setRoundWinner] = useState(0);
  const [pointsPlayerOne, setPointsPlayerOne] = useState(0);
  const [pointsPlayerTwo, setPointsPlayerTwo] = useState(0);
  const [healthPlayerOne, setHealthPlayerOne] = useState(100);
  const [healthPlayerTwo, setHealthPlayerTwo] = useState(100);
  const [fightResult, setFightResult] = useState('');
  const [timer, setTimer] = useState(60);
  const [points, setPoints] = useState(0);
  const [rooms, setRooms] = useState({});
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const { userData } = useContext(UserContext);
  const { authToken } = useContext(AuthContext) || {};
  const [checkAnswer, setCheckAnswer] = useState(false);
  // const [gameStarted, setGameStarted] = useState(false);
  const [currentRoomQuestion, setCurrentRoomQuestion] = useState([]);
  const currentCode = document.getElementById('codeOutput');
  const isAnswerCorrect = () => setCheckAnswer((prevState) => !prevState);

  const gameStartHandler = () => setGameStarted(true);

  const fetchUserPoints = async () => {
    try {
      const response = await fetch(
        `https://jabbascript-api.onrender.com/score/${userData.user_id}`
      );
      const data = await response.json();
      setPoints(data.score);
    } catch (error) {
      console.error('Error fetching points:', error);
    }
  };
  const addTenPointsToWinner = async () => {
    try {
      await fetch(
        `https://jabbascript-api.onrender.com/score/${userData.user_id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PATCH',
          body: JSON.stringify({ newScore: points + 10 }),
        }
      );
      setPoints(points + 10);
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };

  // Listen for the 'show_beam' event from the server
  useEffect(() => {
    socket.on('show_beam', () => {
      setBeamVisible(true);
      setTimeout(() => {
        setBeamVisible(false);
      }, 1000);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('show_beam');
    };
  }, [socket]);

  const startTheTimer = () => {
    const timerInterval = setInterval(() => {
      setTimer((time) => {
        if (time === 1) {
          clearInterval(timerInterval);
          checkTheAnswer();
          setTimer(60);
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  };

  const submitAnswer = (answer) => {
    const currentQuestion = currentRoomQuestion[currentQuestionIndex];
    socket.emit('submit_answer', {
      roomNumber,
      userId: socket.id,
      answer,
      question: currentQuestion,
      currentRoomQuestion,
    });
  };

  const checkTheAnswer = () => {
    // if (
    //   currentCode.innerHTML ==
    //     currentRoomQuestion[currentQuestionIndex].answer &&
    //   currentQuestionIndex + 1 < currentRoomQuestion.length
    // ) {
    //   setRoundWinner(1);
    //   setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    //   setPointsPlayerOne((prevIndex) => prevIndex + 1);
    //   setHealthPlayerTwo((prevProgress) =>
    //     Math.round(prevProgress - 100 / currentRoomQuestion.length, 1)
    //   );
    //   addTenPointsToWinner();
    // } else {
    //   setRoundWinner(2);
    //   setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    //   setPointsPlayerTwo((prevIndex) => prevIndex + 1);
    //   setHealthPlayerOne((prevProgress) =>
    //     Math.round(prevProgress - 100 / currentRoomQuestion.length, 1)
    //   );
    // }
    // showBeam();
    // if (currentQuestionIndex == currentRoomQuestion.length - 1) {
    //   setTimer(0);
    //   setCurrentQuestionIndex(currentQuestionIndex);
    //   if (pointsPlayerOne > pointsPlayerTwo) {
    //     setFightResult('You Win!');
    //   } else {
    //     setFightResult('You Lose!');
    //   }
    // }
    submitAnswer(currentCode.innerHTML);
  };
  return (
    <>
    {/* <ChatRoom/> */}
      {/* <p>Available rooms to join: {Object.keys({ rooms }['rooms'])}</p> */}
      {/* <Multiplayer
        rooms={rooms}
        setRooms={setRooms}
        setGameStarted={setGameStarted}
        fetchedQuestions={fetchedQuestions}
        setFetchedQuestions={setFetchedQuestions}
        roomNumber={roomNumber}
        setRoomNumber={setRoomNumber}
        currentAmountOfPlayers={currentAmountOfPlayers}
        setCurrentAmountOfPlayers={setCurrentAmountOfPlayers}
      /> */}
      {/* {!gameStarted ? ( */}
      {/* <div className="h-100  d-flex flex-column align-items-center justify-content-center">
          <div className="row">
            <div className="offset-4 col-4 d-flex flex-column align-items-center justify-content-center"></div>
          </div>
        </div>
      ) : ( */}
      {/* <> */}
        {/* <div className="mb-auto flex-grow-1 d-flex justify-content-center align-items-center flex-column pt-5 pb-4">
          <MultiplayerFightCodeSection
            setPythonCode={setPythonCode}
            pythonCode={pythonCode}
            checkTheAnswer={checkTheAnswer}
            fetchedQuestions={fetchedQuestions}
            setFetchedQuestions={setFetchedQuestions}
            currentQuestionIndex={currentQuestionIndex}
            fightResult={fightResult}
            roomNumber={roomNumber}
            currentAmountOfPlayers={currentAmountOfPlayers}
            rooms={rooms}
            setRooms={setRooms}
            setCurrentAmountOfPlayers={setCurrentAmountOfPlayers}
            currentRoomQuestion={currentRoomQuestion}
            setCurrentRoomQuestion={setCurrentRoomQuestion}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            setRoomNumber={setRoomNumber}
            
          />
        </div>
        {!fightResult && (
          <MultiplayerFighting
            beamVisible={beamVisible}
            roundWinner={roundWinner}
            pointsPlayerOne={pointsPlayerOne}
            pointsPlayerTwo={pointsPlayerTwo}
            healthPlayerOne={healthPlayerOne}
            healthPlayerTwo={healthPlayerTwo}
            timer={timer}
            fightResult={fightResult}
            roomNumber={roomNumber}
            rooms={rooms}
            currentAmountOfPlayers={currentAmountOfPlayers}
          />
        )}
      </> */}
      {/* )} */}
    </>
  );
}

export default index;
