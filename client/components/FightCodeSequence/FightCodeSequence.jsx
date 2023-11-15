import React from 'react'
import {AnswerForm, AnswerFormOutput} from '../index'
function FightCodeSequence({isAnswerCorrect, setHtmlCode, setCssCode, setJsCode, handleOutput, showBeam}) {

const animation = () => {
  showBeam()
  isAnswerCorrect()
}
  return (
      <>
      <div className='container my-3'>
        <div className='row'>
          <div className='col-5'>
            <h3 id="fightRoundNumber">Round 1/10</h3>
            <p id="fightRoundDescription">Create a variable called z, assign x + y to it, and display the result in an alert box.</p>
             <AnswerForm setHtmlCode={setHtmlCode} setCssCode={setCssCode} setJsCode={setJsCode} handleOutput={handleOutput}/>
          </div>
          <div className='col-3'></div>
          <div className='col-4'>
             <AnswerFormOutput/>
          </div>
        </div>
      </div>
      <button onClick={()=>animation()} className='btn text-white bg-success btn-lg'>Check</button>
   </>
  )
}

export default FightCodeSequence
