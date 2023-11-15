import React from 'react';
import { AnswerForm, AnswerFormOutput } from '../index';

function FightCodeSection({ setHtmlCode, setCssCode, setJsCode, handleOutput, checkTheAnswer, questions, currentQuestionIndex, fightResult }) {
  return (
    <>
      <div className='container my-3' id='fightCodeSection'>
        {fightResult ? (
          <div className='d-flex justify-content-center align-items-center'>
            <h1>{fightResult}</h1>
          </div>
        ) : (
          <div className='row'>
            <div className='col-5'>
              <h3 id='fightRoundNumber'>Round {currentQuestionIndex + 1}/{questions.length}</h3>
              <p id='fightRoundDescription'>{questions[currentQuestionIndex]?.question}</p>
              <AnswerForm setHtmlCode={setHtmlCode} setCssCode={setCssCode} setJsCode={setJsCode} handleOutput={handleOutput} />
            </div>
            <div className='col-4'>
              <AnswerFormOutput />
            </div>
            <div className='col-3 d-flex align-items-center justify-content-center'>
              <button onClick={() => { checkTheAnswer() }} className={`btn btn-outline-primary btn-lg ${questions.length+1 == currentQuestionIndex ? 'disabled' : ''}`}>Check</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FightCodeSection;
