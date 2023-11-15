import React from 'react'
import FighterImage from '../../assets/img/char.png'

function Fighter({secondFighter, checkAnswer}) {
  return (
  <div className='text-center h-100'>
    <div className="progress offset-3 col-6" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
      <div className="progress-bar bg-success" style={{width: '100%'}}>100%</div>
    </div>

    <div className={`fighter h-100 mt-4 ${secondFighter ? 'flip': ''} ${secondFighter && checkAnswer ? 'fighter-shaking' : ''}`}/>

  </div>
  )
}

export default Fighter
