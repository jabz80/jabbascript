import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import Axios from 'axios';
const API_ENDPOINT = 'http://localhost:3000/compile';

const AnswerForm = ({ setPythonCode }) => {

  const [userCode, setUserCode] = useState('');
  // const [userInput, setUserInput] = useState('');
  function compile() {
    Axios.post(API_ENDPOINT, {
      code: userCode,
      language: 'python',
      // input: userInput,
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

          <div className="form-group row w-100 h-100">
          
    

                <Editor
                  height="25vh"
                  width="100%"
                  className='shadow-sm'
                  theme="vs-dark"
                  defaultLanguage="python"
                  defaultValue="#code and print your output"
                  onChange={(value) => {
                    setUserCode(value);
                  }}
                />
                <div className="btn-group mt-3" role="group" aria-label="Basic example">

                <button className="btn run-btn" onClick={compile}>
                  Run ›
                </button>

                </div>
          </div>

  );
};

export default AnswerForm;
