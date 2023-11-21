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
                <div class="btn-group mt-3" role="group" aria-label="Basic example">

                <button className="btn run-btn" onClick={compile}>
                  Run ›
                </button>
                {/* <button className="btn border-dark run-btn" onClick={compile}>
                  Submit ›
                </button> */}
                </div>
           
              {/* <div className="col-6">
                <div className="input-box">
                  <textarea
                  placeholder='Your input here'
                  className=' form-control'
                    id="code-inp"
                    onChange={(e) => setUserInput(e.target.value)}
                  ></textarea>
                </div>
              </div> */}
          </div>

  );
};

export default AnswerForm;
