import React, { useState } from 'react';
import { Fighting, FightCodeSequence } from "../../components";

function index() {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [checkAnswer, setCheckAnswer] = useState(false)
  const [answerPlaceholder, setAnswerPlaceholder] = useState(false)
  const [beamVisible, setBeamVisible] = useState(false);

  const showBeam = () => {
    setBeamVisible(true);
    setTimeout(() => {
      setBeamVisible(false);
    }, 1200);
  };
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
      <FightCodeSequence checkAnswer={checkAnswer} isAnswerCorrect={isAnswerCorrect} setHtmlCode={setHtmlCode} setCssCode={setCssCode} setJsCode={setJsCode} handleOutput={handleOutput} showBeam={showBeam}/>
    </div>
      <Fighting checkAnswer={checkAnswer} beamVisible={beamVisible} />
      </>
  )
}

export default index
