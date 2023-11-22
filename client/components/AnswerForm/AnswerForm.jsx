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
          <h3 className='text-center mb-3'>Input</h3>
    

                <Editor
                  height="25vh"
                  width="100%"
                  className='shadow'
                  theme="vs-dark"
                  defaultLanguage="python"
                  defaultValue="#code here"
                  onChange={(value) => {
                    setUserCode(value);
                  }}
                />
                <div className="btn-group mt-3 d-flex justify-content-center" role="group" aria-label="Basic example">

                <button className="btn  run-btn btn-fantasy text-white" onClick={compile}>
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
