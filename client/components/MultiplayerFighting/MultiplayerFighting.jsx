import React from 'react';
import {MultiFighter} from '../../components'


function MultiplayerFighting({beamVisible, roundWinner, pointsPlayerOne, pointsPlayerTwo, healthPlayerOne, healthPlayerTwo, timer, fightResult, roomNumber, rooms, currentAmountOfPlayers}) { 

  return (
  <div className='w-100 fight-bg h-50'>
    <div className='container h-100'>
      <div className='row h-100'>
        <div className="col-4 h-100">
          <MultiFighter firstFighter={true} currentAmountOfPlayers={1} roundWinner={roundWinner} healthPlayerOne={healthPlayerOne} healthPlayerTwo={healthPlayerTwo} fightResult={fightResult} />
        </div>
        <div className="col-4 text-center">
          {fightResult == '' && <h4>{String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}</h4>}
          <h3>{pointsPlayerOne}:{pointsPlayerTwo}</h3>
          {beamVisible && roundWinner == 2 ? 
            <div className='d-flex h-75 beam flip'></div>
             : ''}
          {beamVisible && roundWinner == 1 ?
            <div className='d-flex h-75 beam unflip'></div>
            : ''}
        </div>
        <div className="col-4">
          {currentAmountOfPlayers === 2 ? (
          <MultiFighter secondFighter={true} currentAmountOfPlayers={2} roundWinner={roundWinner} healthPlayerOne={healthPlayerOne} healthPlayerTwo={healthPlayerTwo}/>
            ) : (
              ''
            )}
        </div>
        </div>
      </div>
    </div>
  )
}

export default MultiplayerFighting
