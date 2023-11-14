import React from 'react'
import FighterImage from '../../assets/img/fighter-example.gif'

function Fighter({secondFighter, checkAnswer}) {
  return (
  <div className="h-100 d-flex flex-column flex-wrap justify-content-between py-4">
    <div className="progress" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
      <div className="progress-bar bg-success" style={{width: '100%'}}>100%</div>
    </div>
    <img src={FighterImage} className={`object-fit-contain ${secondFighter ? 'flip': ''} ${checkAnswer ? 'fighter-shaking' : ''}`}/>
  </div>
  )
}

export default Fighter
