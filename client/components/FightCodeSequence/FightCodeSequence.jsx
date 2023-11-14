import React from 'react'
import {AnswerForm, AnswerFormOutput} from '../index'
function FightCodeSequence({isAnswerCorrect, setHtmlCode, setCssCode, setJsCode, handleOutput}) {
  return (
      <>
      <div className='container my-5'>
        <div className='row'>
          <div className='col-8'>
            <h3 id="fightRoundNumber">Round 1/10</h3>
            <p id="fightRoundDescription">Create a variable called z, assign x + y to it, and display the result in an alert box.</p>
             <AnswerForm setHtmlCode={setHtmlCode} setCssCode={setCssCode} setJsCode={setJsCode} handleOutput={handleOutput}/>
          </div>
          <div className='col-4'>
             <AnswerFormOutput/>
           
          </div>
        </div>
      </div>
      <button onClick={()=>isAnswerCorrect()} className='btn text-white bg-success btn-lg'>Check</button>
   </>
  )
}

export default FightCodeSequence
