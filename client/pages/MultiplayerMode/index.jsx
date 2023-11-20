import React, { useState, useContext, useEffect } from 'react';
import { MultiplayerFighting, MultiplayerFightCodeSection, Multiplayer } from "../../components";
import { AuthContext } from "../../contexts/Auth";
import { UserContext } from '../../contexts/User';

function index() {
    const [pythonCode, setPythonCode] = useState('');
  const [beamVisible, setBeamVisible] = useState(false);
  const [roomNumber, setRoomNumber] = useState([]);
const [currentAmountOfPlayers, setCurrentAmountOfPlayers] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [roundWinner, setRoundWinner] = useState(0)
  const [pointsPlayerOne, setPointsPlayerOne] = useState(0)
  const [pointsPlayerTwo, setPointsPlayerTwo] = useState(0)
  const [healthPlayerOne, setHealthPlayerOne] = useState(100)
  const [healthPlayerTwo, setHealthPlayerTwo] = useState(100)
  const [fightResult, setFightResult] = useState('');
  const [timer, setTimer] = useState(60)
  const [points, setPoints] = useState(0);
  const [rooms, setRooms] = useState({});
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const { userData } = useContext(UserContext);
  const { authToken } = useContext(AuthContext) || {};
  const [checkAnswer, setCheckAnswer] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const isAnswerCorrect = () => setCheckAnswer(prevState => !prevState);

  const gameStartHandler = () => setGameStarted(true);
  
return (
  <>
  <p>Available rooms to join: {Object.keys({rooms}['rooms'])}</p>
        <Multiplayer rooms={rooms} setRooms={setRooms} setGameStarted={setGameStarted} fetchedQuestions={fetchedQuestions} setFetchedQuestions={setFetchedQuestions} roomNumber={roomNumber} setRoomNumber={setRoomNumber} currentAmountOfPlayers={currentAmountOfPlayers} setCurrentAmountOfPlayers={setCurrentAmountOfPlayers}/>
    {!gameStarted ? (
      <div className="h-100  d-flex flex-column align-items-center justify-content-center">
        <div className="row">
          <div className="offset-4 col-4 d-flex flex-column align-items-center justify-content-center">
          </div>

        </div>
      </div>
    ) : (
      <>
        <div className='mb-auto flex-grow-1 d-flex justify-content-center align-items-center flex-column pt-5 pb-4'>
          <MultiplayerFightCodeSection setPythonCode={setPythonCode} pythonCode={pythonCode} fetchedQuestions={fetchedQuestions} currentQuestionIndex={currentQuestionIndex} fightResult={fightResult} roomNumber={roomNumber} rooms={rooms} currentAmountOfPlayers={currentAmountOfPlayers} setFetchedQuestions={setFetchedQuestions} setRooms={setRooms} setCurrentAmountOfPlayers={setCurrentAmountOfPlayers}/>
        </div>
        {!fightResult && (

          <MultiplayerFighting beamVisible={beamVisible} roundWinner={roundWinner} pointsPlayerOne={pointsPlayerOne} pointsPlayerTwo={pointsPlayerTwo} healthPlayerOne={healthPlayerOne} healthPlayerTwo={healthPlayerTwo} timer={timer} fightResult={fightResult} roomNumber={roomNumber} rooms={rooms} currentAmountOfPlayers={currentAmountOfPlayers} />
        )}
      </>
    )}
  </>
)
}

export default index
