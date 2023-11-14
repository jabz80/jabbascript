import React, { useState } from 'react';
import { Fighting, FightCodeSequence, AnswerForm } from "../../components";

function index() {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [checkAnswer, setCheckAnswer] = useState(false)
  const [answerPlaceholder, setAnswerPlaceholder] = useState(false)

  const isAnswerCorrect = () => setCheckAnswer(prevState => !prevState);

  const handleOutput = () => {
    const iframe = document.getElementById('codeOutput');
      iframe.contentDocument.body.innerHTML = htmlCode + '<style>' + cssCode + '</style>';
      iframe.contentWindow.eval(jsCode);
      setAnswerPlaceholder(!answerPlaceholder)

    }

  return (
    <>
    <div className='mb-auto flex-grow-1 d-flex justify-content-center align-items-center flex-column py-5'>
    {/* <h1>Multiplayer Mode</h1> */}
      <FightCodeSequence checkAnswer={checkAnswer} isAnswerCorrect={isAnswerCorrect} setHtmlCode={setHtmlCode} setCssCode={setCssCode} setJsCode={setJsCode} handleOutput={handleOutput}/>
    </div>
      <Fighting checkAnswer={checkAnswer} />
      </>
  )
}

export default index
