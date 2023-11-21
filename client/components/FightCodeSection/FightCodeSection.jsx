import React, {useContext} from 'react';
import { AnswerForm, AnswerFormOutput } from '../index';
import { AuthContext } from "../../contexts/Auth";
import { Link } from 'react-router-dom';
import LoseImage from '../../assets/img/lose-image.png'

function FightCodeSection({ setPythonCode, pythonCode, checkTheAnswer, questions, currentQuestionIndex, fightResult }) {
  const { authToken } = useContext(AuthContext) || {};
  return (
    <>
      <div className='container my-3' id='fightCodeSection'>
        {fightResult ? (
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <h1>{fightResult}</h1>
            {!authToken && 
            <>
            <img src={LoseImage}/>
            <div className='lead mt-5 mb-3'>Join and practice more!</div>
            <Link to="/register" className='btn btn-info'>Register</Link>
            </>
            }
          </div>
        ) : (
          <div className='row'>
            <div className='col-4'>
              <h3 role="heading" id='fightRoundNumber'>Round {currentQuestionIndex + 1}/{questions.length}</h3>
              <p id='fightRoundDescription'>{questions[currentQuestionIndex]?.question}</p>

            </div>
            <div className='col-8 d-flex align-items-center justify-content-center'>
              <div className="row">
                <div className="col-6">

              <AnswerForm setPythonCode={setPythonCode} pythonCode={pythonCode} />
                </div>
                <div className="col-6">

              <AnswerFormOutput pythonCode={pythonCode} />
              <button onClick={() => { checkTheAnswer() }} className={`btn btn-outline-primary btn-lg ${questions.length+1 == currentQuestionIndex ? 'disabled' : ''}`}>Check</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FightCodeSection;
