import React, { useState, useEffect, useContext }  from 'react';
import { Fighting, FightCodeSection } from "../../components";
import { AuthContext } from "../../contexts/Auth";
import { UserContext } from '../../contexts/User';
// const questions = require("../../assets/pythonQuestions/StoryMode/questions.json")

function index() {
  const [pythonCode, setPythonCode] = useState('');
  const [beamVisible, setBeamVisible] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [roundWinner, setRoundWinner] = useState(0)
  const [pointsPlayerOne, setPointsPlayerOne] = useState(0)
  const [pointsPlayerTwo, setPointsPlayerTwo] = useState(0)
  const [healthPlayerOne, setHealthPlayerOne] = useState(100)
  const [healthPlayerTwo, setHealthPlayerTwo] = useState(100)
  const [fightResult, setFightResult] = useState('');
  const [timer, setTimer] = useState(60)
  const [gameStarted, setGameStarted] = useState(false)
  const [points, setPoints] = useState(0);
  const [currentCode, setCurrentCode] = useState('');
  const [userCode, setUserCode] = useState('');

  const { userData } = useContext(UserContext);
  const { authToken } = useContext(AuthContext) || {};



  const fetchUserPoints = async () => {
    try {
      const response = await fetch(`https://jabbascript-api.onrender.com/score/${userData.user_id}`);
      const data = await response.json();
      setPoints(data.score);
    } catch (error) {
      console.error('Error fetching points:', error);
    }
  };

  const startTheGame = async () => {
    const token = localStorage.getItem('token');
    let winner = null;
    if (roundWinner === 1) {
      winner = true
    } else {
      winner = false
    }
    try {
      await fetch(`https://jabbascript-api.onrender.com/games`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer: ${token}`,
        },
        method: 'POST',
        body: JSON.stringify({ 'game_status': winner }),
      });

    } catch (error) {
      console.error('Error creating a game:', error);
    }
  };
  const addTenPointsToWinner = async () => {
    try {
      await fetch(`https://jabbascript-api.onrender.com/score/${userData.user_id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({ 'newScore': points + 10 }),
      });
      setPoints(points + 10);
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://jabbascript-api.onrender.com/battle');
        const data = await response.json();
        if (authToken) {
          setQuestions(data);
          // setQuestions(data.slice(0, 1));
        } else {
          setQuestions(data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, [authToken]);

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

  const checkTheAnswer = () => {
    console.log(currentCode.innerHTML)
    console.log(questions[currentQuestionIndex].answer.trim())

    if (currentCode.innerHTML.trim() == questions[currentQuestionIndex].answer.trim() && currentQuestionIndex + 1 <= questions.length) {
      setRoundWinner(1)
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setPointsPlayerOne((prevIndex) => prevIndex + 1);
      setHealthPlayerTwo((prevProgress) => Math.round((prevProgress - 100 / questions.length), 1))
      addTenPointsToWinner()
      startTheGame()
    } else {
      setRoundWinner(2)
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setPointsPlayerTwo((prevIndex) => prevIndex + 1);
      setHealthPlayerOne((prevProgress) => Math.round((prevProgress - 100 / questions.length), 1))
      startTheGame()
    }
    showBeam();
    if (currentQuestionIndex == questions.length-1) {
      setTimer(0)
      setCurrentQuestionIndex(currentQuestionIndex);
      if (pointsPlayerOne > pointsPlayerTwo) {
        setFightResult('You Win!');
      } else {
        setFightResult('You Lose!');
      }
  }
  };
  const showBeam = () => {
    setBeamVisible(true);
    setTimeout(() => {
      setBeamVisible(false);
    }, 1000);
  };

  const gameStartHandler = () => {
    setGameStarted(true);
    startTheTimer();
  }

  useEffect(() => {
  if (userData) {
    fetchUserPoints();
  }
}, [userData]);
return (
  <>
    {!gameStarted ? (
      <div className="h-100 practice_bg d-flex flex-column align-items-center justify-content-center">
        <div className="row">
          <div className="offset-4 col-4 d-flex flex-column align-items-center justify-content-center p-4 bg-light">


        <h2>Game rules</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit omnis quaerat id ab veritatis sunt provident consequuntur, voluptate pariatur dolor distinctio aspernatur tenetur eveniet nostrum. Magnam fugit quidem ullam tempore.</p>
                <button className='btn btn-fantasy text-white mt-4' onClick={gameStartHandler}>Start The Game</button>
          </div>

        </div>
      </div>
    ) : (
      <>
        <div className='mb-auto flex-grow-1 d-flex justify-content-center align-items-center flex-column'>
          <FightCodeSection setPythonCode={setPythonCode} pythonCode={pythonCode} showBeam={showBeam} questions={questions} setQuestions={setQuestions} checkTheAnswer={checkTheAnswer} currentQuestionIndex={currentQuestionIndex} fightResult={fightResult} setCurrentCode={setCurrentCode} setUserCode={setUserCode } />
        </div>
        {!fightResult && (
          <Fighting beamVisible={beamVisible} roundWinner={roundWinner} pointsPlayerOne={pointsPlayerOne} pointsPlayerTwo={pointsPlayerTwo} healthPlayerOne={healthPlayerOne} healthPlayerTwo={healthPlayerTwo} timer={timer} fightResult={fightResult} />
        )}
      </>
    )}
  </>
)}
export default index
