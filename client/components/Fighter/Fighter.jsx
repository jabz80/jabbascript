import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/User';
import RobotImage from '../../assets/img/robot.png';
import DefaultImage from '../../assets/img/char.png';

function Fighter({
  firstFighter,
  robot,
  roundWinner,
  healthPlayerOne = 100,
  healthPlayerTwo = 100,
}) {
  const { userData } = useContext(UserContext);

  // State to manage the shaking animation
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (roundWinner === 1 || (firstFighter && roundWinner === 2)) {
      setIsShaking(true);

      // Remove the shaking class after 0.5s
      const timeoutId = setTimeout(() => {
        setIsShaking(false);
      }, 500);

      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [roundWinner, firstFighter]);
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
        className={`fighterBlock char-bg h-75 mt-4 ${
          isShaking ? 'fighter-shaking' : ''
        }`}
      />
    </div>
  );
}

export default Fighter;
