import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import Axios from 'axios';

const API_ENDPOINT = 'http://localhost:3000/compile';

function pythonIDE({setPythonCode}) {
  const [userCode, setUserCode] = useState('');
  const [userInput, setUserInput] = useState('');

  function compile() {


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
        <button className="run-btn" onClick={compile}>
          Run
        </button>
        <button className="run-btn" onClick={SubmitCode}>
          Submit Code
        </button>
      </div>
      <div className="right-container">
        <h4>Input:</h4>
        <div className="input-box">
          <textarea
            id="code-inp"
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default pythonIDE;
