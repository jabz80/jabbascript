import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import Axios from 'axios';

const API_ENDPOINT = 'http://localhost:8000/compile';

function pythonIDE() {
  const [userCode, setUserCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [userOutput, setUserOutput] = useState('');
  const [loading, setLoading] = useState(false); // Define the loading state

  function compile() {
    setLoading(true);
    if (userCode === '') {
      setLoading(false); // Set loading to false if code is empty
      return;
    }

    Axios.post(API_ENDPOINT, {
      code: userCode,
      language: 'python',
      input: userInput,
    })
      .then((res) => {
        setUserOutput(res.data.output);
      })
      .catch((error) => {
        console.error('Error occurred while compiling:', error);
        setUserOutput('Error occurred while compiling.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function clearOutput() {
    setUserOutput('');
  }

  return (
    <div className="main">
      <div className="left-container">
        <Editor
          height="calc(100vh - 50px)"
          width="100%"
          theme="vs-dark"
          defaultLanguage="python"
          defaultValue="# Enter your code here"
          onChange={(value) => {
            setUserCode(value);
          }}
        />
        <button className="run-btn" onClick={compile}>
          Run
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
        <h4>Output:</h4>
        {loading ? (
          <div className="spinner-box">Loading...</div>
        ) : (
          <div className="output-box">
            <pre>{userOutput}</pre>
            <button onClick={clearOutput} className="clear-btn">
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default pythonIDE;
