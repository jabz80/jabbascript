import React, { useState, useEffect } from 'react';
import { AnswerForm, AnswerFormOutput } from '../index';

function FightCodeSequence({ isAnswerCorrect, setHtmlCode, setCssCode, setJsCode, handleOutput, showBeam }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://jabbascript-api.onrender.com/battle');
        const data = await response.json();
        setQuestions(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);
  const iframe = document.getElementById('codeOutput');
  const checkAnswer = () => {
    if (iframe.contentDocument.body.textContent == questions[currentQuestionIndex]?.answer && currentQuestionIndex + 1 < questions.length) {
      showBeam();
      isAnswerCorrect();
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } 
    
    if (currentQuestionIndex == questions.length) {
      
      setCurrentQuestionIndex(0);
    }
  };

  return (
    <>
      <div className='container my-3'>
        <div className='row'>
          <div className='col-5'>
            <h3 id='fightRoundNumber'>Round {currentQuestionIndex + 1}/{questions.length}</h3>
            <p id='fightRoundDescription'>{questions[currentQuestionIndex]?.question}</p>
            <AnswerForm setHtmlCode={setHtmlCode} setCssCode={setCssCode} setJsCode={setJsCode} handleOutput={handleOutput} />
          </div>
          <div className='col-3'></div>
          <div className='col-4'>
            <AnswerFormOutput/>
          </div>
        </div>
      </div>
      <button onClick={() => {checkAnswer()}} className='btn text-white bg-success btn-lg'>Check</button>
    </>
  );
}

export default FightCodeSequence;
