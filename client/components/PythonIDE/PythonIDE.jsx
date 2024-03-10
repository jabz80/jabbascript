import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import Axios from 'axios';

const API_ENDPOINT = 'http://localhost:3000/compile';

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
  return (
      <div className="bg-dark-subtle p-3 rounded">
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

        {!last && <div className='mt-3 text-center'>
          <button className="btn run-btn" onClick={compile}>
            Run ›
          </button>
        </div>}
    </div>
  );
}

export default pythonIDE;
