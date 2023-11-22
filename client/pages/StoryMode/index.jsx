import React, { useState, useEffect, useContext } from "react";
import { Story, SingleFighter } from "../../components";
import { PythonIDE, StoryAnswerFormOutput } from '../../components';
import { AuthContext } from "../../contexts/Auth";
import { UserContext } from "../../contexts/User";
export default function Index() {
  const [dialogueId, setDialogueId] = useState(0);
  const [questionsList, setQuestionsList] = useState([]);
  const [inputIncorrect, setInputIncorrect] = useState(false);
  const [dialogue, setDialogue] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [incorrectMessage, setIncorrectMessage] = useState('');
  // const [storyMessage, setStoryMessage] = useState();
  const [showFireball, setShowFireball] = useState(false);
  const [showThunder, setShowThunder] = useState(false);
  const [showWind, setShowWind] = useState(false);
  const [pythonCode, setPythonCode] = useState('');
  const [currentCode, setCurrentCode] = useState('');
  const [userCode, setUserCode] = useState('');
  const [userInput, setUserInput] = useState('');

  const fireAudio = new Audio("assets/img/magic-strike-5856.mp3");
  const thunderAudio = new Audio("assets/img/loud-thunder-7932.mp3");
  const windAudio = new Audio("assets/img/woosh_low_long01-98755.mp3");
  const { userData } = useContext(UserContext);
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
      setIsAnswerCorrect(true);
      setIncorrectMessage("");
      // setDialogueId((prevId) => prevId + 1);
      setUserAnswer("");
      triggerFighterMove();
      setInputIncorrect(false);
      setIncorrectMessage("");
    } else {
      setIncorrectMessage('Wrong answer!');
      setInputIncorrect(true);
    }
  };

  const triggerFighterMove = () => {
    handleShowFireballClick()
    console.log("Fighter move triggered!");
  };

  // useEffect(() => {
  //   if (dialogueId <= dummyData.length) {
  //     setStoryMessage(dummyData[dialogueId]);
  //   }
  // }, [dialogueId]);

  const showFireBallButton = dialogueId === 2;
  const showThunderButton = dialogueId === 3;
  const showWindButton = dialogueId === 4;

  const handleShowFireballClick = () => {
    setShowFireball(true);
    // fireAudio.play();
    setTimeout(() => {
      setShowFireball(false);
    }, 1000);
  };

  const handleShowThunderClick = () => {
    setShowThunder(true);
    thunderAudio.play();
    setShowFireball(false);
    setTimeout(() => {
      setShowThunder(false);
    }, 1500);
  };

  const handleShowWindClick = () => {
    setShowWind(true);
    windAudio.play();
    setShowThunder(false);
    setShowFireball(false);
    setTimeout(() => {
      setShowWind(false);
    }, 4000);
  };

  const [last, setLast] = useState(false);
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

  const inputCorrectHandler = (payload) => {
    setInputIncorrect(payload)
  }

  return (
    <>

    {!gameStarted ? (
      <div className="h-100 practice_bg d-flex flex-column align-items-center justify-content-center">
        <div className="row">
          <div className="offset-4 col-4 d-flex flex-column align-items-center justify-content-center p-4 bg-light">
            <h2>Quest Mode</h2>
            <p> .Welcome fellow student, here you shall learn the ways of Python code. Follow the examples and answer the questions given to become stronger. Remember to click "Run" after answering your question to double check. Click "Start" when you are ready train for battle!</p>
            <button className='btn btn-fantasy text-white mt-4' onClick={gameStartHandler}>Start The Game</button>
          </div>
        </div>
      </div>
    ) : (
      <>
    {dialogueId == 0 ? 
          '' : dialogueId == 8 ? 
          '' :
      <div className="container-md my-4">
          <div className="row">
            <div className="col-6">            
              <PythonIDE  last={false} inputIncorrect={inputCorrectHandler} setPythonCode={setPythonCode} pythonCode={pythonCode} questionIncrementHandler={questionIncrementHandler} storyMode={true} userCode={userCode} setUserCode={setUserCode} userInput={userInput} setUserInput={setUserInput} />
            </div>
            <div className="col-6 text-wrap" >
              <StoryAnswerFormOutput pythonCode={pythonCode} setPythonCode={setPythonCode} questions={questionsList} setCurrentCode={setCurrentCode} storyMode={true} userCode={userCode} setUserCode={setUserCode} userInput={userInput} setUserInput={setUserInput} questionIncrementHandler={questionIncrementHandler} handleOkClick={handleOkClick}/>
            </div>
          </div>
      </div>
    }
      <SingleFighter inputIncorrect={inputIncorrect} correctAnswersCount={dialogueId} dialogue={dialogue} last={last} questionIncrementHandler={questionIncrementHandler} showFireball={showFireball} />
    </>
  })
 </>
);
