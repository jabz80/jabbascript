import React, { useState } from 'react';
import HTMLComponent from '../../components/HTMLInput/htmlCode';
import CSSComponent from '../../components/CSSInput/cssCode';
import JSComponent from '../../JSInput/jsCode';
import { Fighting, FightCodeSequence } from "../../components";

function index() {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
const [checkAnswer, setCheckAnswer] = useState(false)

const isAnswerCorrect = () => {
  console.log('hello');
  setCheckAnswer(prevState => !prevState);
}
  const handleOutput = () => {
    const iframe = document.getElementById('codeOutput');
    iframe.contentDocument.body.innerHTML = htmlCode + '<style>' + cssCode + '</style>';
    iframe.contentWindow.eval(jsCode);
  };
  return (
    <>
    <div className='mb-auto flex-grow-1 d-flex justify-content-center align-items-center flex-column'>
      <h1>Praktice Kombat</h1>
      <div className='IDE'>
        <div className='Code'>
          <HTMLComponent setHtmlCode={setHtmlCode} />
          <CSSComponent setCssCode={setCssCode} />
          <JSComponent setJsCode={setJsCode} />
        </div>

        <div className='Output'>
          <button onClick={handleOutput}>Run Code</button>
          <iframe id='codeOutput'></iframe>
        </div>
      </div>

      <button className='btn text-white bg-success btn-lg'>Next</button>
    </div>
            <FightCodeSequence checkAnswer={checkAnswer} isAnswerCorrect={isAnswerCorrect}/>
    <Fighting checkAnswer={checkAnswer} />
       
    </>
  )
}

export default index
