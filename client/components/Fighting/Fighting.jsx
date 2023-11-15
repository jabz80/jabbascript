import React from 'react'
import Fighter from '../Fighter/Fighter'

function Fighting({beamVisible, roundWinner, pointsPlayerOne, pointsPlayerTwo, healthPlayerOne, healthPlayerTwo, timer}) {

  return (
        <div className='w-100 fight-bg h-50'>
        <div className='container h-100'>
      <div className='row h-100'>
        <div className="col-4 h-100">
          <Fighter firstFighter={true} roundWinner={roundWinner} healthPlayerOne={healthPlayerOne} healthPlayerTwo={healthPlayerTwo} />
        </div>
        <div className="col-4 text-center">
          <h4>{String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}</h4>
          <h3>{pointsPlayerOne}:{pointsPlayerTwo}</h3>
          {beamVisible && roundWinner == 2 ? 
            <div className='d-flex h-75 beam flip'></div>
             : ''}
          {beamVisible && roundWinner == 1 ?
            <div className='d-flex h-75 beam unflip'></div>
            : ''}
        </div>
        <div className="col-4">
          <Fighter robot={true} roundWinner={roundWinner} healthPlayerOne={healthPlayerOne} healthPlayerTwo={healthPlayerTwo}/>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Fighting
