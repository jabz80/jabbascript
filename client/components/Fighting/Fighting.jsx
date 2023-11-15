import React, {useState} from 'react'
import Fighter from '../Fighter/Fighter'

function Fighting({checkAnswer, beamVisible}) {

  return (
        <div className='w-100 fight-bg h-33'>
        <div className='container h-100'>
      <div className='row h-100'>
        <div className="col-4 h-100">
          <Fighter checkAnswer={checkAnswer} />
        </div>
        <div className="col-4">
          {checkAnswer && beamVisible &&
          <div className="d-flex align-items-center h-100 beam"></div>
          }
        </div>
        <div className="col-4">
          <Fighter checkAnswer={checkAnswer} beamVisible={beamVisible} secondFighter={true} />
        </div>
        </div>
      </div>
    </div>
  )
}

export default Fighting
