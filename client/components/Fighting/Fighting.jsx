import React, {useState} from 'react'
import Fighter from '../Fighter/Fighter'


function Fighting({checkAnswer}) {
  return (
    <div className='h-33 fight-bg'>
      <div className="container h-100">
   
      <div className='row h-100'>
        <div className="col-4">
          <Fighter checkAnswer={checkAnswer} />
        </div>
        <div className="col-4"></div>
        <div className="col-4">
          <Fighter checkAnswer={checkAnswer} secondFighter={true} />
        </div>
        </div>
      </div>
    </div>
  )
}

export default Fighting
