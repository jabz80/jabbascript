import React, {useContext, useState, useEffect} from 'react';
import { AnswerForm, AnswerFormOutput } from '../index';
import { AuthContext } from "../../contexts/Auth";
import { Link } from 'react-router-dom';
import LoseImage from '../../assets/img/lose-image.png'
import WinImage from '../../assets/img/win-image.png'

function FightCodeSection({ setPythonCode, pythonCode, checkTheAnswer, questions, currentQuestionIndex, fightResult, setCurrentCode }) {
  const { authToken } = useContext(AuthContext) || {};
  return (
    <>
      <div className='container h-100 d-flex flex-column justify-content-center' id='fightCodeSection'>
        {fightResult && fightResult !== 'You Win!' && (
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <h1>{fightResult}</h1>
            <img src={LoseImage}/>
            {!authToken ?
              <>
              <div className='lead mt-5 mb-3'>Join and practice more!</div>
              <Link to="/register" className='btn btn-fantasy text-white'>Register</Link>
              </> 
            : 
              <>
              <div className='lead mt-5 mb-3'>You have to practice more!</div>
              <Link to="/practice" className='btn btn-fantasy text-white'>Start again</Link>
              </> 
            }
          </div>
        ) 
          }
        {fightResult == '' && (
          <div className='row'>
            <div className='col-3'>
              <div className='h-100 flex-column d-flex justify-content-center'>
              <h3 role="heading" id='fightRoundNumber'>Round {currentQuestionIndex + 1}/{questions.length}</h3>
              <p id='fightRoundDescription'>{questions[currentQuestionIndex]?.question}</p>
              </div>
            </div>
            <div className='col-4 d-flex align-items-center justify-content-center bg-dark-subtle p-3 rounded shadow-sm'>
              <AnswerForm setPythonCode={setPythonCode} pythonCode={pythonCode} />
            </div>
            <div className="col-1 d-flex justify-content-center align-items-center flex-column"><p style={{'fontSize': '4rem'}}>›</p></div>
            <div className="col-4">
              <AnswerFormOutput pythonCode={pythonCode} checkTheAnswer={checkTheAnswer} questions={questions} currentQuestionIndex={currentQuestionIndex} setCurrentCode={setCurrentCode} />
            </div>
          </div>
        )}
        {fightResult && fightResult == 'You Win!' && (
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <h1>{fightResult}</h1>
            <img src={WinImage}/>
            {!authToken ?
              <>
              <div className='lead mt-5 mb-3'>Nice! Join and practice more!</div>
              <Link to="/register" className='btn btn-fantasy text-white'>Register</Link>
              </> 
            : 
              <>
              <div className='lead mt-5 mb-3'>Great game! You won 10 points!</div>
              <Link to="/practice" className='btn btn-fantasy text-white'>Start again</Link>
              </> 
            }
          </div>
        ) 
          }

      </div>
    </>
  );
}

export default FightCodeSection;
