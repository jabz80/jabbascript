import React, { useState, useEffect, useContext } from "react";
import { SingleFighter } from "../../components";
import { PythonIDE, StoryAnswerFormOutput } from '../../components';
import { AuthContext } from "../../contexts/Auth";
import { Link } from "react-router-dom";
import Knight from '../../assets/img/dragon.png'

export default function Index() {
  const [gameStarted, setGameStarted] = useState(false)
  const [dialogueId, setDialogueId] = useState(0);
  const [questionsList, setQuestionsList] = useState([]);
  const [inputIncorrect, setInputIncorrect] = useState(false);
  const [dialogue, setDialogue] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [answerPlaceholder, setAnswerPlaceholder] = useState('Your Answer will be here');
  const [incorrectMessage, setIncorrectMessage] = useState('');
  const [showFireball, setShowFireball] = useState(false);
  const [pythonCode, setPythonCode] = useState('');
  const [currentCode, setCurrentCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [last, setLast] = useState(false);
  const [userCode, setUserCode] = useState("print('hi')");

  const { authToken } = useContext(AuthContext) || {};
  
  useEffect(() => {
    fetchQuestion();
  }, [dialogueId]);

  const fetchQuestion = async () => {
    const response = await fetch('https://jabbascript-api.onrender.com/story')
    const result = await response.json()
    setQuestionsList(result)
    setDialogue(result[dialogueId]);
  };

  const handleOkClick = () => {
    if (currentCode.innerHTML.trim() === dialogue.example.trim()) {
      Swal.fire({
        title:'Correct',
        text:'Nice Work, Keep it up',
        icon:'success'
      })
      setIsAnswerCorrect(true);
      setIncorrectMessage("");
      setUserAnswer("");
      handleShowFireballClick();
      setInputIncorrect(false);
      setIncorrectMessage("");
    } else {
      Swal.fire({
        title: 'Incorrect',
        text: "Good Attempt, Take your time and keep on trying!",
        icon: 'error'
      })
      setIncorrectMessage('Wrong answer!');
      setInputIncorrect(true);
    }
  };
  const handleShowFireballClick = () => {
    setShowFireball(true);
    setTimeout(() => {
      setShowFireball(false);
    }, 1000);
  };

  const gameStartHandler = () => setGameStarted(true);

  const questionIncrementHandler = () => {
    if (questionsList.length <= dialogueId + 1) {
      setLast(true);
      return;
    }
    setDialogueId((prevState) => prevState + 1);
    setDialogue(questionsList[dialogueId + 1]);
  };

  useEffect(() => {
    setTimeout(() => {
      setInputIncorrect(false);
    }, 1000);
  }, [inputIncorrect]);

  const inputCorrectHandler = (payload) => setInputIncorrect(payload);

  return (
    <>
    {dialogueId == 6 && !authToken ?
    <div className="d-flex justify-content-center align-items-center flex-column h-100">
      <h1>End of The Demo mode!</h1>
      <p className="Lead">Now you can continue the Story after the Registration!</p>
      <img src={Knight} className="w-25 my-4"/>
      <Link to="/register" className='btn btn-fantasy text-white'>Register</Link>
    </div>
     :
     dialogueId == 12 && authToken ?
    <div className="d-flex justify-content-center align-items-center flex-column h-100">
      <h1>You have finished The Quest!</h1>
      <p className="Lead">Congratulations, valiant warrior! Now try our Fighting mode!</p>
      <img src={Knight} className="w-25 my-4"/>
      <Link to="/practice" className='btn btn-fantasy text-white'>Fighting Mode</Link>
    </div>
     :
    !gameStarted ? (
      <div className="h-100 quest_bg d-flex flex-column align-items-center justify-content-center">
        <div className="row">
          <div className="offset-4 col-4 d-flex flex-column justify-content-center p-4 bg-light">
            <h2 className="align-self-center">Quest Mode</h2>

            <p class="lead align-self-center">Welcome fellow student</p><p>Here you shall learn the ways of Python code.</p><p> Follow the examples and answer the questions given to become stronger. Remember to click <b>«Run»</b> after answering your question to double check.</p> <p>Click <b>«Start The Game»</b> when you are ready train for battle!</p>

            <button className='align-self-center btn btn-fantasy text-white mt-4' onClick={gameStartHandler}>Start The Game</button>
          </div>
        </div>
      </div>
    ) : (
      <>
    {dialogueId !== 0 && 
      <div className="container-md my-4">
          <div className="row">
            <div className='col-5'>            
              <PythonIDE  last={false} inputIncorrect={inputCorrectHandler} setPythonCode={setPythonCode} />
            </div>
            {dialogueId !== 0 && <div className="col-2 d-flex justify-content-center align-items-center flex-column"><p style={{'fontSize': '4rem'}}>›</p></div>}
            <div className="col-5 text-wrap" >
              <StoryAnswerFormOutput pythonCode={pythonCode} setPythonCode={setPythonCode} questions={questionsList} setCurrentCode={setCurrentCode} storyMode={true} userCode={userCode} setUserCode={setUserCode} userInput={userInput} setUserInput={setUserInput} questionIncrementHandler={questionIncrementHandler} handleOkClick={handleOkClick} answerPlaceholder={answerPlaceholder}/>
            </div>
          </div>
      </div>
    }
    <SingleFighter inputIncorrect={inputIncorrect} correctAnswersCount={dialogueId} dialogue={dialogue} last={last} questionIncrementHandler={questionIncrementHandler} showFireball={showFireball} />
    </>
    )}
    </>
  );
}

