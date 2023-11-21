import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import Axios from 'axios';

const API_ENDPOINT = 'http://localhost:4000/compile';

function pythonIDE({setPythonCode, questionIncrementHandler, inputIncorrect, last}) {
  const [userCode, setUserCode] = useState("print('hi')");
  const [userInput, setUserInput] = useState('');

  function compile() {
    console.log('compiling')
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
        }      })
      .catch((error) => {
        inputIncorrect(true)
        console.error('Error occurred while compiling:', error);
        setPythonCode('Error occurred while compiling.');
      })

  }

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

  function SubmitCode() {


    Axios.post(API_ENDPOINT, {
      code: userCode,
      language: 'python',
      input: userInput,
    })
      .then((res) => {
        setPythonCode(res.data.output);
      })
      .catch((error) => {
        console.error('Error occurred while compiling:', error);
        setPythonCode('Error occurred while compiling.');
      })

  }


  return (
    <div className="main">
      <div className="left-container">
        <Editor
          height="30vh"
          width="100%"
          theme="vs-dark"
          defaultLanguage="python"
          defaultValue="print('hi')"
          onChange={(value) => {
            setUserCode(value);
          }}
        />

        {!last && <div className='mt-3'>
          <button className="btn btn-info run-btn" onClick={compile}>
            Run
          </button>
          <button className="btn btn-info run-btn ms-2" onClick={SubmitCode}>
            Submit Code
          </button>
        </div>}

      </div>
      {/* <div className="right-container">
        <h4>Input:</h4>
        <div className="input-box">
          <textarea
            id="code-inp"
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
        </div>
      </div> */}
    </div>
  );
}

export default pythonIDE;
