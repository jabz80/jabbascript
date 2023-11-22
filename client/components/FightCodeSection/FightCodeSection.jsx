import React, {useContext} from 'react';
import { AnswerForm, AnswerFormOutput } from '../index';
import { AuthContext } from "../../contexts/Auth";
import { Link } from 'react-router-dom';
import LoseImage from '../../assets/img/lose-image.png'

function FightCodeSection({ setPythonCode, pythonCode, checkTheAnswer, questions, currentQuestionIndex, fightResult, setCurrentCode }) {
  const { authToken } = useContext(AuthContext) || {};
  return (
    <>
      <div className='container h-100 d-flex flex-column justify-content-center' id='fightCodeSection'>
        {fightResult ? (
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <h1>{fightResult}</h1>
            <img src={LoseImage}/>
            {!authToken && 
            <>
            <img src={LoseImage}/>
            <div className='lead mt-5 mb-3'>Join and practice more!</div>
            <Link to="/register" className='btn btn-fantasy text-white'>Register</Link>
            </>
            }
          </div>
        ) : (
          <div className='row'>
            <div className='col-4'>
              <div className='h-100 flex-column d-flex justify-content-center'>
              <h3 role="heading" id='fightRoundNumber'>Round {currentQuestionIndex + 1}/{questions.length}</h3>
              <p id='fightRoundDescription'>{questions[currentQuestionIndex]?.question}</p>
              </div>
            </div>
            <div className='col-4 d-flex align-items-center justify-content-center bg-dark-subtle p-3 rounded'>
              <AnswerForm setPythonCode={setPythonCode} pythonCode={pythonCode} />
            </div>
            <div className="col-4">
              <AnswerFormOutput pythonCode={pythonCode} checkTheAnswer={checkTheAnswer} questions={questions} currentQuestionIndex={currentQuestionIndex} setCurrentCode={setCurrentCode} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FightCodeSection;
