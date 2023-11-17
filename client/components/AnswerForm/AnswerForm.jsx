import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import Axios from 'axios';
const API_ENDPOINT = 'http://localhost:3000/compile';

const AnswerForm = ({ setPythonCode }) => {

  const [userCode, setUserCode] = useState('');
  const [userInput, setUserInput] = useState('');
  console.log('userCode: '+userCode, 'userInput: '+userInput)
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
  return (
  <div className="row">
    <div className="col">
      <div className="IDE">
        <div className="Code">
          <div className="form-group row">
          <div className="mb-3 col">
            <div className="row">
              <div className="col-6">
                <Editor
                  min-height="10vh"
                  height="10vh"
                  width="100%"
                  theme="vs-dark"
                  defaultLanguage="python"
                  defaultValue="#your code"
                  onChange={(value) => {
                    setUserCode(value);
                  }}
                />
                <button className="btn btn-info run-btn" onClick={compile}>
                  Run
                </button>
              </div>
              <div className="col-6">
                <div className="input-box">
                  <textarea
                  placeholder='Your input here'
                  className=' form-control'
                    id="code-inp"
                    onChange={(e) => setUserInput(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AnswerForm;
