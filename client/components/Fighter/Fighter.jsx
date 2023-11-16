import React, {useContext} from 'react'
import { UserContext } from '../../contexts/User';

function Fighter({firstFighter, robot, roundWinner, healthPlayerOne=100, healthPlayerTwo=100, fightResult}) {
  const { userData } = useContext(UserContext);
  return (
  <div className='text-center h-100'>
   
    <div>{userData && firstFighter && userData.username || 'Mr. Roboto'}</div>
    <div className="progress offset-3 col-6" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
      <div className="progress-bar bg-success" style={{width: `${firstFighter ? healthPlayerOne : healthPlayerTwo}%`}}>{firstFighter ? healthPlayerOne : healthPlayerTwo}%</div>
    </div>

    <div className={`${robot ? 'robot': 'fighter'} fighterBlock char-bg h-75 mt-4`} id={`${robot && roundWinner == 1 ? 'fighter-shaking' : firstFighter && roundWinner == 2 && 'fighter-shaking'}`}/>
  </div>
  )
}

export default Fighter
