import React, {useState} from 'react'
import Axios from 'axios';

const API_ENDPOINT = 'http://localhost:3000/compile';
function AnswerFormOutput({pythonCode, checkTheAnswer, questions, currentQuestionIndex, setCurrentCode, setPythonCode, questionIncrementHandler, inputIncorrect, handleOkClick, answerPlaceholder}) {
    const [userCode, setUserCode] = useState("print('hi')");
  const [userInput, setUserInput] = useState('');
    document.getElementById('codeOutput') && setCurrentCode(document.getElementById('codeOutput'))
  function SubmitCode() {
    Axios.post(API_ENDPOINT, {
      code: userCode,
      language: 'python',
      input: userInput,
    })
      .then((res) => {
        if(res.data.error != ''){
          setPythonCode(res.data.error);
          inputIncorrect(true)
        }
        else{
          setPythonCode(res.data.output);
          console.log(res)
          questionIncrementHandler()
        }
      })
      .catch((error) => {
        console.error('Error occurred while compiling:', error);
        setPythonCode('Error occurred while compiling.');
      })
  }

const clickHandler = () => {
  SubmitCode()
  handleOkClick()
}
  return (
    <>
    <div className={`p-3 h-100 d-flex w-100 ${!pythonCode && 'align-items-center align-items-center'}`}>
      <div className='Output w-100' id='outputBlock'>
        <div role="code-output" className='justify-content-between flex-column h-100 align-content-center w-100'>
          {pythonCode ? 
          <div className='d-flex justify-content-center align-content-center w-100 flex-column h-100'>
            <pre className='bg-warning p-1 flex-grow-1'>› <span id='codeOutput'>{pythonCode}</span></pre> 
            <button onClick={clickHandler} className={`align-self-center btn btn-fantasy text-white ${questions.length+1 == currentQuestionIndex ? 'disabled' : ''}`}>Check</button>
            </div>
            : 
            <h3>{answerPlaceholder}</h3>}
        </div>
      </div>
    </div>
    </>
  )
}

export default AnswerFormOutput
