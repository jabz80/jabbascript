import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/User';
import RobotImage from '../../assets/img/avatars/default.png';
import DefaultImage from '../../assets/img/knight-1.png';
import '../../assets/css/App.css';

function Fighter({
  firstFighter,
  robot,
  roundWinner,
  setRoundWinner,
  healthPlayerOne = 100,
  healthPlayerTwo = 100,
}) {
  const { userData } = useContext(UserContext);

  // State to manage the shaking animation
  const [isShaking, setIsShaking] = useState(false);
  console.log('isShaking state outside of useEffect: ', isShaking);

  useEffect(() => {
    if (
      (robot && roundWinner === 1) ||
      (firstFighter && roundWinner === 2 && roundWinner !== 0)
    ) {
      setIsShaking(true);

      // Remove the shaking class after 0.5s
      const timeoutId = setTimeout(() => {
        setIsShaking(false);
        setRoundWinner(0);
      }, 500);

      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [roundWinner, firstFighter, robot, setRoundWinner]);
  return (
    <div className="text-center h-100">
      <div>
        {firstFighter && userData
          ? userData.username
          : (firstFighter && !userData && 'Mr. Brightside') || 'Mr. Roboto'}
      </div>
      <div
        className="progress offset-3 col-6"
        role="progressbar"
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="progress-bar bg-success"
          style={{
            width: `${firstFighter ? healthPlayerOne : healthPlayerTwo}%`,
          }}
        >
          {firstFighter ? healthPlayerOne : healthPlayerTwo}%
        </div>
      </div>

      <div
        role="background"
        style={{
          backgroundImage: `url(${
            firstFighter && !userData
              ? DefaultImage
              : !robot
              ? userData && userData.img_url
              : RobotImage
          })`,
        }}
        className={`fighterBlock char-bg h-75 mt-4`}
        id={`${isShaking ? 'fighter-shaking' : ''}`}
      />
    </div>
  );
}

export default Fighter;
