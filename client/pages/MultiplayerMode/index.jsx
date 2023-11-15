import React, { useState, useEffect, useContext }  from 'react';
import { Fighting, FightCodeSection } from "../../components";
import { AuthContext } from "../../contexts/Auth";


function index() {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [answerPlaceholder, setAnswerPlaceholder] = useState(false)
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

  const { authToken } = useContext(AuthContext) || {};
  const iframe = document.getElementById('codeOutput');


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://jabbascript-api.onrender.com/battle');
        const data = await response.json();
        if (authToken) {
          setQuestions(data);
        } else {
          setQuestions(data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, [authToken]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((time) => {
        if (time === 1) {
          clearInterval(timerInterval);
          checkTheAnswer();
          setTimer(60)
        }
        return time - 1;
      });
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [timer]);

  const checkTheAnswer = () => {
    if (iframe.contentDocument.body.textContent == questions[currentQuestionIndex].answer && currentQuestionIndex + 1 < questions.length) {
      setRoundWinner(1)
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setPointsPlayerOne((prevIndex) => prevIndex + 1);
      setHealthPlayerTwo((prevProgress) => Math.round((prevProgress - 100 / questions.length), 1))
    } else {
      setRoundWinner(2)
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setPointsPlayerTwo((prevIndex) => prevIndex + 1);
      setHealthPlayerOne((prevProgress) => Math.round((prevProgress - 100 / questions.length), 1))
    }
    showBeam();
    if (currentQuestionIndex == questions.length-1) {
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

  const handleOutput = () => {
    const iframe = document.getElementById('codeOutput');
      iframe.contentDocument.body.innerHTML = htmlCode + '<style>' + cssCode + '</style>';
      iframe.contentWindow.eval(jsCode);
      setAnswerPlaceholder(!answerPlaceholder)
    }
  return (
    <>
      <div className='mb-auto flex-grow-1 d-flex justify-content-center align-items-center flex-column pt-5 pb-4'>
        <FightCodeSection setHtmlCode={setHtmlCode} setCssCode={setCssCode} setJsCode={setJsCode} handleOutput={handleOutput} showBeam={showBeam} questions={questions} setQuestions={setQuestions} checkTheAnswer={checkTheAnswer} currentQuestionIndex={currentQuestionIndex} fightResult={fightResult} />
      </div>

      <Fighting beamVisible={beamVisible} roundWinner={roundWinner} pointsPlayerOne={pointsPlayerOne} pointsPlayerTwo={pointsPlayerTwo} healthPlayerOne={healthPlayerOne} healthPlayerTwo={healthPlayerTwo} timer={timer}/>
    </>
  )
}

export default index
